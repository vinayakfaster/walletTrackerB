const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require("cors");
const { RequestAlreadySentError, ContractMissingABIError } = require('web3');
const app = express();
const port = 7000;
app.use(cors());
app.use(express.json());
// MongoDB connection URI
const uri = "mongodb+srv://hijeckerg:zIkq47teWwjBwJwT@porfolio.yz2zjx0.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON body
app.use(bodyParser.json());

app.get('/addWalletAddress', async (req, res) => {
    try {
        // Connect to MongoDB
        await client.connect();

        const database = client.db('porfolio');
        const collection = database.collection('user_wallets');

        const { address, newwallet } = req.query;

        // Define the filter to find the document by userAddress
        const filter = { userAddress: address };

        // Define the update operation
        const updateOperation = {
            $addToSet: { walletAddresses: newwallet }, // Add newWalletAddress to walletAddresses array if it doesn't already exist
            $setOnInsert: { timestamp: new Date() } // Set timestamp only on document insertion
        };

        // Define the options for the upsert operation
        const options = { upsert: true };

        // Perform the upsert operation
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
        // Connect to MongoDB
        await client.connect();

        const database = client.db('porfolio');
        const collection = database.collection('user_wallets');

        const { address, addressToRemove } = req.query;

        // Find the document with the specified userAddress
        const filter = { userAddress: address };
        const document = await collection.findOne(filter);

        if (!document) {
            return res.status(404).json({ error: 'User address not found' });
        }

        // Remove the specified address from the array
        const updatedAddresses = document.walletAddresses.filter(address => address !== addressToRemove);

        // Update the document with the updated wallet addresses
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


app.get('/getWalletAddresses', async (req, res) => {
    try {
        await client.connect();

        const database = client.db('porfolio');
        const collection = database.collection('user_wallets');

        const { address } = req.query; // Get user address from query parameters

        // Use findOne to fetch a single document
        const document = await collection.findOne({ userAddress: address });

        if (!document) {
            return res.status(404).json({ message: 'User address not found' });
        }

        console.log(document)

        // Return the wallet addresses associated with the user
        res.status(200).json({
            message: 'Wallet addresses fetched successfully',
            walletAddresses: document.walletAddresses // Ensure this field exists in your documents
        });
    } catch (error) {
        console.error('Error fetching wallet addresses:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Optionally, close the MongoDB connection if needed
    }
});


app.get('/getFav', async (req, res) => {
    try {
        await client.connect();

        const database = client.db('porfolio');
        const collection = database.collection('Fav_tokens');

        const { address } = req.query; // Get user address from query parameters

        // Use findOne to fetch a single document
        const document = await collection.findOne({ userAddress: address });

        if (!document) {
            return res.status(404).json({ message: 'User address not found' });
        }

        console.log(document)

        // Return the wallet addresses associated with the user
        res.status(200).json({
            message: 'Wallet addresses fetched successfully',
            walletAddresses: document.walletAddresses // Ensure this field exists in your documents
        });
    } catch (error) {
        console.error('Error fetching wallet addresses:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Optionally, close the MongoDB connection if needed
    }
});


app.get('/addFavToken', async (req, res) => {
    try {
        // Connect to MongoDB
        await client.connect();

        const database = client.db('porfolio');
        const collection = database.collection('Fav_tokens');

        const { address, tokenName, priceUsd } = req.query;

        // Define the filter to find the document by userAddress
        const filter = { userAddress: address };

        // Define the update operation
        const updateOperation = {
            $addToSet: { FavTokens: tokenName, priceUsd: priceUsd }, // Add newWalletAddress to walletAddresses array if it doesn't already exist
            $setOnInsert: { timestamp: new Date() } // Set timestamp only on document insertion
        };

        // Define the options for the upsert operation
        const options = { upsert: true };

        // Perform the upsert operation
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
