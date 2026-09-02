import { Outlet, useParams, NavLink } from "react-router";

export function Year() {
    const { year } = useParams()
    
    //disable the card and button for months before the user signup date
    //disable the card and  buttons for months in the future 
    
    //if the user clicks on the current month redirect to dashboard component 
    // which shows the current month
    
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
                          <NavLink className="month-card" to={`/dashboard/${year}/${month}`}>
                              {month}
                          </NavLink>
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





