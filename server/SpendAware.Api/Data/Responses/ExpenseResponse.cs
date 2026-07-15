namespace SpendAware.Api.Data.Responses;

public class ExpenseResponse
{
    public int  Id { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; } 
    public string CreatedAt { get; set; }
    public string? UpdatedAt { get; set; }
}