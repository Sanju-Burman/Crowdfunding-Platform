const express = require('express');
const { addCampaigns, getCampaigns, getCampaignsById } = require('../conrollers/campaigns.controller');
const router = express.Router();


router.post('/',addCampaigns );

router.get('/',getCampaigns );

router.get('/:id', getCampaignsById);

module.exports = router;