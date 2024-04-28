const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Web3 } = require('web3');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const web3 = new Web3('wss://mainnet.infura.io/ws/v3/40d778647310471ea8e99fd4b2039d40');

const subscriptions = {};

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    const { address } = JSON.parse(message);
    console.log('Received address:', address);

    const subscription = web3.eth.subscribe('pendingTransactions', (error, result) => {
      if (error) {
        console.error('Subscription error:', error);
        return;
      }

      result.on('transactionHash', async (txHash) => {
        const tx = await web3.eth.getTransaction(txHash);

        if (
          (tx.from && tx.from.toLowerCase() === address.toLowerCase()) ||
          (tx.to && tx.to.toLowerCase() === address.toLowerCase())
        ) {
          const transactionData = {
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: web3.utils.fromWei(tx.value),
            blockNumber: 'Pending', // Mark the transaction as pending
          };

          ws.send(JSON.stringify(transactionData));
        }
      });
    });

    subscriptions[address] = subscription;

    ws.on('close', () => {
      console.log('Client disconnected');
      if (subscriptions[address]) {
        subscriptions[address].unsubscribe();
        delete subscriptions[address];
      }
    });
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket server running');
});

server.listen(8000, () => {
  console.log('WebSocket server listening on port 8000');
});
