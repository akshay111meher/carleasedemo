const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const mainContractName = 'Test';
const address = "0x6abb04620a197e1f78f974242b79a0dbb7b46ea2";
const contractSource = fs.readFileSync("contract/test.sol");
source = contractSource.toString().replace(/(\r\n|\n|\r)/gm,"");
const contractCompiled = solc.compile(source,1);

const abi = JSON.parse(contractCompiled.contracts[':' + mainContractName].interface);
const bytecode = "0x"+contractCompiled.contracts[':' + mainContractName].bytecode;
web3.eth.personal.unlockAccount(address,"akshay")
var options = {
	from: address,
	data: bytecode,
}

const contract = new web3.eth.Contract(abi,"0x97b839a5e8b907adf664a50981ad73ce8a708e9a",options);

var options1 = {
	data: bytecode,
	arguments: []
}

// contract.deploy(options1)
// 		.send({
// 		    from: address,
// 		    gas: 1500000,
// 		    gasPrice: '30000000000000'
// 		}, function(error, transactionHash){ 
// 			console.log(transactionHash)
// 		})

contract.methods.HelloWorld().call({from:address},function(err,result){
	console.log(result)
})
