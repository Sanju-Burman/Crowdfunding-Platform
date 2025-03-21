import CampaignWizard from "./components/CampaignCreationWizard"


function App() {

  return (
    <>
      <div>
        <div className="progress-bar">
          <div className="step active">Home</div>
          <div className="step">1. Basic Details</div>
          <div className="step">2. Media Upload</div>
          <div className="step">3. Milestones & Goals</div>
          <div className="step">4. Preview</div>
        </div>
        <CampaignWizard/>
      </div>
    </>
  )
}

export default App
