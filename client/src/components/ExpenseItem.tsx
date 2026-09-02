import {useRef, useState} from "react";
import { baseApi } from "../api/base"
import type { Expense } from "../types/types"
import { format, parseISO } from "date-fns"

export function ExpenseItem({ id, user_id, createdAt, description, place, amount, setExpenseList }) {

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    const descriptionRef = useRef(description)
    const placeRef = useRef(place)
    const amountRef = useRef(amount)
    
    const formatDate = format(parseISO(createdAt), "yyyy-MM-dd")
    
    async function updateExpense(id) {
        setIsSaving(true);
        const currentUpdateExpense : Expense = {
            id: id,
            user_id: user_id,
            createdAt: createdAt,
            description: descriptionRef.current.value,
            place: placeRef.current.value,
            amount: amountRef.current.value
        }
        try{
            const response = await baseApi.put<Expense>("expenses", {
                Id: currentUpdateExpense.id,
                Place: currentUpdateExpense.place,
                Description: currentUpdateExpense.description,
                Amount: currentUpdateExpense.amount,
                CreatedAt: createdAt,
                UpdatedAt: new Date().toISOString(),
            })
            
            if(response.status === 200){
                setExpenseList((list) =>
                    list.map((expense) => expense.id === response.data.id ? response.data : expense)
                )
                setIsEditing(false)
                setIsSaving(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false)
        }
    }
    
    type ExpenseId = {
        id: number
    }
    
    async function deleteExpense(id) {
        setIsSaving(true);
        try{
            const response = await baseApi.delete<ExpenseId>(`expenses/${id}`)

            if(response.status === 200) {
                setExpenseList((list) =>
                    list.filter((expense) => expense.id !== response.data.id)
                )
                setIsSaving(false);
            }
        } catch (error) {
            console.log(error);
        }finally {
            setIsSaving(false)
        }
    }

    return (
        <tr>
            {isEditing ? (
                <>
                    <td><input type="date" name="edit-date" defaultValue={formatDate} disabled/></td>
                    <td><input type="text" name="edit-place" defaultValue={place} ref={placeRef} /></td>
                    <td><input type="text" name="edit-description" defaultValue={description} ref={descriptionRef} /></td>
                    <td><input type="number" name="edit-amount"  defaultValue={amount} ref={amountRef} /></td>
                    <td><button type="submit" disabled={isSaving} onClick={() => updateExpense(id)}>Save</button></td>
                </>
            ) : (
                <>
                    <td>{format(parseISO(createdAt), "MM-dd-yyyy")}</td>
                    <td>{place}</td>
                    <td>{description}</td>
                    <td>{amount}</td>
                    <td>
                        <button onClick={ () => setIsEditing(true)}>Edit</button>
                    </td>
                    <td>
                        <button disabled={isSaving} onClick={() => deleteExpense(id)}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    )
}