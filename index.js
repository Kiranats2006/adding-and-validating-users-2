const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;


const usersDB = [
    { email: 'user@example.com', password: '$2b$10$examplehashedpassword' }
];

app.use(express.json());
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = usersDB.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

   
    try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
