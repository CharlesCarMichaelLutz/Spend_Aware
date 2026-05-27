namespace SpendAware.Api.Data.Responses;

public class UserLoginResponse
{
    public int Id  {get; set;}
    public string Username { get; set; }
    public string EmailAddress { get; set; }
    public string AccessToken { get; set; }
}