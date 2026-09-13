import {useEffect, useState, useRef } from "react";
import { type Expense } from "../types/types"
import { type ExpenseResponse } from "../types/types"
import Paginate from "../components/Paginate"
import { baseApi } from "../api/base"
import { ExpenseItem } from "../components/ExpenseItem"
import { useStore } from "../store/useStore.ts"
import { format, parseISO } from "date-fns"

export function Dashboard() {
    const user  = useStore( state => state.auth)
    console.log("zustand user: ", user);
    const [isSaving, setIsSaving] = useState(false);

    const [expenseList, setExpenseList] = useState<Expense[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const expensesPerPage = 10;
    
    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }

    function clearExpenseRefs() {
        expenseRefs.created_at.current.value = "";
        expenseRefs.description.current.value = "";
        expenseRefs.place.current.value = "";
        expenseRefs.amount.current.value = "";
    }

    const expenseRefs = {
        created_at: useRef(""),
        description: useRef(""),
        place: useRef(""),
        amount: useRef("")
    }

    async function createExpense(event: React.MouseEvent, currPage: number, expPerPage: number ) {
        event.preventDefault()

        const currentExpense = {
            user_id: user.id,
            created_at: new Date().toISOString(),
            description: expenseRefs.description.current.value,
            place: expenseRefs.place.current.value,
            amount: expenseRefs.amount.current.value
        }
        try{
            const response = await baseApi.post<ExpenseResponse>("expenses", {
                UserId: user.id,
                Place: currentExpense.place,
                Description: currentExpense.description,
                Amount: currentExpense.amount,
                CreatedAt: currentExpense.created_at,
                Page: currPage + 1,
                PageSize: expPerPage,
            })
            console.log("create exp res list :",response)


            if (response.status === 200) {
                setExpenseList(response.data.data || [])
                setPageCount(Math.ceil(response.data.totalCount/expensesPerPage))
                clearExpenseRefs()

                console.log("set total pages create :", pageCount)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const now = new Date();
    const year = now.getFullYear()
    const firstDay = new Date(year, now.getMonth(), 2)
    const lastDay = new Date(year, now.getMonth() + 1, 2)

    // get expenses for the current month with axios and useEffect initially then implement with loader
    useEffect(() => {
        if(!user) return;
        async function getCurrentMonthExpenseList(start: Date, end: Date, id: number, currPage: number, expPerPage: number):Promise<void> {

            try {
                const startStr = start.toISOString().split('T')[0];
                const endStr = end.toISOString().split('T')[0];

                // console.log("current month load request :", user.id,  startStr, endStr);
                console.log("total pages type :", typeof totalPages)

                const response = await baseApi.post<ExpenseResponse>("expenses/load", {
                    UserId: user.id,
                    StartDate: startStr,
                    EndDate: endStr,
                    Page: currPage + 1,
                    PageSize: expPerPage,
                })

                console.log("initial load res :", response)

                if (response.status === 200) {
                    setExpenseList(response.data.data || [])
                    setPageCount( Math.ceil(response.data.totalCount/expensesPerPage))
                    
                    console.log("set total pages load :", pageCount)
                    // console.log("load expense list: ", response)
                }
            } catch (err) {
                console.error(err);
            }
        }
        getCurrentMonthExpenseList(firstDay, lastDay, user.id, currentPage, expensesPerPage);
        // }, [user])
    }, [currentPage])

    async function deleteExpense(id: number, currPage: number, expPerPage: number) {
        setIsSaving(true);
        try{
            const response = await baseApi.post<ExpenseResponse>(`expenses/delete`, {
                UserId: user.id,
                Id: id,
                Page: currPage + 1,
                PageSize: expPerPage,
            })
            console.log("total pages type :", typeof totalPages)


            if(response.status === 200) {
                setExpenseList(response.data.data || [])
                setPageCount(Math.ceil(response.data.totalCount/expensesPerPage))
                setIsSaving(false);
                
                console.log("set total pages delete :", pageCount)
            }
        } catch (error) {
            console.log(error);
        }finally {
            setIsSaving(false)
        }
    }

    return (
        <>
            <section className="dashboard">
                <div className="dashboard-top">
                            <form onSubmit={(e) => createExpense(e, currentPage, expensesPerPage)}>
                        <label >Date:</label>
                        <input
                            type="date"
                            name="date"
                            ref={expenseRefs.created_at}
                            required
                        />
                        <label >Place:</label>
                        <input
                            type="text"
                            name="place"
                            ref={expenseRefs.place}
                            placeholder='enter place'
                            required
                        />
                        <label >Description:</label>
                        <input
                            type="text"
                            name="description"
                            ref={expenseRefs.description}
                            placeholder='enter description'
                            required
                        />
                        <label >Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            ref={expenseRefs.amount}
                            placeholder='enter amount'
                            required
                        />
                        <button className="submit">Submit</button>
                    </form>
                </div>
                <div className="dashboard-middle">
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Place</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {expenseList.map((expense) => {
                            return <ExpenseItem
                                key={expense.id}
                                {...expense}
                                setExpenseList={setExpenseList}
                                currentPage={currentPage}
                                expensesPerPage={expensesPerPage}
                                isSaving={isSaving}
                                setIsSaving={setIsSaving}
                                deleteExpense={deleteExpense}
                            />
                        })}
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
                <div className="dashboard-bottom">
                    <Paginate
                        // className="dashboard-bottom" 
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                    />
                </div>
            </section>
        </>
    )
}

