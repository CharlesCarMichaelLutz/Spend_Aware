import { Outlet } from "react-router"
import {useState} from "react";

export function AppLayout() {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
    
    function toggleSidebar() {
        setIsCollapsed(!isCollapsed)
    }
    
    return (
        <>
            <div className="app-layout-container">
                <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}></aside>
                <div className="right-panel">
                    <header><button onClick={toggleSidebar} className="toggle-btn">{isCollapsed ? "open" : "close"}</button></header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}