import { LandingModal } from "./LandingModal"
import {useEffect, useState} from "react";
import LoginRadioButtons from "../components/LoginRadioButtons";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import GuestForm from "../components/GuestForm";

export function Landing() {
    const [selectedRadioButton, setSelectedRadioButton] = useState("login");
    const [isLandingModalOpen, setIsLandingModalOpen] = useState<boolean>(false)
    
    return (
        <>
            <div className="landing-container">
                <div className="landing-left">
                    <section className="welcome">
                         <img height={200} width={300} className="logo-image"/>
                         <div>
                            <p>
                                The first step to getting on track financially 
                                is keeping track of your spending, 
                                oberving behavior, then adjusting 
                            </p>
                            <h3>Spend Aware</h3>
                         </div>
                    </section>
                </div>
                 <div className="landing-right">
                    <section className="login">
                        <div className="btn-group">
                            < LoginRadioButtons
                                selectedRadioButton={selectedRadioButton}
                                setSelectedRadioButton={setSelectedRadioButton}
                            />
                        </div>
                        {selectedRadioButton === "signup"
                            ? <SignupForm  setIsLandingModalOpen={setIsLandingModalOpen}/>
                            : selectedRadioButton === "login"
                                ? <LoginForm setIsLandingModalOpen={setIsLandingModalOpen}/>
                                : <GuestForm setIsLandingModalOpen={setIsLandingModalOpen}/>
                        }
                    </section>
                     <LandingModal isOpen={isLandingModalOpen} onClose={() => setIsLandingModalOpen(false)}>
                         <button onClick={() => setIsLandingModalOpen(false)}>Close</button>
                         <h3>We sent you a code</h3>
                         <p>Enter it below to verify:</p>
                         <h4><em>test@test.com</em></h4>
                         <form>
                             <label>Verification code</label>
                             <input type="text" name="verification_code" id="verification_code" />
                             <button type="submit">Submit</button>
                         </form>
                         <p>Did not receive the code? <button>Resend it</button></p>
                     </LandingModal>
                </div>
            </div>
        </>
    ) 
}