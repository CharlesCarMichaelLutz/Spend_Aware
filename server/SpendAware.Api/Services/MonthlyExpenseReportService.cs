
using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IMonthlyExpenseReportService
{
    List<UserExpenseReport> GetMonthlyReport();
}

public class MonthlyExpenseReportService : IMonthlyExpenseReportService
{
    private readonly IDataStore _dataStore;

    public MonthlyExpenseReportService(IDataStore dataStore)
    {
        _dataStore = dataStore;
    }
    
    DateTime start = new DateTime(2026, 5, 1);
    DateTime end = new DateTime(2026, 5, 31);

    //get users and expenses
    public List<UserExpenseReport> GetMonthlyReport()
    {
        var userList = _dataStore.GetUsersForReport();
        var reports = new List<UserExpenseReport>();
        
        foreach(var user in userList)
        {
            var expenses = _dataStore.GetExpensesByDate(user.Id, start, end);
            
            reports.Add(new UserExpenseReport
            {
                UserResponse = user,
                Expenses = expenses.ToList()
            });
        }

        return reports;
    }
    
    //build report
        //the report will create a message with the following
    //generate pdf 
        //the pdf will be a list of all the monthly expenses
   
    

    //send email
}

