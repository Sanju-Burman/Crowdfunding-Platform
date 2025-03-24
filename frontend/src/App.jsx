import { useState } from "react"
import CampaignWizard from "./components/campaignWizard"
import { Login, Signup } from "./components/auth";
function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {
        !isAuth ? (
          <>
            <Login setIsAuth={setIsAuth} />
            <Signup />
          </>
        ) : (
          <CampaignWizard />
        
        )
      }
    </>
  )
}

export default App
