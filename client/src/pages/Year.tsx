export function Year() {
  const years : string[] = [
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
            <h3 className="year-title">2026</h3>
            <button>Get Report</button>
          </div>
          <div className="month-cards-grid">
            {years.map(year => (
                <div key={year} className="month-card">{year}</div>
            ))}
          </div>
        </div>
      </>
  );
}
