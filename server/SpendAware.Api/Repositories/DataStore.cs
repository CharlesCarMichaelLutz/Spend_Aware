using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Repositories;

public interface IDataStore
{
    User CheckEmail(string emailAddress);
    void AddUser(User user);
    IEnumerable<User> GetUsers();
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
    public static List<Expense> Expenses = new List<Expense>();
}