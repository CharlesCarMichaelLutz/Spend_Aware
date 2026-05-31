using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
using MimeKit.Utils;

namespace SpendAware.Api.Infrastructure;

public interface IMailService
{
    //Task<Message> SendEmail();
    Task<MimeMessage> SendEmail();
}

public class Message
{
    public MimeMessage Text  { get; set; }
}

public class MailService : IMailService
{
//    public async Task<Message> SendEmail()
    public async Task<MimeMessage> SendEmail()
    {
        var message = new MimeMessage();
        var from = new MailboxAddress("SpendAware", "Team@SpendAware.net");
        message.From.Add(from);
        var to = new MailboxAddress("User1", "User1@User1.net");
        message.To.Add(to);
        message.Subject = "Monthly Expense Report for May";
//          message.Body = new TextPart(TextFormat.Html)
//          {
//              Text = """
//                     Hello User1,
//
//                     Your total monthly expenses for May 2026 was $1365.34. 
//                     You can download a pdf of your monthly expenses below. 
//                     Thanks for using SpendAware and always review your spending patterns to stay on track financially.
//
//                     Best,
//                     SpendAware Team
//                     """
//          };
        var bb = new BodyBuilder();
        bb.TextBody = "Hello Spend Aware members in plain text!";
        var imageEntity = bb.LinkedResources.Add("cat.jpg");
        imageEntity.ContentId = MimeUtils.GenerateMessageId();
        var htmlBody = $"""
                        <p>Hey, look - here's a picture of my cat!</p>
                        <img src="cid:{imageEntity.ContentId}" alt="the cool cat!" />
                        """;
        bb.HtmlBody = htmlBody;
        
        //bb.HtmlBody = "<p>Hello Spend Aware members <em>in HTML!</e></p>";
        // bb.Attachments.Add("cat.jpg");
        message.Body = bb.ToMessageBody();

        using var smtp = new SmtpClient();
        await smtp.ConnectAsync("localhost", 1025);
        await smtp.SendAsync(message);
        await smtp.DisconnectAsync(true);
        Console.WriteLine("Mail sent!");
        message.WriteTo("message.eml");
        MimeMessage loadedMessage = MimeMessage.Load("message.eml");

        //var msgsent = new Message
        //{
        //  Text = message
        //};

        //return msgsent;
        return loadedMessage;
    }
}