import { Outlet, NavLink } from "react-router"
import { useEffect, useState } from "react";
import type { YearEntry } from "../types/types"

export function AppLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [yearList, setYearList] = useState([]);
    const id = 3;

    function toggleSidebar() {
        setIsCollapsed(prev => !prev);
    }

    useEffect(() => {
        async function getUserAndCalculate(): Promise<void> {
            try {
                const response = await fetch(`http://localhost:8000/users/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const data = await response.json();
                console.log("user:", data);

                const createdDateStr = data.created_at;
                const startDate = new Date(createdDateStr);
                const timeRightNow = new Date();

                const items = []
                
                let current = new Date(startDate.getFullYear(), startDate.getMonth());

                while (current <= timeRightNow) {
                    const year = current.getFullYear();

                    let yearEntry = items.find((item) => item === year);

                    if (!yearEntry) {
                        yearEntry = year ;
                        items.push(yearEntry);
                    }

                    current.setFullYear(current.getFullYear() + 1);
                }

                setYearList(items);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        }

        getUserAndCalculate()
    }, [id]);

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
                                    {yearList.map((year) => (
                                        <li key={year}>
                                            <NavLink to={`/dashboard/${year}`}>{year}</NavLink>
                                        </li>
                                    ))}
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

