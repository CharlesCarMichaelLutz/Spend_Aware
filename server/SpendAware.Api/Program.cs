using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
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

services.AddOpenApi();
services.AddScoped<IExpenseService, ExpenseService>();
services.AddScoped<IUserService, UserService>();
services.AddSingleton<IPasswordHasher, PasswordHasher>();
services.AddScoped<ITokenService, TokenService>();
services.AddSingleton<IDataStore, DataStore>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseAuthentication();
//app.UseAuthorization();

app.MapPost("register", (IUserService service, [FromBody] CreateUserRequest user) =>
{ 
    //validate user input with FluentValidation
    try
    {
        var response =  service.CreateUser(user);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.NotFound(ex.Message);
    }
});

app.MapPost("login", (IUserService service, [FromBody] CreateUserRequest user) =>
{
    try
    {
        var response = service.LoginUser(user);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapGet("users", (IUserService service) =>
{
    var response = service.GetAllUsers();
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

app.MapGet("expenses",  (IExpenseService service) =>
{
    var response =  service.GetAll();
    return Results.Ok(response);
});

app.MapDelete("expenses", (IExpenseService service, [FromBody] int id) =>
{
    var response = service.DeleteExpense(id);
});

app.Run();

