const express = require('express');
const userRoutes = require('./routes/user.routes');
const compaignRoutes = require('./routes/campaigns.routes')
const donationRoutes=require('./routes/donations.routes')
const db = require('./config/db');
const { verifyToken, donorChecks } = require('./middleware/auth.middleware');
const cors = require('cors');

require('dotenv').config();
db();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use('/user', userRoutes);
app.use('/compaign', verifyToken, compaignRoutes);
app.use('/donations',verifyToken,donorChecks, donationRoutes);

app.listen(PORT, () => { console.log(`server is running`) });