
export function Dashboard() {
    return (
        <>
            <section className="dashboard">
                <div className="dashboard-top">
                    <form>
                        <label >Date:</label>
                        <input
                            type="date"
                            name="date"
                        />
                        <label >Description:</label>
                        <input
                            type="text"
                            name="description"
                            placeholder='enter description' />
                        <label >Place:</label>
                        <input
                            type="text"
                            name="place"
                            placeholder='enter place' />
                        <label >Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            placeholder='enter amount' />
                        <input
                            type="submit"
                            className="submit"
                            id="submit" />
                    </form>
                </div>
                <div className="dashboard-middle">
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Place</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>Place</td>
                                <td>Description</td>
                                <td>Amount</td>
                                <td>
                                    <button>Edit</button>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
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
                <div className="dashboard-bottom">Pagination Bar</div>
            </section>
        </>
    )
}