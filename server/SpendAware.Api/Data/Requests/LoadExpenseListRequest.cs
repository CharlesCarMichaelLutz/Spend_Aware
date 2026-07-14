namespace SpendAware.Api.Data.Requests;

public class LoadExpenseListRequest
{
    public int UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}