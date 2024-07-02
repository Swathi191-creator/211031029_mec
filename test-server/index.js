const axios = require('axios');

const testServerBaseUrl = 'http://20.244.56.144/test';


async function fetchNumbers(type) {
    try {
        const response = await axios.get(`${testServerBaseUrl}/${type}`);
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        return [];
    }
}


async function fetchNumbersByTypes(types) {
    const results = {};

    for (const type of types) {
        results[type] = await fetchNumbers(type);
    }

    return results;
}


async function main() {
    const typesToFetch = ['primes', 'fibo', 'even', 'random'];

    try {
        const fetchedNumbers = await fetchNumbersByTypes(typesToFetch);
        console.log('Fetched numbers:', fetchedNumbers);
    } catch (error) {
        console.error('Error fetching numbers:', error);
    }
}


main();
