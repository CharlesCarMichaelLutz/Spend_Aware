using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IExpenseReportService
{
    Task<List<UserExpenseReport>> GetMonthlyReport(ReportListRequest request);
    Task<MemoryStream> GetAllExpensesByYear(LoadExpenseListRequest request);
    Task<MemoryStream> GetAllExpensesByMonth(LoadExpenseListRequest request);
}

public class ExpenseReportService : IExpenseReportService
{
    private readonly IMailService _mailService;
    private readonly IPdfGenerator _pdfGenerator;
    private readonly IExpenseReportRepository _expenseReportRepository;

    public ExpenseReportService(IMailService  mailService, IPdfGenerator pdfGenerator, IExpenseReportRepository expenseReportRepository)
    {
        _mailService = mailService;
        _pdfGenerator = pdfGenerator;
        _expenseReportRepository = expenseReportRepository;
    }

    public async Task<List<UserExpenseReport>> GetMonthlyReport(ReportListRequest request)
    {
        DateTimeOffset start = request.StartDate.ToUniversalTime();
        DateTimeOffset end = request.StartDate.ToUniversalTime();

        var userList = await _expenseReportRepository.GetUsersForReport();
        
        var reports = new List<UserExpenseReport>();
        
        foreach(var user in userList)
        {
            var expenses = await _expenseReportRepository.GetExpensesByDate(user.Id, start, end);
            
            reports.Add(new UserExpenseReport
            {
                UserResponse = user,
                // Expenses = expenses.ToList(),
                Expenses = expenses,
                Total = expenses.Sum(e => e.Amount),
            });
        }
        _pdfGenerator.CreateMonthlyAutomatedPdfReports(reports);
        
        await _mailService.SendEmail(reports);

        return reports;
    }
    
    public async Task<MemoryStream> GetAllExpensesByYear(LoadExpenseListRequest request)
    {
        DateTimeOffset start = request.StartDate.ToUniversalTime();
        DateTimeOffset end = request.StartDate.ToUniversalTime();
        
        var expenses = await _expenseReportRepository.GetExpensesByDate(request.UserId, request.StartDate, request.EndDate);
        
        return _pdfGenerator.CreatePdfByYear(expenses);
    }
    
    public async Task<MemoryStream> GetAllExpensesByMonth(LoadExpenseListRequest request)
    {
        DateTimeOffset start = request.StartDate.ToUniversalTime();
        DateTimeOffset end = request.StartDate.ToUniversalTime();
        
        var expenses = await _expenseReportRepository.GetExpensesByDate(request.UserId, request.StartDate, request.EndDate);
        
        return _pdfGenerator.CreatePdfByMonth(expenses);
    }
}

