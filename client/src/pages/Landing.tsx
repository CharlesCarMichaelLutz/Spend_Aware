import { LandingModal } from "./LandingModal"
import {useEffect, useState} from "react";
import Select from 'react-select';

export function Landing() {
    const [isLandingModalOpen, setIsLandingModalOpen] = useState<boolean>(false)
    const [signupForm, setSignupForm] = useState<object>({
        email: "",
        password: "",
        username: "",
        language: "",
        currency: ""
    })
    
    const languageOptions = 
        [
            { value: "en", label: "English"},
            { value: "af", label: "Afrikaans" },
            { value: "zh-Hans", label: "Chinese (Simplified)" },
            { value: "zh-Hant", label: "Chinese (Traditional)" },
            { value: "de-CH", label: "German (Switzerland)" },
            { value: "hi", label: "Hindi" },
            { value: "ja", label: "Japanese" },
            { value: "pt-BR", label: "Portuguese (Brazil)" },
            { value: "ru", label: "Russian" }
        ]

    const currencyOptions =
        [
            { value: "USD", label: "USD - U.S. Dollar" },
            { value: "AUD", label: "AUD - Australian Dollar" },
            { value: "BRL", label: "BRL - Brazilian Real" },
            { value: "CAD", label: "CAD - Canadian Dollar" },
            { value: "CHF", label: "CHF - Swiss Franc" },
            { value: "CNY", label: "CNY - Chinese Yuan" },
            { value: "EUR", label: "EUR - Euro" },
            { value: "GBP", label: "GBP - British Pound" },
            { value: "HKD", label: "HKD - Hong Kong Dollar" },
            { value: "INR", label: "INR - Indian Rupee" },
            { value: "JPY", label: "JPY - Japanese Yen" },
            { value: "RUB", label: "RUB - Russian Ruble" },
            { value: "SGD", label: "SGD - Singapore Dollar" },
            { value: "ZAR", label: "ZAR - South African Rand" },
        ]
    
    function handleSignupFormChange(e) {
        const {id, value} = e.target
        
        setSignupForm((prev) => ({
            ...prev,
            [id]: value
        }))
    }
    
    function handleSignupFormSubmit(e) {
        e.preventDefault()
        
        const payload = {
            ...signupForm,
            language: signupForm.language.value,
            currency: signupForm.currency.value,
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
                        <form className="login-form" onSubmit={handleSignupFormSubmit}>
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
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={signupForm.email} 
                                onChange={handleSignupFormChange}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                value={signupForm.password}
                                onChange={handleSignupFormChange}
                                required 
                            />
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username"
                                value={signupForm.username}
                                onChange={handleSignupFormChange}
                                required
                            />
                            <label htmlFor="language" id="language">Language</label>
                            <Select
                                options={languageOptions}
                                value={signupForm.language}
                                onChange={(selected) => 
                                    setSignupForm((prev) => ({
                                        ...prev,
                                        language: selected
                                    }))
                                }
                            />
                            <label htmlFor="currency">Currency</label>
                            <Select
                                options={currencyOptions}    
                                value={signupForm.currency}
                                onChange={(selected) =>
                                    setSignupForm((prev) => ({
                                        ...prev,
                                        currency: selected
                                    }))
                                }
                            />
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