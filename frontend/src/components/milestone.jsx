import React, { useState } from 'react';

const Milestones = ({ data, updateData, nextStep, prevStep }) => {
    const [milestones, setMilestones] = useState(data.milestones || []);
    const [milestoneInput, setMilestoneInput] = useState({
        percent: '',
        description: ''

    });
    const addMilestone = () => {
        if (!milestoneInput.percent || !milestoneInput.description) {
            return;
            
        }
        const newMilestones = [...milestones, milestoneInput];
        setMilestones(newMilestones);
        setMilestoneInput({ percent: '', description: '' });
    };
    const removeMilestone = (index) => {
        const updatedMilestones = milestones.filter((_, i) => i !== index);
        setMilestones(updatedMilestones);
    };
    const handleNext = () => {
        updateData({ milestones });
        nextStep();
    };
    return (
        <div className="milestones-container">
            <h2>Step 3: Milestones</h2>
            <div className="milestone-form">
                <input type="number" placeholder="% (e.g., 25)" value={milestoneInput.percent} onChange={(e) => setMilestoneInput({ ...milestoneInput, percent: e.target.value })}/>
                <input type="text" placeholder="milestone description" value={milestoneInput.description} onChange={(e) => setMilestoneInput({ ...milestoneInput, description: e.target.value })} />
                <button onClick={addMilestone}>Add Milestone</button>
            </div>
            <div className="mileston-list">
                {milestones.map((milestone, index) => (
                    <div key={index} className="mileston-item">
                        <p>{milestone.percent}% - {milestone.description}</p>
                        <button onClick={() => removeMilestone(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="button-group">
                <button onClick={prevStep}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};
export default Milestones;
