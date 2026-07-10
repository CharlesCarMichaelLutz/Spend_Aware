using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Data.Responses;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;
public interface IUserService
{
    Task<UserLoginResponse> CreateUser(CreateUserRequest request);
    Task<UserLoginResponse> LoginUser(CreateUserRequest request);
    Task<IEnumerable<UserResponse>> GetAllUsers();
}
public class UserService : IUserService
{
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly IDataStore _dataStore;
    private readonly IUserRepository _userRepository;

    public UserService(IPasswordHasher passwordHasher, ITokenService tokenService, IDataStore dataStore, IUserRepository userRepository)
    {
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _dataStore = dataStore;
        _userRepository = userRepository;
    }
    public async Task<UserLoginResponse> CreateUser(CreateUserRequest request)
    {
        const string message = "Failed to create user try again";
        
        var checkUserEmail = await _userRepository.CheckEmail(request.Email);

        if (checkUserEmail is not null)
        {
            throw new Exception(message);
        }

        var createUser = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = _passwordHasher.Hash(request.Password),
            CreatedAt = DateTimeOffset.UtcNow
        };
        
        var user = await _userRepository.CreateUser(createUser);
        
        // create/save/send Refresh Token as httponly cookie

        //validate and confirm user email by code

        var response = new UserLoginResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            CreatedAt = user.CreatedAt,
            AccessToken = _tokenService.Create(user.Username)
        };
        
        if(user is null)
        {
            throw new Exception(message);
        }
        return response;
    }
    
    public async Task<UserLoginResponse> LoginUser(CreateUserRequest request)
    {
        const string message = "Login failed try again";
        
        var user = await _userRepository.GetUserById(request.Username) ?? throw new Exception(message);

        bool verified = _passwordHasher.Verify(request.Password, user.PasswordHash);

        if (!verified)
        {
            throw new Exception(message);
        }
        
        //validate and confirm user email by code
        // create/save/send Refresh Token as httponly cookie
        
        var response = new UserLoginResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            CreatedAt = user.CreatedAt,
            AccessToken = _tokenService.Create(user.Username)
        };
        return response;
    }

    public async Task<IEnumerable<UserResponse>> GetAllUsers()
    {
        var userList = await _userRepository.GetAllUsers();

        return userList.Select(u => new UserResponse
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email
        });
    }
    //refresh-token
    //logout
}