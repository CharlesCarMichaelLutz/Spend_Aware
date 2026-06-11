import {useEffect, useState} from "react";
import { User, Expense } from "../types/types"

export function Dashboard() {
    const [expenseData, setExpenseData] = useState<Expense[]>([]);
    const [user, setUser] = useState<User | null>(null);
    
    // function GetCurrentMonthAndYear {
    //    
    // }
    
    useEffect(() => {
        async function GetUserById(user_id: number) {
            try {
                const response = await fetch(`https://api.github.com/users/${year}/${month}/${year}`, {})
                
                if(!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                
                const userData: User = await response.json();
                setUser({user:userData})
            }
            catch(err) {
                console.error(err);
            }
        }
        GetUserById(1)
    },[user_id])
    
    //pass in the start/end date, and user_id
    
    useEffect(() => {
        if(user != null) {
            //use the year and month to get expenses for that user from data source
            async function GetExpensesByUserId(start: Date, end: Date, user_id: number) {
                try {
                    //filter expense for specific date with TS
                    const response = await fetch(`https://api.github.com/users/${year}/${month}/${year}`, {})
    
                    if(!response.ok) {
                        throw new Error("Failed to fetch expenses");
                    }
    
                    const expenseList: Expense[] = await response.json();
                    //set the expense in state with setExpenseData
                    setExpenseData({expenseList:expenseList})
                }
                catch(err) {
                    console.error(err);
                }
            }
        }
        GetExpensesByUserId(firstDay, lastDay, user.id);
    }, [user_id])
    
    const date: Date = new Date();
    console.log(date)
    const firstDay: Date = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log(firstDay)
    const lastDay: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(lastDay)
    
    
    //display expenses from above request in table 
    
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
                            {/*<tr>*/}
                            {/*    <td>Date 3</td>*/}
                            {/*    <td>Place 1</td>*/}
                            {/*    <td>Description 5</td>*/}
                            {/*    <td>Amount 2</td>*/}
                            {/*    <td>*/}
                            {/*        <button>Edit</button>*/}
                            {/*    </td>*/}
                            {/*    <td>*/}
                            {/*        <button>Delete</button>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Date 4</td>*/}
                            {/*    <td>Place 2</td>*/}
                            {/*    <td>Description 3</td>*/}
                            {/*    <td>Amount 5</td>*/}
                            {/*    <td>*/}
                            {/*        <button>Edit</button>*/}
                            {/*    </td>*/}
                            {/*    <td>*/}
                            {/*        <button>Delete</button>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Date 2</td>*/}
                            {/*    <td>Place 1</td>*/}
                            {/*    <td>Description 4</td>*/}
                            {/*    <td>Amount 3</td>*/}
                            {/*    <td>*/}
                            {/*        <button>Edit</button>*/}
                            {/*    </td>*/}
                            {/*    <td>*/}
                            {/*        <button>Delete</button>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Date 7</td>*/}
                            {/*    <td>Place 4</td>*/}
                            {/*    <td>Description 2</td>*/}
                            {/*    <td>Amount 6</td>*/}
                            {/*    <td>*/}
                            {/*        <button>Edit</button>*/}
                            {/*    </td>*/}
                            {/*    <td>*/}
                            {/*        <button>Delete</button>*/}
                            {/*    </td>*/}
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
                <div className="dashboard-bottom">Pagination Bar</div>
            </section>
        </>
    )
}