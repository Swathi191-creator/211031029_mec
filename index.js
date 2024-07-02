const express = require('express');
const app = express();
const PORT = 9876;

let windowPrevState = [];
let windowCurrState = [];


const responses = [
    {
        type: 'even',
        numbers: [2, 4, 6, 8]
    },
    {
        type: 'even',
        numbers: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
    }
];


let callCount = 0;
function getResponse(type) {
    if (callCount < responses.length) {
        return responses[callCount++].numbers;
    }
    return [];
}

function calculateAverage(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
}

app.get('/numbers/:type', (req, res) => {
    const type = req.params.type;
    const numbers = getResponse(type);

    if (windowCurrState.length > 0) {
        windowPrevState = [...windowCurrState];
    }

    windowCurrState = numbers;

    const avg = calculateAverage(windowCurrState);

    res.json({
        windowPrevState: windowPrevState,
        windowCurrState: windowCurrState,
        numbers: numbers,
        avg: avg
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
