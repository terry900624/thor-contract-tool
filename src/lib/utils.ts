
import createKeccakHash = require('keccak');
import {IABIFunc,IClause} from './interface';
import ethUtil = require('ethereumjs-util');

function makeHash(str:string):object{
  return createKeccakHash('keccak256').update(str).digest().toString('hex');
}

export let addressFromPriv = (privKey: string):string => {
  return '0x' + ethUtil.privateToAddress(new Buffer(privKey, 'hex')).toString('hex')
}   

function intrinsicGas(clauses:IClause[]) {
  const txGas = 5000;
  const clauseGas = 16000;
  const clauseGasContractCreation = 48000;
  if (clauses.length === 0)
      return txGas + clauseGas;
  return clauses.reduce((sum, c) => {
      if (c.to)
          sum += clauseGas;
      else
          sum += clauseGasContractCreation;
      sum += dataGas(Buffer.from(c.data.slice(2),'hex'));
      // console.log("dataGas:",dataGas(Buffer.from(c.data,'hex')));
      return sum;
  }, txGas);
}

function dataGas(data) {
  const zgas = 4;
  const nzgas = 68;
  return data.reduce((sum, cur) => {
      if (cur)
          return sum + nzgas;
      return sum + zgas;
  }, 0);
}

function makeABI(abi:IABIFunc[]){
  let abiFuncHash = {};
  for (let i = 0; i < abi.length; i++) {
    let inputStr: string = '';
    let inputArr: string[] = [];
    let abiFuncName: string = '';
    for (let j = 0; j < abi[i].inputs.length; j++) {
      inputArr.push(abi[i].inputs[j].type);
    }
    inputStr = inputArr.join(',');
    abiFuncName = `${abi[i].name}(${inputStr})`;
    abiFuncHash[abiFuncName] = {
      hash:makeHash(abiFuncName),
      isView: abi[i].stateMutability === 'view'
    };
  }
  return {abi,abiFuncHash};
}

function formatParam(param:string){
  let str = '';
  param.slice(0,2) === '0x'?(str=param.slice(2)):str=param;
  for(let i = str.length;i<64;i++){
    str = '0'+str;
  }
  return str;
}


export {
  intrinsicGas,
  makeABI,
  formatParam
}