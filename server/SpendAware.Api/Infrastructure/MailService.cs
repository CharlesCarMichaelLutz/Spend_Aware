using MailKit.Net.Smtp;
using MimeKit;
using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Infrastructure;

public interface IMailService
{
    Task SendEmail(List<UserExpenseReport> reports);
    Task SendVerificationEmail(VerifyEmailResponse verify);
}

public class MailService : IMailService
{
    public async Task SendVerificationEmail(VerifyEmailResponse verify)
    {
                var message = new MimeMessage();
                var from = new MailboxAddress("SpendAware", "Team@SpendAware.net");
                message.From.Add(from);
                var to = new MailboxAddress($"{verify.Username}", $"{verify.Email}");
                
                message.To.Add(to);
                message.Subject = "Confirm your email address";
                
                var bb = new BodyBuilder();
                bb.HtmlBody =
                    $"<p>Hello {verify.Username},</p>\n  \n<p>\nThanks for signing up for Spend Aware, your solution for personal finance! <br>Your email confirmation code is {verify.EmailCode}. Enter the code on the home page.   \n</p>\n  \n<p>Best,  \nSpendAware Team\n</p>\n</div>";
                message.Body = bb.ToMessageBody();

                //start email relay server and send
                using var smtp = new  SmtpClient();
                await smtp.ConnectAsync("localhost", 1025);
                await smtp.SendAsync(message);
                Console.WriteLine("Email sent");
    }
    public async Task SendEmail(List<UserExpenseReport> reports)
    {
        foreach (var u in reports)
        {
            //dynamic variables for each user
            string reportMonth = "July";
            string reportYear = "2026";
            string currencySymbol = "$";
            
            //email structure with MimeMessage
            var message = new MimeMessage();
            var from = new MailboxAddress("SpendAware", "Team@SpendAware.net");
            message.From.Add(from);
            var to = new MailboxAddress($"{u.UserResponse.Username}", $"{u.UserResponse.Email}");
            message.To.Add(to);
            message.Subject = "Monthly Expense Report for May";
            var bb = new BodyBuilder();
            bb.HtmlBody =
                $"<p>Hello {u.UserResponse.Username},</p>\n  \n<p>\nThanks for using Spend Aware, your solution for personal finance! <br>Total monthly expenses for {reportMonth} {reportYear} was {currencySymbol}{u.Total}. <br>You can download a pdf of your monthly expenses attached below. <br>Review your spending patterns to stay on track financially.  \n</p>\n  \n<p>Best,  \nSpendAware Team\n</p>\n</div>";
            //build monthly report and attach as pdf
            // bb.Attachments.Add("cat.jpg");
            if (u.PdfFile != null && u.PdfFile.Length > 0)
            {
                bb.Attachments.Add(
                    $"Report_{u.UserResponse.Id}.pdf",
                    u.PdfFile,
                    new ContentType("application", "pdf")
                );
            }
            message.Body = bb.ToMessageBody();

            //start email relay server and send
            using var smtp = new  SmtpClient();
            await smtp.ConnectAsync("localhost", 1025);
            await smtp.SendAsync(message);
            Console.WriteLine("Email sent");
        }
    }
}