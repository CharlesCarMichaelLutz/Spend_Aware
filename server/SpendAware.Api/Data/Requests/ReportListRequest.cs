namespace SpendAware.Api.Data.Requests;

public class ReportListRequest
{
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
}