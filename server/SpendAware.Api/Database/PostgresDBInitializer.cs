using Dapper;

namespace SpendAware.Api.Database;

public class PostgresDBInitializer
{
    private readonly IPostgresSqlConnectionFactory  _connectionFactory;

    public PostgresDBInitializer(IPostgresSqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task InitializeAsync()
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        await connection.ExecuteAsync(@"
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                password_hash VARCHAR(300) NOT NULL,
                email VARCHAR(150) NOT NULL,
                created_date TIMESTAMPTZ NOT NULL
            );

            CREATE TABLE IF NOT EXISTS expenses (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                place VARCHAR(200) NOT NULL,
                description VARCHAR(300) NOT NULL,
                amount NUMERIC NOT NULL,
                created_at TIMESTAMPTZ NOT NULL,
                updated_at TIMESTAMPTZ,
                
                CONSTRAINT FK_expenses_users FOREIGN KEY (user_id)
                        REFERENCES users(id)
            );
            
            CREATE TABLE IF NOT EXISTS user_preferences (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                language_code VARCHAR(50) NOT NULL,
                currency_code VARCHAR(50) NOT NULL,
                
                CONSTRAINT FK_user_preferences_users FOREIGN KEY (user_id)
                        REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS email_reports (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                report_month VARCHAR(50) NOT NULL,
                sent_date TIMESTAMPTZ NOT NULL,
                status BOOLEAN  NOT NULL,
                 
                CONSTRAINT FK_email_reports_users FOREIGN KEY (user_id)
                        REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS tokens (
                id SERIAL PRIMARY KEY,
	            user_id INTEGER NOT NULL,
	            token varchar(300) NOT NULL,
                expires_on_utc TIMESTAMPTZ NOT NULL,
                is_expired BOOLEAN NOT NULL,

                CONSTRAINT FK_tokens_users FOREIGN KEY (user_id)
                       REFERENCES users(id)
             );
        ");
    }
}