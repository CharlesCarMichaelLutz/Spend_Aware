namespace SpendAware.Api.Data.Models;

public class EmailReport
{
    public int UserId { get; set; }
    public DateTime ReportMonth {get; set;}
    public DateTime SentDate { get; set; }
    public bool Status { get; set; }
}