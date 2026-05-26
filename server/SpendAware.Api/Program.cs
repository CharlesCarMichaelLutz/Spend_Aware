using Microsoft.AspNetCore.Mvc;
using Scalar.AspNetCore;
using SpendAware.Api.Data.Models;
using SpendAware.Api.Services;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var services = builder.Services;

services.AddOpenApi();

services.AddScoped<IExpenseService, ExpenseService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.MapGet("/", () =>  "Weclome to Spend Aware!");

app.MapPost("/expenses",  (IExpenseService service, [FromBody] Expense expense) =>
{
    var response = service.CreateExpense(expense);
    return Results.Ok(response);
});

app.MapPatch("/expenses", (IExpenseService service, [FromBody] Expense expense) =>
{
    var response = service.UpdateExpense(expense);
    return Results.Ok(response);
});

app.MapGet("/expenses",  (IExpenseService service) =>
{
    var response =  service.GetAll();
    return Results.Ok(response);
});

app.MapDelete("expenses", (IExpenseService service, [FromBody] int id) =>
{
    var response = service.DeleteExpense(id);
});

app.Run();

