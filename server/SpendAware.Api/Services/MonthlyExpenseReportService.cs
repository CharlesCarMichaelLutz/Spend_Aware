using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IMonthlyExpenseReportService
{
    Task<List<UserExpenseReport>> GetMonthlyReport();
}

public class MonthlyExpenseReportService : IMonthlyExpenseReportService
{
    private readonly IDataStore _dataStore;
    private readonly IMailService _mailService;
    private readonly IPdfGenerator _pdfGenerator;

    public MonthlyExpenseReportService(IDataStore dataStore, IMailService  mailService, IPdfGenerator pdfGenerator)
    {
        _dataStore = dataStore;
        _mailService = mailService;
        _pdfGenerator = pdfGenerator;
    }

    //build report
    public async Task<List<UserExpenseReport>> GetMonthlyReport()
    {
        DateTime start = new DateTime(2026, 5, 1);
        DateTime end = new DateTime(2026, 5, 31);

        //get users and expenses
        var userList = _dataStore.GetUsersForReport();
        var reports = new List<UserExpenseReport>();
        
        foreach(var user in userList)
        {
            var expenses = _dataStore.GetExpensesByDate(user.Id, start, end);
            
            reports.Add(new UserExpenseReport
            {
                UserResponse = user,
                Expenses = expenses.ToList(),
                Total = expenses.Sum(e => e.Amount)
            });
        }
        //generate pdf 
            //the pdf will be a list of all the monthly expenses
        await _pdfGenerator.GeneratePdfReports(reports);
        
        //send email
        await _mailService.SendEmail(reports);

        return reports;
    }
}

