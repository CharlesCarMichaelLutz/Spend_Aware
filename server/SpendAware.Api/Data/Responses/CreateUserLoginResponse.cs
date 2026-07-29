namespace SpendAware.Api.Data.Responses;

public class CreateUserLoginResponse
{
    public int Id  {get; set;}
    public string Username { get; set; }
    public string Email { get; set; }
    public string CreatedAt { get; set; }
    public string Language { get; set; }
    public string Currency { get; set; }
    public string AccessToken { get; set; }
}