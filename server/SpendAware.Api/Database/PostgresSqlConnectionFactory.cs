using System.Data;
using Npgsql;

namespace SpendAware.Api.Database;

public interface IPostgresSqlConnectionFactory
{
    Task<IDbConnection> CreateConnectionAsync();
}

public class PostgresSqlConnectionFactory : IPostgresSqlConnectionFactory
{
    private readonly string _connectionString;

    public PostgresSqlConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<IDbConnection> CreateConnectionAsync()
    {
        var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        return connection;
    }
}