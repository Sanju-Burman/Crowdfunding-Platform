const mongoose = require('mongoose');
const campaignSchema = new mongoose.Schema({
    title: String,
    description: String,
    goal: Number,
    currentAmount: { type: Number, default: 0 },
    media: [String],
    milestones: [
        {
            percent: Number,
            description: String,
            achieved: { type: Boolean, default: false },
        },
    ],
    creator: {type:mongoose.Schema.Types.ObjectId,require:true},//refur to user id
    createdAt: { type: Date, default: Date.now },
});

const compaign = mongoose.model('Campaign', campaignSchema);

module.exports = compaign;