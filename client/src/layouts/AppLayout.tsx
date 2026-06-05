import { Outlet } from "react-router"

export function AppLayout() {
    return (
        <>
            <div className="container">
                <h1 className="text-medium">AppLayout</h1>
                {/* title bar
                aside with navigation */}
                <Outlet />
            </div>
        </>
    )
}