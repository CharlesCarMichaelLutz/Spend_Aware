namespace SpendAware.Api.Data.Requests;

// public class CreateUserRequest
// {
//     public string Username { get; set; }
//     public string Email { get; set; }
//     public string Password { get; set; }
//     public DateTimeOffset CreatedAt { get; set; }
// }

public class CreateUserRequest
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Language { get; set; }
    public string Currency { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}