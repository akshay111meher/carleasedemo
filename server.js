'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    port: 8000 
});

const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const mainContractName = 'CarLease';
const address = "0x6abb04620a197e1f78f974242b79a0dbb7b46ea2";
const contractSource = fs.readFileSync("contract/contract.sol","utf8");
const source = contractSource.toString().replace(/(\r\n|\n|\r)/gm,"");
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

// Add the route
server.route({
    method: 'POST',
    path:'/createCar', 
    handler: function (request, reply) {
        let data = request.params;
        let V5cID = data.V5cID;
        let VIN = data.VIN;
        let Make = data.Make;
        let Model = data.Model;
        let Color = data.Red;
        let Reg = data.RegNumber;
        let Owner = data.Owner;   
        
        web3.eth.personal.unlockAccount(request.params.Address,request.params.Password,function(err,data){
            contract.methods.CreateCar(V5cID,VIN,Make,Model,Color,Reg,Owner).send({from:request.params.Address,gas:3000000},function(err,result){
                console.log(result)
                return reply(result)
            }).catch(function(err){
                return reply({status:"error"})
            })
        });
 
    }
});

server.route({
    method: 'POST',
    path:'/getCar', 
    handler: function (request, reply) {

        contract.methods.getVehicle(request.params.V5cID).send({from:request.params.Address,gas:3000000},function(err,result){
            console.log(result)
            return reply(result)
        })
    }
});

server.route({
    method: 'POST',
    path:'/createParticipant', 
    handler: function (request, reply) {

        web3.eth.personal.unlockAccount(request.params.Regulator,request.params.Password,function(err,data){
            contract.methods.addParticipant(request.params.Address,request.params.Participant).send({from:request.params.Regulator,gas:3000000},function(err,result){
                console.log(result);
                return reply(result);
            })
        });
        
    }
});

server.route({
    method: 'POST',
    path:'/transferCar', 
    handler: function (request, reply) {

        web3.eth.personal.unlockAccount(request.params.Owner,request.params.Password,function(err,data){
            contract.methods.tranferVehicle(request.params.V5cID,request.params.NewOwner).send({from:request.params.Owner,gas:3000000},function(err,result){
                console.log(result)
                return reply(result)
            });
        })

    }
});

server.route({
    method: 'POST',
    path:'/updateCar', 
    handler: function (request, reply) {
        let data = request.params;
        let V5cID = data.V5cID;
        let VIN = data.VIN;
        let Make = data.Make;
        let Model = data.Model;
        let Color = data.Red;
        let Reg = data.RegNumber;
        let Owner = data.Owner;

        web3.eth.personal.unlockAccount(Owner,request.params.Password,function(err,data){
            contract.methods.updateVehicle(V5cID,VIN,Make,Model,Color,Reg).send({from:Owner,gas:3000000},function(err,result){
                console.log(result)
                return reply(result)
            }).catch(function(err){
                return reply({status:"error"})
            })
        });
    }
});
// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});