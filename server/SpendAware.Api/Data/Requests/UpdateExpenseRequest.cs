namespace SpendAware.Api.Data.Requests;

public class UpdateExpenseRequest
{
    public int Id { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; } 
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    
}