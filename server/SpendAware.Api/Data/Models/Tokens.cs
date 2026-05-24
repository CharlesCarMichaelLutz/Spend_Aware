namespace SpendAware.Api.Data.Models;

public class Tokens
{
    public int UserId  { get; set; }
    public string RefreshToken { get; set; }
    public DateTime ExpiresOnUtc { get; set; }
    public bool IsExpired { get; set; }
}