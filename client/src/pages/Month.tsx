import {useParams} from "react-router";
export function Month() {
    const { year, month } = useParams()
    return (
        <>
            <div className="month-wrapper">
                <div className="month-title-wrapper">
                    {/*<h3>Month</h3>*/}
                    <h3>{year} - {month}</h3>
                    <button>Get Report</button>
                </div>
                <div className="month-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Place</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Date 1</td>
                                <td>Place 2</td>
                                <td>Description 3</td>
                                <td>Amount 4</td>
                            </tr>
                            <tr>
                                <td>Date 1</td>
                                <td>Place 2</td>
                                <td>Description 3</td>
                                <td>Amount 4</td>
                            </tr>
                            <tr>
                                <td>Date 3</td>
                                <td>Place 5</td>
                                <td>Description 2</td>
                                <td>Amount 1</td>
                            </tr>
                            <tr>
                                <td>Date 5</td>
                                <td>Place 3</td>
                                <td>Description 3</td>
                                <td>Amount 2</td>
                            </tr>
                            <tr>
                                <td>Date 5</td>
                                <td>Place 4</td>
                                <td>Description 3</td>
                                <td>Amount 2</td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr>
                                <th>Month Name</th>
                                <th>Total</th>
                                <th>Amount</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="month-pagination">Pagination Bar</div>
            </div>
        </>
    )
}