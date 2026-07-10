using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Database;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;
using SpendAware.Api.Services;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var services = builder.Services;

 services.AddAuthentication(x =>
 {
     x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
     x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
     x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
 }).AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidIssuer = config["Jwt:Issuer"],
         ValidAudience = config["Jwt:Audience"],
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"]!)),
         ValidateIssuer = true,
         ValidateAudience = true,
         ValidateLifetime = true,
         ValidateIssuerSigningKey = true,
     };
 });

services.AddAuthorization();
services.AddOpenApi();

services.AddScoped<IPostgresSqlConnectionFactory>(_ => 
    new  PostgresSqlConnectionFactory(config.GetValue<string>("ConnectionStrings:Spend_Aware")!));
services.AddScoped<IExpenseService, ExpenseService>();
services.AddScoped<IUserService, UserService>();
services.AddScoped<IUserRepository, UserRepository>();
services.AddSingleton<IPasswordHasher, PasswordHasher>();
services.AddScoped<ITokenService, TokenService>();
services.AddSingleton<IDataStore, DataStore>();
services.AddScoped<IExpenseReportService, ExpenseReportService>();
services.AddScoped<IMailService, MailService>();
services.AddScoped<IPdfGenerator, PdfGenerator>();

services.AddCors(options =>
{
    options.AddPolicy("SpendAware", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();
Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Spend Aware API v1");
    });
}

using (var scope = app.Services.CreateScope())
{
    var pdfGenerator  = scope.ServiceProvider.GetRequiredService<IPdfGenerator>();
    pdfGenerator.CreatePdf();
}

app.UseCors("SpendAware");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapPost("register", async (IUserService service, [FromBody] CreateUserRequest user) =>
{ 
    //validate user input with FluentValidation
    try
    {
        var response = await service.CreateUser(user);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.NotFound(ex.Message);
    }
});

app.MapPost("login", async (IUserService service, [FromBody] CreateUserRequest user) =>
{
    try
    {
        var response = await service.LoginUser(user);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapGet("users",  async (IUserService service) =>
{
    var response = await service.GetAllUsers();
    return Results.Ok(response);
});

app.MapPost("expenses",  (IExpenseService service, [FromBody] Expense expense) =>
{
    var response = service.CreateExpense(expense);
    return Results.Ok(response);
});

app.MapPatch("expenses", (IExpenseService service, [FromBody] Expense expense) =>
{
    var response = service.UpdateExpense(expense);
    return Results.Ok(response);
});

app.MapGet("expenses", (IExpenseService service) =>
{
    var response =  service.GetAll();
    return Results.Ok(response);
});

app.MapDelete("expenses", (IExpenseService service, [FromBody] int id) =>
{
    var response = service.DeleteExpense(id);
});

app.MapGet("automated-report", async (IExpenseReportService service) =>
{
    var response = await service.GetMonthlyReport();
    return Results.Ok(response);
});

app.MapPost("report/year", (IExpenseReportService service, [FromBody] int id) =>
{
    var stream = service.GetAllExpensesByYear(id);
    return Results.File(stream, "application/pdf", "test.pdf");
});

app.MapPost("report/month", (IExpenseReportService service, [FromBody] int id) =>
{
    var stream = service.GetAllExpensesByMonth(id);
    return Results.File(stream, "application/pdf", "test.pdf");
});

app.Run();

