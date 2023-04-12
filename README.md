# SingularityNET token faucet

## How to receive AGIX or RJV tokens in testnet?
Connect your wallet to the test network and get >50 AGIX or RJV tokens 
You can request >50 AGIX or >50 RJV tokens every 1 hour or other time period.

- Symbol `AGIX`
- Decimals `8`

- Symbol `RJV`
- Decimals `6`

### Faucet token contract for each testnet
- [x] Goerli [0x19570fbC4e05940960b0A44C5f771008Af7935A2](https://goerli.etherscan.io/address/0x19570fbC4e05940960b0A44C5f771008Af7935A2) (LTS ending in dec 2023)
- [x] Sepolia - In develop   

## Development instructions
* Install [Node.js and npm](https://nodejs.org/)
* `npm install` to get dependencies
* `npm start` to serve the application locally and watch source files for modifications

### Deployment instructions
* `npm run deploy`; the target S3 Bucket for the deployment and its region are specified in a `config.json` file in the project root

### Additional commands
* `npm run build` to build the application to the `dist` directory
* `npm run clean` to empty the `dist` directory
