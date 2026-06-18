import { getYearData } from "../api/years"
import {useLoaderData, Outlet, useParams } from "react-router";

export function Year() {
    const { year } = useParams()
    //gets year and correct months wanted from the server
    const yearList = useLoaderData()
    console.log("year", year)
    
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
              <h3 className="year-title">{year}</h3>
            <button>Get Report</button>
          </div>
          <div className="month-cards-grid">
            {months.map(month => (
                <div key={month} className="month-card">{month}</div>
            ))}
          </div>
        </div>
          <div>
              < Outlet />
          </div>
      </>
  );
}

export async function yearLoader({ params }) {
    const { year } = params;
    return await getYearData(year)
}

