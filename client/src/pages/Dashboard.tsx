import {useEffect, useState, useRef } from "react";
import type { User, Expense } from "../types/types"
// import { Paginate } from "../components/Paginate"
import { baseApi } from "../api/base"
import { ExpenseItem } from "../components/ExpenseItem"
import { useStore } from "../store/useStore.ts"

export function Dashboard() {
    // const { auth } = useStore()
    const auth  = useStore( state => state.auth)
    console.log("zustand user: ", auth);
    
    // const id = 1;
    // const id = 2;
    const id = 3;
    
    const [expenseList, setExpenseList] = useState<Expense[]>([]);
    const [user, setUser] = useState<User | null>(null);

    // const showUserInfo = useStore.getState().auth;

    const expenseRefs = {
        user_id: id,
        created_at: useRef(""),
        description: useRef(""),
        place: useRef(""),
        amount: useRef("")
    }

    function clearExpenseRecord() {
        setExpenseRecord({})
    }
    
    async function createExpense() {
        const currentExpense = {
            user_id: id,
            created_at: expenseRefs.created_at.current.value,
            description: expenseRefs.description.current.value,
            place: expenseRefs.place.current.value,
            amount: expenseRefs.amount.current.value
        }
        try{
            const response = await fetch(`http://localhost:8000/expenses`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentExpense),
            })

            if(!response.ok) {
                throw new Error("Failed to create expense");
            }
            
            const currentExpenseResponse = await response.json();
            
            setExpenseList((list) => [...list, currentExpenseResponse]);
            clearExpenseRecord();
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if(!user) return; 
            //use the year and month to get expenses for that user from data source
            async function getExpensesByUserId(start: Date, end: Date, id: number):Promise<void> {
                try {
                    const startStr = start.toISOString().split('T')[0];
                    const endStr = end.toISOString().split('T')[0];
                    
                    const response = await fetch(`http://localhost:8000/expenses?user_id=${id}&created_at_gt=${startStr}&created_at_lte=${endStr}`)
    
                    if(!response.ok) {
                        throw new Error("Failed to fetch expenses");
                    }
    
                    const data = await response.json();

                    setExpenseList(data || [])
                }
                catch(err) {
                    console.error(err);
                }
        }
        getExpensesByUserId(firstDay, lastDay, id);
    }, [user])

    useEffect(() => {
        async function getUserById(id: number):Promise<void> {
            try {
                const response = await fetch(`http://localhost:8000/users/${id}`)

                if(!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const userData: User = await response.json();
                setUser({userData})
            }
            catch(err) {
                console.error(err);
            }
        }
        getUserById(id)
    },[id])
    
    //filter current month by Date constructor
    const now = new Date();
    const year = now.getFullYear()
    const firstDay = new Date(year, now.getMonth(), 1)
    const lastDay = new Date(year, now.getMonth() + 1, 1)
    
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

