import { Outlet, useParams } from "react-dom"
import { getYearData } from "../api/years"
import {useLoaderData} from "react-router";

export function Year() {
    const { year } = useParams()
    const {  } = useLoaderData()
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
            {/*<h3 className="year-title">2026</h3>*/}
              <h3 className="year-title">{year}</h3>
              
            <button>Get Report</button>
          </div>
          <div className="month-cards-grid">
            {months.map(month => (
                <div key={month} className="month-card">{month}</div>
            ))}
          </div>
        </div>
          < Outlet />
      </>
  );
}

function loader({ params }) {
    const { year } = params;
    return getYearData(year)
}

export const yearRoute = {
    loader,
    component: Year,
}
