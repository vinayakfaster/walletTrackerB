const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Web3 } = require('web3');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require("cors");
// MongoDB connection URI
const uri = "mongodb+srv://hijeckerg:zIkq47teWwjBwJwT@porfolio.yz2zjx0.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON body
app.use(bodyParser.json());


// app.use(express.json());
// Connect to Ethereum node
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/40d778647310471ea8e99fd4b2039d40');
// const web3 = new Web3('wss://linea-goerli.infura.io/ws/v3/e322c092fbcb4b21ba721fabb6134d7c');

// Array of addresses to monitor
// const addresses = ['0x1Df2ce7EE67B94de3F8abD206d7FE748Fe352b1E', '0xa83114A443dA1CecEFC50368531cACE9F37fCCcb'];


const ERC20_ABI = [
  { "inputs": [{ "internalType": "uint256", "name": "maxSupply_", "type": "uint256" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "uint256", "name": "initialEmissionRate", "type": "uint256" }, { "internalType": "address", "name": "treasuryAddress_", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "masterShare", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "treasuryShare", "type": "uint256" }], "name": "AllocationsDistributed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ClaimMasterRewards", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "startTime", "type": "uint256" }], "name": "InitializeEmissionStart", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "masterAddress", "type": "address" }], "name": "InitializeMasterAddress", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "masterAllocation", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "treasuryAllocation", "type": "uint256" }], "name": "UpdateAllocations", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "previousEmissionRate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newEmissionRate", "type": "uint256" }], "name": "UpdateEmissionRate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "previousMaxSupply", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMaxSupply", "type": "uint256" }], "name": "UpdateMaxSupply", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "previousTreasuryAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newTreasuryAddress", "type": "address" }], "name": "UpdateTreasuryAddress", "type": "event" }, { "inputs": [], "name": "ALLOCATION_PRECISION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "BURN_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_EMISSION_RATE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY_LIMIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "claimMasterRewards", "outputs": [{ "internalType": "uint256", "name": "effectiveAmount", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "elasticMaxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emissionRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emitAllocations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "startTime", "type": "uint256" }], "name": "initializeEmissionStart", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "masterAddress_", "type": "address" }], "name": "initializeMasterAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "lastEmissionTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterAllocation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterEmissionRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterReserve", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasuryAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "treasuryAllocation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "masterAllocation_", "type": "uint256" }], "name": "updateAllocations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "emissionRate_", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "maxSupply_", "type": "uint256" }], "name": "updateMaxSupply", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "treasuryAddress_", "type": "address" }], "name": "updateTreasuryAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];



// const addresses = [];

let addresses = []

wss.on('connection', async (ws) => {
  console.log('Client connected');



  ws.on('message', async function incoming(message) {
    const data = JSON.parse(message);
    if (data.type === 'address') {
      const address = data.data;
      console.log('Received wallet addresses:', address);
      await client.connect();

      const database = client.db('porfolio');
      const collection = database.collection('user_wallets');

      // Use findOne to fetch a single document
      const document = await collection.findOne({ userAddress: address });

      if (!document) {
          return res.status(404).json({ message: 'User address not found' });
      }

      console.log(document)


        const walletAddresses = document.walletAddresses;

      addresses = walletAddresses;
   
  
    }
  });

  

setInterval(async () => {
  let currentBlockNumber = BigInt(await web3.eth.getBlockNumber()) - BigInt(1);

  const latestBlockNumber = await web3.eth.getBlockNumber();

  // let currentBlockNumber = "19612592";

  // const latestBlockNumber = "19612593";

  if (latestBlockNumber > currentBlockNumber) {
    console.log('executing...')

    ws.send(JSON.stringify({ type: 'MonitorAddress', walletAddresses: addresses }));

    for (let i = Number(currentBlockNumber) + 1; i <= Number(latestBlockNumber); i++) {
      const block = await web3.eth.getBlock(i, true);
      ws.send(JSON.stringify({ type: 'blockNumber', blockNumber: block.number.toString() }));
      if (block && block.transactions) {
        for (const tx of block.transactions) {
          // console.log("tx"+ tx.hash);
          
          for (const address of addresses) {
            if (
              (tx.from && tx.from.toLowerCase() === address.toLowerCase()) ||
              (tx.to && tx.to.toLowerCase() === address.toLowerCase())
            ) {
              console.log(`Transaction involving address ${address}:`, tx.hash);
              
              getTransactionInfo(tx.hash).then((txInfo) => {
                console.log(txInfo);

                // ws.send(JSON.stringify({ type: 'transaction', transactionData: serializeTransaction(tx) }));
                ws.send(JSON.stringify({ type: 'transaction', transactionData: txInfo }));
              });

            }
          }
        }
      }
    }
    currentBlockNumber = latestBlockNumber;
  }
  }, 12000);
});



const getTransactionInfo = async (txHash) => {
  // console.log(txHash)
  try {
    const transaction = await web3.eth.getTransaction(txHash);
    if (!transaction) {
      console.error('Transaction not found');
      return null;
    }

    // Check if the transaction involves a token transfer
    let tokenSymbol = '';

    let isTokenTransfer = false;
    let transactionAction = '';
    let ContractName = '';
    if (transaction.input !== '0x') {
      const contractAddress = transaction.to;
      const isERC20 = await isERC20TokenContract(contractAddress);

      console.log("isErc20" + isERC20);

      if (isERC20) {

        const contract = new web3.eth.Contract(ERC20_ABI, contractAddress);
       
        try {
        tokenSymbol = await contract.methods.symbol().call();
        
        const txData = await getTransactionData(txHash);
        // console.log(txData);
      
        transactionAction = txData.formattedOperations;

        isTokenTransfer = true;  
        } catch (error) {
          console.error('Error getting formattedOperations:', error);
        }
      } else {   
        // const OtherContract = new web3.eth.Contract(OtherContract_ABI, contractAddress);

        // ContractName = await OtherContract.methods.name().call();

        ContractName = 'Other'
        console.log(ContractName)

        const txData = await getTransactionData(txHash);
      
        transactionAction = txData.formattedOperations;  
    } 

    }

    return {
      hash: transaction.hash,
      from: transaction.from,
      to: transaction.to,
      value: web3.utils.fromWei(transaction.value, 'ether'),
      tokenSymbol: tokenSymbol || ContractName,
      transactionAction: transactionAction,
      blockNumber: transaction.blockNumber.toString(),
      isTokenTransfer,
    };
  } catch (error) {
    console.error('Error fetching transaction info:', error);
    return null;
  }
};

const getTransactionData = async (txHash) => {
  try {
    const response = await axios.get(`https://api.ethplorer.io/getTxInfo/${txHash}?apiKey=freekey`);
    const data = response.data;

    let formattedOperations = [];
    let tokenIssuance = null;
    let uniqueTokens = {};

    if (data.success) {
      data.operations.forEach((operation) => {
        let operationType = '';
        let operationDetail = '';

        let tokenAddressSymbol = `${operation.tokenInfo.address} ${operation.tokenInfo.symbol}`;

        // Add unique token address and symbol to the object
        uniqueTokens[tokenAddressSymbol] = true;


        if (operation.type === 'transfer') {
          operationType = 'Transfer';
          operationDetail = `Transfer ${operation.value / (10 ** 18)} ( ${operation.tokenInfo.address} ${operation.tokenInfo.symbol} ) from ${operation.from} to ${operation.to}`;
        } else if (operation.type === 'burn') {
          operationType = 'Burn';
          operationDetail = `Burn ${operation.value  / (10 ** 18)} ${operation.tokenInfo.symbol} from ${operation.from}`;
        } else if (operation.type === 'issuance') {
          operationType = 'Issuance';
          operationDetail = `Issuance of ${operation.value / (10 ** 18) } ETH  to ${operation.tokenInfo.symbol}`;
          tokenIssuance = {
            tokenSymbol: operation.tokenInfo.symbol,
            tokenName: operation.tokenInfo.name,
            value: operation.value / (10 ** 18), // Adjust for token decimals
          };
        }
        const formattedOperation = {
          timestamp: operation.timestamp,
          type: operationType,
          detail: operationDetail,
          uniqueTokenAddressesSymbols: Object.keys(uniqueTokens)
        };
        formattedOperations.push(formattedOperation);

      });
    }

    console.log(formattedOperations);
    return { formattedOperations, tokenIssuance };
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    return null;
  }
};

const isERC20TokenContract = async (contractAddress) => {
  // ERC20 bytecode pattern
  const erc20BytecodePattern = '0x6060604052';

  try {
    const bytecode = await web3.eth.getCode(contractAddress);
    return bytecode.startsWith(erc20BytecodePattern);
  } catch (error) {
    console.error('Error checking ERC20 token contract:', error);
    return false;
  }
};




server.listen(8000, () => {
  console.log('WebSocket server listening on port 8000');
});
