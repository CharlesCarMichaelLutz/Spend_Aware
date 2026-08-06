using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Requests;
using SpendAware.Api.Data.Responses;
using SpendAware.Api.Infrastructure;
using SpendAware.Api.Repositories;

namespace SpendAware.Api.Services;
public interface IUserService
{
    //Task<CreateUserLoginResponse> CreateUser(CreateUserRequest request);
    Task<int> CreateUser(CreateUserRequest request);
    Task<CreateUserLoginResponse> VerifyEmail(ConfirmEmailRequest request);
    Task<CreateUserLoginResponse> LoginUser(LoginUserRequest request);
    Task<IEnumerable<UsersResponse>> GetAllUsers();
}
public class UserService : IUserService
{
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly IUserRepository _userRepository;
    private readonly IMailService _mailService;

    public UserService
    (
        IPasswordHasher passwordHasher, 
        ITokenService tokenService, 
        IUserRepository userRepository, 
        IMailService mailService
        )
    {
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _userRepository = userRepository;
        _mailService = mailService;
    }

    public async Task<CreateUserLoginResponse> VerifyEmail(ConfirmEmailRequest request)
    {
        string message = "Email verification failed";
        
        if(request.EmailCode == null || request.UserId == 0) throw new Exception(message);
        
        var user = await _userRepository.GetUser(request.UserId);
        
        var isVerified = await _userRepository.ConfirmEmailToken(request);

        if (isVerified)
        {
            var response = new CreateUserLoginResponse
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreatedAt.ToString("O"),
                Language = user.Language,
                Currency = user.Currency,
                AccessToken = _tokenService.Create(user.Username)
            };
            return response;
        }
        throw new Exception(message);
    }
    public async Task<int> CreateUser(CreateUserRequest request)
    {
        //validate incoming request

        // if (ModelState.IsValid)
        // {
        //     
        // }
        
        const string message = "Failed to create user try again";
        
        var checkUserEmail = await _userRepository.CheckEmail(request.Email);

        if (checkUserEmail is not null)
        {
            throw new Exception(message);
        }
        
        var createUser = new CreateUser()
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = _passwordHasher.Hash(request.Password),
            Language = request.Language,
            Currency = request.Currency,
            CreatedAt = request.CreatedAt.ToUniversalTime()
        };
        
        //return userId only  
        var user = await _userRepository.CreateUser(createUser);

        if (user is not null)
        {
            //require email confirmation
            var code = GenerateSecureCode(user.Email);
            
            //save code in db, so it can be checked with email verification table 
            var emailToken = new EmailToken
            {
                UserId = user.Id,
                EmailCode = code,
                CreatedAt = DateTimeOffset.UtcNow,
                ExpiresAt = DateTimeOffset.UtcNow.AddHours(4)
            };

            var saveEmailToken = await _userRepository.SaveEmailToken(emailToken);
            
            var confirmedEmail = new VerifyEmailResponse
            {
                UserId = user.Id,
                EmailCode = code,
                Email = user.Email,
                Username = user.Username
            };
            
            // send email and code to the user 
            await _mailService.SendVerificationEmail(confirmedEmail);

            if (saveEmailToken)
            {
                // var confirmedEmailResponse = new VerifyEmail
                // {
                //     UserId = user.Id,
                //     EmailCode = code
                // };
                return user.Id;
            }
        }
        throw new Exception(message);
    }
    
    public async Task<CreateUserLoginResponse> LoginUser(LoginUserRequest request)
    {
        const string message = "Login failed try again";
        
        var user = await _userRepository.GetUserById(request.Username) ?? throw new Exception(message);

        bool verified = _passwordHasher.Verify(request.Password, user.PasswordHash);

        if (!verified)
        {
            throw new Exception(message);
        }
        
        // create/save/send Refresh Token as httponly cookie
        
        var response = new CreateUserLoginResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            CreatedAt = user.CreatedAt.ToString("O"),
            Language = user.Language,
            Currency = user.Currency,
            AccessToken = _tokenService.Create(user.Username)
        };
        return response;
    }

    public async Task<IEnumerable<UsersResponse>> GetAllUsers()
    {
        var userList = await _userRepository.GetAllUsers();

        return userList.Select(u => new UsersResponse
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email,
            CreatedAt = u.CreatedAt.ToString("O")
        });
    }
    //refresh-token
    //logout
    
    public static string GenerateSecureCode(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            throw new ArgumentException("User email cannot be null or empty", nameof(email));
        }

        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(email));
            int hashValue =  BitConverter.ToInt32(hashBytes, 0);
            int codeNumber = (Math.Abs(hashValue) % 900000) + 100000;

            return codeNumber.ToString("D6");
        }
    }
}