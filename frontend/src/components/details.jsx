import React, { useState } from 'react';

const Details = ({ data, updateData, nextStep }) => {
    const [details, setDetails] = useState({
        title: data.title,
        description: data.description,
        goal: data.goal
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };
    const handleNext = () => {
        if (!details.title || !details.description || details.goal <= 0) {
            alert('Please fill in all fields.');
            return;
        }
        updateData(details);
        nextStep();
    };
    return (
        <div className="step-container">
            <h2>Step 1: Campaign Details</h2>
            <label>Title:</label>
            <input type="text" name="title" value={details.title} onChange={handleChange} placeholder="Enter campaign title"/>
            <label>Description:</label>
            <textarea name="description" value={details.description} onChange={handleChange} placeholder="Describe your campaign"/>
            <label>Funding Goal:</label>
            <input type="number" name="goal" value={details.goal} onChange={handleChange} placeholder="Enter your funding goal"/>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};
export default Details;