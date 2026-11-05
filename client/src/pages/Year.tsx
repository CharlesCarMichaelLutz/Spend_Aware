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
            // console.log("compare current year :", monthIdx, currentMonth)
            return monthIdx > currentMonth
        }
        
        if (yearToInt === createdYear) {
            // console.log("compare created year :", monthIdx, createdMonth)
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
    
    //for year report
    //take year value
        //create start and end
        //pass to Year Report Button
        //makes a request to server
        //returns file stream
    //client saves as blob type which represents binary data
    //opens new window
    //user can download the pdf for that month

    async function createYearlyPdfReport() {
        try {
            // async function createMonthlyReportPdf(start, end) {
            // const response = await baseApi.post<null>("report/month", {
            const response = await baseApi.post<Blob>("report/month", {
                //pass in arguments for API endpoint
                //UserId
                //start
                //end
            })

            const pdf = new Blob([response.data], { type: 'application/pdf'})

            const pdfUrl = URL.createObjectURL(pdf)

            window.open(pdfUrl, "_blank")

        } catch(error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="year-wrapper">
                <div className="year-title-wrapper">
                    <h3 className="year-title">Year:{year}</h3>
                    <button>Year Report</button>
                </div>
                <div className="month-cards-grid">
                    {months.map(month => {
                        const disabled = isMonthDisabled(year, month, signupDate)
                        
                        return disabled ? (
                            <NavLink key={month} className="disabled-month-card" to={`/dashboard/${year}/${month}`}>
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





