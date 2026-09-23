import { useParams } from "react-router";
import { useStore } from "../store/useStore.ts"
import { type Expense } from "../types/types"
import { baseApi } from "../api/base"
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import Paginate from "../components/Paginate.tsx"
import { type ExpenseResponse } from "../types/types.tsx"

export function Month() {
    const { year, month } = useParams()

    const user = useStore(state => state.auth)
    const [expenseList, setExpenseList] = useState<Expense[]>([])
    
    const [monthPageCount, setMonthPageCount] = useState(0)
    const [currentMonthPage, setCurrentMonthPage] = useState(0)
    const monthExpensesPerPage = 10
    
    const handlePageClick = (data) => {
        setCurrentMonthPage(data.selected)
    }

    useEffect(() => {
        async function fetchExpenses(currPage: number, expPerPage: number):Promise<void> {

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
                    const response = await baseApi.post<ExpenseResponse>("expenses/load", {
                    UserId: user.id,
                    StartDate: begin,
                    EndDate: end,
                    Page: currPage + 1,
                    PageSize: expPerPage
                })

                if(response.status === 200) {
                    setExpenseList(response.data.data || [])
                    setMonthPageCount(Math.ceil(response.data.totalCount/monthExpensesPerPage))
                    console.log("load month expense list: ", response)
                }

            } catch(error) {
                console.error(error);
            }
        }
        fetchExpenses(currentMonthPage, monthExpensesPerPage)
    }, [month, currentMonthPage])

    return (
        <>
            <div className="month-wrapper">
                <div className="month-title-wrapper">
                    <h3>{year} - {month}</h3>
                    <button>Get Report</button>
                </div>
                <div className="month-table-wrapper">
                    {expenseList.length > 0 || monthPageCount > 0 ? (
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
                                    <td>{format(parseISO(expense.createdAt), "MM-dd-yyyy")}</td>
                                    <td>{expense.place}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> ) : (
                        <p>There are no expenses for {month}</p>
                        )
                    }
                </div>
                <div className="month-pagination">
                        <Paginate
                            pageCount={monthPageCount}
                            onPageChange={handlePageClick}
                        />
                </div>
            </div>
        </>
    )
}

