import { useState } from "react";
import { Link } from "react-router";

export function NestedListItem({children, entry}) {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    function toggleListItem() {
        setIsListOpen(!isListOpen);
    }

    return (
        <>
            <li>
                {/*<Link to="/dashboard/:year">{entry.year}</Link>*/}
                {/*<Link to={`/dashboard/${year.year}`}>{entry.year}</Link>*/}
                <Link to={`/dashboard/${entry.year}`}>{entry.year}</Link>
                <div onClick={toggleListItem}>
                    <span>
                    {isListOpen ? '▼' : '▶'}
                    </span>
                </div>
                {isListOpen && (
                    <ul>
                        {entry.months.map((month) => (
                            // <li key={month}><Link to="/dashboard/:year/:month">{month}</Link></li>
                            <li key={month}><Link to={`/dashboard/${year.year}/${month}`}>{month}</Link></li>
                        ))}
                    </ul>
                )}
            </li>
        </>
    )
} 