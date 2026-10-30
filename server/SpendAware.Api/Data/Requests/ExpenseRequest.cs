namespace SpendAware.Api.Data.Requests;

public class ExpenseRequest
{
    public int UserId { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; } 
    public DateTimeOffset CreatedAt { get; set; }
}



