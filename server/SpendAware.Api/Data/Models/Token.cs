namespace SpendAware.Api.Data.Models;

public class Token
{
    public int UserId  { get; set; }
    public string RefreshToken { get; set; }
    public DateTime ExpiresOnUtc { get; set; }
    public bool IsExpired { get; set; }
}