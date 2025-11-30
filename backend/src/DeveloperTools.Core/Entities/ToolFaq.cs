namespace DeveloperTools.Core.Entities;

public class ToolFaq
{
    public int Id { get; set; }
    public int ToolId { get; set; }
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }

    // Navigation
    public Tool Tool { get; set; } = null!;
}
