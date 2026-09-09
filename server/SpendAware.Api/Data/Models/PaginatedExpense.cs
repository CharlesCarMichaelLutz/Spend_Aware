namespace SpendAware.Api.Data.Models;

public class PaginatedExpense
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; } 
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}