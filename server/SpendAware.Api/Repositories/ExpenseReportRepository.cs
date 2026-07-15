using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;
using SpendAware.Api.Database;
using Dapper;
using SpendAware.Api.Data.Requests;

namespace SpendAware.Api.Repositories;

public interface IExpenseReportRepository
{
    Task<IEnumerable<UserResponse>> GetUsersForReport();
    // Task<IEnumerable<Expense>> GetExpensesByDate(LoadExpenseListRequest request);
    // Task<List<ExpenseResponse>> GetExpensesByDate(int userId, DateTime start, DateTime end);
    Task<IEnumerable<ExpenseResponse>> GetExpensesByDate(int userId, DateTimeOffset start, DateTimeOffset end);
}

public class ExpenseReportRepository : IExpenseReportRepository
{
    private readonly IPostgresSqlConnectionFactory _connectionFactory;

    public ExpenseReportRepository(IPostgresSqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<UserResponse>> GetUsersForReport()
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT id,  username, email
                FROM users
            """;
        return await connection.QueryAsync<UserResponse>(sql);
    }

    public async Task<IEnumerable<ExpenseResponse>> GetExpensesByDate(int userId, DateTimeOffset start, DateTimeOffset end)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT id, place, description, amount, created_at, updated_at 
                FROM expenses
                WHERE user_id = @UserId, created_at = CreatedAt BETWEEN @StartDate AND @EndDate
            """;
        return await connection.QueryAsync<ExpenseResponse>(sql, new { user_id = userId, StartDate = start, EndDate = end });
        
    }

}