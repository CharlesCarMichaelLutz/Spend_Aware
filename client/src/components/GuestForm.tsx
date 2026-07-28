import { useState, useEffect, useRef } from "react";
import { baseApi } from "../api/base.ts"
import { type User } from "../types/types.tsx"
import { useNavigate } from "react-router"

export default function GuestForm()  {
    //that' what needs to be saved in Zustand
    // const { setAuth } useStore()
    const [auth, setAuth] = useState<User>({});
    const navigate = useNavigate()
    //
    // const [guestForm, setGuestForm] = useState<object>({
    //     username: "",
    //     email: "",
    //     password: "",
    // })
    //
    // function clearGuestForm() {
    //     setGuestForm({
    //             username: "",
    //             email: "",
    //             password: "",
    //     })
    // }
    //
    // function handleGuestFormChange(e) {
    //     const {id, value} = e.target
    //
    //     setGuestForm((prev) => ({
    //         ...prev,
    //         [id]: value
    //     }))
    // }

    async function handleGuestFormSubmit(e) {
        e.preventDefault()
        try{
            const response = await baseApi.post<User>("login", {
                Username : import.meta.env.VITE_API_Guest_Username,
                Email: import.meta.env.VITE_API_Guest_Email,
                Password: import.meta.env.VITE_API_Guest_Password,
            });
            
            // clearGuestForm()
            
            if (response.status === 200) {
                //open modal
                setAuth(response.data)
                console.log("guest response: ", response)
                navigate("/dashboard")
            }
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <form className="login-form" onSubmit={handleGuestFormSubmit}>
            {/*<label htmlFor="username">Username</label>*/}
            {/*<input*/}
            {/*    type="username"*/}
            {/*    id="username"*/}
            {/*    value={guestForm.username}*/}
            {/*    onChange={handleGuestFormChange}*/}
            {/*    required*/}
            {/*/>*/}
            {/*<label htmlFor="email">Email</label>*/}
            {/*<input*/}
            {/*    type="email"*/}
            {/*    id="email"*/}
            {/*    value={guestForm.email}*/}
            {/*    onChange={handleGuestFormChange}*/}
            {/*    required*/}
            {/*/>*/}
            {/*<label htmlFor="password">Password</label>*/}
            {/*<input*/}
            {/*    type="password"*/}
            {/*    id="password"*/}
            {/*    value={guestForm.password}*/}
            {/*    onChange={handleGuestFormChange}*/}
            {/*    required*/}
            {/*/>*/}
            {/*no modal*/}
            <button type="submit">Guest</button>
        </form>
    )
}