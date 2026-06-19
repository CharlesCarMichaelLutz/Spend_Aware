export async function getMonthData(start: Date,end: Date, id: number) {
    const response = await fetch(`http://localhost:8000/expenses?user_id=${id}&created_at_gt=${start}&created_at_lte=${end}`)

    if(!response.ok) {
        throw new Error("Failed to fetch month list");
    }

    const data = await response.json();

    return data
}