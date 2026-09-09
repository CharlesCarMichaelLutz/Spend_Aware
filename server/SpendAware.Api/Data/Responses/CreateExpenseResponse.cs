using SpendAware.Api.Data.Models;

namespace SpendAware.Api.Data.Responses;

public class CreateExpenseResponse<T>
{
    public Expense Record { get; set; }
    public int TotalCount { get; set; }
}

public class SendExpenseResponse
{
    public ExpenseResponse Record { get; set; }
    public int TotalCount { get; set; }
}