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
                    <header className="header-panel">
                            <div className="header-left">
                                <button onClick={toggleSidebar} className="toggle-btn">
                                    {isCollapsed ? "open" : "close"}
                                </button>
                            </div>
                            <div className="header-middle">
                                <div className="currency-group">
                                    <img height={40} width={34} className="currency-image" />
                                    <img height={40} width={34} className="currency-image" />
                                    <img height={40} width={34} className="currency-image" />
                                </div>
                                <h2>Spend Aware</h2>
                                <div className="currency-group">
                                    <img height={40} width={34} className="currency-image" />
                                    <img height={40} width={34} className="currency-image" />
                                    <img height={40} width={34} className="currency-image" />
                                </div>
                            </div>
                            <div className="header-right">
                                <button>logout</button>
                            </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}