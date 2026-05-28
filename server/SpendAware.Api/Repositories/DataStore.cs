using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Repositories;

public interface IDataStore
{
    User CheckEmail(string emailAddress);
    void AddUser(User user);
    IEnumerable<User> GetUsers();
    void AddExpense(Expense expense);
    Expense GetExpenseById(int Id);
    Expense UpdateExpense(Expense update);
    int DeleteExpenseById(int Id);
    List<Expense> GetExpenses();
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
            EmailAddress = "wchawner0@goo.gl",
            PasswordHash = "$2a$04$qAS5sRlVzegBqZuJuxdmAuz633a/rm8MAir3JKvMfhmLybM9BYCty"
        },
        new User
        {
            Id = 2, 
            Username = "zlaidel1", 
            EmailAddress = "ovandalen1@ox.ac.uk",
            PasswordHash = "$2a$04$k/uSP7/47Rrd0rT8XE9wY.LZTM0WQ7p60/1If8L7fKzQfNW00iNwe"
        },
        new User
        {
            Id = 3, 
            Username = "clidgely2", 
            EmailAddress = "msteart2@webnode.com",
            PasswordHash = "$2a$04$x6SsvjcXfvcj96WTYEytLupMscFrV5N2nJWnvV2QfB0MgupgBbygC"
        },
        new User
        {
            Id = 4, 
            Username = "toehme3", 
            EmailAddress = "gpedel3@rediff.com",
            PasswordHash = "$2a$04$LjQknTXcmI9nTgPwEgyCG.0DIMsuoMWKYpMyjwgdCfilSg3/IzjdC"
        },
        new User
        {
            Id = 5, 
            Username = "athaw4", 
            EmailAddress = "mklimkowski4@flickr.com",
            PasswordHash = "$2a$04$b0N8Uzj2GDimJse1MxNFO.35X5XHZfhHmoUsBQa3NyfJcN20IFlq6"
        }
    };
    public User CheckEmail(string emailAddress)
    {
        var user  = Users.SingleOrDefault(user => user.EmailAddress == emailAddress);
        return user;
    }
    public void AddUser(User user)
    {
        Users.Add(user);
    }
    public IEnumerable<User> GetUsers()
    {
        return Users;
    }
    
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
}