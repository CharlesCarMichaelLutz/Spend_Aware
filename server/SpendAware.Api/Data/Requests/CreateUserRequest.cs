namespace SpendAware.Api.Data.Requests;

public class CreateUserRequest
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }
}