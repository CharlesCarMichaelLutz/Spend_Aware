using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Data.Models;

// public class UserExpenseReport
// {
//     public UserResponse UserResponse { get; set; }
//     public decimal Total { get; set; }
//     public List<Expense> Expenses { get; set; }
// }

public class UserExpenseReport
{
    public UserResponse UserResponse { get; set; }
    public decimal Total { get; set; }
    public List<Expense> Expenses { get; set; }
    public List<string> ReportPdfFiles { get; set; }
}