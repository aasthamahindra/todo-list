const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            username, email, password: hash
        });

        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (e) {
        res.status(500).json({ message: 'Registration failed', error: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password'});
        }

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (e) {
        res.status(500).json({ message: 'Login failed', error: e.message });
    }
}