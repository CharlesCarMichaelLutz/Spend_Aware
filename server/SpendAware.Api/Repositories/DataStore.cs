using SpendAware.Api.Data.Models;

namespace SpendAware.Api.Repositories;

public class DataStore
{
    //create expense list
    public static List<Expense> Expenses = new List<Expense>()
    {
        new Expense { Id = 1, Place = "gas station", Description = "bought gas", Amount = 60.00m, Currency = "USD" },
        new Expense { Id = 2, Place = "HEB", Description = "groceries", Amount = 119.37m, Currency = "USD" },
        new Expense { Id = 3, Place = "Movie theater", Description = "movie tickets", Amount = 25.47m, Currency = "USD" },
        new Expense { Id = 4, Place = "T-mobile", Description = "paid phone bill", Amount = 73.99m, Currency = "USD" },
        new Expense { Id = 5, Place = "Planet Fitness", Description = "renewed gym membership", Amount = 117.97m, Currency = "USD" },
        new Expense { Id = 6, Place = "Citizen's Bank Park", Description = "tix to baseball game", Amount = 149.99m, Currency = "USD" },
        new Expense { Id = 7, Place = "Doughnut shop", Description = "got breakfast", Amount = 15.19m, Currency = "USD" },
        new Expense { Id = 8, Place = "Gas company", Description = "paid natural gas bill", Amount = 37.25m, Currency = "USD" },
        new Expense { Id = 9, Place = "Azure", Description = "paid cloud subscription", Amount = 85.16m, Currency = "USD" },
        new Expense { Id = 10, Place = "University", Description = "tuition paid", Amount = 4999.99m, Currency = "USD" }
    };
    
    //create user list
 
}