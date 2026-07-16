using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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

//Services
services.AddScoped<IUserService, UserService>();
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IExpenseService, ExpenseService>();
services.AddScoped<IExpenseRepository, ExpenseRepository>();
services.AddScoped<IExpenseReportService, ExpenseReportService>();
services.AddScoped<IExpenseReportRepository, ExpenseReportRepository>();

//Infrastructure
services.AddSingleton<IPasswordHasher, PasswordHasher>();
services.AddScoped<ITokenService, TokenService>();
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

app.MapPost("login", async (IUserService service, [FromBody] LoginUserRequest user) =>
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

app.MapGet("users", async (IUserService service) =>
{
    var response = await service.GetAllUsers();
    return Results.Ok(response);
});

app.MapPost("expenses/load", async (IExpenseService service, [FromBody] LoadExpenseListRequest request) =>
{
    try
    {
        var response = await service.LoadExpenseList(request);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapPost("expenses", async (IExpenseService service, [FromBody] ExpenseRequest expense) =>
{
    try
    {
        var response = await service.CreateExpense(expense);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapPut("expenses", async (IExpenseService service, [FromBody] UpdateExpenseRequest request) =>
{
    try
    {
        var response = await service.UpdateExpense(request);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapDelete("expenses", async (IExpenseService service, [FromBody] int id) =>
{
    try
    {
        var response = await service.DeleteExpense(id);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapPost("report/automated", async (IExpenseReportService service, [FromBody] ReportListRequest request) =>
{
    var response = await service.GetMonthlyReport(request);
    return Results.Ok(response);
});

app.MapPost("report/year", async (IExpenseReportService service, [FromBody] LoadExpenseListRequest request) =>
{
    var stream = await service.GetAllExpensesByYear(request);
    return Results.File(stream, "application/pdf", "test.pdf");
});

app.MapPost("report/month", async (IExpenseReportService service, [FromBody] LoadExpenseListRequest request) =>
{
    var stream = await service.GetAllExpensesByMonth(request);
    return Results.File(stream, "application/pdf", "test.pdf");
});

app.Run();

