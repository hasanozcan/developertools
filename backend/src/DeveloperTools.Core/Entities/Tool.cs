namespace DeveloperTools.Core.Entities;

public class Tool
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? LongDescription { get; set; }
    public string[] Keywords { get; set; } = Array.Empty<string>();
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; }
    public string ProcessingType { get; set; } = "client"; // 'client' or 'server'
    public int DisplayOrder { get; set; }
    public int UsageCount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Category Category { get; set; } = null!;
    public SeoMetadata? SeoMetadata { get; set; }
    public ICollection<ToolFaq> Faqs { get; set; } = new List<ToolFaq>();
    public ICollection<ToolUsage> Usages { get; set; } = new List<ToolUsage>();
    public ICollection<RelatedTool> RelatedTools { get; set; } = new List<RelatedTool>();
}
