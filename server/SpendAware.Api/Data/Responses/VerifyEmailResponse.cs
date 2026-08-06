namespace SpendAware.Api.Data.Responses;

public class VerifyEmailResponse
{
    public int UserId  { get; set; }
    public string EmailCode { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
}