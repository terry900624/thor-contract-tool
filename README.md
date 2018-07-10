## vethor-contract


## Install

```

```

## Usage

``` js
import {Contract,VeThorRPC} from "vethor-contract";

Energy test
let config = {
  RPC_HOST:"http://localhost",
  RPC_PORT:8669,
  ENERGY_ABI:[{'constant':true,'inputs':[],'name':'name','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':false,'inputs':[{'name':'_spender','type':'address'},{'name':'_value','type':'uint256'}],'name':'approve','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'totalSupply','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_from','type':'address'},{'name':'_to','type':'address'},{'name':'_amount','type':'uint256'}],'name':'transferFrom','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'decimals','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':true,'inputs':[{'name':'_owner','type':'address'}],'name':'balanceOf','outputs':[{'name':'balance','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'symbol','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'pure','type':'function'},{'constant':false,'inputs':[{'name':'_to','type':'address'},{'name':'_amount','type':'uint256'}],'name':'transfer','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'totalBurned','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'_owner','type':'address'},{'name':'_spender','type':'address'}],'name':'allowance','outputs':[{'name':'remaining','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'anonymous':false,'inputs':[{'indexed':true,'name':'_from','type':'address'},{'indexed':true,'name':'_to','type':'address'},{'indexed':false,'name':'_value','type':'uint256'}],'name':'Transfer','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'_owner','type':'address'},{'indexed':true,'name':'_spender','type':'address'},{'indexed':false,'name':'_value','type':'uint256'}],'name':'Approval','type':'event'}],
  ENERGY_ADDR:'0x0000000000000000000000000000456e65726779'
};

let vethorRPC = new VeThorRPC(config.RPC_HOST,config.RPC_PORT);
let energyContract = new Contract(vethorRPC,config.ENERGY_ADDR,config.ENERGY_ABI);

let amount = 1000000;
let data = energyContract.makeData('transfer(address,uint256)',['0xd3ae78222beadb038203be21ed5ce7c9b1bff602',amount.toString(16)]);

let test = async function(){
  energyContract.sendTransaction([{
    to:config.ENERGY_ADDR,
    data:data,
    value:'0x0'
  }],'dce1443bd2ef0c2631adc1c67e5c93f13dc23a41c18b536effbbdcbcdb96fb65');
  
  await energyContract.send('transfer(address,uint256)',['0xd3ae78222beadb038203be21ed5ce7c9b1bff602',amount.toString(16)],'dce1443bd2ef0c2631adc1c67e5c93f13dc23a41c18b536effbbdcbcdb96fb65');
  
  let balance = await energyContract.call('balanceOf(address)',['0xd3ae78222beadb038203be21ed5ce7c9b1bff602'],'best')

  let ret = await energyContract.methods('transfer(address,uint256)').send(['0xd3ae78222beadb038203be21ed5ce7c9b1bff602',amount.toString(16)],'dce1443bd2ef0c2631adc1c67e5c93f13dc23a41c18b536effbbdcbcdb96fb65');
  console.log("ret:",ret);
  balance =  await energyContract.methods('balanceOf(address)').call(['0xd3ae78222beadb038203be21ed5ce7c9b1bff602'],'best');
  console.log("balance:",balance);
}

test();
```
