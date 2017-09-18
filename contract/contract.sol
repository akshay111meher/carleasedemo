pragma solidity ^0.4.0;

contract CarLease {

    event Create(
        string V5cID
    );

    address Regulator;
    struct Car {
        string V5cID;
        uint VIN;
        string Make;
        string Model;
        string Color;
        string Reg;
        address Owner;
        bool Scrapped;
    }

    mapping(string => Car) Cars;
    mapping(address => string) Participant;
    
    string test;
    
    function CarLease(){
        Regulator = msg.sender;
        Participant[msg.sender] = "Regulator";
    }

    function addParticipant(address participant, string ParticipantType) onlyByRegulator(msg.sender) returns (bool) {
        Participant[participant] = ParticipantType;
        return true;
    }
    
    function getLatest() returns (address){
            return Cars[test].Owner;
    }

    function CreateCar(string V5cID, uint VIN, string Make, string Model, string Color, string Reg, address Owner) onlyByRegulator(msg.sender) returns (bool,string) {
        if(Cars[V5cID].Owner == 0x0000000000000000000000000000000000000000000){
            Car storage newCar = Cars[V5cID];
            newCar.V5cID = V5cID;
            newCar.VIN = VIN;
            newCar.Make = Make;
            newCar.Model = Model;
            newCar.Color = Color;
            newCar.Reg = Reg;
            newCar.Owner = Owner;
            newCar.Scrapped = false;
            test = V5cID;
            Create(V5cID);
            return (true,"NewCar Added");
        }else{
            return (false,"Already Exists");
        }
    }
    
    function getVehicle(string V5cID) returns (uint VIN, string Make, string Model, string Color, string Reg, address Owner, bool Scrapped){
        if(equal(Participant[msg.sender],"Regulator")){
            VIN = Cars[V5cID].VIN;
            Model = Cars[V5cID].Model;
            Color = Cars[V5cID].Color;
            Make = Cars[V5cID].Make;
            Reg = Cars[V5cID].Reg;
            Owner = Cars[V5cID].Owner;
            Scrapped = Cars[V5cID].Scrapped;
        }else if(equal(Participant[msg.sender],"Manufacturer") || equal(Participant[msg.sender],"Dealership") || equal(Participant[msg.sender],"Leasee") || equal(Participant[msg.sender],"Lease Company") || equal(Participant[msg.sender],"Scrap Merchant")){
            if(msg.sender == Cars[V5cID].Owner){
                VIN = Cars[V5cID].VIN;
                Model = Cars[V5cID].Model;
                Color = Cars[V5cID].Color;
                Make = Cars[V5cID].Make;
                Reg = Cars[V5cID].Reg;
                Owner = Cars[V5cID].Owner;
                Scrapped = Cars[V5cID].Scrapped;
            }            
        }
    }
    
    function updateVehicle(string V5cID, uint VIN, string Make, string Model, string Color, string Reg) onlyByOwner(Cars[V5cID].Owner) returns(bool,string){
        
        Car storage newCar = Cars[V5cID];
        
        if(equal(Participant[msg.sender],"Dealership") || equal(Participant[msg.sender],"Lease Company") || equal(Participant[msg.sender],"Leasee")){
            newCar.Color = Color;
            newCar.Reg = Reg;
            return (true,Participant[msg.sender]);
        }else if(equal(Participant[msg.sender],"Manufacturer")){
            newCar.VIN = VIN;
            newCar.Make = Make;
            newCar.Model = Model;
            newCar.Color = Color;
            newCar.Reg = Reg;
            return (true,Participant[msg.sender]);
        }else{
            newCar.Scrapped = true;
            return (true,"vehicle scrapped");
        }
    }
    
    function tranferVehicle(string V5cID, address newOwner) onlyByOwner(Cars[V5cID].Owner) returns (bool,string){
        Car storage newCar = Cars[V5cID];
        newCar.Owner = newOwner;
        return (true,Participant[newOwner]);
    }
    modifier onlyByRegulator(address _account) {
        require(Regulator == _account);
        _;
    }
    
    modifier onlyByOwner(address _account){
        require(_account == msg.sender);
        _;
    }
    
    function compare(string _a, string _b) private returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    
    function equal(string _a, string _b) private returns (bool) {
        return compare(_a, _b) == 0;
    }   
}