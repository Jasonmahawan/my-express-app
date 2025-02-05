const express = require('express');
const app = express();
const port = 3000;
const items = ['Apple', 'Banana', 'Orange'];

app.use(express.json()); // Middleware to parse JSON bodies

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the "public" folder
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    if (newItem) {
        items.push(newItem);
        res.status(201).json(items);
    } else {
        res.status(400).send('Item is required');
    }
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

// Error handling middleware should be last
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
