using SpendAware.Api.Data.Models;
using SpendAware.Api.Database;
using Dapper;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Repositories;

public interface IUserRepository
{
    Task<string?> CheckEmail(string email);
    Task<RegisteredUser> CreateUser(CreateUser user);
    Task<bool> SaveEmailToken(EmailToken token);
    Task<LoggedInUser?> GetUser(int id);
    Task<bool> ConfirmEmailToken(ConfirmEmailRequest request);
    Task<LoggedInUser?> GetUserById(string username);
    Task<IEnumerable<UserResponse>> GetAllUsers();
}

public class UserRepository : IUserRepository
{
    private readonly IPostgresSqlConnectionFactory _connectionFactory;
    
    public UserRepository(IPostgresSqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    public async Task<string?> CheckEmail(string email)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT email 
                FROM users 
                WHERE email = @Email
            """;
        return await connection.QuerySingleOrDefaultAsync<string>(sql, new { email = email});
    }
    
    public async Task<RegisteredUser> CreateUser(CreateUser user)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string insert_user =
            """
                INSERT INTO users 
                    (username, password_hash, email, created_date)
                VALUES (@Username, @PasswordHash, @Email, @CreatedAt)
                RETURNING id
            """;
        const string insert_user_preferences =
            """
                INSERT INTO user_preferences
                    (user_id, language_code, currency_code)
                VALUES (@UserId, @Language, @Currency)
            """;
        using var transaction = connection.BeginTransaction();
        try
        {
            var userId = await connection.ExecuteScalarAsync<int>(insert_user, user, transaction);
            await connection.ExecuteAsync(
                insert_user_preferences,
                new
                {
                    UserId = userId,
                    user.Language,
                    user.Currency
                },
                transaction
            );
            transaction.Commit();

            return new RegisteredUser
            {
                Id = userId,
                Email = user.Email,
                Username = user.Username
            };
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }

    public async Task<bool> SaveEmailToken(EmailToken token)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                INSERT INTO email_verification_tokens
                (user_id, email_code, created_at,  expires_at)
                VALUES (@UserId, @EmailCode, @CreatedAt, @ExpiresAt)
            """;
        var result = await connection.ExecuteAsync(sql, token);
        
        return result > 0;
    }
    
    public async Task<LoggedInUser?> GetUser(int id)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string squeal =
            """
                SELECT 
                    u.id, 
                    u.username, 
                    u.email, 
                    u.created_date AS CreatedAt, 
                    u.password_hash, 
                    p.language_code AS Language, 
                    p.currency_code AS Currency
                FROM users u 
                JOIN  user_preferences p
                ON u.id = p.user_id
                WHERE u.id = @Id
            """;

        return await connection.QuerySingleOrDefaultAsync<LoggedInUser>(squeal, new {id = id });
    }
    
    public async Task<bool> ConfirmEmailToken(ConfirmEmailRequest request)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT COUNT(1) 
                FROM  email_verification_tokens
                WHERE user_id = @UserId 
                AND email_code = @EmailCode 
                AND expires_at > Now()
            """;
        var result = await connection.QuerySingleOrDefaultAsync<int>(sql, new {UserId = request.UserId, EmailCode = request.EmailCode});
        
        return result > 0;
    }
    
    public async Task<LoggedInUser?> GetUserById(string username)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT 
                    u.id, 
                    u.username, 
                    u.email, 
                    u.created_date AS CreatedAt, 
                    u.password_hash, 
                    p.language_code AS Language, 
                    p.currency_code AS Currency
                FROM users u 
                JOIN  user_preferences p
                ON u.id = p.user_id
                WHERE u.username = @Username
            """;
        
        return await connection.QuerySingleOrDefaultAsync<LoggedInUser>(sql, new {username = username });
    }
    
    public async Task<IEnumerable<UserResponse>> GetAllUsers()
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT id, username, email, created_date AS CreatedAt
                FROM users
            """;
        return await connection.QueryAsync<UserResponse>(sql);
    }
}