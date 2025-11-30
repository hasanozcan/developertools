using DeveloperTools.Core.Entities;

namespace DeveloperTools.Core.Interfaces;

public interface IToolRepository
{
    Task<IEnumerable<Tool>> GetAllAsync();
    Task<IEnumerable<Tool>> GetByCategoryAsync(string categorySlug);
    Task<Tool?> GetBySlugAsync(string slug);
    Task<IEnumerable<Tool>> GetFeaturedAsync(int count = 10);
    Task<IEnumerable<Tool>> GetPopularAsync(int count = 10);
    Task<IEnumerable<Tool>> GetRelatedToolsAsync(int toolId, int count = 5);
    Task<Tool> CreateAsync(Tool tool);
    Task UpdateAsync(Tool tool);
    Task IncrementUsageCountAsync(int toolId);
}
