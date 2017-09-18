# Preface

This challenge is designed to evaluate Solidity development skills. 
A candidate should be able to complete this challenge in two to three days.
It covers the entirety of skills needed to build real world Ethereum blockchain applications.

# Toolset

* [testrpc](https://github.com/ethereumjs/testrpc)
* [truffle](http://truffleframework.com/)
* [truffle box: react-auth or react-uport](http://truffleframework.com/boxes/)

# Challenge

This challenge is based on the deprecated Car Lease demo by the 
[Hyperledger Foundation](https://github.com/IBM-Blockchain-Archive/car-lease-demo) for Fabric.

## Car Lease

This application is designed to demonstrate how assets can be modeled on the Blockchain using a car 
leasing scenario. In the scenario vehicles are modeled using Blockchain technology with the following attributes:

| Attribute       | Type                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| V5cID           | Unique string formed of two chars followed by a 7 digit int, used as the key to identify the vehicle  |
| VIN             | 15 digit int                                                                                          |
| Make            | String                                                                                                |
| Model           | String                                                                                                |
| Colour          | String                                                                                                |
| Reg             | String                                                                                                |
| Owner           | Identity of participant                                                                               |
| Scrapped        | Boolean                                                                                               |
| Status          | Int between 0 and 4                                                                                   |

The application shoul be designed to allow participants to interact with the vehicle assets creating, updating and transferring them as 
their permissions allow. The participants included in the application are as follows:

| Participant    | Permissions                                                          |
| -------------- | ---------------------------------------------------------------------|
| Regulator      | Create, Read (All vehicles), Transfer                                |
| Manufacturer   | Read (Own vehicles), Update (VIN, Make, Model, Colour, Reg), Transfer|
| Dealership     | Read (Own vehicles), Update (Colour, Reg), Transfer                  |
| Lease Company  | Read (Own vehicles), Update (Colour, Reg), Transfer                  |
| Leasee         | Read (Own vehicles), Update (Colour, Reg), Transfer                  |
| Scrap Merchant | Read (Own vehicles), Scrap                                           |

The demonstration allows a single user of each of these roles to log in, see the cars in the
state they are able to manage, and allows the user to prfrom the actions allowed to for their role.

To see how it works, you can look at the demo by IBM: https://www.youtube.com/watch?v=IgNfoQQ5Reg

Design is not important, but if you can make it look presentable, that is a bonus point.