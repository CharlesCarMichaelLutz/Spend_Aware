using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IReportService
{
    // Task<List<UserExpenseReport>> GetMonthlyReport(ReportListRequest request);
    // Task<MemoryStream> GetAllExpensesByYear(LoadExpenseListRequest request);
    // Task<MemoryStream> GetAllExpensesByMonth(LoadExpenseListRequest request);
    Task<MemoryStream> GetAllExpensesByMonth(MonthExpenseListRequest request);
}

public class ReportService : IReportService
{
    private readonly IMailService _mailService;
    private readonly IPdfGenerator _pdfGenerator;
    private readonly IReportRepository _reportRepository;

    public ReportService(IMailService  mailService, IPdfGenerator pdfGenerator, IReportRepository reportRepository)
    {
        _mailService = mailService;
        _pdfGenerator = pdfGenerator;
        _reportRepository = reportRepository;
    }

    // public async Task<List<UserExpenseReport>> GetMonthlyReport(ReportListRequest request)
    // {
    //     DateTimeOffset start = request.StartDate.ToUniversalTime();
    //     DateTimeOffset end = request.StartDate.ToUniversalTime();
    //
    //     var userList = await _reportRepository.GetUsersForReport();
    //     
    //     var reports = new List<UserExpenseReport>();
    //     
    //     foreach(var user in userList)
    //     {
    //         var expenses = await _reportRepository.GetExpensesByDate(user.Id, start, end);
    //         
    //         reports.Add(new UserExpenseReport
    //         {
    //             UserResponse = user,
    //             // Expenses = expenses.ToList(),
    //             Expenses = expenses,
    //             Total = expenses.Sum(e => e.Amount),
    //         });
    //     }
    //     _pdfGenerator.CreateMonthlyAutomatedPdfReports(reports);
    //     
    //     await _mailService.SendEmail(reports);
    //
    //     return reports;
    // }
    
    // public async Task<MemoryStream> GetAllExpensesByYear(LoadExpenseListRequest request)
    // {
    //     DateTimeOffset start = request.StartDate.ToUniversalTime();
    //     DateTimeOffset end = request.StartDate.ToUniversalTime();
    //     
    //     var expenses = await _reportRepository.GetExpensesByDate(request.UserId, request.StartDate, request.EndDate);
    //     
    //     return _pdfGenerator.CreatePdfByYear(expenses);
    // }
    
    public async Task<MemoryStream> GetAllExpensesByMonth(MonthExpenseListRequest request)
    {
        // DateTimeOffset start = request.StartDate.ToUniversalTime();
        // DateTimeOffset end = request.StartDate.ToUniversalTime();
        var loadExpenseList = new MonthExpenseList
        {
            UserId = request.UserId,
            StartDate = request.StartDate.ToUniversalTime(),
            EndDate = request.EndDate.ToUniversalTime()
        };
        
        // var expenses = await _reportRepository.GetExpensesByDate(request.UserId, request.StartDate, request.EndDate);
        var expenses = await _reportRepository.GetExpensesByDate(loadExpenseList);
        
        return _pdfGenerator.CreatePdfByMonth(expenses);
    }
}

