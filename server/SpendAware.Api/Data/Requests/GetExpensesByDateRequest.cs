namespace SpendAware.Api.Data.Requests;

public class GetExpensesByDateRequest
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
}