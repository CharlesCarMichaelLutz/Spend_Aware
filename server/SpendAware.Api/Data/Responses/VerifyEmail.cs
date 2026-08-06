namespace SpendAware.Api.Data.Responses;

public class VerifyEmail
{
    public int UserId  { get; set; }
    public string EmailCode { get; set; }
}