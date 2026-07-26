import { useState, useEffect, useRef } from "react";
import { baseURL } from "../api/base.ts"

export default function GuestForm({ setIsLandingModalOpen })  {
    const [guestForm, setGuestForm] = useState<object>({
        username: "",
        email: "",
        password: "",
    })
    
    function clearGuestForm() {
        setGuestForm({
                username: "",
                email: "",
                password: "",
        })
    }

    function handleGuestFormChange(e) {
        const {id, value} = e.target

        setGuestForm((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    async function handleGuestFormSubmit(e) {
        e.preventDefault()

        // const payload = { ...guestForm }
        try{
            const response = await baseURL.post("login", {
                Username : import.meta.env.VITE_API_Guest_Username,
                Email: import.meta.env.VITE_API_Guest_Email,
                Password: VITE_API_Guest_Password,
            });

            if(!response.ok) {
                throw new Error("Failed to fetch user");
            }

            if (response.status === 200) {
                //open modal
            }
            setAuth(response.data);

            // setIsLoggedIn(true);
            clearGuestForm()

        } catch(error) {
            console.error(error)
        }
        
    }

    return (
        <form className="login-form" onSubmit={handleGuestFormSubmit}>
            <label htmlFor="username">Username</label>
            <input
                type="username"
                id="username"
                value={guestForm.username}
                onChange={handleGuestFormChange}
                required
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={guestForm.email}
                onChange={handleGuestFormChange}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={guestForm.password}
                onChange={handleGuestFormChange}
                required
            />
            {/*no modal*/}
            <button type="submit" onClick={() => setIsLandingModalOpen(true)}>
                Submit
            </button>
        </form>
    )
}