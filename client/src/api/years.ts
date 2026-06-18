export async function getYearData(year) {
        const response = await fetch(`http://localhost:8000/expenses?user_id=${1}&created_at=${year}`)

        if(!response.ok) {
            throw new Error("Failed to fetch year list");
        }

        const data = await response.json();
        
        return data
}