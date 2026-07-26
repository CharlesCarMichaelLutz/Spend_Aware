import { useState, useEffect, useRef } from "react";
import { baseURL } from "../api/base.ts"

export default function LoginForm({ setIsLandingModalOpen }) {
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
            const response = await baseURL.post("login", {
                Username : loginForm.email,
                Email: loginForm.email,
                Password: loginForm.password,
            });
            
            if(!response.ok) {
                throw new Error("Failed to fetch user");
            }
            
            if (response.status === 200) {
                //open modal
            }
            setAuth(response.data);
            
            // setIsLoggedIn(true);
            clearLoginForm()
            
        } catch(error) {
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
            <button type="submit" onClick={() => setIsLandingModalOpen(true)}>Submit</button>
        </form>
    )
}