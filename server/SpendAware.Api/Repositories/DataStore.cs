using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Repositories;

public interface IDataStore
{
    void AddExpense(Expense expense);
    Expense GetExpenseById(int Id);
    Expense UpdateExpense(Expense update);
    int DeleteExpenseById(int Id);
    List<Expense> GetExpenses();
    List<Expense> GetExpensesByDate(int userId, DateTime start, DateTime end);
    IEnumerable<UserResponse> GetUsersForReport();
}

public class DataStore : IDataStore
{
    //create user list
    public static List<User> Users = new List<User>()
    {
        new User
        {
            Id = 1, 
            Username = "bormond0", 
            Email = "wchawner0@goo.gl",
            PasswordHash = "$2a$04$qAS5sRlVzegBqZuJuxdmAuz633a/rm8MAir3JKvMfhmLybM9BYCty"
        },
        new User
        {
            Id = 2, 
            Username = "zlaidel1", 
            Email = "ovandalen1@ox.ac.uk",
            PasswordHash = "$2a$04$k/uSP7/47Rrd0rT8XE9wY.LZTM0WQ7p60/1If8L7fKzQfNW00iNwe"
        },
        new User
        {
            Id = 3, 
            Username = "clidgely2", 
            Email = "msteart2@webnode.com",
            PasswordHash = "$2a$04$x6SsvjcXfvcj96WTYEytLupMscFrV5N2nJWnvV2QfB0MgupgBbygC"
        },
        new User
        {
            Id = 4, 
            Username = "toehme3", 
            Email = "gpedel3@rediff.com",
            PasswordHash = "$2a$04$LjQknTXcmI9nTgPwEgyCG.0DIMsuoMWKYpMyjwgdCfilSg3/IzjdC"
        },
        new User
        {
            Id = 5, 
            Username = "athaw4", 
            Email = "mklimkowski4@flickr.com",
            PasswordHash = "$2a$04$b0N8Uzj2GDimJse1MxNFO.35X5XHZfhHmoUsBQa3NyfJcN20IFlq6"
        }
    };
    
    public IEnumerable<UserResponse> GetUsersForReport()
    {
        return Users.Select(u => new UserResponse
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email
        });
    }
    
    //create expense list
    public static List<Expense> Expenses = new List<Expense>()
    {
        new Expense { Id = 1, UserId = 1, Place = "gas station", Description = "bought gas", Amount = 60.00m, Currency = "USD", CreatedAt = new DateTime(2026, 5, 1, 0, 0, 0)},
        new Expense { Id = 2, UserId = 1, Place = "HEB", Description = "groceries", Amount = 119.37m, Currency = "USD", CreatedAt = new DateTime(2026, 5, 1, 23, 59, 59)},
        new Expense { Id = 3, UserId = 1, Place = "Movie theater", Description = "movie tickets", Amount = 25.47m, Currency = "USD", CreatedAt = new DateTime(2026, 5, 2, 12, 0, 0)},
        new Expense { Id = 4, UserId = 1, Place = "T-mobile", Description = "paid phone bill", Amount = 73.99m, Currency = "USD", CreatedAt = new DateTime(2026, 5, 3, 8, 15, 30)},
        new Expense { Id = 5, UserId = 1, Place = "Planet Fitness", Description = "renewed gym membership", Amount = 117.97m, Currency = "USD", CreatedAt = new DateTime(2026, 5, 4, 18, 45, 10)},
        new Expense { Id = 6, UserId = 1, Place = "Citizen's Bank Park", Description = "tix to baseball game", Amount = 149.99m, Currency = "USD", CreatedAt = new DateTime(2026, 5, 5, 9, 30, 0)},
        
        new Expense { Id = 7, UserId = 2, Place = "gas station", Description = "bought gas", Amount = 60.00m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 6, 14, 20, 15)}, 
        new Expense { Id = 8, UserId = 2, Place = "HEB", Description = "groceries", Amount = 119.37m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 7, 7, 5, 45)}, 
        new Expense { Id = 9, UserId = 2, Place = "Movie theater", Description = "movie tickets", Amount = 25.47m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 8, 22, 10, 5)},
        new Expense { Id = 10, UserId = 2, Place = "T-mobile", Description = "paid phone bill", Amount = 73.99m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 9, 11, 55, 25)}, 
        new Expense { Id = 11, UserId = 2, Place = "Planet Fitness", Description = "renewed gym membership", Amount = 117.97m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 10, 16, 40, 50)}, 
        new Expense { Id = 12, UserId = 2, Place = "Citizen's Bank Park", Description = "tix to baseball game", Amount = 149.99m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 11, 13, 15, 0)},
        
        new Expense { Id = 13, UserId = 3, Place = "gas station", Description = "bought gas", Amount = 60.00m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 12, 19, 25, 35)}, 
        new Expense { Id = 14, UserId = 3, Place = "HEB", Description = "groceries", Amount = 119.37m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 13, 6, 50, 20)}, 
        new Expense { Id = 15, UserId = 3, Place = "Movie theater", Description = "movie tickets", Amount = 25.47m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 14, 21, 0, 0)},
        new Expense { Id = 16, UserId = 3, Place = "T-mobile", Description = "paid phone bill", Amount = 73.99m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 15, 10, 10, 10)}, 
        new Expense { Id = 17, UserId = 3, Place = "Planet Fitness", Description = "renewed gym membership", Amount = 117.97m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 16, 15, 45, 45)}, 
        new Expense { Id = 18, UserId = 3, Place = "Citizen's Bank Park", Description = "tix to baseball game", Amount = 149.99m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 17, 8, 30, 30)},
        
        new Expense { Id = 19, UserId = 4, Place = "gas station", Description = "bought gas", Amount = 60.00m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 18, 17, 20, 20)}, 
        new Expense { Id = 20, UserId = 4, Place = "HEB", Description = "groceries", Amount = 119.37m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 19, 12, 12, 12)}, 
        new Expense { Id = 21, UserId = 4, Place = "Movie theater", Description = "movie tickets", Amount = 25.47m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 20, 20, 20, 20)},
        new Expense { Id = 22, UserId = 4, Place = "T-mobile", Description = "paid phone bill", Amount = 73.99m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 21, 5, 5, 5)}, 
        new Expense { Id = 23, UserId = 1, Place = "Planet Fitness", Description = "renewed gym membership", Amount = 117.97m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 22, 14, 14, 14)}, 
        new Expense { Id = 24, UserId = 4, Place = "Citizen's Bank Park", Description = "tix to baseball game", Amount = 149.99m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 23, 9, 9, 9) },
        
        new Expense { Id = 25, UserId = 5, Place = "gas station", Description = "bought gas", Amount = 60.00m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 24, 18, 18, 18)}, 
        new Expense { Id = 26, UserId = 5, Place = "HEB", Description = "groceries", Amount = 119.37m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 25, 11, 11, 11)}, 
        new Expense { Id = 27, UserId = 5, Place = "Movie theater", Description = "movie tickets", Amount = 25.47m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 26, 16, 16, 16)},
        new Expense { Id = 28, UserId = 5, Place = "T-mobile", Description = "paid phone bill", Amount = 73.99m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 27, 7, 7, 7)}, 
        new Expense { Id = 29, UserId = 5, Place = "Planet Fitness", Description = "renewed gym membership", Amount = 117.97m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 28, 13, 13, 13)}, 
        new Expense { Id = 30, UserId = 5, Place = "Citizen's Bank Park", Description = "tix to baseball game", Amount = 149.99m, Currency = "USD", CreatedAt =     new DateTime(2026, 5, 29, 23, 59, 59)},
    };

    public void AddExpense(Expense expense)
    {
        Expenses.Add(expense);
    }

    public Expense GetExpenseById(int Id)
    {
        return Expenses.FirstOrDefault(x => x.Id == Id);
    }

    public Expense UpdateExpense(Expense update)
    {
        Expenses = Expenses.Select(x =>
        {
            if (x.Id == update.Id)
            {
                x.Place = update.Place;
                x.Description = update.Description;
                x.Amount = update.Amount;
            }

            return x;
        }).ToList();
        return update;
    }

    public int DeleteExpenseById(int Id)
    {
        Expenses = Expenses.FindAll(x => x.Id != Id);
        return Id;
    }

    public List<Expense> GetExpenses()
    {
        return Expenses;
    }

    public List<Expense> GetExpensesByDate(int userId, DateTime start, DateTime end)
    {
        return Expenses.Where(x =>
            x.UserId == userId 
            && x.CreatedAt >= start 
            && x.CreatedAt <= end).ToList();
    }
}