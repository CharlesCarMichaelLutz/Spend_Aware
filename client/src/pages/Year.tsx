import { Outlet, useParams, NavLink } from "react-router";
import { useStore } from "../store/useStore.ts"

export function Year() {
    const { year } = useParams()
    const user = useStore(state => state.auth)
    
    //disable the card and button for months before the user signup date
    
    //if the user clicks on the current month redirect to dashboard component 
    // which shows the current month
    
    const now = new Date();
    const currMonth = now.getMonth()
    // console.log("currentMonth :", currMonth)

    const signupDate = user.createdAt
    // console.log("sign up date:", signupDate)
    
    const date = new Date(signupDate)
    // console.log("date:", date)
    
    const pastMonthIndex = date.getMonth()
    const pastYear = date.getFullYear()
    
    // console.log("past month:", pastMonthIndex)
    
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
  
//   return (
//       <>
//           <div className="year-wrapper">
//               <div className="year-title-wrapper">
//                   <h3 className="year-title">Year:{year}</h3>
//                   <button>Get Report</button>
//               </div>
//               <div className="month-cards-grid">
//                   {months.map(month => (
//                           <NavLink className="month-card" to={`/dashboard/${year}/${month}`}>
//                               {month}
//                           </NavLink>
//                   ))}
//                 </div>
//           </div>
//           <div>
//               < Outlet />
//           </div>
//       </>
//   );
// }

return (
    <>
        <div className="year-wrapper">
            <div className="year-title-wrapper">
                <h3 className="year-title">Year:{year}</h3>
                <button>Get Report</button>
            </div>
            <div className="month-cards-grid">
                {months.map(month => (
                    // console.log("month: ", month),
                    // console.log("index month :", months.indexOf(month)),
                    // console.log(months.indexOf(month), "curr:",  currMonth, "past :",  pastMonthIndex),
                        //disable the card buttons for months in the future 
                    months.indexOf(month) > currMonth || months.indexOf(month) < pastMonthIndex ? (
                        <NavLink key={month} className="disabled-month-card" onClick={(e) => e.preventDefault()} to={`/dashboard/${year}/${month}`}>
                            {month}
                        </NavLink> 
                        ) :
                        (
                            <NavLink key={month} className="month-card" to={`/dashboard/${year}/${month}`}>
                                {month}
                            </NavLink>  )
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





