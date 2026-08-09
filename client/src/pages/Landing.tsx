import { LandingModal } from "./LandingModal"
import {useEffect, useState} from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router";
import { authorizeUser } from "../store/useStore.ts"
import { baseApi } from "../api/base.ts"
import { type User } from "../types/types.tsx"
import { type UserResponse } from "../types/types.tsx"
import { type VerifyEmail } from "../types/types.tsx"


export function Landing() {
    const [isLandingModalOpen, setIsLandingModalOpen] = useState<boolean>(false)
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [userId, setUserId] = useState<UserResponse>(0)
    const navigate = useNavigate();
    const [loginValue, setLoginValue] = useState("")

    const [modalForm, setModalForm] = useState<object>({
        code: "",
    })

    function clearModalForm() {
        setModalForm({
            code: "",
        })
    }

    function handleVerifyFormChange(e) {
        const { value } = e.target
        
        const parseValue = value.split('').filter(x => x >= '0' && x <= '9' ).join('')
        setModalForm((prev) => ({
            ...prev,
            code: parseValue
        }))
    }
    
    async function handleGuestFormSubmit() {
        try{
            const response = await baseApi.post<User>("login", {
                Username : import.meta.env.VITE_API_Guest_Username,
                Email: import.meta.env.VITE_API_Guest_Email,
                Password: import.meta.env.VITE_API_Guest_Password,
            });
            
            setLoginValue("")

            if (response.status === 200) {
                authorizeUser(response.data)
                console.log("guest response: ", response)
                navigate("/dashboard")
            }
        } catch(error) {
            console.error(error)
        }
    }
    
    async function handleEmailVerification(e) {
        e.preventDefault()
        e.stopPropagation()
        try{
            const response = await baseApi.post<VerifyEmail>("verify-email", {
                UserId: userId, 
                EmailCode: modalForm.code,
            });

            clearModalForm()

            if (response.status === 200) {
                authorizeUser(response.data)
                setIsVerified(true)
                navigate("/dashboard")
            }
        } catch(error) {
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
                        <div className="login-form-container">
                            { loginValue === "" ?
                                <>
                                    <button className="login-button" onClick={handleGuestFormSubmit}> Guest</button>
                                    <button className="login-button" onClick={() => setLoginValue("register")}> Register</button>
                                    <button className="login-button" onClick={() => setLoginValue("login")}> Login</button>
                                </>
                                : loginValue === "register" 
                                    ? <SignupForm 
                                        setIsLandingModalOpen={setIsLandingModalOpen} 
                                        setUserId={setUserId} 
                                    /> 
                                    : <LoginForm /> 
                            }
                        </div>
                    </section>
                     <LandingModal 
                         isOpen={isLandingModalOpen} 
                         onClose={() => setIsLandingModalOpen(false)}
                     >
                         <button onClick={() => setIsLandingModalOpen(false)}>Close</button>
                         <h3>We sent a code to</h3>
                         <h4><em>test@test.com</em></h4>
                         <p>Enter it below to verify:</p>
                         <form onSubmit={handleEmailVerification}>
                             <label htmlFor="verification_code">Verification code</label>
                             <input 
                                 type="number"
                                 id="verification_code"
                                 value={modalForm.code}
                                 onChange={handleVerifyFormChange}
                                 
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