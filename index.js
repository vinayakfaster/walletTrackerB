const express = require("express");
const app = express();
const port = 5003;
const Moralis = require("moralis").default;
const cors = require("cors");
const { Web3 } = require('web3');
const axios = require('axios');
const bodyParser = require('body-parser');
const { keccak256 } = require('ethereumjs-util');
// const server = http.createServer(app);
const BN = require('bn.js');


// var web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws/v3/2cc6058ccf70433aa59dd3c00c2b38db')
var web3 = new Web3(Web3.givenProvider || 'wss://eth-mainnet.g.alchemy.com/v2/etLZkVptnKi5IlR_uj_v2jYt5JIZzCil')

var web3bsc = new Web3(Web3.givenProvider || 'wss://bsc-rpc.publicnode.com')

const { MongoClient } = require('mongodb');

require("dotenv").config({ path: ".env" });

app.use(cors());
app.use(express.json());

const http = require('http');
const WebSocket = require('ws');

// Create HTTP server
const server = app.listen(port, () => {
  console.log(`HTTP server is running on port ${port}`);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

var uniswapFactoryv2 = new web3.eth.Contract(
  [{ "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PairCreated", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "feeToSetter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "getPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "name": "setFeeToSetter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
);


var PancakeFactoryv2 = new web3bsc.eth.Contract(
  [{ "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PairCreated", "type": "event" }, { "constant": true, "inputs": [], "name": "INIT_CODE_PAIR_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "feeToSetter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "getPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "name": "setFeeToSetter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
  '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
);

app.get("/getwalletbalance", async (req, res) => {
  try {
    const { query } = req;
    const address = query.address;
    const response = await axios.get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`);
    const tokens = response.data.tokens;

    if (!tokens) {
      return res.status(200).json("NO token found in bsc");
    }

    const tokensArray = tokens.map(token => {
      const {
        tokenInfo: { address, name, symbol, totalSupply, holdersCount, decimals, price, image },
        balance,
        rawBalance
      } = token;

      return {
        address,
        name,
        symbol,
        totalSupply,
        holdersCount,
        decimals,
        price,
        image,
        balance,
        rawBalance
      };
    });

    // console.log(tokensArray);

    return res.status(200).json(tokensArray);
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json({ error: e.message });
  }
});

app.get("/getBscWalletBalance", async (req, res) => {
  try {
    const { query } = req;
    const address = query.address;
    const response = await axios.get(`https://api.binplorer.com/getAddressInfo/${address}?apiKey=freekey`);
    const tokens = response.data.tokens;

    if (!tokens) {
      return res.status(200).json("NO token found in bsc");
    }


    const tokensArray = tokens.map(token => {
      const {
        tokenInfo: { address, name, symbol, totalSupply, holdersCount, decimals, price, image },
        balance,
        rawBalance
      } = token;

      return {
        address,
        name,
        symbol,
        totalSupply,
        holdersCount,
        decimals,
        price,
        image,
        balance,
        rawBalance
      };
    });

    // console.log(tokensArray);

    return res.status(200).json(tokensArray);
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json({ error: e.message });
  }
});





const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithExponentialBackoff(requestFn, maxRetries = 10) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await requestFn();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const waitTime = Math.pow(2, retries) * 0.5000; // Exponential backoff
        console.log(`Rate limit exceeded. Retrying after ${waitTime} milliseconds...`);
        await delay(waitTime);
        retries++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries reached');
}











app.get("/gettokenPriceChange", async (req, res) => {
  try {
    const { query } = req;

    const contractAddresses = query.keys;

    if (!Array.isArray(contractAddresses)) {
      return res.status(400).json({ error: "contractAddresses must be an array" });
    }

    let token1 = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // change me!

    async function computePairAddress(token0, token1) {
      let pool_address = await uniswapFactoryv2.methods.getPair(token0, token1).call();

      if (pool_address === '0x0000000000000000000000000000000000000000') {
        try {
          token1 = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT address
          pool_address = await uniswapFactoryv2.methods.getPair(token0, token1).call();

          if (pool_address === '0x0000000000000000000000000000000000000000') {
            token1 = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // USDv address
            pool_address = await uniswapFactoryv2.methods.getPair(token0, token1).call();
          }
          if (pool_address === '0x0000000000000000000000000000000000000000') {
            const dexPairResponse = await retryWithExponentialBackoff(() => axios.get(`https://api.dexscreener.com/latest/dex/tokens/${token0}`));
            const dexPairData = dexPairResponse.data.pairs;

            if (dexPairData && dexPairData.length > 0) {
              for (const pair of dexPairData) {
                const pairAddress = pair.pairAddress;
                // console.log("dexscan pairAddress: ", pairAddress);

                if (pairAddress) {
                  pool_address = pairAddress;
                  break;
                }
              }
            } else {
              console.error("No data found in dexPairData BSC");
            }
          }
        } catch (error) {
          console.error("Error fetching dexPair BSC data:", error);
        }
      }
      return pool_address;
    }

    const pairAddressesPromises = contractAddresses.map(async (token0) => {
      return {
        address: token0,
        pairAddress: await computePairAddress(token0, token1)
      };
    });
    const pairAddresses = await Promise.all(pairAddressesPromises);

    const filteredPairAddresses = pairAddresses.filter(pair => pair.pairAddress !== '0x0000000000000000000000000000000000000000');

    const PCgeckoTerminalUrl = `https://api.geckoterminal.com/api/v2/networks/eth/pools/multi/`;

    const { responseData, pool_addressGeko } = await poolAddressGeko('ethereum', filteredPairAddresses);

    const pool_addressGekoChunks = chunk(pool_addressGeko, 9);

    const response_data = [];
    for (const chunk of pool_addressGekoChunks) {
      const pool_addressGekoString = chunk.join(',');
      const response = await axios.get(`${PCgeckoTerminalUrl}/${pool_addressGekoString}`);
      response_data.push(...response.data.data.map(item => {
        const pairAddress = item.id.replace('eth_', '');
        let address = '';
        if (item.relationships.base_token && item.relationships.base_token.data) {
          address = item.relationships.base_token.data.id.replace('eth_', '');
          fdv = item.attributes.fdv_usd;
        }
        return {
          ...item.attributes,
          pairAddress,
          address
        };
      }));
    }

    // console.log({ responseData, response_data });

    return res.status(200).json({ responseData, response_data });

  } catch (e) {
    console.log(`Something went wrong in eth ${e}`);
    return res.status(400).json();
  }
});

function chunk(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}





async function poolAddressGeko(network, filteredPairAddresses) {
  const responseData = [];
  const pool_addressGeko = [];
  const uniqueBaseTokenNames = new Set();

  const chunkSize = 30;
  const chunks = [];
  for (let i = 0; i < filteredPairAddresses.length; i += chunkSize) {
    chunks.push(filteredPairAddresses.slice(i, i + chunkSize));
  }

  try {
    for (const chunk of chunks) {
      const addressesArray = chunk.map(pair => pair.pairAddress);
      const addressesString = addressesArray.join(',');

      const dexScan = `https://api.dexscreener.com/latest/dex/pairs/${network}/${addressesString}`;

      const Dexresponse = await axios.get(dexScan, { timeout: 5000 });
      const data = Dexresponse.data;

      if (data && Array.isArray(data.pairs)) {
        for (const pair of data.pairs) {
          const { pairAddress, baseToken } = pair;
          const baseTokenName = baseToken.address;

          if (!uniqueBaseTokenNames.has(baseTokenName)) {
            uniqueBaseTokenNames.add(baseTokenName);

            responseData.push({
              pairAddress: pairAddress,
              address: baseTokenName,
              data: pair
            });
          }
        }


        const notFoundAddresses = chunk.filter(address => !responseData.some(pair => pair.address.includes(address.pairAddress)));
        pool_addressGeko.push(...notFoundAddresses.map(address => address.pairAddress));
        console.log("Not found addresses added to pool_addressGeko:", pool_addressGeko);
      } else {
        console.error("Unexpected response structure:", data);
      }
    }
  } catch (error) {
    console.error("Error fetching pair data:", error);
  }

  return { responseData, pool_addressGeko };
}

app.get("/getBscTokenPriceChange", async (req, res) => {
  try {
    const { query } = req;

    const contractAddresses = query.keys;

    // console.log(contractAddresses);

    if (!Array.isArray(contractAddresses)) {
      return res.status(400).json({ error: "contractAddresses must be an array" });
    }

    let token1 = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';

    async function computePairAddress(token0, token1) {
      let pool_address = await PancakeFactoryv2.methods.getPair(token0, token1).call();

      if (pool_address === '0x0000000000000000000000000000000000000000') {
        try {
          token1 = '0x55d398326f99059ff775485246999027b3197955'; // USDT address
          pool_address = await PancakeFactoryv2.methods.getPair(token0, token1).call();

          if (pool_address === '0x0000000000000000000000000000000000000000') {
            token1 = '0xe9e7cea3dedca5984780bafc599bd69add087d56'; // USDT address
            pool_address = await PancakeFactoryv2.methods.getPair(token0, token1).call();
          }
          if (pool_address === '0x0000000000000000000000000000000000000000') {
            const dexPairResponse = await retryWithExponentialBackoff(() => axios.get(`https://api.dexscreener.com/latest/dex/tokens/${token0}`));
            const dexPairData = dexPairResponse.data.pairs;

            if (dexPairData && dexPairData.length > 0) {
              for (const pair of dexPairData) {
                const pairAddress = pair.pairAddress;
                // console.log("dexscan pairAddress: ", pairAddress);

                if (pairAddress) {
                  pool_address = pairAddress;
                  break;
                }
              }
            } else {
              console.error("No data found in dexPairData BSC");
            }
          }
        } catch (error) {
          console.error("Error fetching dexPair BSC data:", error);
        }
      }
      return pool_address;
    }

    const pairAddressesPromises = contractAddresses.map(async (token0) => {
      return {
        address: token0,
        pairAddress: await computePairAddress(token0, token1)
      };
    });
    const pairAddresses = await Promise.all(pairAddressesPromises);

    const filteredPairAddresses = pairAddresses.filter(pair => pair.pairAddress !== '0x0000000000000000000000000000000000000000');

    const PCgeckoTerminalUrl = `https://api.geckoterminal.com/api/v2/networks/bsc/pools/multi/`;

    const { responseData, pool_addressGeko } = await poolAddressGeko('bsc', filteredPairAddresses);

    const pool_addressGekoChunks = chunk(pool_addressGeko, 29);

    const response_data = [];
    for (const chunk of pool_addressGekoChunks) {
      const pool_addressGekoString = chunk.join(',');
      const response = await axios.get(`${PCgeckoTerminalUrl}/${pool_addressGekoString}`);
      response_data.push(...response.data.data.map(item => {
        const pairAddress = item.id.replace('bsc_', '');
        let address = '';
        if (item.relationships.base_token && item.relationships.base_token.data) {
          address = item.relationships.base_token.data.id.replace('bsc_', '');
          fdv = item.attributes.fdv_usd;
        }
        return {
          ...item.attributes,
          pairAddress,
          address
        };
      }));
    }

    // console.log({ responseData, response_data });

    return res.status(200).json({ responseData, response_data });

  } catch (e) {
    console.log(`Something went wrong in bsc ${e}`);
    return res.status(400).json();
  }
});




const uri = "mongodb+srv://hijeckerg:zIkq47teWwjBwJwT@porfolio.yz2zjx0.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.get('/addWalletAddress', async (req, res) => {
  try {

    await client.connect();

    const database = client.db('porfolio');
    const collection = database.collection('user_wallets');

    const { address, newwallet } = req.query;

    const filter = { userAddress: address };

    const updateOperation = {
      $addToSet: { walletAddresses: newwallet },
      $setOnInsert: { timestamp: new Date() }
    };

    const options = { upsert: true };

    const result = await collection.updateOne(filter, updateOperation, options);

    res.status(201).json({ message: 'Wallet address added successfully' });
  } catch (error) {
    console.error('Error adding wallet address:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the MongoDB connection if needed
    // await client.close();
  }
});


app.get('/removeAddress', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('porfolio');
    const collection = database.collection('user_wallets');

    const { address, addressToRemove } = req.query;

    const filter = { userAddress: address };
    const document = await collection.findOne(filter);

    if (!document) {
      return res.status(404).json({ error: 'User address not found' });
    }

    const updatedAddresses = document.walletAddresses.filter(address => address !== addressToRemove);

    const updateDocument = {
      $set: { walletAddresses: updatedAddresses }
    };

    const result = await collection.updateOne(filter, updateDocument);

    res.status(200).json({ message: 'Address removed successfully' });
  } catch (error) {
    console.error('Error removing address:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the MongoDB connection
    // await client.close();
  }
});


app.get('/removeFavAddress', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('porfolio');
    const collection = database.collection('Fav_tokens');

    const { address, addressToRemove } = req.query;

    const updateResult = await collection.updateOne(
      { userAddress: address },
      { $pull: { tokens: { address: addressToRemove } } }
    );

    if (updateResult.modifiedCount === 0) {
      res.status(404).send('No token found with that address, or user not found.');
    } else {
      res.send('Token removed successfully');
    }
  } catch (error) {
    console.error('Failed to remove token address:', error);
    res.status(500).send('Error removing token from database');
  } finally {
    await client.close();
  }
});



app.get('/getWalletAddresses', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('porfolio');
    const collection = database.collection('user_wallets');

    const { address } = req.query;
    const document = await collection.findOne({ userAddress: address });

    if (!document) {
      return res.status(404).json({ message: 'User address not found' });
    }

    // console.log(document)


    res.status(200).json({
      message: 'Wallet addresses fetched successfully',
      walletAddresses: document.walletAddresses
    });
  } catch (error) {
    console.error('Error fetching wallet addresses:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
  }
});


app.get('/getFav', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('porfolio');
    const collection = database.collection('Fav_tokens');

    const { address } = req.query;

    const document = await collection.findOne({ userAddress: address });

    if (!document) {
      return res.status(404).json({ message: 'User address not found' });
    }

    console.log(document)

    res.status(200).json({
      message: 'Wallet addresses fetched successfully',
      tokens: document.tokens
    });
  } catch (error) {
    console.error('Error fetching wallet addresses:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
  }
});

// const bodyParser = require('body-parser');
app.get('/addFavToken', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('porfolio');
    const collection = database.collection('Fav_tokens');

    const { userAddress, tokenName, tokenAddress } = req.query;

    console.log(userAddress)

    if (!userAddress || !tokenName || !tokenAddress) {
      return res.status(400).json({ error: "Missing required query parameters (userAddress, tokenName, tokenAddress)" });
    }

    const filter = { userAddress };

    const updateOperation = {
      $addToSet: { tokens: { name: tokenName, address: tokenAddress } },
      $setOnInsert: { userAddress, timestamp: new Date() }
    };

    const options = { upsert: true };

    const result = await collection.updateOne(filter, updateOperation, options);

    if (result.upsertedCount > 0) {
      res.status(201).json({ message: 'Favorite token added successfully and new user created' });
    } else if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Favorite token updated successfully' });
    } else {
      res.status(200).json({ message: 'No changes made to the favorite tokens' });
    }
  } catch (error) {
    console.error('Error managing favorite tokens:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Ensure MongoDB connections are handled properly
    // await client.close();
  }
});


app.use(bodyParser.json());

const ERC20_ABI = [
  { "inputs": [{ "internalType": "uint256", "name": "maxSupply_", "type": "uint256" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "uint256", "name": "initialEmissionRate", "type": "uint256" }, { "internalType": "address", "name": "treasuryAddress_", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "masterShare", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "treasuryShare", "type": "uint256" }], "name": "AllocationsDistributed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ClaimMasterRewards", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "startTime", "type": "uint256" }], "name": "InitializeEmissionStart", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "masterAddress", "type": "address" }], "name": "InitializeMasterAddress", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "masterAllocation", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "treasuryAllocation", "type": "uint256" }], "name": "UpdateAllocations", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "previousEmissionRate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newEmissionRate", "type": "uint256" }], "name": "UpdateEmissionRate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "previousMaxSupply", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMaxSupply", "type": "uint256" }], "name": "UpdateMaxSupply", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "previousTreasuryAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newTreasuryAddress", "type": "address" }], "name": "UpdateTreasuryAddress", "type": "event" }, { "inputs": [], "name": "ALLOCATION_PRECISION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "BURN_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_EMISSION_RATE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY_LIMIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "claimMasterRewards", "outputs": [{ "internalType": "uint256", "name": "effectiveAmount", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "elasticMaxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emissionRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emitAllocations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "startTime", "type": "uint256" }], "name": "initializeEmissionStart", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "masterAddress_", "type": "address" }], "name": "initializeMasterAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "lastEmissionTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterAllocation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterEmissionRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterReserve", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasuryAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "treasuryAllocation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "masterAllocation_", "type": "uint256" }], "name": "updateAllocations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "emissionRate_", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "maxSupply_", "type": "uint256" }], "name": "updateMaxSupply", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "treasuryAddress_", "type": "address" }], "name": "updateTreasuryAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

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



  let intervalId = setInterval(async () => {
    let currentBlockNumber = BigInt(await web3.eth.getBlockNumber()) - BigInt(1);

    const latestBlockNumber = await web3.eth.getBlockNumber();

    // let currentBlockNumber = "19681464";

    // const latestBlockNumber = "19681465";

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

  ws.on('close', function () {
    console.log('Client disconnected, stopping interval.');
    clearInterval(intervalId);
  });
});



const getTransactionInfo = async (txHash) => {
  // console.log(txHash)
  try {
    const transaction = await web3.eth.getTransaction(txHash);
    if (!transaction) {
      console.error('Transaction not found');
      return null;
    }


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

        uniqueTokens[tokenAddressSymbol] = true;


        if (operation.type === 'transfer') {
          operationType = 'Transfer';
          operationDetail = `Transfer ${operation.value / (10 ** operation.tokenInfo.decimals)} ( ${operation.tokenInfo.address} ${operation.tokenInfo.symbol} ) from ${operation.from} to ${operation.to} `;
        } else if (operation.type === 'burn') {
          operationType = 'Burn';
          operationDetail = `Burn ${operation.value / (10 ** 18)} ${operation.tokenInfo.symbol} from ${operation.from}`;
        } else if (operation.type === 'issuance') {
          operationType = 'Issuance';
          operationDetail = `Issuance of ${operation.value / (10 ** 18)} ETH  to ${operation.tokenInfo.symbol}`;
          tokenIssuance = {
            tokenSymbol: operation.tokenInfo.symbol,
            tokenName: operation.tokenInfo.name,
            value: operation.value / (10 ** 18),
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
  const erc20BytecodePattern = '0x6060604052';

  try {
    const bytecode = await web3.eth.getCode(contractAddress);
    return bytecode.startsWith(erc20BytecodePattern);
  } catch (error) {
    console.error('Error checking ERC20 token contract:', error);
    return false;
  }
};



app.get("/getMyPosition", async (req, res) => {
  try {
    const { query } = req;
    const token = query.baseTokenAddress;

    let data = JSON.stringify({
      "query": `
        query ($address: String!) {
          EVM(dataset: archive, network: eth) {
            TokenHolders(
              date: "2024-02-03"
              tokenSmartContract: $address
              orderBy: { descending: Balance_Amount }
            ) {
              Holder {
                Address
              }
              Balance {
                Amount
              }
              Currency {
                Name
                Symbol
                SmartContract
              }
            }
          }
        }
      `,
      variables: {
        address: token
      }
    });


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://streaming.bitquery.io/graphql',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'BQYZtYVGHllQQdUM4S6tuT7pFu6Vl5Ys',
        'Authorization': 'Bearer ory_at_mk6Dn9Edj3TlyHbqGwMZZzfVZkFPqjcm-_5iBPnrcxA.E0OaDJYHOiARyJ6rkwQAYnjFqG-WN2-5DqkGh8k6jIA'
      },
      data: data
    };
    const response = await axios.request(config);
    const evmData = response.data?.data?.EVM;
    // console.log(response);


    return res.status(200).json({ evmData });
  } catch (e) {
    console.log(`Something went wrong getMyPosition${e}`);
    return res.status(400).json();
  }
});


app.get('/api/pools', async (req, res) => {
  try {
    const { addresses } = req.query;
    const addressChunks = chunkArray(addresses.split(','), 10);
    let allPools = [];

    for (const chunk of addressChunks) {
      const chunkedAddresses = chunk.join(",");
      const response = await axios.get(`https://api.geckoterminal.com/api/v2/networks/eth/tokens/multi/${chunkedAddresses}`);
      const tokens = response.data.data;

      tokens.forEach(token => {
        const idWithoutEthPrefix = token.id.replace('eth_', '');
        allPools.push(idWithoutEthPrefix);
      });
    }

    const addres = allPools.join(',');
    const poolResponse = await axios.get(`https://api.geckoterminal.com/api/v2/networks/eth/pools/multi/${addres}`);
    const pools = poolResponse.data.data;


    const tokenDetails = pools.map(pool => {
      const {
        id,
        attributes: {
          name,
          base_token_price_usd,
          quote_token_price_usd,
          pool_created_at,
          fdv_usd,
          market_cap_usd,
          price_change_percentage,
          transactions,
          volume_usd,
          reserve_in_usd
        },
        relationships: {
          base_token: { data: { id: baseTokenId } },
          quote_token: { data: { id: quoteTokenId } },
          dex: { data: { id: dexId } }
        }
      } = pool;


      const idWithoutEthPrefix = id.replace('eth_', '');
      const baseTokenIdWithoutEthPrefix = baseTokenId.replace('eth_', '');
      const quoteTokenIdWithoutEthPrefix = quoteTokenId.replace('eth_', '');
      const dexIdWithoutEthPrefix = dexId.replace('eth_', '');

      return {
        id: idWithoutEthPrefix,
        name,
        baseTokenId: baseTokenIdWithoutEthPrefix,
        quoteTokenId: quoteTokenIdWithoutEthPrefix,
        dexId: dexIdWithoutEthPrefix,
        base_token_price_usd,
        quote_token_price_usd,
        pool_created_at,
        fdv_usd,
        market_cap_usd,
        price_change_percentage,
        transactions,
        volume_usd,
        reserve_in_usd
      };
    });

    console.log(tokenDetails)
    res.json(tokenDetails);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


function chunkArray(array, size) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}


const erc20ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }

];

function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  } else {
    return value;
  }
}

app.get('/transfers', async (req, res) => {
  try {
    const { tokenAddress, walletAddress } = req.query;


    if (!tokenAddress || !walletAddress) {
      return res.status(400).json({ error: 'Both tokenAddress and walletAddress are required' });
    }

    const [firstTransfer, lastTransfer, lastBlock] = await getFirstAndLastTokenTransfers(walletAddress, tokenAddress);
    console.log('First transfer:', firstTransfer);
    console.log('Last transfer:', lastTransfer);
    console.log('lastBlock:', lastBlock);


    try {
      // const holderList = await getUniqueHoldersAndBalance(tokenAddress);

      return res.json({
        firstTransfer,
        lastTransfer,
        lastBlock,
        // holders: holderList
      });
    } catch (error) {
      console.error('Error fetching holders:', error);
      return res.status(500).json({ error: 'Internal server error while fetching holders' });
    }

  } catch (error) {
    console.error('Error fetching first and last transfers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  } else {
    return value;
  }
}




async function getFirstAndLastTokenTransfers(walletAddress, tokenAddress) {
  try {
    const erc20Contract = new web3.eth.Contract(erc20ABI, tokenAddress);

    const transferEvents = await erc20Contract.getPastEvents('Transfer', {
      filter: {
        to: walletAddress
      },
      fromBlock: 0
    });

    if (transferEvents.length === 0) {
      console.log('No transfer events found for the specified wallet.');
      return [];
    }


    const blockNumbers = transferEvents.map(event => event.blockNumber.toString());

    const [firstBlock, lastBlock] = await Promise.all([
      web3.eth.getBlock(blockNumbers[0]),
      web3.eth.getBlock(blockNumbers[blockNumbers.length - 1])
    ]);

    const convertToIST = (timestamp) => {
      return new Date(Number(timestamp) * 1000).toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata'
      });
    };

    const firstTransferInfo = {
      sender: transferEvents[0].returnValues.from,
      receiver: transferEvents[0].returnValues.to,
      amount: transferEvents[0].returnValues.value.toString(),
      timestamp: convertToIST(firstBlock.timestamp.toString())
    };

    const lastTransferInfo = {
      sender: transferEvents[transferEvents.length - 1].returnValues.from,
      receiver: transferEvents[transferEvents.length - 1].returnValues.to,
      amount: transferEvents[transferEvents.length - 1].returnValues.value.toString(),
      timestamp: convertToIST(lastBlock.timestamp.toString())
    };

    return [firstTransferInfo, lastTransferInfo, lastBlock.hash];
  } catch (error) {
    console.error('Error fetching first and last transfers:', error);
    return [];
  }
}

const ERC20ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "_from", "type": "address" },
      { "indexed": true, "name": "_to", "type": "address" },
      { "indexed": false, "name": "_value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  }
];
async function getUniqueHoldersAndBalance(contractAddress) {
  try {
    const tokenContract = new web3.eth.Contract(ERC20ABI, contractAddress);
    const events = await tokenContract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest'
    });

    const balances = {};

    events.forEach(event => {
      const from = event.returnValues._from;
      const to = event.returnValues._to;
      const value = new BN(event.returnValues._value);

      balances[from] = (balances[from] || new BN(0)).sub(value);
      balances[to] = (balances[to] || new BN(0)).add(value);
    });

    return Object.entries(balances)
      .filter(([_, balance]) => !balance.isZero())
      .map(([address, balance]) => ({
        address,
        balance: web3.utils.fromWei(balance.toString(), 'ether')
      }))
      .sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
  } catch (error) {
    console.error('Error fetching unique holders and balances:', error);
    throw error;
  }
}



app.get('/holders', async (req, res) => {
  const contractAddress = req.query.contractAddress;

  if (!contractAddress) {
    return res.status(400).json({ error: 'Contract address is required' });
  }

  try {
    const holderList = await getUniqueHoldersAndBalance(contractAddress);
    res.json(holderList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
