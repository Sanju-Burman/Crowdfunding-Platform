import React from 'react';

const Preview = ({ data, prevStep, submitCampaign }) => {
    return (
        <div className="step-preview-container">
            <h2>Campaign Preview</h2>

            <div className="preview-section">
                <h3>Title</h3>
                <p>{data.title}</p>

                <h3>Description</h3>
                <p>{data.description}</p>

                <h3>Goal Amount</h3>
                <p>₹{data.goal}</p>

                <h3>Media</h3>
                <div className="media-preview">
                    {data.media.map((m, index) => (
                        <div key={index} className="media-item">
                            {m.type==='vedios' ? (
                                <video src={m.url} controls width="30rem" />
                            ) : (
                                <img src={m.url} alt="Campaign Media" width="30rem" />
                            )}
                        </div>
                    ))}
                </div>

                <h3>Milestones</h3>
                <ul className="milestones-list">
                    {data.milestones.map((m, index) => (
                        <li key={index}>
                            {m.percent}% Funded
                            {m.description}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="action-buttons">
                <button className='prev-button' onClick={prevStep}>Back</button>
                <button className='submit-button' onClick={submitCampaign}>Submit Campaign</button>
            </div>
        </div>
    );
};
export default Preview;