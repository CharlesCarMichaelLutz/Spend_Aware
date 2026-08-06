namespace SpendAware.Api.Data.Models;

public class EmailToken
{
    public int UserId  { get; set; }
    public string EmailCode  { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset ExpiresAt { get; set; }
}