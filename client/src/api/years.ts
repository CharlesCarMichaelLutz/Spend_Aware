export function getYearData(year) {
    try {
        const response = fetch(`http://localhost:8000/expenses?user_id=${1}&created_at=${year}`)

        if(!response.ok) {
            throw new Error("Failed to fetch expenses");
        }

        const data = response.json();
        
    }
    return null
}