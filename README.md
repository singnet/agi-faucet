# AGI Faucet

## How to receive AGI tokens in testnet
Login using your GitHub account and input the Ethereum address where you want to receive the AGI token.  
You can request 10 AGI token every 24 hours.

- Symbol `AGIX`
- Decimals `8`

### Token contracts for each testnet
- [x] Kovan [0x20802d1a9581b94e51db358C09e0818d6bd071b4](https://kovan.etherscan.io/token/0x20802d1a9581b94e51db358C09e0818d6bd071b4)    
- [x] Ropsten [0xA1e841e8F770E5c9507E2f8cfd0aA6f73009715d](https://ropsten.etherscan.io/token/0xA1e841e8F770E5c9507E2f8cfd0aA6f73009715d)   

## Development instructions
* Install [Node.js and npm](https://nodejs.org/)
* `npm install` to get dependencies
* `npm start` to serve the application locally and watch source files for modifications

### Deployment instructions
* `npm run deploy`; the target S3 Bucket for the deployment and its region are specified in a `config.json` file in the project root

### Additional commands
* `npm run build` to build the application to the `dist` directory
* `npm run clean` to empty the `dist` directory
