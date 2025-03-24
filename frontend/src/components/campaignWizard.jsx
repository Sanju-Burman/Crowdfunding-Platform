import React, { useState } from "react";
import axios from "axios";
import MediaUpload from "./mediaUpload";
import Details from "./details";
import Milestones from "./milestone";
import Preview from "./preview";

const CampaignWizard = () => {
    const [step, setStep] = useState(1);
    const [campaignData, setCampaignData] = useState({
        title: '',
        description: '',
        goal: 0,
        currentAmount:0,
        media: [],
        milestones: [],
        creator:''
    });
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const updateData = (newData) => {
        setCampaignData({ ...campaignData, ...newData });
    };
    const submitCampaign = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const res = await axios.post('http://localhost:5000/compaign',
                campaignData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const result = await res.json();
            console.log('Campaign submitted:', result);
        } catch (error) {
            console.error('Error submitting campaign:', error);
        }
    };

    return (
        <div className="wizard-container">
            {step === 1 && <Details data={campaignData} updateData={updateData} nextStep={nextStep} />}
            {step === 2 && <MediaUpload data={campaignData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <Milestones data={campaignData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 4 && <Preview data={campaignData} prevStep={prevStep} submitCampaign={submitCampaign} />}
        </div>
    );
}
export default CampaignWizard;