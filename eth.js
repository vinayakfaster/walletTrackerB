const express = require("express");
const app = express();
const port = 5002;
const cors = require("cors");
const axios = require('axios');
app.use(cors());
app.use(express.json());


const { Web3 } = require('web3');

var web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws/v3/bb387f7eac8c49c6a1af5adc2406a01f')

const tokenABI = [
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }
];
const ERC20_ABI = [
  { "inputs": [{ "internalType": "uint256", "name": "maxSupply_", "type": "uint256" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "uint256", "name": "initialEmissionRate", "type": "uint256" }, { "internalType": "address", "name": "treasuryAddress_", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "masterShare", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "treasuryShare", "type": "uint256" }], "name": "AllocationsDistributed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ClaimMasterRewards", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "startTime", "type": "uint256" }], "name": "InitializeEmissionStart", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "masterAddress", "type": "address" }], "name": "InitializeMasterAddress", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "masterAllocation", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "treasuryAllocation", "type": "uint256" }], "name": "UpdateAllocations", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "previousEmissionRate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newEmissionRate", "type": "uint256" }], "name": "UpdateEmissionRate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "previousMaxSupply", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMaxSupply", "type": "uint256" }], "name": "UpdateMaxSupply", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "previousTreasuryAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newTreasuryAddress", "type": "address" }], "name": "UpdateTreasuryAddress", "type": "event" }, { "inputs": [], "name": "ALLOCATION_PRECISION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "BURN_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_EMISSION_RATE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY_LIMIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "claimMasterRewards", "outputs": [{ "internalType": "uint256", "name": "effectiveAmount", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "elasticMaxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emissionRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emitAllocations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "startTime", "type": "uint256" }], "name": "initializeEmissionStart", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "masterAddress_", "type": "address" }], "name": "initializeMasterAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "lastEmissionTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterAllocation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterEmissionRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterReserve", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasuryAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "treasuryAllocation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "masterAllocation_", "type": "uint256" }], "name": "updateAllocations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "emissionRate_", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "maxSupply_", "type": "uint256" }], "name": "updateMaxSupply", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "treasuryAddress_", "type": "address" }], "name": "updateTreasuryAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];


app.get("/getweb3data", async (req, res) => {
  const { query } = req;
  const tokenContractAddress = query.baseTokenAddress;
  // const tokenContractAddress = "0x3005003BDA885deE7c74182e5FE336e9E3Df87bB";
  const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

  const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
console.log(formattedDate);

  try {
    const tokenName = await tokenContract.methods.name().call();
    console.log('Token Name:', tokenName);

    const tokenSymbol = await tokenContract.methods.symbol().call();
    console.log('Token Symbol:', tokenSymbol);

    const totalSupply = await tokenContract.methods.totalSupply().call();
    console.log('Total Supply:', totalSupply);

    const totalSupplyString = totalSupply.toString();

    var factoryV3 = new web3.eth.Contract(
      [{ "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PairCreated", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "feeToSetter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "getPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "name": "setFeeToSetter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
    );
    var pool_address = await factoryV3.methods.getPair(tokenContractAddress, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2').call();

    console.log(pool_address);

    // Check if the pool_address is 0x0000000000...
    if (pool_address.toLowerCase() === '0x0000000000000000000000000000000000000000') {
      let data = JSON.stringify({
        "query": `
          query ($network: evm_network!, $baseCurrency: String!, $limit: Int, $quoteCurrency: String!, $from: String, $till: String) {
            EVM(network: $network, dataset: combined) {
              DEXTrades(
                where: {Trade: {Sell: {Currency: {SmartContract: {is: $baseCurrency}}}, Buy: {Currency: {SmartContract: {is: $quoteCurrency}}}}, Block: {Date: {since: $from, till: $till}}}
                orderBy: {descending: Block_Date}
                limit: {count: $limit}
              ) {
                ChainId
                Block {
                  Time
                  Number
                }
                Trade {
                  Sell {
                    Buyer
                    Amount
                    Currency {
                      Symbol
                      Name
                      SmartContract
                    }
                  }
                  Buy {
                    Price
                    Amount
                    Currency {
                      Symbol
                      SmartContract
                      Name
                    }
                  }
                  Dex {
                    ProtocolName
                    SmartContract
                    ProtocolFamily
                    ProtocolVersion
                  }
                }
              }
            }
          }
      `,
        Variables: {
          network: "eth",
          limit: 1,
          from: "2024-01-01",
          till: formattedDate,
          baseCurrency: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          quoteCurrency: "0x3005003bda885dee7c74182e5fe336e9e3df87bb",
          dateFormat: "%Y-%m-%d",
          date_middle: "2024-01-29",
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
        data: data,
      };

      try {
        const response = await axios.request(config);
        const evmData = response.data?.data?.EVM;

        const poolAddresses = evmData?.DEXTrades.map((trade) => ({
          pool_address: trade.Trade?.Dex?.SmartContract || "",
          Token_Price: trade.Trade?.Buy?.Price || ""
        }));



        const firstPoolAddress = poolAddresses[0]?.pool_address || "";
        const firstToken_Price = poolAddresses[0]?.Token_Price || "";
        console.log(firstPoolAddress);
        console.log(firstToken_Price);
        // Update pool_address with firstPoolAddress
        // pool_address = firstPoolAddress;
        pool_address = firstPoolAddress;

        const tokenDetailsArray = [
          { key: 'Token Name', value: tokenName },
          { key: 'Token Symbol', value: tokenSymbol },
          { key: 'Total Supply', value: totalSupplyString },
          { key: 'Pool Address', value: pool_address },
          { key: 'Token Price in ETH', value: firstToken_Price },
        ];

        res.json({ success: true, data: tokenDetailsArray });
      } catch (error) {
        console.error('Error fetching data from Bitquery:', error);
      }



    } else {

      const lastBlockNumber = await web3.eth.getBlockNumber();
      const transferEvents = await tokenContract.getPastEvents('Transfer', {
        fromBlock: lastBlockNumber,
        toBlock: 'latest',
      });

      const tokenDetailsArray = [
        { key: 'Token Name', value: tokenName },
        { key: 'Token Symbol', value: tokenSymbol },
        { key: 'Total Supply', value: totalSupplyString },
        { key: 'Pool Address', value: pool_address }
      ];

      var PoolV2 = new web3.eth.Contract(
        [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sync", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
        pool_address
      );
      // Fetch reserves from the Uniswap v3 pool
      const reserves = await PoolV2.methods.getReserves().call();

      const tokenDecimals = 18;
      const wethDecimals = 18;



      const tokenPrice = Number(reserves[0]) / Number(reserves[1]);
      const adjustedTokenPrice = tokenPrice / 10 ** (wethDecimals - tokenDecimals);

      const tokenPriceString = adjustedTokenPrice.toString();



      tokenDetailsArray.push({ key: 'Token Price', value: tokenPriceString });

      res.json({ success: true, data: tokenDetailsArray });
    }


  } catch (error) {
    console.error('Error fetching token details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});




app.get("/getwalletbalance", async (req, res) => {
  try {
    const { query } = req;
    const address = query.address;

    let data = JSON.stringify({
      "query": `
      query ($network: EthereumNetwork!, $address: String!) {
        ethereum(network: $network) {
          address(address: {is: $address}) {
            balances {
              value
              currency {
                address
                symbol
                tokenType
                name
              }
            }
          }
        }
      }
      
      `,
      "variables": {
        "network": "ethereum",
        "address": address
      }
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graphql.bitquery.io',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'BQYZtYVGHllQQdUM4S6tuT7pFu6Vl5Ys',
        'Authorization': 'Bearer ory_at_mk6Dn9Edj3TlyHbqGwMZZzfVZkFPqjcm-_5iBPnrcxA.E0OaDJYHOiARyJ6rkwQAYnjFqG-WN2-5DqkGh8k6jIA'
      },
      data: data
    };

    const response = await axios.request(config);

    const evmData = response.data?.data?.ethereum;
    // console.log(evmData);

    const tokenArray = evmData?.address?.flatMap((addressEntry) =>
      addressEntry.balances?.map((balanceEntry) => ({
        address: balanceEntry.currency?.address || '',
        name: balanceEntry.currency?.name || '',
        symbol: balanceEntry.currency?.symbol || '',
        v : balanceEntry.currency?.tokenType || '',
        balance: balanceEntry.value || '0',
      }))
    ) || [];

    // console.log(tokenArray);


    const filteredTokenArray = tokenArray.filter((token) => token.balance > 0);

    return res.status(200).json({ filteredTokenArray });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

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





app.get("/gettokePriceChange", async (req, res) => {
  try {
    const { query } = req;
    const tokenAddresses = query.contractAddressesString;

    const tokenAddressesArray = tokenAddresses.split(',');

    const chunkSize = 30;
    const priceData = [];
    const uniqueBaseTokenNames = new Set(); // Set to store unique baseToken names

    for (let i = 0; i < tokenAddressesArray.length; i += chunkSize) {
      const chunk = tokenAddressesArray.slice(i, i + chunkSize).join(',');

      try {
        const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${chunk}`);

        for (const pair of response.data.pairs) {
          const { pairAddress, priceUsd, baseToken, priceChange, quoteToken, fdv } = pair;

          const baseTokenName = baseToken.name;

          // Check if the baseToken name is not in the set, then add it to the result
          if (!uniqueBaseTokenNames.has(baseTokenName)) {
            uniqueBaseTokenNames.add(baseTokenName);

            // Extract other information
            const baseTokenAddress = baseToken.address;
            const quoteTokenAddress = quoteToken.address;
            const quoteTokenName = quoteToken.symbol;
            const fldv = fdv;

            priceData.push({
              pairAddress,
              priceUsd,
              name: baseTokenName,
              priceChange,
              baseTokenAddress,
              quoteTokenAddress,
              fldv,
              baseTokenName: baseTokenName,
              quoteTokenName: quoteTokenName
            });
          }
        }
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    }
    // console.log(priceData);
    return res.status(200).json({
      success: true,
      data: priceData,
    });
  } catch (e) {
    console.log(`Error fetching token prices: ${e}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});


var uniswapFactoryv2 = new web3.eth.Contract(
  [{ "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PairCreated", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "feeToSetter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "getPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "name": "setFeeToSetter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
);


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
            const dexPairResponse = await retryWithExponentialBackoff(() =>  axios.get(`https://api.dexscreener.com/latest/dex/tokens/${token0}`));
            const dexPairData = dexPairResponse.data.pairs;

            if (dexPairData && dexPairData.length > 0) {
              for (const pair of dexPairData) {
                const pairAddress = pair.pairAddress;
                // console.log("dexscan pairAddress: ", pairAddress);

                if (pairAddress) {
                  pool_address = pairAddress;
                  break; // Exit the loop once you find a pairAddress
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

    const pool_addressGekoChunks = chunk(pool_addressGeko, 29); // Function to chunk the array into groups of 9

    const response_data = [];
    for (const chunk of pool_addressGekoChunks) {
      const pool_addressGekoString = chunk.join(',');
      const response = await axios.get(`${PCgeckoTerminalUrl}/${pool_addressGekoString}`);
      response_data.push(...response.data.data.map(item => {
        const pairAddress = item.id.replace('eth_', ''); // Removing 'eth_' prefix to get the pair address
        let address = '';
        if (item.relationships.base_token && item.relationships.base_token.data) {
          address = item.relationships.base_token.data.id.replace('eth_', ''); // Using base_token's address as the address
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});