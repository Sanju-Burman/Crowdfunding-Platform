const express = require('express');
const { addFund, getAllDobationByCampaign } = require('../conrollers/donations.controller');
const router = express.Router();


router.post('/',addFund );

router.get('/campaign/:id',getAllDobationByCampaign );

module.exports = router;