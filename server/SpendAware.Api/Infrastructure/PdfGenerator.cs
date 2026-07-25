using QuestPDF.Companion;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using SpendAware.Api.Data.Models;
using SpendAware.Api.Data.Responses;

namespace SpendAware.Api.Infrastructure;

public interface IPdfGenerator
{
    void CreateMonthlyAutomatedPdfReports(List<UserExpenseReport> reports);
    MemoryStream CreatePdfByYear(IEnumerable<ExpenseResponse> expenseList);
    MemoryStream CreatePdfByMonth(IEnumerable<ExpenseResponse> expenseList);
    void CreatePdf();
}

public class PdfGenerator : IPdfGenerator
{
    static PdfGenerator()
    {
        QuestPDF.Settings.License = LicenseType.Community;
    }
    
    public void CreateMonthlyAutomatedPdfReports(List<UserExpenseReport> reports)
    {
        foreach (var report in reports)
        {
            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(20));
                
                    page.Header().Text($"Spend Aware {report.UserResponse.Username}").SemiBold().FontSize(30).FontColor(Colors.Blue.Medium);

                    page.Content()
                        .PaddingVertical(1, Unit.Centimetre)
                        .Column(x =>
                        {
                            x.Spacing(20);
                            x.Item().Text(Placeholders.LoremIpsum());
                            x.Item().Image(Placeholders.Image(200, 100));
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Page ");
                            x.CurrentPageNumber();
                        });
                });
            });
            report.PdfFile = document.GeneratePdf();
        }
    }

    public MemoryStream CreatePdfByYear(IEnumerable<ExpenseResponse> expenseList)
    {
        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(20));
                
                page.Header().Text("Spend Aware API Year").SemiBold().FontSize(30).FontColor(Colors.Blue.Medium);

                page.Content()
                    .PaddingVertical(1, Unit.Centimetre)
                    .Column(x =>
                    {
                        x.Spacing(20);
                        x.Item().Text(Placeholders.LoremIpsum());
                        x.Item().Image(Placeholders.Image(200, 100));
                    });

                page.Footer()
                    .AlignCenter()
                    .Text(x =>
                    {
                        x.Span("Page ");
                        x.CurrentPageNumber();
                    });
            });
        });
        var stream = new MemoryStream();
        document.GeneratePdf(stream);
        stream.Position = 0;

        return stream;
    }
    
    public MemoryStream CreatePdfByMonth(IEnumerable<ExpenseResponse> expenseList)
    {
        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(20));
                
                page.Header().Text("Spend Aware API Month").SemiBold().FontSize(30).FontColor(Colors.Blue.Medium);

                page.Content()
                    .PaddingVertical(1, Unit.Centimetre)
                    .Column(x =>
                    {
                        x.Spacing(20);
                        x.Item().Text(Placeholders.LoremIpsum());
                        x.Item().Image(Placeholders.Image(200, 100));
                    });

                page.Footer()
                    .AlignCenter()
                    .Text(x =>
                    {
                        x.Span("Page ");
                        x.CurrentPageNumber();
                    });
            });
        });
        var stream = new MemoryStream();
        document.GeneratePdf(stream);
        stream.Position = 0;

        return stream;
    }

    public void CreatePdf()
    {
        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(20));
                
                page.Header().Text("Spend Aware API").SemiBold().FontSize(30).FontColor(Colors.Blue.Medium);

                page.Content()
                    .PaddingVertical(1, Unit.Centimetre)
                    .Column(x =>
                    {
                        x.Spacing(20);
                        x.Item().Text(Placeholders.LoremIpsum());
                        x.Item().Image(Placeholders.Image(200, 100));
                    });

                page.Footer()
                    .AlignCenter()
                    .Text(x =>
                    {
                        x.Span("Page ");
                        x.CurrentPageNumber();
                    });
            });
        });

        try
        {
            document.ShowInCompanion();
            //document.GeneratePdf("test.pdf");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}