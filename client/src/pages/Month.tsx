import { useParams } from "react-router";
import { useStore } from "../store/useStore.ts"
import { type Expense } from "../types/types"
import { baseApi } from "../api/base"
import { useState, useEffect } from "react";

export function Month() {
    const { year, month } = useParams()
    
    const user = useStore(state => state.auth)
    
    const [expenseList, setExpenseList] = useState<Expense[]>([])
    
    useEffect(() => {
            async function fetchExpenses():Promise<void> {
                
                const userId = user.id
                
                params: { year, month }

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
            const first = new Date(yr, m, 2);
            const last = new Date(yr, m + 1, 2);

            const begin = first.toISOString().split('T')[0];
            const end = last.toISOString().split('T')[0];
            
            try {
                console.log("past month load request :", user.id,  begin, end);
                
                
                const response = await baseApi.post<Expense>("expenses/load", {
                    UserId: user.id,
                    StartDate: begin,
                    EndDate: end,
                })
                
                if(response.status === 200) {
                    setExpenseList(response.data || [])
                    console.log("load month expense list: ", response)
                }
                
            } catch(error) {
                console.error(error);
            }
        }
        fetchExpenses()
    }, [month])
    
    // console.log("year : ", year)
    // console.log("type :", typeof year)
    //
    // console.log("month : ", month)
    // console.log("type :", typeof month)
    
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
                        // )) : <p>No Expenses entered for {month} </p>
                        // )) : <tr><span>No Expenses entered for {month}</span></tr>
                        //     )) : <tr>No Expenses entered for {month}</tr>
                            )) : <tr>{month}</tr>
                            
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
