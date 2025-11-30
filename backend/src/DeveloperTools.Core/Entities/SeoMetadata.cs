namespace DeveloperTools.Core.Entities;

public class SeoMetadata
{
    public int Id { get; set; }
    public int ToolId { get; set; }
    public string? Title { get; set; }
    public string? MetaDescription { get; set; }
    public string? OgTitle { get; set; }
    public string? OgDescription { get; set; }
    public string? OgImageUrl { get; set; }
    public string? CanonicalUrl { get; set; }
    public string? StructuredData { get; set; } // JSON-LD
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Tool Tool { get; set; } = null!;
}
