interface IInOutPut {
  indexed?: boolean;
  name?: string;
  type?: string;
  components?: IInOutPut[]
}

interface IABIFunc {
  anonymous?: boolean;
  constant?: boolean;
  inputs?: IInOutPut[];
  outputs?: IInOutPut[];
  name?: string;
  payable?: boolean;
  stateMutability?: string;
  type?: string;
}

interface ITransactionOpt {
  /** last byte of genesis block ID */
  chainTag ?: number;
  /** 8 bytes prefix of some block's ID */
  blockRef ?: string;
  /** constraint of time bucket */
  expiration ?: number;
  /** coef applied to base gas price [0,255] */
  gasPriceCoef ?: number;
  /** max gas provided for execution */
  gas ?: number;
  /** ID of another tx that is depended */
  dependsOn ?: string | null;
  /** nonce value for various purposes */
  nonce ?: number;
  /** reserved fields, must be empty */
  reserved ?: any[];
}

interface ICallOpt {
  gas:number,
  gasPrice:number,
  caller:string
}

interface IAccount {
  //hex form of token balance
  balance:string,
  //hex form of remained amount of energy
  energy:string,
  hasCode:boolean
}

interface ITxMeta {
  //identifier of the block (bytes32)
  blockID:string,
  //number(height) of the block
  blockNumber:number,
  //unix timestamp of the block
  blockTimestamp:number
}

interface ILogMeta {
  //identifier of the block (bytes32)
  blockID:string,
  //number(height) of the block
  blockNumber:number,
  //unix timestamp of the block
  blockTimestamp:number,
  //identifier of the transaction
  txID:string,
  //the one who signed the transaction
  txOrigin:string
}

interface IContractCall {
  value:string,
  data:string,
  gas?:number,
  gasPrice?:number,
  caller?:string
}

interface IBlock {
  //number(height) of the block
  number:number,
  //identifier of the block (bytes32)
  id:string,
  //byte size of the block that is RLP encoded
  size:number,
  //ID of parent block (bytes32)
  parentID:string,
  //unix timestamp of the block
  timestamp:number,
  //gas limit of the block
  gasLimit:number,
  //address of account to receive block reward
  beneficiary:string,
  gasUsed:number,
  totalScore:number,
  //root hash of transactions in the block (bytes32)
  txsRoot:string,
  //root hash of accounts state (bytes32)
  stateRoot:string,
  //root hash of transaction receipts (bytes32)
  receiptsRoot:string,
  //the one who signed this block (bytes20)
  signer:string,
  //whether block is trunk
  isTrunk:boolean,
  //IDs of transactions
  transactions:string[]
}

interface ICode {
  code: string
}

interface IRawTx {
  //hex form of encoded transaction
  raw:string,
  meta:ITxMeta
}

interface IClause{
  to?:string,
  value?:string,
  data?:string
}

interface ITransaction{
  //identifier of the transaction
  id:string,
  //last byte of genesis block ID
  chainTag:number,
  //8 bytes prefix of some block ID
  blockRef:string,
  //expiration relative to blockRef, in unit block
  expiration:number,
  clauses:IClause[],
  //coefficient used to calculate the final gas price
  gasPriceCoef:number,
  //max amount of gas can be consumed to execute this transaction
  gas:number,
  //the one who signed the transaction
  origin:string,
  nonce:string,
  //ID of the transaction on which the current transaction depends (bytes32)
  dependsOn:string,
  //byte size of the transaction that is RLP encoded
  size:number,
  meta:ITxMeta
}

interface IEvent{
  address:string,
  topics:string[],
  data:string
}

interface ITransfer{
  sender:string,
  recipient:string,
  amount:string
}

interface IOutput{
  //deployed contract address, if the corresponding clause is a contract deployment clause
  contractAddress:string,
  events:IEvent[],
  transfers:ITransfer[]
}

interface IReceipt{
  gasUsed: number,
  //address of account who paid used gas
  gasPayer: string,
  //hex form of amount of paid energy
  paid: string,
  //hex form of amount of reward
  reward: string,
  //true means the transaction was reverted
  reverted: boolean,
  outputs: IOutput[],
  meta: ILogMeta
}

interface IContractCallResult{
  data:string,
  events:IEvent[],
  transfers:ITransfer[],
  gasUsed:number,
  reverted:boolean,
  vmError:string
}

interface IMethodsResult{
  call:(args:string[],revision:number|string,opt?:ICallOpt)=>Promise<IContractCallResult>,
  send:(args:string[],privateKey:string,opt?:ITransactionOpt)=>Promise<any>
}

interface IOptions{
  offset: number,
  limit: number
}

interface ITxID {
  id: string
}


export {
  IInOutPut,
  IABIFunc,
  ITransactionOpt,
  ICallOpt,

  IAccount,
  ITxMeta,
  ILogMeta,
  IBlock,
  ICode,
  IRawTx,
  IClause,
  ITransaction,
  IEvent,
  ITransfer,
  IReceipt,
  IContractCall,
  IContractCallResult,
  IOptions,
  ITxID,
  IMethodsResult
};
