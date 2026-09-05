using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Data.Responses;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

public interface IExpenseService
{
    Task<ExpenseResponse> CreateExpense(ExpenseRequest request);
    Task<ExpenseResponse> UpdateExpense(UpdateExpenseRequest update);
    Task<ExpenseId> DeleteExpense(int id);
    // Task<IEnumerable<ExpenseResponse>> LoadExpenseList(LoadExpenseListRequest request);
    Task<PagedResponse<ExpenseResponse>> LoadExpenseList(LoadExpenseListRequest request);
}

public class ExpenseService : IExpenseService
{
    private readonly  IExpenseRepository _expenseRepository;

    public ExpenseService(IExpenseRepository expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }
    
    public async Task<ExpenseResponse> CreateExpense(ExpenseRequest request)
    {
        const string message = "Expense was not created";
        
        var expense = new Expense()
        {
            UserId = request.UserId,
            Place =  request.Place,
            Description = request.Description,
            Amount = request.Amount,
            CreatedAt = request.CreatedAt.ToUniversalTime()
        };
        
        var status = await _expenseRepository.SaveAndGetExpense(expense) ?? throw new Exception(message);

        var response = new ExpenseResponse
        {
            Id = status.Id,
            Place = status.Place,
            Description = status.Description,
            Amount = status.Amount,
            CreatedAt = status.CreatedAt.ToString("O"),
        };
        
        return response;
    }
    
    public async Task<ExpenseResponse> UpdateExpense(UpdateExpenseRequest update)
    {
        const string message = "could not update expense";

        var expense = new UpdateExpense
        {
            Id = update.Id,
            Place = update.Place,
            Description = update.Description,
            Amount = update.Amount,
            CreatedAt = update.CreatedAt.ToUniversalTime(),
            UpdatedAt = update.UpdatedAt.ToUniversalTime()
        };
        
        var status = await _expenseRepository.UpdateAndGetExpense(expense) ?? throw new Exception(message);

        var response = new ExpenseResponse
        {
            Id = status.Id,
            Place = status.Place,
            Description = status.Description,
            Amount = status.Amount,
            CreatedAt = status.CreatedAt.ToString("O"),
        };

        return response;
    }
    
    public async Task<ExpenseId> DeleteExpense(int id)
    {
        const string message = "could not delete expense";
        var status = await _expenseRepository.DeleteExpenseById(id);
        
        var deletedExpenseId = new ExpenseId
        {
            Id = status
        };
        return deletedExpenseId;
    }
    
    // public async Task<IEnumerable<ExpenseResponse>> LoadExpenseList(LoadExpenseListRequest request)
    // {
    //     const string message = "could not retrieve expenses";
    //
    //     var loadExpense = new LoadExpense
    //     {
    //         UserId = request.UserId,
    //         StartDate = request.StartDate.ToUniversalTime(),
    //         EndDate = request.EndDate.ToUniversalTime(),
    //     };
    //     
    //     var expenseList = await _expenseRepository.GetExpenseList(loadExpense) ?? throw new Exception(message);
    //
    //     return expenseList.Select(e => new ExpenseResponse
    //     {
    //         Id = e.Id,
    //         Place = e.Place,
    //         Description = e.Description,
    //         Amount = e.Amount,
    //         CreatedAt = e.CreatedAt.ToString("O"),
    //     });
    // }
    
    // public async Task<IEnumerable<ExpenseResponse>> LoadExpenseList(LoadExpenseListRequest request)
    public async Task<PagedResponse<ExpenseResponse>> LoadExpenseList(LoadExpenseListRequest request)
    {
        const string message = "could not retrieve expenses";

        var loadExpense = new LoadExpense
        {
            UserId = request.UserId,
            StartDate = request.StartDate.ToUniversalTime(),
            EndDate = request.EndDate.ToUniversalTime(),
            Page =  request.Page,
            PageSize = request.PageSize
        };
        
        // var expenseList = await _expenseRepository.GetExpenseList(loadExpense) ?? throw new Exception(message);
        //
        // return expenseList.Select(e => new ExpenseResponse
        // {
        //     Id = e.Id,
        //     Place = e.Place,
        //     Description = e.Description,
        //     Amount = e.Amount,
        //     CreatedAt = e.CreatedAt.ToString("O"),
        // });
        
        var response = await _expenseRepository.GetExpenseList(loadExpense) ?? throw new Exception(message);
        
        // var response = await _expenseRepository.GetExpenseList() 

        var listed =  response.Data.Select(e => new ExpenseResponse
        {
            Id = e.Id,
            Place = e.Place,
            Description = e.Description,
            Amount = e.Amount,
            CreatedAt = e.CreatedAt.ToString("O"),
        });

        return new PagedResponse<ExpenseResponse>
        {
            Data = listed,
            TotalCount = response.TotalCount
        };

    }
}