import { useState, useEffect, useRef } from "react";
import { baseApi } from "../api/base.ts"
import { type User } from "../types/types.tsx"
import { authorizeUser } from "../store/useStore.ts"
import { useNavigate } from "react-router"

export default function LoginForm({ setIsLandingModalOpen }) {
    const navigate = useNavigate();
    
    const [loginForm, setLoginForm] = useState<object>({
        username: "",
        email: "",
        password: "",
    })
    
    function clearLoginForm() {
        setLoginForm({
            username: "",
            email: "",
            password: "",
        })
    }

    function handleLoginFormChange(e) {
        const {id, value} = e.target

        setLoginForm((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    async function handleLoginFormSubmit(e) {
        e.preventDefault()
        try{
            const response = await baseApi.post<User>("login", {
                Username : loginForm.username,
                Email: loginForm.email,
                Password: loginForm.password,
            });

            clearLoginForm()
            
            if (response.status === 200) {
                authorizeUser(response.data);
                //open modal
                // setIsLandingModalOpen(true);
                navigate("/dashboard")
                console.log("login response:", response)
            }
        } catch(error) {
            //render the error on the LoginForm container
            console.error(error)
        }
    }

    return (
        <form className="login-form" onSubmit={handleLoginFormSubmit}>
            <label htmlFor="username">Username</label>
            <input
                type="username"
                id="username"
                value={loginForm.username}
                onChange={handleLoginFormChange}
                required
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={loginForm.email}
                onChange={handleLoginFormChange}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={handleLoginFormChange}
                required
            />
            {/*login modal*/}
            <button type="submit">
                Login
            </button>
        </form>
    )
}