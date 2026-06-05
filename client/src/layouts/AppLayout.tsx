import { Outlet } from "react-router"

export function AppLayout() {
    return (
        <>
            <h1>AppLayout</h1>
            <Outlet />
        </>
    )
}