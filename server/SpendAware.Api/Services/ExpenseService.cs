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
        
        DataStore.Expenses.Add(expense);

        var getExpense = GetExpenseById(expense.Id);
        
        return getExpense;
    }
    //update
    public Expense UpdateExpense(Expense update)
    {
        DataStore.Expenses = DataStore.Expenses.Select(expense =>
        {
            if (expense.Id == update.Id)
            {
                expense.Place = update.Place;
                expense.Description = update.Description;
                expense.Amount = update.Amount;
            }

            return expense;
        }).ToList();
        return update;
    }
    //delete
    public int DeleteExpense(int id)
    {
        DataStore.Expenses = DataStore.Expenses.FindAll(expense => expense.Id != id).ToList();
        return id;
    }
    //getAll
    public List<Expense> GetAll()
    {
        return  DataStore.Expenses;
    }
    //getById
    private  Expense GetExpenseById(int id)
    {
        return DataStore.Expenses.FirstOrDefault(x => x.Id == id);
    }
}