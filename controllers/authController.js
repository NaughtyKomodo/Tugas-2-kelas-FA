const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, connectDB } = require('../config/db');

const registerUser = async (req, res) => {
    const { name, email, nim, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const pool = await connectDB();
        const sqlQuery = 'INSERT INTO users (name, email, nim, password) VALUES (@name, @email, @nim, @password)';
        const request = pool.request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('nim', sql.NVarChar, nim)
            .input('password', sql.NVarChar, hashedPassword);

        await request.query(sqlQuery);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
};

const loginUser = async (req, res) => {
    const { nim, password } = req.body;

    try {
        const pool = await connectDB();
        const sqlQuery = 'SELECT * FROM users WHERE nim = @nim';
        const request = pool.request().input('nim', sql.NVarChar, nim);
        const result = await request.query(sqlQuery);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Invalid NIM or password' });
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid NIM or password' });
        }

        const token = jwt.sign({ id: user.id, nim: user.nim }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};

module.exports = { registerUser, loginUser };