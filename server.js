const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/css', express.static(__dirname + '/css'));

// In-memory storage for simplicity (not for production use)
const users = [
    {
        username: 'info@brainybucks.com',
        password: 'admin123' // Easy to Hack
    }
];

// Route: Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/admin-login.html');
});

// Route: Serve the main website
app.get('/website', (req, res) => {
    res.sendFile(__dirname + '/Website.html');
});

// Route: Serve the "What We Do" page
app.get('/What-we-do.html', (req, res) => {
    res.sendFile(__dirname + '/What-we-do.html');
});

// Route: Handle login
app.post('/admin-dashboard', (req, res) => {
    const { email, password } = req.body;

    // Example in-memory user for simplicity
    const users = [
        { username: 'info@brainybucks.com', password: 'admin123' }
    ];

    // Authenticate user
    const user = users.find(u => u.username === email && u.password === password);
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    res.send('Login successful! Welcome to the admin dashboard.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});