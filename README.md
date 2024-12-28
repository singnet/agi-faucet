# SingularityNET Token Faucet

A web application for distributing testnet tokens (AGIX and RJV) to developers and testers on the Sepolia testnet.

## Table of Contents
1. [Introduction](#introduction)
2. [How to Receive Tokens](#how-to-receive-tokens)
3. [Supported Tokens](#supported-tokens)
4. [Faucet Contract Address](#faucet-contract-address)
5. [Development Instructions](#development-instructions)
6. [Deployment Instructions](#deployment-instructions)
7. [Additional Commands](#additional-commands)

---

## Introduction
The SingularityNET Token Faucet allows users to request testnet tokens (AGIX or RJV) on the Sepolia network. These tokens are essential for testing and development purposes.

Visit the live faucet application here:  
**[SingularityNET Faucet](https://faucet.singularitynet.io/)**

### Key Features
- Receive more than 1000 AGIX or RJV tokens every hour (or another configurable time period).
- Simple user interface for token requests.
- Easily configurable for further deployments.

---

## How to Receive Tokens
1. Connect your wallet to the Sepolia test network.
2. Visit the [faucet application](https://faucet.singularitynet.io/) and request tokens.
3. You can receive:
   - Over 1000 AGIX tokens.
   - Over 1000 RJV tokens.
4. Wait for the configured time period (e.g., 1 hour) to request again.

---

## Supported Tokens
| Token | Symbol | Decimals | Address                                                                                                     |
|-------|--------|----------|-------------------------------------------------------------------------------------------------------------|
| AGIX  | `AGIX` | 8        | [0xf703b9aB8931B6590CFc95183be4fEf278732016](https://sepolia.etherscan.io/address/0xf703b9aB8931B6590CFc95183be4fEf278732016) |
| RJV   | `RJV`  | 6        | [0x0d5585ba627146bd27081099c75260da7086f682](https://sepolia.etherscan.io/token/0x0d5585ba627146bd27081099c75260da7086f682) |

---

## Faucet Contract Address
| Network | Address                                                                                                       |
|---------|---------------------------------------------------------------------------------------------------------------|
| Sepolia | [0xB6E2421746BF4c5d941755c6272F9f2661282F78](https://sepolia.etherscan.io/address/0xB6E2421746BF4c5d941755c6272F9f2661282F78) |

---

## Development Instructions
1. Install [Node.js and npm](https://nodejs.org/).
2. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/singnet/agi-faucet.git
   cd agi-faucet
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application locally and watch for source file modifications:
   ```bash
   npm start
   ```

---

## Deployment Instructions
1. Run the deployment script:
   ```bash
   npm run deploy
   ```
2. Deployment targets are configured in the `config.json` file located in the project root. Ensure the S3 bucket and region settings are correctly specified.

---

## Additional Commands
- **Build the application for production**:
  ```bash
  npm run build
  ```
  This will create a production-ready build in the `dist` directory.

- **Clean the build directory**:
  ```bash
  npm run clean
  ```
  This will remove all files from the `dist` directory.
