namespace SpendAware.Api.Data.Models;

public class UserPreference
{
    public int UserId  { get; set; }
    public string Language { get; set; }
    public string Currency { get; set; }
}