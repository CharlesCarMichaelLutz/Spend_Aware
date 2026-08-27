import {useEffect, useState, useRef } from "react";
import { type Expense } from "../types/types"
// import { Paginate } from "../components/Paginate"
import { baseApi } from "../api/base"
import { ExpenseItem } from "../components/ExpenseItem"
import { useStore } from "../store/useStore.ts"

export function Dashboard() {
    const user  = useStore( state => state.auth)
    console.log("zustand user: ", user);
    
    const [expenseList, setExpenseList] = useState<Expense[]>([]);
    
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

    type CreateExpenseProps = {
        user_id : number
        created_at : string
        description : string
        place: string
        amount: number
    }

    async function createExpense(e) {
        e.preventDefault()
        const currentExpense = {
            user_id: user.id,
            created_at: new Date().toISOString(),
            description: expenseRefs.description.current.value,
            place: expenseRefs.place.current.value,
            amount: expenseRefs.amount.current.value
        }
        try{
                const response = await baseApi.post<Expense>("expenses", {
                UserId: user.id,
                Place: currentExpense.place,
                Description: currentExpense.description,
                Amount: currentExpense.amount,
                CreatedAt: currentExpense.created_at, 
            })
            console.log("exp res :",response)
            
            if (response.status === 200) {
                setExpenseList(list => [...list, response.data])
                clearExpenseRefs()
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const now = new Date();
    const year = now.getFullYear()
    const firstDay = new Date(year, now.getMonth(), 1)
    const lastDay = new Date(year, now.getMonth() + 1, 1)
    
    type ExpenseListProps = {
        start : string
        end : string
        id : number
    }
    // get expenses for the current month with axios and useEffect initially then implement with loader
    useEffect(() => {
        if(!user) return; 
            async function getCurrentMonthExpenseList(start: Date, end: Date, id: number):Promise<void> {
                try {
                    const startStr = start.toISOString().split('T')[0];
                    const endStr = end.toISOString().split('T')[0];

                        const response = await baseApi.post<Expense>("expenses/load", {
                        UserId: user.id,
                        StartDate: startStr,
                        EndDate: endStr,
                    })
                    
                    if (response.status === 200) {
                        setExpenseList(response.data || [])
                        console.log("load expense list: ", response)
                    }
                } catch (err) {
                    console.error(err);
                }
            }
                getCurrentMonthExpenseList(firstDay, lastDay, user.id);
    // }, [user])
}, [])
    
    return (
        <>
            <section className="dashboard">
                <div className="dashboard-top">
                    <form onSubmit={createExpense}>
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
                                    return <ExpenseItem key={expense.id} {...expense} setExpenseList={setExpenseList} />
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
                <div className="dashboard-bottom">Pagination Bar</div>
                {/*<Paginate className="dashboard-bottom" />*/}
            </section>
        </>
    )
}

