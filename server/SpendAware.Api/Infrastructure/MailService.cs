using MailKit.Net.Smtp;
using MimeKit;
using SpendAware.Api.Data.Models;

namespace SpendAware.Api.Infrastructure;

public interface IMailService
{
    Task SendEmail(List<UserExpenseReport> reports);
}

public class MailService : IMailService
{
    //iterate over with each user an expense list then send
    public async Task SendEmail(List<UserExpenseReport> reports)
    {
        foreach (var u in reports)
        {
            //dynamic variables for each user
            string reportMonth = "May";
            string reportYear = "2026";
            string currencySymbol = "$";
            
            //email structure with MimeMessage
            var message = new MimeMessage();
            var from = new MailboxAddress("SpendAware", "Team@SpendAware.net");
            message.From.Add(from);
            var to = new MailboxAddress($"{u.UserResponse.Username}", $"{u.UserResponse.EmailAddress}");
            message.To.Add(to);
            message.Subject = "Monthly Expense Report for May";
            var bb = new BodyBuilder();
            bb.HtmlBody =
                $"<p>Hello {u.UserResponse.Username},</p>\n  \n<p>\nThanks for using Spend Aware, your solution for personal finance! <br>Total monthly expenses for {reportMonth} {reportYear} was {currencySymbol}{u.Total}. <br>You can download a pdf of your monthly expenses attached below. <br>Review your spending patterns to stay on track financially.  \n</p>\n  \n<p>Best,  \nSpendAware Team\n</p>\n</div>";
            //build monthly report and attach as pdf
            bb.Attachments.Add("cat.jpg");
            message.Body = bb.ToMessageBody();

            //start email relay server and send
            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("localhost", 1025);
            await smtp.SendAsync(message);
            await smtp.DisconnectAsync(true);
        }
    }
}