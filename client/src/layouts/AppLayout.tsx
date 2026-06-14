import { Outlet } from "react-router"
import { useEffect, useState } from "react";
import type { YearEntry } from "../types/types"

export function AppLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [dateList, setDateList] = useState<YearEntry[]>([]);

    const id = 1;

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
                const currentDate = new Date();

                const items: {year: number, months: string[]}[] = []
                let current = new Date(startDate.getFullYear(), startDate.getMonth());

                while (current <= currentDate) {
                    const year = current.getFullYear();
                    const monthName = current.toLocaleString('default', { month: 'long' });

                    let yearEntry = items.find((item) => item.year === year);

                    if (!yearEntry) {
                        yearEntry = { year, months: [] };
                        items.push(yearEntry);
                    }
                    
                    if(!yearEntry.months.includes(monthName)) {
                        yearEntry.months.push(monthName);
                    }

                    current.setMonth(current.getMonth() + 1);
                }

                setDateList(items);
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
                                        {dateList.map((entry) => (
                                            <li key={entry.year}>
                                                {entry.year}
                                                <ul>
                                                    {entry.months.map((month) => (
                                                        <li key={month}>{month}</li>
                                                    ))}
                                                </ul>
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