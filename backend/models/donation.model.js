const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    campaignId: mongoose.Schema.Types.ObjectId,
    donor: mongoose.Schema.Types.ObjectId, // refur to user id
    amount: Number,
    message: String,
    createdAt: { type: Date, default: Date.now },
});
const donation = mongoose.model('Donation', donationSchema);

module.exports = donation;