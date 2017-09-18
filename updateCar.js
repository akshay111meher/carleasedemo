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
contract.methods.updateVehicle("MC12344",1234,"Mercedes","Model 1","Green","NewRegNumber").send({from:"0x317c7b3f7dbbe277a10aa019a02285f5df90dcd9",gas:3000000},function(err,result){
	console.log(result)
})

// string V5cID, uint VIN, string Make, string Model, string Color, string Reg