using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Data.Responses;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;

//interface
public interface IUserService
{
    UserLoginResponse CreateUser(CreateUserRequest request);
    UserLoginResponse LoginUser(CreateUserRequest request);
}
public class UserService : IUserService
{
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    
    public UserService(IPasswordHasher passwordHasher, ITokenService tokenService)
    {
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
    }
    //register
    public UserLoginResponse CreateUser(CreateUserRequest request)
    {
        const string message = "Failed to create user try again";
        //check user for existing email in DB
        var checkUserEmail = DataStore.Users.SingleOrDefault(user => user.EmailAddress == request.Email);

        if (checkUserEmail is not null)
        {
            throw new Exception(message);
        }
        //create user model
        var user = new User
        {
            Id = request.Id,
            Username = request.Username,
            EmailAddress = request.Email,
            //hash the password from request
            PasswordHash = _passwordHasher.Hash(request.Password)
        };
        //validate and confirm user email by code
        //add user to DB
        DataStore.Users.Add(user);
        // create/save/send Refresh Token as httponly cookie
        //return UserLoginResponse
        var response = new UserLoginResponse
        {
            Id = user.Id,
            Username = user.Username,
            EmailAddress = user.EmailAddress,
            //generate token JWT
            AccessToken = _tokenService.Create(user.Username)
        };
        return response;
    }
    //login
    public UserLoginResponse LoginUser(CreateUserRequest request)
    {
        const string message = "Login failed try again";
        //check user by email in DB
        var user = DataStore.Users.SingleOrDefault(user => user.EmailAddress == request.Email);
        
        if (user is not null)
        {
            throw new Exception(message);
        }
        
        //check password and password hash
        bool verified = _passwordHasher.Verify(request.Password, user.PasswordHash);
        
        if (!verified)
        {
            throw new Exception(message);
        }
        //validate and confirm user email by code
        // create/save/send Refresh Token as httponly cookie
        //return UserLoginResponse
        var response = new UserLoginResponse
        {
            Id = user.Id,
            Username = user.Username,
            EmailAddress = user.EmailAddress,
            //generate token JWT
            AccessToken = _tokenService.Create(user.Username)
        };
        return response;
    }
    //refresh-token
    //logout
}