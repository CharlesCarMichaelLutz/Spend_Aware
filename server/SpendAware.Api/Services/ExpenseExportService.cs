using Microsoft.AspNetCore.Mvc;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IExpenseExportService
{ 
    // IActionResult GetAllExpensesByYear(GetExpensesByDateRequest request); 
    // byte[] getAllExpensesByMonth(GetExpensesByDateRequest request);
    MemoryStream GetAllExpensesByYear(int id);
    // IActionResult GetAllExpensesByYear(int id);
}

public class ExpenseExportService : IExpenseExportService
{
    private readonly IPdfGenerator _pdfGenerator;
    private readonly IDataStore  _dataStore;

    public ExpenseExportService(IPdfGenerator pdfGenerator,  IDataStore dataStore)
    {
        _pdfGenerator = pdfGenerator;
        _dataStore = dataStore;
    }
    //getAllExpensesByYear
    // public IActionResult GetAllExpensesByYear(GetExpensesByDateRequest request)
    public MemoryStream GetAllExpensesByYear(int id)
    {
        DateTime start = new DateTime(2026, 1, 1);
        DateTime end = new DateTime(2026, 12, 31);
        
        var expenses = _dataStore.GetExpensesByDate(id, start, end);
        
        // byte[] pdfReport =  _pdfGenerator.CreatePdfByYear(expenses);
        
        // FileStreamResult pdfReport =  _pdfGenerator.CreatePdfByYear(expenses);    
        
        // var filePath = Path.Combine("uploads", $"{pdfReport}.pdf");
        //
        // if (!System.IO.File.Exists(filePath))
        // {
        //     throw new FileNotFoundException("Expenses not found", filePath);
        // }
        //
        // var stream = System.IO.File.OpenRead(filePath);
        // return File(stream, "application/octet-stream", "report.pdf");
        
        // var stream = new MemoryStream(pdfReport);
        // var stream = new FileStream();
        //
        // return new FileStreamResult(stream, "application/pdf")
        // {
        //     FileDownloadName = "Expenses"
        // };
        // return pdfReport;
        
        return _pdfGenerator.CreatePdfByYear(expenses);
    }
    
    //getAllExpensesByMonth
    // public byte[] getAllExpensesByMonth(GetExpensesByDateRequest request)
    // {
    //     var expenses = _dataStore.GetExpensesByDate(request.UserId, request.startDate, request.endDate)
    //     
    //     _pdfGenerator.CreatePdfByMonth(expenses);    
    //     
    //     //convert from byte[] to base64 string
    // }
}