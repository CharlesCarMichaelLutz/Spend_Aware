namespace SpendAware.Api.Data.Requests;

public class ExpenseRequest
{
    public DateTime CreatedAt { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; } 
}