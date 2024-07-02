const axios = require('axios');

const testServerBaseUrl = 'http://20.244.56.144/test';

// Function to fetch numbers from the test server based on type
async function fetchNumbers(type) {
    try {
        const response = await axios.get(`${testServerBaseUrl}/${type}`);
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        return [];
    }
}

// Function to handle fetching numbers based on specified types
async function fetchNumbersByTypes(types) {
    const results = {};

    for (const type of types) {
        results[type] = await fetchNumbers(type);
    }

    return results;
}

// Example usage: Fetch numbers for specified types
async function main() {
    const typesToFetch = ['primes', 'fibo', 'even', 'random'];

    try {
        const fetchedNumbers = await fetchNumbersByTypes(typesToFetch);
        console.log('Fetched numbers:', fetchedNumbers);
    } catch (error) {
        console.error('Error fetching numbers:', error);
    }
}

// Execute main function
main();
