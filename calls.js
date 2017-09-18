const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const mainContractName = 'CarLease';
const address = "0x6abb04620a197e1f78f974242b79a0dbb7b46ea2";
const contractSource = fs.readFileSync("contract/test.sol","utf8");
source = contractSource.toString().replace(/(\r\n|\n|\r)/gm,"");
const contractCompiled = solc.compile(source,1);

const abi = JSON.parse(contractCompiled.contracts[':' + mainContractName].interface);
const bytecode = "0x"+contractCompiled.contracts[':' + mainContractName].bytecode;

var options = {
	from: address,
	data: bytecode,
}

const contract = new web3.eth.Contract(abi,"0x97b839a5e8b907adf664a50981ad73ce8a708e9a",options);

var options1 = {
	data: bytecode,
	arguments: []
}

contract.methods.HelloWorld().call({from:address},function(err,result){
	console.log(result)
})
