#!/usr/bin/env node
"use strict";

import replx = require("repl-x");
import {Contract,VeThorRPC} from "../src";

/*
// Energy test
let config = {
  RPC_HOST:"http://localhost",
  RPC_PORT:8669,
  ENERGY_ABI:[{'constant':true,'inputs':[],'name':'name','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':false,'inputs':[{'name':'_spender','type':'address'},{'name':'_value','type':'uint256'}],'name':'approve','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'totalSupply','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_from','type':'address'},{'name':'_to','type':'address'},{'name':'_amount','type':'uint256'}],'name':'transferFrom','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'decimals','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':true,'inputs':[{'name':'_owner','type':'address'}],'name':'balanceOf','outputs':[{'name':'balance','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'symbol','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':false,'inputs':[{'name':'_to','type':'address'},{'name':'_amount','type':'uint256'}],'name':'transfer','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'totalBurned','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'_owner','type':'address'},{'name':'_spender','type':'address'}],'name':'allowance','outputs':[{'name':'remaining','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'anonymous':false,'inputs':[{'indexed':true,'name':'_from','type':'address'},{'indexed':true,'name':'_to','type':'address'},{'indexed':false,'name':'_value','type':'uint256'}],'name':'Transfer','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'_owner','type':'address'},{'indexed':true,'name':'_spender','type':'address'},{'indexed':false,'name':'_value','type':'uint256'}],'name':'Approval','type':'event'}],
  ENERGY_ADDR:'0x0000000000000000000000000000456e65726779'
};

let vethorRPC = new VeThorRPC(config.RPC_HOST,config.RPC_PORT);
let energyContract = new Contract(vethorRPC,config.ENERGY_ADDR,config.ENERGY_ABI);

let amount = 1000000;
let address = '0x47109a193c49862c89bd76fe2de3585743dd2bb0'; //test address
let privKey = 'c8c53657e41a8d669349fc287f57457bd746cb1fcfc38cf94d235deb2cfca81b'; //test privkey

let test = async function(){
  let data = energyContract.makeData('transfer(address,uint256)',[address,amount.toString(16)]);
  energyContract.sendTransaction([{
    to:config.ENERGY_ADDR,
    data:data,
    value:'0x0'
  }],privKey);
  
  let ret = await energyContract.methods('transfer(address,uint256)').send([address,amount.toString(16)],privKey);
  console.log("ret:",ret);
  let balance =  await energyContract.methods('balanceOf(address)').call([address],'best');
  console.log("balance:",balance);
}

test();
*/

replx.start({ prompt: "Contract# " }, () => {
  return {
    Contract,
    VeThorRPC
  };
});
