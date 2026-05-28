using SpendAware.Api.Data.Models;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IExpenseService
{
    Expense CreateExpense(Expense request);
    List<Expense> GetAll();
    Expense UpdateExpense(Expense request);
    int DeleteExpense(int id);
}

public class ExpenseService : IExpenseService
{
    private readonly IDataStore _dataStore;

    public ExpenseService(IDataStore dataStore)
    {
        _dataStore = dataStore;
    }
    //create
    public Expense CreateExpense(Expense request)
    {
        var expense = new Expense()
        {
            Id = request.Id,
            Place =  request.Place,
            Description = request.Description,
            Amount = request.Amount,
            Currency = request.Currency
        };
        
        _dataStore.AddExpense(expense);

        var getExpense = GetExpense(expense.Id);
        
        return getExpense;
    }
    //update
    public Expense UpdateExpense(Expense update)
    {
        return _dataStore.UpdateExpense(update);
    }
    //delete
    public int DeleteExpense(int id)
    {
        return _dataStore.DeleteExpenseById(id);
    }
    //getAll
    public List<Expense> GetAll()
    {
        return _dataStore.GetExpenses();
    }
    //getById
    private  Expense GetExpense(int id)
    {
        return _dataStore.GetExpenseById(id);
    }
}