using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IExpenseReportService
{
    // Task<List<UserExpenseReport>> GetMonthlyReport();
    Task<List<UserExpenseReport>> GetMonthlyReport(LoadExpenseListRequest request);
    // MemoryStream GetAllExpensesByYear(int id);
    Task<MemoryStream> GetAllExpensesByYear(int id);
    // MemoryStream GetAllExpensesByMonth(int id);
    Task<MemoryStream> GetAllExpensesByMonth(int id);
}

public class ExpenseReportService : IExpenseReportService
{
    // private readonly IDataStore _dataStore;
    private readonly IMailService _mailService;
    private readonly IPdfGenerator _pdfGenerator;
    private readonly IExpenseReportRepository _expenseReportRepository;

    // public ExpenseReportService(IDataStore dataStore, IMailService  mailService, IPdfGenerator pdfGenerator, IExpenseReportRepository expenseReportRepository)
    public ExpenseReportService(IMailService  mailService, IPdfGenerator pdfGenerator, IExpenseReportRepository expenseReportRepository)
    {
        // _dataStore = dataStore;
        _mailService = mailService;
        _pdfGenerator = pdfGenerator;
        _expenseReportRepository = expenseReportRepository;
    }

    public async Task<List<UserExpenseReport>> GetMonthlyReport(LoadExpenseListRequest request)
    {
        // DateTime start = new DateTime(2026, 5, 1);
        // DateTime end = new DateTime(2026, 5, 31);
        DateTimeOffset start = request.StartDate.ToUniversalTime();
        DateTimeOffset end = request.StartDate.ToUniversalTime();

        // var userList = _dataStore.GetUsersForReport();
        var userList = await _expenseReportRepository.GetUsersForReport();
        
        var reports = new List<UserExpenseReport>();
        
        foreach(var user in userList)
        {
            // var expenses = _dataStore.GetExpensesByDate(user.Id, start, end);
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
    
    public async Task<MemoryStream> GetAllExpensesByYear(int id)
    {
        DateTime start = new DateTime(2026, 1, 1);
        DateTime end = new DateTime(2026, 12, 31);
        
        // var expenses = _dataStore.GetExpensesByDate(id, start, end);
        var expenses = await _expenseReportRepository.GetExpensesByDate(id, start, end);
        
        return _pdfGenerator.CreatePdfByYear(expenses);
    }
    
    public async Task<MemoryStream> GetAllExpensesByMonth(int id)
    {
        DateTime start = new DateTime(2026, 5, 1);
        DateTime end = new DateTime(2026, 5, 31);
        
        // var expenses = _dataStore.GetExpensesByDate(id, start, end);
        var expenses = await _expenseReportRepository.GetExpensesByDate(id, start, end);
        
        return _pdfGenerator.CreatePdfByMonth(expenses);
    }
}

