import { IABIFunc, ITransactionOpt,ICallOpt, IContractCallResult, IContractCall,IClause,IMethodsResult,ITxID,IBlock } from './interface';
import VeThorRPC from './vethor_rpc';
import { Address,BigInt,Bytes32,Secp256k1,Transaction } from 'thor-model-kit';
import { intrinsicGas,makeABI,formatParam,addressFromPriv } from './utils';

export default class Contract {

  address: string;
  abi: IABIFunc[];
  abiFuncHash: object;
  veThorRPC:VeThorRPC;

  constructor(veThorRPC:VeThorRPC,address:string,abi:IABIFunc[]) {
    this.veThorRPC = veThorRPC;
    this.address = address;
    this.abi = abi;
    let {abiFuncHash} = makeABI(abi);
    this.abiFuncHash = abiFuncHash;
  }

  makeData(funcName:string,args:string[]):string{
    let funcHash = this.abiFuncHash[funcName];
    if(!funcHash) throw new Error('function undefined');
    let params:string = '';
    for(let i = 0;i < args.length;i++){
      params+=formatParam(args[i]);
    }
    return `0x${funcHash.hash.substr(0,8)}${params}`;
  }

  async getChainTag():Promise<number>{
    const genesisBlockResult:IBlock = await this.veThorRPC.getBlock(0);
    if(!genesisBlockResult) throw new Error('can not get genesis block');
    const genesisBlockID:string = genesisBlockResult.id;
    let chainTagHex:string = `0x${genesisBlockID.substr(-2)}`;
    let chainTag:number = parseInt(chainTagHex);
    return chainTag;
  }

  async getBlockID(revision:string|number='best'):Promise<string>{
    const blockResult:IBlock = await this.veThorRPC.getBlock(revision);
    if(!blockResult) throw new Error('can not get block');
    return blockResult.id;
  }

  async getGas(clauses:IClause[],caller:string,revision:string|number='best'):Promise<number>{
    let gas:number = intrinsicGas(clauses);
    let estimateGas:number = await this.estimateGas(clauses,caller,revision);
    return gas+estimateGas
  }

  async makeTransactionBody(clauses:IClause[],privateKey:string,opt?:ITransactionOpt,revision:string|number='best'):Promise<Transaction.Body>{
    let caller:string = addressFromPriv(privateKey);
    if(!opt) opt = {};
    let chainTag:number = opt.chainTag || await this.getChainTag();
    let blockRef:Buffer = Buffer.from((opt.blockRef || await this.getBlockID(revision)).substr(2,16), 'hex');;
    let expiration:number = opt.expiration || 720;
    let clausesArr:Transaction.Clause[] = [];
    for(let i=0;i<clauses.length;i++){
      let clause = clauses[i];
      clausesArr.push({
        to:Address.fromHex(clause.to,'0x'),
        value:BigInt.from(clause.value),
        data:Buffer.from(clause.data.slice(2),'hex')
      });
    }
    let gasPriceCoef:number = opt.gasPriceCoef || 128;
    let gas:BigInt = BigInt.from(opt.gas || await this.getGas(clauses,caller,revision));
    let dependsOn:Bytes32 = opt.dependsOn&&Bytes32.fromHex(opt.dependsOn,'0x');
    let nonce:BigInt = BigInt.from(opt.nonce || Math.round(Math.random()*1000000));
    let reserved:any[] = []
    return {
      chainTag,
      blockRef,
      expiration,
      clauses:clausesArr,
      gasPriceCoef,
      gas,
      dependsOn,
      nonce,
      reserved
    }
  }

  async sendTransaction(clauses:IClause[],privateKey:string,opt?:ITransactionOpt):Promise<ITxID>{
    let body: Transaction.Body = await this.makeTransactionBody(clauses,privateKey,opt,'best');
    let tx:Transaction = new Transaction(body);
    tx.signature = Secp256k1.sign(tx.signingHash, Bytes32.fromHex(privateKey.substr(0,2)==='0x'?privateKey.slice(2):privateKey,''));
    let raw = tx.encode();
    return await this.veThorRPC.postTransaction('0x'+raw.toString('hex'));
  }
  
  
  methods(funcName:string):IMethodsResult{
    let funcHash = this.abiFuncHash[funcName];
    if(!funcHash) throw new Error('function undefined');
    let _this = this;
    return {
      call:async function(args:string[],revision:number|string,opt:ICallOpt = null){
        return await _this.call(funcName,args,revision,opt);
      },
      send:async function(args:string[],privateKey:string,opt?:ITransactionOpt){
        return await _this.send(funcName,args,privateKey,opt);
      }
    }
  }
  
  private async call(funcName:string,args:string[],revision:number|string,opt:ICallOpt = null):Promise<IContractCallResult>{
    let funcHash = this.abiFuncHash[funcName];
    if(!funcHash) throw new Error('function undefined');
    let params:string = '';
    for(let i = 0;i < args.length;i++){
      params+=formatParam(args[i]);
    }
    let body:IContractCall = {
      'value': '0x0',
      'data': `0x${funcHash.hash.substr(0,8)}${params}`
    }
    if(opt&&opt.caller) body.caller = opt.caller;
    if(opt&&opt.gas) body.gas = opt.gas;
    if(opt&&opt.gasPrice) body.gasPrice = opt.gasPrice;
    return await this.veThorRPC.postAccount(this.address,revision,body);
  }

  private async send(funcName:string,args:string[],privateKey:string,opt?:ITransactionOpt):Promise<ITxID>{
    let funcHash = this.abiFuncHash[funcName];
    if(!funcHash) throw new Error('function undefined');
    let params:string = '';
    for(let i = 0;i < args.length;i++){
      params+=formatParam(args[i]);
    }
    let clause:IClause = {
      'value': '0x0',
      'data': `0x${funcHash.hash.substr(0,8)}${params}`,
      'to':this.address
    };
    return await this.sendTransaction([clause],privateKey,opt);
  }

  async estimateGas(clauses:IClause[],caller:string,revision:string|number='best'):Promise<number>{
    let gasUsed:number = 0;
    for(let i = 0;i<clauses.length;i++){
      let body:IContractCall = {
        value:clauses[i].value,
        data:clauses[i].data
      };
      body.caller = caller;
      let ret = await this.veThorRPC.postAccount(this.address,revision,body);
      gasUsed += Math.round(ret.gasUsed * 1.2); //放大20%执行Gas
    }
    return gasUsed;
  }
}