import { useState, useEffect, useRef } from "react";
import { baseApi } from "../api/base.ts"
import { type User } from "../types/types.tsx"
import { useStore } from "../store/useStore.ts"
import { authorizeUser } from "../store/useStore.ts"

export default function LoginForm({ setIsLandingModalOpen }) {
    // const [auth, setAuth] = useState<User>({});
    const { authorizedUser } = useStore()
    
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
                //open modal
                // setAuth(response.data);
                authorizeUser(response.data);
                setIsLandingModalOpen(true);
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