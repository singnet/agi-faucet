# AGI Faucet

## How to receive AGI tokens in testnet
Login using your GitHub account and input the Ethereum address where you want to receive the AGI token.  
You can request 1 AGI token every 24 hours.

- Symbol `AGI`
- Decimals `8`

### Token contracts for each testnet
- [x] Kovan [0x3b226ff6aad7851d3263e53cb7688d13a07f6e81](https://kovan.etherscan.io/token/0x3b226ff6aad7851d3263e53cb7688d13a07f6e81)   
- [ ] Rinkeby  
- [x] Ropsten [0xb97E9bBB6fd49865709d3F1576e8506ad640a13B](https://kovan.etherscan.io/token/0xb97E9bBB6fd49865709d3F1576e8506ad640a13B)


## Development instructions
* Install [Node.js and npm](https://nodejs.org/)
* `npm install` to get dependencies
* `npm start` to serve the application locally and watch source files for modifications

### Deployment instructions
* `npm run deploy`; the target S3 Bucket for the deployment and its region are specified in a `config.json` file in the project root

### Additional commands
* `npm run build` to build the application to the `dist` directory
* `npm run clean` to empty the `dist` directory
