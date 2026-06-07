import { LandingModal } from "./LandingModal"
import {useEffect, useState} from "react";

export function Landing() {
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
                        <form className="login-form">
                            <div className="btn-group">
                                <input
                                    type="radio"
                                    value="login"
                                    id="login"
                                    name="options"
                                    checked
                                />
                                <label htmlFor="login"> 
                                Login
                                </label>
                                <label htmlFor="signup">
                                <input
                                    type="radio"
                                    value="signup"
                                    id="signup"
                                    name="options"
                                />
                                Signup
                                </label>
                            </div>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" required/>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" required />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required />
                            <button type="submit" onClick={() => setIsLandingModalOpen(true)}>Submit</button>
                        </form>
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