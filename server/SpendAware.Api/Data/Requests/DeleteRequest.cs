namespace SpendAware.Api.Data.Requests;

public class DeleteRequest
{ 
     public int UserId { get; set; } 
     public int Id { get; set; }
     public int Page { get; set; }
     public int PageSize { get; set; }
}