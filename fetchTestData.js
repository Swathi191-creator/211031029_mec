const axios = require('axios');

const authEndpoint = 'http://20.244.56.144/test/auth';
const testServerBaseUrl = 'http://20.244.56.144/test';
const PORT = 9876;

const authData = {
    companyName: 'goMart',
    clientID: '37bb493c-7303-47ea-8675-21f66ef9b735',
    clientSecret: 'XOyo10RPasKWODAN',
    ownerName: 'Rahul',
    ownerEmail: 'rahul@abc.edu',
    rollNo: '1'
};

let authToken = ''; 

async function fetchAuthToken() {
    try {
        const response = await axios.post(authEndpoint, authData);
        const tokenType = response.data['token type'];
        const token = response.data.token;
        authToken = `${tokenType} ${token}`;
        console.log('Authorization Token:', authToken);
    } catch (error) {
        console.error('Error obtaining authorization token:', error.message);
    }
}


async function fetchNumbers(type) {
    try {
        const response = await axios.get(`${testServerBaseUrl}/${type}`, {
            headers: {
                Authorization: authToken 
            }
        });
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        return [];
    }
}

async function testApi() {
    await fetchAuthToken(); 

   
    try {
        const primes = await fetchNumbers('primes');
        console.log('Primes:', primes);

        const fibonacci = await fetchNumbers('fibo');
        console.log('Fibonacci:', fibonacci);

        const even = await fetchNumbers('even');
        console.log('Even:', even);

        const random = await fetchNumbers('random');
        console.log('Random:', random);
    } catch (error) {
        console.error('Error testing API:', error.message);
    }
}


testApi().then(() => {
    console.log('Test API process completed.');
}).catch((error) => {
    console.error('Test API process failed:', error.message);
});


const express = require('express');
const app = express();

app.get('/numbers/:type', async (req, res) => {
    const type = req.params.type;
    try {
        const numbers = await fetchNumbers(type);
        res.json({ numbers });
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        res.status(500).json({ error: `Failed to fetch ${type} numbers` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

