import { getMonthData } from "../api/months"
import {useLoaderData, useParams} from "react-router";

export function Month() {
    const { year, month } = useParams()
    const expenseList = useLoaderData()
    console.log("expense list", expenseList)
    
    console.log("month:", month)
    
    return (
        <>
            <div className="month-wrapper">
                <div className="month-title-wrapper">
                    {/*<h3>Month</h3>*/}
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
                        {expenseList.map(expense => (
                            <tr key={expense.id}>
                                <td>{expense.created_at}</td>
                                <td>{expense.place}</td>
                                <td>{expense.description}</td>
                                <td>{expense.amount}</td>
                            </tr>
                        ))}
                            {/*<tr>*/}
                            {/*    <td>Date 1</td>*/}
                            {/*    <td>Place 2</td>*/}
                            {/*    <td>Description 3</td>*/}
                            {/*    <td>Amount 4</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Date 1</td>*/}
                            {/*    <td>Place 2</td>*/}
                            {/*    <td>Description 3</td>*/}
                            {/*    <td>Amount 4</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Date 3</td>*/}
                            {/*    <td>Place 5</td>*/}
                            {/*    <td>Description 2</td>*/}
                            {/*    <td>Amount 1</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Date 5</td>*/}
                            {/*    <td>Place 3</td>*/}
                            {/*    <td>Description 3</td>*/}
                            {/*    <td>Amount 2</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Date 5</td>*/}
                            {/*    <td>Place 4</td>*/}
                            {/*    <td>Description 3</td>*/}
                            {/*    <td>Amount 2</td>*/}
                            {/*</tr>*/}
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
//
// export async function monthLoader({ params }) {
//     const { year, month } = params;
//     //get all records for year and month
//     const yearString = parseInt(year, 10);
//     console.log("year str:", yearString);
//
//     const monthNames = [
//         "january", "february", "march", "april", "may", "june",
//         "july", "august", "september", "october", "november", "december"
//     ];
//
//     const monthLower = month.toLowerCase();
//     const monthIndex = monthNames.indexOf(monthLower);
//     console.log("month index:", monthIndex); 
//
//
//     const date = new Date(yearString, monthIndex);
//     console.log("full date:", date); 
//
//     const yr = date.getFullYear();
//     console.log("yr:", yr)
//    
//     const m = date.getMonth();
//
//     const first = new Date(yr, m, 1);
//     console.log("first day:", first);
//
//     const last = new Date(yr, m + 1, 1);
//     console.log("last day:", last);
//
//     const begin = first.toISOString().split('T')[0];
//     // const begin = first.toISOString()
//     console.log("begin:", begin);
//
//     const end = last.toISOString().split('T')[0];
//     // const end = last.toISOString()
//     console.log("end:", end);
//
//     return await getMonthData(begin, end)
// }

export async function monthLoader({ params }) {
    const { year, month } = params;
    
    const id = 1;

    if (!year || !month) {
        throw new Response("Missing year or month parameter", { status: 400 });
    }

    const yearString = parseInt(year, 10);

    // 1. Define month names (lowercase for easy comparison)
    const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    // 2. Normalize input and find index
    const monthLower = month.toLowerCase();
    const monthIndex = monthNames.indexOf(monthLower);

    // 3. Validate conversion
    if (isNaN(yearString) || monthIndex === -1) {
        console.error(`Invalid date parts: year="${year}", month="${month}"`);
        throw new Response("Invalid year or month format", { status: 400 });
    }

    // 4. Create date (monthIndex is already 0-based: 0=Jan, 8=Sept)
    const date = new Date(yearString, monthIndex);

    if (isNaN(date.getTime())) {
        throw new Response("Invalid date constructed", { status: 400 });
    }

    const yr = date.getFullYear();
    const m = date.getMonth();

    const first = new Date(yr, m, 1);
    const last = new Date(yr, m + 1, 0); // Last day of current month

    const begin = first.toISOString().split('T')[0];
    const end = last.toISOString().split('T')[0];

    return await getMonthData(begin, end, id);
}   