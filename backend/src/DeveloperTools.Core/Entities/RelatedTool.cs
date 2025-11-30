namespace DeveloperTools.Core.Entities;

public class RelatedTool
{
    public int ToolId { get; set; }
    public int RelatedToolId { get; set; }
    public int RelevanceScore { get; set; }

    // Navigation
    public Tool Tool { get; set; } = null!;
    public Tool Related { get; set; } = null!;
}
