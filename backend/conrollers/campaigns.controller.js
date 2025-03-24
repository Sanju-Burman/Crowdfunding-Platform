const Campaign = require('../models/compaign.model');

const addCampaigns = async(req, res) => {
    try {
        const campaign = new Campaign(req.body);
        console.log(campaign);
        await campaign.save();
        res.status(201).send(campaign);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ title: req.query.title });
        res.status(200).send(campaigns);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getCampaignsById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).send();
        }
        res.send(campaign);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports={addCampaigns,getCampaigns,getCampaignsById}