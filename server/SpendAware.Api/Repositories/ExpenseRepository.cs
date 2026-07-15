using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;
using SpendAware.Api.Database;
using Dapper;
using SpendAware.Api.Data.Requests;

namespace SpendAware.Api.Repositories;

public interface IExpenseRepository
{
    Task<Expense?> SaveAndGetExpense(Expense request);
    Task<ExpenseResponse> UpdateAndGetExpense(UpdateExpense updatedExpense);
    Task<bool> DeleteExpenseById(int id);
    Task<IEnumerable<Expense>> GetCurrentMonthExpenseList(LoadExpense request);
    // Task<IEnumerable<ExpenseResponse>> GetExpenseListHistoryByMonth(LoadExpenseListRequest request);
    // Task<List<ExpenseResponse>> GetCurrentMonthExpenseList(LoadExpenseListRequest request);

}

public class ExpenseRepository : IExpenseRepository
{
    //create db connection  interface
    private readonly IPostgresSqlConnectionFactory _connectionFactory;
    
    public ExpenseRepository(IPostgresSqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<Expense?> SaveAndGetExpense(Expense expense)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
              INSERT INTO expenses
                  (user_id, place, description, amount, created_at)
              VALUES (@UserId, @Place, @Description, @Amount, @CreatedAt)
              RETURNING id, place, description, amount, created_at
            """;
        return await connection.QuerySingleOrDefaultAsync<Expense>(sql, expense); 
    }

    public async Task<ExpenseResponse> UpdateAndGetExpense(UpdateExpense updatedExpense)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                UPDATE expenses 
                SET place = @Place, description = @Description, 
                amount = @Amount, updated_at = @UpdatedAt 
                WHERE id= @Id
                RETURNING  id, place, description, amount, created_at, updated_at
            """;

        return await connection.QuerySingleOrDefaultAsync<ExpenseResponse>(sql, updatedExpense);
    }

    public async Task<bool> DeleteExpenseById(int id)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                DELETE FROM expenses
                WHERE id = @Id
            """;
        var result = await connection.ExecuteAsync(sql, new { Id = id });
        
        return result > 0;
    }
    
    public async Task<IEnumerable<Expense>> GetCurrentMonthExpenseList(LoadExpense request)
    { 
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT id, place, description, amount, created_at
                FROM expenses
                WHERE user_id = @UserId AND created_at BETWEEN @StartDate AND @EndDate
            """;
        // var parameters = new
        // {
        //     UserId = request.UserId,
        //     StartDate = request.StartDate,
        //     EndDate = request.EndDate
        // };
        // return await connection.QueryAsync<Expense>(sql, parameters);
        return await connection.QueryAsync<Expense>(sql, new { UserId = request.UserId, StartDate = request.StartDate, EndDate = request.EndDate });
    }
    
    // public async Task<IEnumerable<ExpenseResponse>> GetExpenseListHistoryByMonth(LoadExpenseListRequest request)
    // {
    //     using var connection = await _connectionFactory.CreateConnectionAsync();
    //     const string sql =
    //         """
    //             SELECT id, place, description, amount, created_at
    //             FROM expenses
    //             WHERE user_id = @UserId, created_at = @CreatedAt BETWEEN @StartDate AND @EndDate
    //         """;
    //     return await connection.QueryAsync<ExpenseResponse>(sql, new { user_id = request.UserId, StartDate = request.StartDate, EndDate = request.EndDate });
    // }
}