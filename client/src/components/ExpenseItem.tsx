// import {useRef, useState} from "react";
// import { baseApi } from "../api/base"
// import type { Expense } from "../types/types"
// import { format, parseISO } from "date-fns"
//
// // export function ExpenseItem({ id, user_id, created_at, description, place, amount, setExpenseList }) {
//     export function ExpenseItem({ id, user_id, createdAt, description, place, amount, setExpenseList }) {
//    
//     const [isEditing, setIsEditing] = useState(false);
//    
//
//     const updateExpenseRefs : Expense = {
//         user_id: id,
//         // created_at: useRef(""),
//         // createdAt: useRef(""),
//         createdAt: createdAt,
//         description: useRef(""),
//         place: useRef(""),
//         amount: useRef("")
//     }
//     console.log("created_at string :", createdAt)
//
//     async function updateExpense(id) {
//         const currentUpdateExpense : Expense = {
//             id: id,
//             user_id: user_id,
//             // created_at: updateExpenseRefs.created_at.current.value,
//             createdAt: updateExpenseRefs.createdAt.current.value,
//             description: updateExpenseRefs.description.current.value,
//             place: updateExpenseRefs.place.current.value,
//             amount: updateExpenseRefs.amount.current.value
//         }
//         try{
//             // const response = await baseApi.post(`expenses/${expense}`, currentUpdateExpense);
//             //
//             // if(!response.ok) {
//             //     throw new Error("Failed to update expense");
//             // }
//             //
//             // const currentUpdateExpenseResponse = await response.json();
//
//             setExpenseList((list) =>
//                 list.map((expense) => expense.id === currentUpdateExpense.id ? currentUpdateExpense : expense)
//             )
//
//             setIsEditing(false)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//     async function deleteExpense(id) {
//
//         try{
//             // const response = await baseApi.delete(`expenses/${id}`, expenseRecord);
//             //
//             // if(!response.ok) {
//             //     throw new Error("Failed to delete expense");
//             // }
//             //
//             // const expense = await response.json();
//
//             setExpenseList((list) =>
//                 list.filter((message) => message.id !== id )
//             )
//
//         } catch (error) {
//             console.log(error);
//         }
//     }
//    
//     return (
//         <tr>
//             {isEditing ? (
//                 <>
//                     <td><input type="date" name="edit-date" defaultValue={createdAt} ref={updateExpenseRefs.created_at} disabled/></td>
//                     {/*<td><input type="date" name="edit-date" defaultValue={createdAt} disabled/></td>*/}
//                     {/*<td><input type="date" name="edit-date" value={createdAt} disabled/></td>*/}
//                     {/*<td><input type="date" name="edit-date" defaultValue={createdAt} disabled/></td>*/}
//                     {/*<td><input type="date" name="edit-date" defaultValue={createdAt} ref={updateExpenseRefs.createdAt} disabled/></td>*/}
//                     <td><input type="text" name="edit-description" defaultValue={description} ref={updateExpenseRefs.description} /></td>
//                     <td><input type="text" name="edit-place" defaultValue={place} ref={updateExpenseRefs.place} /></td>
//                     <td><input type="number" name="edit-amount"  defaultValue={amount} ref={updateExpenseRefs.amount} /></td>
//                     <td><button type="submit" onClick={() => updateExpense(id)}>Save</button></td>
//                 </>
//             ) : (
//                 <>
//                     <td>{format(parseISO(createdAt), "MM-dd-yyyy")}</td>
//                     <td>{place}</td>
//                     <td>{description}</td>
//                     <td>{amount}</td>
//                     <td>
//                         <button onClick={ () => setIsEditing(true)}>Edit</button>
//                     </td>
//                     <td>
//                         <button onClick={() => deleteExpense(id)}>Delete</button>
//                     </td>
//                 </>
//             )}
//         </tr>
//     )
// }

import {useRef, useState} from "react";
import { baseApi } from "../api/base"
import type { Expense } from "../types/types"
import { format, parseISO } from "date-fns"

// export function ExpenseItem({ id, user_id, created_at, description, place, amount, setExpenseList }) {
export function ExpenseItem({ id, user_id, createdAt, description, place, amount, setExpenseList }) {

    const [isEditing, setIsEditing] = useState(false);
    
    const descriptionRef = useRef(description)
    const placeRef = useRef(place)
    const amountRef = useRef(amount)
    
    const formatDate = format(parseISO(createdAt), "yyyy-MM-dd")

    // const updateExpenseRefs : Expense = {
    //     id: id,
    //     user_id: user_id,
    //     createdAt: createdAt,
    //     description: descriptionRef.current.value,
    //     place: placeRef.current.value,
    //     amount: amountRef.current.value
    // }
    console.log("created_at string :", createdAt)

    async function updateExpense(id) {
        const currentUpdateExpense : Expense = {
            id: id,
            user_id: user_id,
            createdAt: createdAt,
            description: descriptionRef.current.value,
            place: placeRef.current.value,
            amount: amountRef.current.value
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

    async function deleteExpense(id) {

        try{
            // const response = await baseApi.delete(`expenses/${id}`, expenseRecord);
            //
            // if(!response.ok) {
            //     throw new Error("Failed to delete expense");
            // }
            //
            // const expense = await response.json();

            setExpenseList((list) =>
                list.filter((message) => message.id !== id )
            )

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr>
            {isEditing ? (
                <>
                    <td><input type="date" name="edit-date" defaultValue={formatDate} disabled/></td>
                    <td><input type="text" name="edit-description" defaultValue={description} ref={descriptionRef} /></td>
                    <td><input type="text" name="edit-place" defaultValue={place} ref={placeRef} /></td>
                    <td><input type="number" name="edit-amount"  defaultValue={amount} ref={amountRef} /></td>
                    <td><button type="submit" onClick={() => updateExpense(id)}>Save</button></td>
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
                        <button onClick={() => deleteExpense(id)}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    )
}