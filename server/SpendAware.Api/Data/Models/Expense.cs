using System.Text.Json.Serialization;

namespace SpendAware.Api.Data.Models;
public class Expense
{
    public int Id { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; } 
    public string Currency { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt  { get; set; }
}