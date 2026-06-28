// import { getYearData } from "../api/years"
import { Outlet, useParams, NavLink } from "react-router";

export function Year() {
    const { year } = useParams()
    
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
                {months.map(month => (
                    <div key={month} className="month-card">
                        <NavLink to={`/dashboard/${year}/${month}`}>
                            {month}
                        </NavLink>
                    </div>
                ))}
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





