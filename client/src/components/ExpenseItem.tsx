import {useRef, useState} from "react";
import { baseApi } from "../api/base"
import type { Expense } from "../types/types"

export function ExpenseItem({ id, user_id, created_at, description, place, amount, setExpenseList }) {
    const [isEditing, setIsEditing] = useState(false);

    const updateExpenseRefs : Expense = {
        user_id: id,
        created_at: useRef(""),
        description: useRef(""),
        place: useRef(""),
        amount: useRef("")
    }

    async function updateExpense(id) {
        const currentUpdateExpense : Expense = {
            id: id,
            user_id: user_id,
            created_at: updateExpenseRefs.created_at.current.value,
            description: updateExpenseRefs.description.current.value,
            place: updateExpenseRefs.place.current.value,
            amount: updateExpenseRefs.amount.current.value
        }
        try{
            // const response = await baseApi.post(`expenses/${expense}`, currentUpdateExpense);
            //
            // if(!response.ok) {
            //     throw new Error("Failed to update expense");
            // }
            //
            // const currentUpdateExpenseResponse = await response.json();

            setExpenseList((list) =>
                list.map((expense) => expense.id === currentUpdateExpense.id ? currentUpdateExpense : expense)
            )

            setIsEditing(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <tr>
            {isEditing ? (
                <>
                    <td><input type="date" name="edit-date" defaultValue={created_at} ref={updateExpenseRefs.created_at} disabled/></td>
                    <td><input type="text" name="edit-description" defaultValue={description} ref={updateExpenseRefs.description} /></td>
                    <td><input type="text" name="edit-place" defaultValue={place} ref={updateExpenseRefs.place} /></td>
                    <td><input type="number" name="edit-amount"  defaultValue={amount} ref={updateExpenseRefs.amount} /></td>
                    <td><button type="submit" onClick={() => updateExpense(id)}>Save</button></td>
                </>
            ) : (
                <>
                    <td>{created_at}</td>
                    <td>{place}</td>
                    <td>{description}</td>
                    <td>{amount}</td>
                    <td>
                        <button onClick={ () => setIsEditing(true)}>Edit</button>
                    </td>
                    <td>
                        <button onClick={() => deleteExpense(id)}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    )
}