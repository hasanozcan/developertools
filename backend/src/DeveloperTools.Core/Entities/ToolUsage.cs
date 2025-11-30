namespace DeveloperTools.Core.Entities;

public class ToolUsage
{
    public long Id { get; set; }
    public int? ToolId { get; set; }
    public string ToolSlug { get; set; } = string.Empty; // Always store slug for tracking
    public string? SessionId { get; set; }
    public string? UserAgent { get; set; }
    public string? Referrer { get; set; }
    public string? CountryCode { get; set; }
    public int ClickCount { get; set; } = 1;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation (optional)
    public Tool? Tool { get; set; }
}
