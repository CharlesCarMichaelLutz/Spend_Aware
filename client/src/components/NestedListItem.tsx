import { useState } from "react";
import { NavLink } from "react-router";

export function NestedListItem({children, entry}) {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    function toggleListItem() {
        setIsListOpen(!isListOpen);
    }
    
    return (
        <>
            <li>
                <NavLink to={`/dashboard/${entry.year}`}>
                    {entry.year}
                </NavLink>
                <div onClick={toggleListItem}>
                    <span>
                    {isListOpen ? '▼' : '▶'}
                    </span>
                </div>
                {isListOpen && (
                    <ul>
                        {entry.months.map((month) => (
                            <li key={month}>
                                <NavLink to={`/dashboard/${entry.year}/${month}`}>{month}</NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </>
    )
} 