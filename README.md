## vethor-contract


## Install

```

```

## Usage

### Energy Test

``` js
import {Contract,VeThorRPC} from "vethor-contract";

let config = {
  RPC_HOST:"http://localhost",
  RPC_PORT:8669,
  ENERGY_ABI:[{'constant':true,'inputs':[],'name':'name','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':false,'inputs':[{'name':'_spender','type':'address'},{'name':'_value','type':'uint256'}],'name':'approve','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'totalSupply','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_from','type':'address'},{'name':'_to','type':'address'},{'name':'_amount','type':'uint256'}],'name':'transferFrom','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'decimals','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':true,'inputs':[{'name':'_owner','type':'address'}],'name':'balanceOf','outputs':[{'name':'balance','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'symbol','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':false,'inputs':[{'name':'_to','type':'address'},{'name':'_amount','type':'uint256'}],'name':'transfer','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'totalBurned','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'_owner','type':'address'},{'name':'_spender','type':'address'}],'name':'allowance','outputs':[{'name':'remaining','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'anonymous':false,'inputs':[{'indexed':true,'name':'_from','type':'address'},{'indexed':true,'name':'_to','type':'address'},{'indexed':false,'name':'_value','type':'uint256'}],'name':'Transfer','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'_owner','type':'address'},{'indexed':true,'name':'_spender','type':'address'},{'indexed':false,'name':'_value','type':'uint256'}],'name':'Approval','type':'event'}],
  ENERGY_ADDR:'0x0000000000000000000000000000456e65726779'
};

let vethorRPC = new VeThorRPC(config.RPC_HOST,config.RPC_PORT);
let energyContract = new Contract(vethorRPC,config.ENERGY_ADDR,config.ENERGY_ABI);

let amount = 1000000;
let address = 'test account adddress';
let privKey = 'test privKey';


let test = async function(){
  let data = energyContract.makeData('transfer(address,uint256)',[address,amount.toString(16)]);
  await energyContract.sendTransaction([{
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
```
