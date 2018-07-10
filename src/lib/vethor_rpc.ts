
// import BigNumber = require('bignumber.js');
import Requester from './requester';
import {IContractCall,IContractCallResult} from './interface';


export default class VeThorRPC {

  private vethorRequester: Requester;

  constructor(host = 'http://127.0.0.1', port = 8669) {
    this.vethorRequester = new Requester(host, port);
  }

  async getBlock(revision: string | number): Promise<any> {
    return await this.vethorRequester.request('GET', `/blocks/${revision}`);
  }

  async getCode(address:string,revision: string | number): Promise<any>{
    let query = '';
    if(revision) query = `?revision=${revision}`;
    return await this.vethorRequester.request('GET', `/blocks/${address}/code${query}`);
  }

  async getTransaction(txID: string,revision: string | number): Promise<any> {
    let query = '';
    if(revision) query = `?revision=${revision}`;
    return await this.vethorRequester.request('GET', `/transactions/${txID}${query}`);
  }

  async getTransactionReceipt(txID: string,revision: string | number): Promise<any> {
    let query = '';
    if(revision) query = `?revision=${revision}`;
    return await this.vethorRequester.request('GET', `/transactions/${txID}/receipt${query}`);
  }

  async getAccount(address: string, revision: string | number): Promise<any> {
    let query = '';
    if(revision) query = `?revision=${revision}`;
    return await this.vethorRequester.request('GET', `/accounts/${address}${query}`);
  }

  async postAccount(address: string, revision: string | number, body: IContractCall): Promise<IContractCallResult> {
    let query = '';
    if(revision) query = `?revision=${revision}`;
    return await this.vethorRequester.request('POST', `/accounts/${address}${query}`, null, body);
  }

  async postTransaction(raw: string): Promise<any> {
    return await this.vethorRequester.request('POST', `/transactions`, null, { raw });
  }

}