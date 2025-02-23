const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'splash.html'));
});

app.get('/cities', (req, res) => {
    res.sendFile(path.join(__dirname, 'cities.html'));
});
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});