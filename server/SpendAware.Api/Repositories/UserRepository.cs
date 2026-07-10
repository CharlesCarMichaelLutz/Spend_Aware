using Org.BouncyCastle.Crypto.Generators;
using SpendAware.Api.Data.Models;
using SpendAware.Api.Database;
using Dapper;

namespace SpendAware.Api.Repositories;

public interface IUserRepository
{
    // Task<User?> CheckEmail(string email);
    Task<string?> CheckEmail(string email);
    
    Task<User?> CreateUser(User user);
    Task<User?> GetUserById(string username);
}

public class UserRepository : IUserRepository
{
    //create db connection  interface
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
                SELECT email FROM users WHERE email = @Email
            """;
        return await connection.QuerySingleOrDefaultAsync<string>(sql, email);
    }
    
    public async Task<User?> CreateUser(User user)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                INSERT INTO users 
                    (username, password_hash, email, created_date)
                VALUES (@Username, @Email, @PasswordHash, @CreatedAt)
                RETURNING id, username, email, created_date
            """;
        return await connection.QuerySingleOrDefaultAsync<User>(sql, user); 
    }
    
    public async Task<User?> GetUserById(string username)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        const string sql =
            """
                SELECT * FROM users WHERE username = @Username
            """;

        return await connection.QuerySingleOrDefaultAsync<User>(sql, username);
    }

}