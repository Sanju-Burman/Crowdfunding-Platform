const Donation = require('../models/donation.model');
const Campaign = require('../models/compaign.model');

const addFund = async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        const campaign = await Campaign.findById(donation.campaignId);
        if (campaign) {
            campaign.currentAmount += donation.amount;
            await campaign.save();
        }
        res.status(201).send(donation);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getAllDobationByCampaign = async (req, res) => {
    try {
        const donations = await Donation.find({ campaignId: req.params.id });
        res.status(200).send(donations);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = { addFund, getAllDobationByCampaign };