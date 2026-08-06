namespace SpendAware.Api.Data.Requests;

public class ConfirmEmailRequest
{
    public int UserId  { get; set; }
    public string EmailCode { get; set; }
}