using QuestPDF.Fluent;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Data.Models;

public class UserExpenseReport
{
    public UserResponse UserResponse { get; set; }
    public decimal Total { get; set; }
    public IEnumerable<ExpenseResponse> Expenses { get; set; }
    public byte[] PdfFile { get; set; }
}
