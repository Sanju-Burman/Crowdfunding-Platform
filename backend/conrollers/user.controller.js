const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "user not avilabal" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "invalid email or password" });

        }
        const payload = { userId: user._id, email: user.email };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '7d' }
        );
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

const signup = async (req, res) => {
    try {
        const { name, email, password, profession, role } = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const solt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, solt);
        const newUser = new User({ name, email,profession, password: hashPassword,role });
        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: { id:newUser._id }
        });
    } catch (e) {
        res.status(500).json({ message: "Registration failed", error: e.message });
    }
};
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: 'Token required' });

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Invalid token' });

            const accessToken = jwt.sign(
                { userId: decoded.userId, role: decoded.role },
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: '15m' }
            );

            res.json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Refresh failed', error });
    }
}

const logout = async (req, res) => {
    try {
        const { accessToken, refreshToken } = req.body;

        const accessTokenExp = jwt.decode(accessToken).exp;
        const refreshTokenExp = jwt.decode(refreshToken).exp;

        await TokenBlacklist.create([
            {
                token: accessToken,
                type: 'access',
                expiresAt: new Date(accessTokenExp * 1000)
            },
            {
                token: refreshToken,
                type: 'refresh',
                expiresAt: new Date(refreshTokenExp * 1000)
            }
        ]);

        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed', error });
    }
}

module.exports = { login, signup,logout,refresh };