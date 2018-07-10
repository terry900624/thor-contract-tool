interface IINPUT {
  indexed?: boolean;
  name: string;
  type: string;
}

interface IOUTPUT {
  name: string;
  type: string;
}

interface IABIFunc {
  anonymous?: boolean;
  constant?: boolean;
  inputs: IINPUT[];
  outputs?: IOUTPUT[];
  name: string;
  payable?: boolean;
  stateMutability?: string;
  type: string;
}

interface ITransOpt {
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

interface IContractCall{
  value:string,
  data:string,
  gas?:number,
  gasPrice?:number,
  caller?:string
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

interface IContractCallResult{
  data:string,
  events:IEvent[],
  transfers:ITransfer[],
  gasUsed:number,
  reverted:boolean,
  vmError:string
}

interface IClause{
  to?:string,
  value?:string,
  data?:string
}

interface IMethodsResult{
  call:(args:string[],revision:number|string,opt?:ICallOpt)=>Promise<IContractCallResult>,
  send:(args:string[],privateKey:string,opt?:ITransOpt)=>Promise<any>
}

export {
  IINPUT,
  IOUTPUT,
  IABIFunc,
  ITransOpt,
  ICallOpt,
  IContractCall,
  IEvent,
  IContractCallResult,
  IClause,
  IMethodsResult
};
