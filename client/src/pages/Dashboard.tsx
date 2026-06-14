import {useEffect, useState} from "react";
import type { User, Expense } from "../types/types"

export function Dashboard() {
    const [expenseData, setExpenseData] = useState<Expense[]>([]);
    const [user, setUser] = useState<User | null>(null);
    

    // const id = 1;
    // const id = 2;
    const id = 3;
    
    //pass in the start/end date, and user_id
    
    useEffect(() => {
        if(!user) return; 
            //use the year and month to get expenses for that user from data source
            async function getExpensesByUserId(start: Date, end: Date, id: number):Promise<void> {
                try {
                    const startStr = start.toISOString().split('T')[0];
                    const endStr = end.toISOString().split('T')[0];
                    
                    //filter expense for specific date with TS
                    const response = await fetch(`http://localhost:8000/expenses?user_id=${id}&created_at_gt=${startStr}&created_at_lte=${endStr}`)
    
                    if(!response.ok) {
                        throw new Error("Failed to fetch expenses");
                    }
    
                    const data = await response.json();
                    console.log("API response:", data);
                    console.log("Is array?", Array.isArray(data));
                    setExpenseData(data || [])
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
                console.log("user :", userData)
            }
            catch(err) {
                console.error(err);
            }
        }
        getUserById(id)
    },[id])

    //previous month March
    // const now = new Date();
    // const year = now.getFullYear()
    // const firstDay = new Date(year, now.getMonth() - 3, 1)
    // console.log(firstDay)
    // const lastDay = new Date(year, now.getMonth() - 2, 1)
    // console.log(lastDay)
    
    //previous month April
    // const now = new Date();
    // const year = now.getFullYear()
    // const firstDay = new Date(year, now.getMonth() - 2, 1)
    // console.log(firstDay)
    // const lastDay = new Date(year, now.getMonth() - 1, 1)
    // console.log(lastDay)
    
    //previous month May
    // const now = new Date();
    // const year = now.getFullYear()
    // const firstDay = new Date(year, now.getMonth() - 1, 1)
    // console.log(firstDay)
    // const lastDay = new Date(year, now.getMonth() , 1)
    // console.log(lastDay)
    
    //current month June
    const now = new Date();
    const year = now.getFullYear()
    const firstDay = new Date(year, now.getMonth(), 1)
    console.log(firstDay)
    const lastDay = new Date(year, now.getMonth() + 1, 1)
    console.log(lastDay)
    
    return (
        <>
            <section className="dashboard">
                <div className="dashboard-top">
                    <form>
                        <label >Date:</label>
                        <input
                            type="date"
                            name="date"
                        />
                        <label >Description:</label>
                        <input
                            type="text"
                            name="description"
                            placeholder='enter description' />
                        <label >Place:</label>
                        <input
                            type="text"
                            name="place"
                            placeholder='enter place' />
                        <label >Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            placeholder='enter amount' />
                        <input
                            type="submit"
                            className="submit"
                            id="submit" />
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
                        {/*display expenses from above request in table*/}
                        <tbody>
                            {expenseData.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.created_at}</td>
                                    <td>{e.place}</td>
                                    <td>{e.description}</td>
                                    <td>{e.amount}</td>
                                    <td>
                                        <button>Edit</button>
                                    </td>
                                    <td>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            ))}
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
            </section>
        </>
    )
}