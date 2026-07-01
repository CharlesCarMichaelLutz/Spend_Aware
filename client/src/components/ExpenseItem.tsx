import {useRef, useState} from "react";
import { baseApi } from "../api/base"

export function ExpenseItem({ id, created_at, description, place, amount, setExpenseList }) {
    const [isEditing, setIsEditing] = useState(false);

    const updateExpenseRefs = {
        user_id: id,
        date: useRef(""),
        description: useRef(""),
        place: useRef(""),
        amount: useRef("")
    }

    async function updateExpense(e) {
        e.preventDefault();
        const currentUpdateExpense = {
            user_id: id,
            date: updateExpenseRefs.date.current.value,
            description: updateExpenseRefs.description.current.value,
            place: updateExpenseRefs.place.current.value,
            amount: updateExpenseRefs.amount.current.value
        }
        try{
            const response = await baseApi.post(`expenses/${expense}`, currentUpdateExpense);

            if(!response.ok) {
                throw new Error("Failed to update expense");
            }

            const currentUpdateExpenseResponse = await response.json();

            setExpenseList((list) => [...list, currentUpdateExpenseResponse]);

            setIsEditing(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <tr>
            {isEditing ? (
                <form onClick={updateExpense}>
                    <td><input type="date" name="edit-date" defaultValue={created_at} ref={updateExpenseRefs.date} disabled/></td>
                    <td><input type="text" name="edit-description" defaultValue={description} ref={updateExpenseRefs.description} /></td>
                    <td><input type="text" name="edit-place" defaultValue={place} ref={updateExpenseRefs.place} /></td>
                    <td><input type="number" name="edit-amount"  defaultValue={amount} ref={updateExpenseRefs.amount} /></td>
                    <td><button>Save</button></td>
                </form>
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