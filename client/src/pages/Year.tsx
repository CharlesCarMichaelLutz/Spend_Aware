import { Outlet, useParams, NavLink } from "react-router";
import { useStore } from "../store/useStore.ts"

export function Year() {
    const { year } = useParams()
    const user = useStore(state => state.auth)

    const signupDate = user.createdAt
    
    function isMonthDisabled(year, month, createdAt) {
        
        const yearToInt = parseInt(year)
        
        const monthIdx = months.indexOf(month)
        
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth()
        
        const createdYear = new Date(createdAt).getFullYear()
        const createdMonth = new Date(createdAt).getMonth()
        
        if(yearToInt === currentYear) {
            console.log("compare current year :", monthIdx, currentMonth)
            return monthIdx > currentMonth
        }
        
        if (yearToInt === createdYear) {
            console.log("compare created year :", monthIdx, createdMonth)
            return monthIdx < createdMonth
        }
        
        return false
    }

    const months : string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    return (
        <>
            <div className="year-wrapper">
                <div className="year-title-wrapper">
                    <h3 className="year-title">Year:{year}</h3>
                    <button>Get Report</button>
                </div>
                <div className="month-cards-grid">
                    {months.map(month => {
                        const disabled = isMonthDisabled(year, month, signupDate)
                        
                        return disabled ? (
                                <NavLink key={month} className="disabled-month-card" onClick={(e) => e.preventDefault()}
                                         to={`/dashboard/${year}/${month}`}>
                                    {month}
                                </NavLink>
                            ) :
                            (
                                <NavLink key={month} className="month-card" to={`/dashboard/${year}/${month}`}>
                                    {month}
                                </NavLink>
                            )
                    })}
                </div>
            </div>
            <div>
                < Outlet />
            </div>
        </>
    );
}

// only want to get the months the user has an expense for not empty ones so cards are rendered correctly

//query API for expenses from passed in year
//filter response array of expenses for months
//create new array with months
//render months as cards on Year page 




