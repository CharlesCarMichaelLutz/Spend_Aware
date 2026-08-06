import { useState, useEffect, useRef } from "react";
import Select from 'react-select';
import { baseApi}  from "../api/base.ts"
import { authorizeUser } from "../store/useStore.ts"

type SignupFormProps = {
    email: string
    password: string
    username: string
    created_at: string
    language: string
    currency: string
}

export default function SignupForm({ setIsLandingModalOpen }) {
    const [signupForm, setSignupForm] = useState<SignupFormProps>({
        email: "",
        password: "",
        username: "",
        created_at: "",
        language: "",
        currency: ""
    })
    
    function clearSignupForm() {
        setSignupForm({
            email: "",
            password: "",
            username: "",
            created_at: "",
            language: "",
            currency: ""
        })
    }

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

    async function handleSignupFormSubmit(e) {
        e.preventDefault()
        
        try {
            const response = await baseApi.post<SignupFormProps>("register", {
                Email: signupForm.email,
                Password: signupForm.password,
                Username: signupForm.username,
                CreatedAt: new Date().toISOString(),
                Language: signupForm.language.value,
                Currency: signupForm.currency.value,
            });
            clearSignupForm()

            if (response.status === 200) {
                //open modal
                authorizeUser(response.data)
                setIsLandingModalOpen(true)
            }
            
        } catch(error) {
            console.error(error);
        }
    }
    
    return (
        <form className="login-form" onSubmit={handleSignupFormSubmit}>
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
            {/*signup modal*/}
            <button type="submit" >Register</button>
        </form>
    )
}

