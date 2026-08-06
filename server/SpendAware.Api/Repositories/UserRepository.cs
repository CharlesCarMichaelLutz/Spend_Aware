using Org.BouncyCastle.Crypto.Generators;
using SpendAware.Api.Data.Models;
using SpendAware.Api.Database;
using Dapper;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Repositories;

public interface IUserRepository
{
    Task<string?> CheckEmail(string email);
    Task<bool> SaveEmailToken(EmailToken token);
    Task<bool> ConfirmEmailToken(ConfirmEmailRequest request);
    // Task<RegisteredUser?> CreateUser(CreateUser user);
    Task<RegisteredUser> CreateUser(CreateUser user);
    Task<LoggedInUser?> GetUserById(string username);
    Task<IEnumerable<UserResponse>> GetAllUsers();
    Task<LoggedInUser?> GetUser(int userId);
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
    public async Task<bool> ConfirmEmailToken(ConfirmEmailRequest request)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT COUNT(1) FROM  email_verification_tokens
                WHERE user_id = @UserId AND email_code = @EmailCode
                (user_id, email_code, created_at,  expires_at)
                VALUES (@UserId, @EmailCode, @CreatedAt, @ExpiresAt)
            """;
        var result = await connection.ExecuteAsync(sql, request);
        return result > 0;
    }
    
    // public async Task<bool> CreateAsync(CustomerDto customer)
    // {
    //     using var connection = await _connectionFactory.CreateConnectionAsync();
    //     var result = await connection.ExecuteAsync(
    //         @"INSERT INTO Customers (Id, Username, FullName, Email, DateOfBirth) 
    //         VALUES (@Id, @Username, @FullName, @Email, @DateOfBirth)",
    //         customer);
    //     return result > 0;
    // }
    
    // public async Task<User?> CreateUser(User user)
    // {
    //     using var connection = await _connectionFactory.CreateConnectionAsync();
    //     const string sql =
    //         """
    //             INSERT INTO users 
    //                 (username, password_hash, email, created_date)
    //             VALUES (@Username, @PasswordHash, @Email, @CreatedAt)
    //             RETURNING id, username, email, created_date AS CreatedAt
    //         """;
    //     return await connection.QuerySingleOrDefaultAsync<User>(sql, user); 
    // }
    // public async Task<RegisteredUser?> CreateUser(CreateUser user)
    // {
    //     using var connection = await _connectionFactory.CreateConnectionAsync();
    //     const string insert_user =
    //         """
    //             INSERT INTO users 
    //                 (username, password_hash, email, created_date)
    //             VALUES (@Username, @PasswordHash, @Email, @CreatedAt)
    //             RETURNING id
    //         """;
    //     const string insert_user_preferences =
    //         """
    //             INSERT INTO user_preferences
    //                 (user_id, language_code, currency_code)
    //             VALUES (@UserId, @Language, @Currency)
    //         """;
    //     using var transaction = connection.BeginTransaction();
    //     try
    //     {
    //         var userId = await connection.ExecuteScalarAsync<int>(insert_user, user, transaction);
    //         await connection.ExecuteAsync(
    //             insert_user_preferences,
    //             new
    //             {
    //                 UserId = userId,
    //                 user.Language,
    //                 user.Currency
    //             },
    //             transaction
    //         );
    //         transaction.Commit();
    //
    //         return new RegisteredUser
    //         {
    //             Id = userId,
    //             Username = user.Username,
    //             Email = user.Email,
    //             CreatedAt = user.CreatedAt,
    //             Language = user.Language,
    //             Currency = user.Currency
    //         };
    //     }
    //     catch
    //     {
    //         transaction.Rollback();
    //         throw;
    //     }
    // }
    
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

            // return userId;
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
    
    // public async Task<User?> GetUserById(string username)
    // {
    //     using var connection = await _connectionFactory.CreateConnectionAsync();
    //     const string sql =
    //         """
    //             SELECT id, username, email, password_hash, created_date AS CreatedAt
    //             FROM users 
    //             WHERE username = @Username
    //         """;
    //     return await connection.QuerySingleOrDefaultAsync<User>(sql, new {username = username });
    // }
    
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
    
    public async Task<LoggedInUser?> GetUser(int userId)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        // const string sql =
        //     """
        //         SELECT 
        //             u.id, 
        //             u.username, 
        //             u.email, 
        //             u.created_date AS CreatedAt, 
        //             p.language_code AS Language, 
        //             p.currency_code AS Currency
        //         FROM users u 
        //         JOIN  user_preferences p
        //         ON u.id = p.user_id
        //         WHERE u.id = @UserId
        //     """;
        const string sql =
            """
                SELECT 
                    u.id, 
                    u.username, 
                    u.email, 
                    u.created_date AS CreatedAt, 
                    p.language_code AS Language, 
                    p.currency_code AS Currency
                FROM users u 
                JOIN  user_preferences p
                ON u.id = p.user_id
                WHERE u.id = @UserId
            """;
        return await connection.QuerySingleOrDefaultAsync<LoggedInUser>(sql, new {id = userId });
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