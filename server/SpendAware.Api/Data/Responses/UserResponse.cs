namespace SpendAware.Api.Data.Responses;

public class UserResponse
{
    public int Id  {get; set;}
    public string Username { get; set; }
    public string Email { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}   