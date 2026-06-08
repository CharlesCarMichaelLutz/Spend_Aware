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
                <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                    <div className="sidebar-container">
                        <div className="sidebar-user">
                                <img height={60} width={40} className="user-identicon"/>
                                <h2 className="sidebar-username">UserFive</h2>
                        </div>
                        <div className="sidebar-menu">
                            <nav>
                                <h3>Year</h3>
                                <ul>
                                    <li>2026
                                        <ul>
                                            <li>January</li>
                                            <li>February</li>
                                            <li>March</li>
                                            <li>April</li>
                                        </ul>
                                    </li>
                                    <li>2025
                                        <ul>
                                            <li>January</li>
                                            <li>February</li>
                                            <li>March</li>
                                            <li>April</li>
                                        </ul>
                                    </li>
                                    <li>2024
                                        <ul>
                                            <li>January</li>
                                            <li>February</li>
                                            <li>March</li>
                                            <li>April</li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </aside>
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
                                <h1>Spend Aware</h1>
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