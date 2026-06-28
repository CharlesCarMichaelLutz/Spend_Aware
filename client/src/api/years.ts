// export async function getYearData(id, begin, end) {
//         const response = await fetch(
//         `http://localhost:8000/expenses?user_id=${id}&created_at_gte=${begin}&created_at_lte=${end}`
//         )
//
//         if(!response.ok) {
//             throw new Error("Failed to fetch year list");
//         }
//
//         const data = await response.json();
//        
//         return data
// }