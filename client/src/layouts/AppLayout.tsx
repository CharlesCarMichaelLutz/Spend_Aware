import { Outlet, NavLink } from "react-router"
import { useEffect, useState } from "react";
import type { YearEntry } from "../types/types"
import { useStore } from "../store/useStore.ts"

export function AppLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [yearList, setYearList] = useState([]);
    const user = useStore(state => state.auth);
    console.log("user", user);

    function toggleSidebar() {
        setIsCollapsed(prev => !prev);
    }

    //change this to use auth object from Zustand store, then create year date list
    useEffect(() => {
        function loadDate() {
            const userCreatedDate = user.createdAt;
                
            const startDate = new Date(userCreatedDate);
            const timeRightNow = new Date();

            const items = []
            console.log("items", items);

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
        }
        loadDate()
    }, [user]);

    return (
        <>
            <div className="app-layout-container">
                <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                    <div className="sidebar-container">
                        <div className="sidebar-user">
                            <img height={60} width={40} className="user-identicon"/>
                            {/*<h2 className="sidebar-username">UserFive</h2>*/}
                            <h2 className="sidebar-username">{user.username}</h2>
                            
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

