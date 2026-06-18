import { useState } from "react";
import { Link } from "react-router";

export function NestedListItem({children, entry}) {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    function toggleListItem() {
        setIsListOpen(!isListOpen);
    }
    console.log("entries:", entry)

    return (
        <>
            <li>
                <Link to={`/dashboard/${entry.year}`}>{entry.year}</Link>
                <div onClick={toggleListItem}>
                    <span>
                    {isListOpen ? '▼' : '▶'}
                    </span>
                </div>
                {isListOpen && (
                    <ul>
                        {entry.months.map((month) => (
                            <li key={month}><Link to={`/dashboard/${entry.year}/${month}`}>{month}</Link></li>
                        ))}
                    </ul>
                )}
            </li>
        </>
    )
} 