import { useState, useEffect, useRef } from "react";
import { baseApi}  from "../api/base.ts"
import { authorizeUser } from "../store/useStore.ts"
import { type UserResponse } from "../types/types.tsx"

type SignupFormProps = {
    email: string
    password: string
    username: string
    created_at: string
}

export default function SignupForm({ setIsLandingModalOpen, setUserId }) {
    
    const [signupForm, setSignupForm] = useState<SignupFormProps>({
        email: "",
        password: "",
        username: "",
        created_at: "",
    })
    
    function clearSignupForm() {
        setSignupForm({
            email: "",
            password: "",
            username: "",
            created_at: "",
        })
    }

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
            });

            clearSignupForm()

            if (response.status === 200) {
                console.log("signup Id: ", response)
                setUserId(response.data.userId)
                setIsLandingModalOpen(true)
            }
            
        } catch(error) {
            console.error(error);
        }
    }
    
    return (
        <form className="login-form" onSubmit={handleSignupFormSubmit}>
            <h3 className="login-text">Create Account</h3>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                id="username"
                value={signupForm.username}
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
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={signupForm.email}
                onChange={handleSignupFormChange}
                required
            />
            <button type="submit">Register</button>
        </form>
    )
}

