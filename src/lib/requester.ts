import request = require('request');
import Bluebird = require('bluebird');

export default class Requester {

  private host:string;
  private port:number;

  constructor(host:string,port:number){
    this.host=host;
    this.port=port;
  }

  async request(method:'GET'|'PUT'|'DELETE'|'POST',path:string,headers?:object|null,body?:object): Promise<any> {
    const options = {
      url: `${this.host}:${this.port}${path}`,
      method: method,
      headers: headers,
      body: body,
      json: true,
      timeout: 90000
    };
    console.debug(`url:${this.host}:${this.port}${path}`,`method:${method}`,`body:${JSON.stringify(body)}`);
    const response = await (Bluebird.promisify(request) as any)(options);
    if (response.statusCode !== 200) {
      console.debug('block chain rpc failed', response.body);
      throw new Error('block chain rpc failed');
    }
    return response.body;
  }

}