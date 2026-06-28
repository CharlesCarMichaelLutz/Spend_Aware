import { getMonthData } from "../api/months"
import {useLoaderData, useParams} from "react-router";

export function Month() {
    const { year, month } = useParams()
    const expenseList = useLoaderData()
    
    return (
        <>
            <div className="month-wrapper">
                <div className="month-title-wrapper">
                    <h3>{year} - {month}</h3>
                    <button>Get Report</button>
                </div>
                <div className="month-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Place</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                        {expenseList.length > 0 ? expenseList.map(expense => (
                            <tr key={expense.id}>
                                <td>{expense.created_at}</td>
                                <td>{expense.place}</td>
                                <td>{expense.description}</td>
                                <td>{expense.amount}</td>
                            </tr>
                        )) : <p>No Expenses entered for {month} </p>
                        }
                        </tbody>

                        <tfoot>
                            <tr>
                                <th>Month Name</th>
                                <th>Total</th>
                                <th>Amount</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="month-pagination">Pagination Bar</div>
            </div>
        </>
    )
}

export async function monthLoader({ params }) {
    const { year, month } = params;
    
    const id = 3;

    if (!year || !month) {
        throw new Response("Missing year or month parameter", { status: 400 });
    }

    const yearString = parseInt(year, 10);

    const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const monthLower = month.toLowerCase();
    const monthIndex = monthNames.indexOf(monthLower);

    if (isNaN(yearString) || monthIndex === -1) {
        console.error(`Invalid date parts: year="${year}", month="${month}"`);
        throw new Response("Invalid year or month format", { status: 400 });
    }

    const date = new Date(yearString, monthIndex);

    if (isNaN(date.getTime())) {
        throw new Response("Invalid date constructed", { status: 400 });
    }

    const yr = date.getFullYear();
    const m = date.getMonth();

    const first = new Date(yr, m, 1);
    const last = new Date(yr, m + 1, 0);

    const begin = first.toISOString().split('T')[0];
    const end = last.toISOString().split('T')[0];

    return await getMonthData(begin, end, id);
}   