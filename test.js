const { Web3 } = require('web3');


// var web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws/v3/2cc6058ccf70433aa59dd3c00c2b38db')
var web3 = new Web3(Web3.givenProvider || 'wss://eth-mainnet.g.alchemy.com/v2/etLZkVptnKi5IlR_uj_v2jYt5JIZzCil')


async function getUniqueHoldersAndBalance(tokenContractAddress) {
  const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

  // Get all Transfer events
  const events = await tokenContract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest'
  });

  // Initialize an object to store balances
  const balances = {};

  // Process the events to count unique addresses and calculate balances
  events.forEach(event => {
      const from = event.returnValues._from;
      const to = event.returnValues._to;
      const value = web3.utils.toBN(event.returnValues._value);

      // Update balances for sender and receiver
      balances[from] = (balances[from] || web3.utils.toBN(0)).sub(value);
      balances[to] = (balances[to] || web3.utils.toBN(0)).add(value);
  });

  // Create an array to store sorted balances
  const sortedBalances = Object.keys(balances).map(address => ({
      address,
      balance: web3.utils.fromWei(balances[address], 'ether') // Convert balance from wei to ether
  })).sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance)); // Sort in descending order based on balance

  return sortedBalances;
}

function findAddressIndex(holderList, targetAddress) {
  // Find the index of the given address in the holder list
  const index = holderList.findIndex(holder => holder.address.toLowerCase() === targetAddress.toLowerCase());
  return index !== -1 ? index : 'Address not found';
}

// Example usage
const tokenContractAddress = 'your_token_contract_address';
const targetAddress = 'address_to_find';

getUniqueHoldersAndBalance(tokenContractAddress)
  .then(holderList => {
      console.log('Sorted holders and their balances:');
      holderList.forEach(holder => {
          console.log(`Address: ${holder.address}, Balance: ${holder.balance}`);
          console.log('------------------------');
      });
      
      return findAddressIndex(holderList, targetAddress);
  })
  .then(index => {
      console.log(`Index of address ${targetAddress} is: ${index}`);
  })
  .catch(error => {
      console.error('Error:', error);
  });