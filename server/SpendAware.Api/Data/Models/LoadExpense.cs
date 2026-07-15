namespace SpendAware.Api.Data.Models;

public class LoadExpense
{
    public int UserId { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
}