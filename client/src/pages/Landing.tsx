import { LandingModal } from "./LandingModal"
import {useEffect, useState} from "react";
import LoginRadioButtons from "../components/LoginRadioButtons";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import GuestForm from "../components/GuestForm";
import { useNavigate } from "react-router";

export function Landing() {
    const [selectedRadioButton, setSelectedRadioButton] = useState("login");
    const [isLandingModalOpen, setIsLandingModalOpen] = useState<boolean>(false)
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const navigate = useNavigate();

    const [modalForm, setModalForm] = useState<object>({
        userId: "",
        code: "",
    })

    function clearModalForm() {
        setModalForm({
            userId: "",
            code: "",
        })
    }
    
    function handleEmailVerification(e) {
        e.preventDefault()
        e.stopPropagation()
        try{
            // const response = await baseApi.post<User>("verify-email", {
            //     UserId: "", 
            //     Code: "",
            // });

            clearModalForm()

            // if (response.status === 200) {
                if (200 === 200) {
                //naviaget to dashboard
                setIsVerified(true)
                navigate("/dashboard")
            }
        } catch(error) {
            //render the error on modal
            console.error(error)
        }
    }
    
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
                                : <GuestForm />
                        }
                    </section>
                     <LandingModal 
                         isOpen={isLandingModalOpen} 
                         onClose={() => setIsLandingModalOpen(false)}
                     >
                         <button onClick={() => setIsLandingModalOpen(false)}>Close</button>
                         <h3>We sent a code to</h3>
                         {/*<h4><em>{auth.email}</em></h4>*/}
                         <h4><em>test@test.com</em></h4>
                         <p>Enter it below to verify:</p>
                         {/*<form onSubmit={handleEmailVerification}>*/}
                         <form onSubmit={handleEmailVerification}>
                             <label htmlFor="verification_code">Verification code</label>
                             <input 
                                 type="text" 
                                 id="verification_code"
                                 // value={modalForm.code}
                                 onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                             />
                             <button type="submit">Verify</button>
                         </form>
                         <p>Did not receive the code? <button>Resend it</button></p>
                     </LandingModal>
                </div>
            </div>
        </>
    ) 
}