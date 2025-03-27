const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder

// Serve the admin page (for creating posts)
app.get('/admin', (req, res) => {
    console.log("Serving the admin page...");
    res.sendFile(path.join(__dirname, 'public', 'admin.html')); // Serve from 'public' folder
});

// Serve the posts page (to view the created posts)
app.get('/index', (req, res) => {
    console.log("Serving the posts page...");
    res.sendFile(path.join(__dirname, 'Website.html'));  // Serve from the same directory as server.js
});

const DATA_FILE = path.join(__dirname, 'data.json');

// Get all posts from data.json
app.get('/api/posts', (req, res) => { // Changed endpoint to /api/posts
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data' });
        res.json(JSON.parse(data || '[]'));
    });
});

// Save a new post to data.json
app.post('/api/posts', (req, res) => { // Changed endpoint to /api/posts
    const newPost = req.body;

    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data' });

        let posts = JSON.parse(data || '[]');
        posts.push(newPost);

        fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error saving data' });
            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));