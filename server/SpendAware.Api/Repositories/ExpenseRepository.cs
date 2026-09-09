using SpendAware.Api.Data.Models;
using SpendAware.Api.Database;
using Dapper;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Repositories;

public interface IExpenseRepository
{
    // Task<Expense?> SaveAndGetExpense(Expense request);
    Task<PagedResponse<Expense>> SaveAndGetExpense(PaginatedExpense expense);
    Task<Expense> UpdateAndGetExpense(UpdateExpense updatedExpense);
    Task<int> DeleteExpenseById(int id);
    // Task<IEnumerable<Expense>> GetExpenseList(LoadExpense request);
    Task<PagedResponse<Expense>> GetExpenseList(LoadExpense request);
}

public class ExpenseRepository : IExpenseRepository
{
    private readonly IPostgresSqlConnectionFactory _connectionFactory;
    
    public ExpenseRepository(IPostgresSqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    // public async Task<Expense?> SaveAndGetExpense(Expense expense)
    // {
    //     using var connection = await _connectionFactory.CreateConnectionAsync();
    //     const string sql =
    //         """
    //           INSERT INTO expenses
    //               (user_id, place, description, amount, created_at)
    //           VALUES (@UserId, @Place, @Description, @Amount, @CreatedAt)
    //           RETURNING id, place, description, amount, created_at
    //         """;
    //     return await connection.QuerySingleOrDefaultAsync<Expense>(sql, expense); 
    // }
    
    //when a new expense gets added to the page need to return the list of updated 10 records
    //so the page stays in sync on the client
    public async Task<PagedResponse<Expense>> SaveAndGetExpense(PaginatedExpense expense)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
              INSERT INTO expenses
                  (user_id, place, description, amount, created_at)
              VALUES (@UserId, @Place, @Description, @Amount, @CreatedAt)
              RETURNING id, place, description, amount, created_at
            """;
        await connection.ExecuteAsync(sql, expense);
        
        const string recordCountSql = """SELECT COUNT(*) FROM expenses WHERE user_id = @UserId""";
        var totalCount = await connection.ExecuteScalarAsync<int>(recordCountSql, new { UserId = expense.UserId });
        
        const string datasSql =
            """
                SELECT id, place, description, amount, created_at
                FROM expenses
                WHERE user_id = @UserId
                ORDER BY id DESC
                OFFSET @Offset 
                LIMIT @PageSize
            """;
        
        var parameters = new
        {
            UserId = expense.UserId,
            PageSize = expense.PageSize,
            Offset = (expense.Page - 1) * expense.PageSize,
        };
        
        var expenseList = await connection.QueryAsync<Expense>(datasSql, parameters);

        return new PagedResponse<Expense>
        {
            Data = expenseList,
            TotalCount = totalCount,
        };
    }

    public async Task<Expense> UpdateAndGetExpense(UpdateExpense updatedExpense)
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

        return await connection.QuerySingleOrDefaultAsync<Expense>(sql, updatedExpense);
    }
    
    public async Task<int> DeleteExpenseById(int id)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                DELETE FROM expenses
                WHERE id = @Id
                RETURNING id
            """;
        return await connection.QuerySingleOrDefaultAsync<int>(sql, new { Id = id });
    }

    // public async Task<IEnumerable<Expense>> GetExpenseList(LoadExpense request)
    // { 
    //     using var connection = await _connectionFactory.CreateConnectionAsync();
    //     const string sql =
    //         """
    //             SELECT id, place, description, amount, created_at
    //             FROM expenses
    //             WHERE user_id = @UserId AND created_at BETWEEN @StartDate AND @EndDate
    //             ORDER BY id
    //         """;
    //     return await connection.QueryAsync<Expense>(sql, new { UserId = request.UserId, StartDate = request.StartDate, EndDate = request.EndDate });
    // }
    public async Task<PagedResponse<Expense>> GetExpenseList(LoadExpense request)
    {
        const string datasSql =
            """
                SELECT id, place, description, amount, created_at
                FROM expenses
                WHERE user_id = @UserId AND created_at BETWEEN @StartDate AND @EndDate
                ORDER BY id DESC
                OFFSET @Offset 
                LIMIT @PageSize
            """;

        var parameters = new
        {
            UserId = request.UserId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            PageSize = request.PageSize,
            Offset = (request.Page - 1) * request.PageSize,
        };
        
        using var connection = await _connectionFactory.CreateConnectionAsync();
        
        const string recordCountSql = """SELECT COUNT(*) FROM expenses WHERE user_id = @UserId""";
        var totalCount = await connection.ExecuteScalarAsync<int>(recordCountSql, new { UserId = request.UserId });

        var expenseList = await connection.QueryAsync<Expense>(datasSql, parameters);

        return new PagedResponse<Expense>
        {
            Data = expenseList,
            TotalCount = totalCount,
        };
    }
}