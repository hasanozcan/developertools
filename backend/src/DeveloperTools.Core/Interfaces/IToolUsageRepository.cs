using DeveloperTools.Core.Entities;

namespace DeveloperTools.Core.Interfaces;

public interface IToolUsageRepository
{
    Task<ToolUsage> CreateAsync(ToolUsage usage);
    Task<ToolUsage?> GetBySessionAndSlugAsync(string sessionId, string toolSlug);
    Task<ToolUsage> UpdateAsync(ToolUsage usage);
    Task<IEnumerable<ToolUsage>> GetByToolIdAsync(int toolId, DateTime? from = null, DateTime? to = null);
    Task<Dictionary<int, int>> GetUsageCountsByToolAsync(DateTime? from = null, DateTime? to = null);
    Task<IEnumerable<ToolUsageStatsDto>> GetUsageStatsAsync(int days = 30);
    Task<IEnumerable<TopToolDto>> GetTopToolsAsync(int count = 10, int days = 30);
}

public class ToolUsageStatsDto
{
    public string ToolSlug { get; set; } = string.Empty;
    public int UsageCount { get; set; }
    public int UniqueUsers { get; set; }
    public DateTime Date { get; set; }
}

public class TopToolDto
{
    public string ToolSlug { get; set; } = string.Empty;
    public int TotalUsage { get; set; }
    public int UniqueUsers { get; set; }
}
