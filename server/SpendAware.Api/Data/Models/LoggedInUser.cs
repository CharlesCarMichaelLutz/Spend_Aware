namespace SpendAware.Api.Data.Models;

public class LoggedInUser
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Language { get; set; }
    public string Currency { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}