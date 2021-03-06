const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const mainContractName = 'CarLease';
const address = "0x6abb04620a197e1f78f974242b79a0dbb7b46ea2";
const contractSource = fs.readFileSync("contract/contract.sol","utf8");
source = contractSource.toString().replace(/(\r\n|\n|\r)/gm,"");
const contractCompiled = solc.compile(source,1);

const abi = JSON.parse(contractCompiled.contracts[':' + mainContractName].interface);
const bytecode = "0x"+contractCompiled.contracts[':' + mainContractName].bytecode;

var options = {
	from: address,
	data: bytecode,
}

const contract = new web3.eth.Contract(abi,"0x3dea5d469812ffc92d7cdf6564e29f56c69edf30",options);

var options1 = {
	data: bytecode,
	arguments: []
}

// console.log(web3.utils)
contract.methods.addParticipant("0x59384c39f948a3069452f43fba560ab0b72e9f20","Manufacturer").send({from:address,gas:3000000},function(err,result){
	console.log(result)
})

contract.methods.addParticipant("0x317c7b3f7dbbe277a10aa019a02285f5df90dcd9","Dealership").send({from:address,gas:3000000},function(err,result){
	console.log(result)
})

contract.methods.addParticipant("0x7897d7c52908869635e91e25ebfb0cf874503c67","Leasee").send({from:address,gas:3000000},function(err,result){
	console.log(result)
})

contract.methods.addParticipant("0xdf6a9bf0f83544f642caaa655f2804b17a20ad5b","Lease Company").send({from:address,gas:3000000},function(err,result){
	console.log(result)
})

contract.methods.addParticipant("0x54d6246a79191c458074c6c5fe5e7582f9e78a88","Scrap Merchant").send({from:address,gas:3000000},function(err,result){
	console.log(result)
})
