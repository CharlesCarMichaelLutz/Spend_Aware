import { useState } from "react";
import {Navigate, useLocation} from "react-router";

export function NestedListItem({children, entry}) {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);
    const location = useLocation();

    function toggleListItem() {
        setIsListOpen(!isListOpen);
    }

    function goToMonthExpensePage() {
        < Navigate to="/" state={{ from: location }} />
    }
    return (
        <>
            <li>
                <div onClick={toggleListItem}>
                    {entry.year}
                    <span>
                    {isListOpen ? '▼' : '▶'}
                    </span>
                </div>
                {isListOpen && (
                    <ul>
                        {/*{children}*/}
                        {entry.months.map((month) => (
                            <li key={month}><button onClick={goToMonthExpensePage}>{month}</button></li>
                        ))}
                    </ul>
                )}
            </li>
        </>
    )
} 