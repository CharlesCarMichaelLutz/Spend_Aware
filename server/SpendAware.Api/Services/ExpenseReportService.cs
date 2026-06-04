using SpendAware.Api.Data.Models;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IExpenseReportService
{
    Task<List<UserExpenseReport>> GetMonthlyReport();
    MemoryStream GetAllExpensesByYear(int id);
    MemoryStream GetAllExpensesByMonth(int id);
}

public class ExpenseReportService : IExpenseReportService
{
    private readonly IDataStore _dataStore;
    private readonly IMailService _mailService;
    private readonly IPdfGenerator _pdfGenerator;

    public ExpenseReportService(IDataStore dataStore, IMailService  mailService, IPdfGenerator pdfGenerator)
    {
        _dataStore = dataStore;
        _mailService = mailService;
        _pdfGenerator = pdfGenerator;
    }

    public async Task<List<UserExpenseReport>> GetMonthlyReport()
    {
        DateTime start = new DateTime(2026, 5, 1);
        DateTime end = new DateTime(2026, 5, 31);

        var userList = _dataStore.GetUsersForReport();
        var reports = new List<UserExpenseReport>();
        
        foreach(var user in userList)
        {
            var expenses = _dataStore.GetExpensesByDate(user.Id, start, end);
            
            reports.Add(new UserExpenseReport
            {
                UserResponse = user,
                Expenses = expenses.ToList(),
                Total = expenses.Sum(e => e.Amount),
            });
        }
        _pdfGenerator.CreateMonthlyAutomatedPdfReports(reports);
        
        await _mailService.SendEmail(reports);

        return reports;
    }
    
    public MemoryStream GetAllExpensesByYear(int id)
    {
        DateTime start = new DateTime(2026, 1, 1);
        DateTime end = new DateTime(2026, 12, 31);
        
        var expenses = _dataStore.GetExpensesByDate(id, start, end);
        
        return _pdfGenerator.CreatePdfByYear(expenses);
    }
    
    public MemoryStream GetAllExpensesByMonth(int id)
    {
        DateTime start = new DateTime(2026, 5, 1);
        DateTime end = new DateTime(2026, 5, 31);
        
        var expenses = _dataStore.GetExpensesByDate(id, start, end);
        
        return _pdfGenerator.CreatePdfByMonth(expenses);
    }
}

