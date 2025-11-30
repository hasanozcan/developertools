using Microsoft.EntityFrameworkCore;
using DeveloperTools.Core.Entities;
using DeveloperTools.Core.Interfaces;
using DeveloperTools.Infrastructure.Data;

namespace DeveloperTools.Infrastructure.Repositories;

public class ToolRepository : IToolRepository
{
    private readonly AppDbContext _context;

    public ToolRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Tool>> GetAllAsync()
    {
        return await _context.Tools
            .Include(t => t.Category)
            .Include(t => t.SeoMetadata)
            .Where(t => t.IsActive)
            .OrderBy(t => t.DisplayOrder)
            .ToListAsync();
    }

    public async Task<IEnumerable<Tool>> GetByCategoryAsync(string categorySlug)
    {
        return await _context.Tools
            .Include(t => t.Category)
            .Include(t => t.SeoMetadata)
            .Where(t => t.IsActive && t.Category.Slug == categorySlug)
            .OrderBy(t => t.DisplayOrder)
            .ToListAsync();
    }

    public async Task<Tool?> GetBySlugAsync(string slug)
    {
        return await _context.Tools
            .Include(t => t.Category)
            .Include(t => t.SeoMetadata)
            .Include(t => t.Faqs.OrderBy(f => f.DisplayOrder))
            .Include(t => t.RelatedTools)
                .ThenInclude(rt => rt.Related)
            .FirstOrDefaultAsync(t => t.Slug == slug && t.IsActive);
    }

    public async Task<IEnumerable<Tool>> GetFeaturedAsync(int count = 10)
    {
        return await _context.Tools
            .Include(t => t.Category)
            .Where(t => t.IsActive && t.IsFeatured)
            .OrderBy(t => t.DisplayOrder)
            .Take(count)
            .ToListAsync();
    }

    public async Task<IEnumerable<Tool>> GetPopularAsync(int count = 10)
    {
        return await _context.Tools
            .Include(t => t.Category)
            .Where(t => t.IsActive)
            .OrderByDescending(t => t.UsageCount)
            .Take(count)
            .ToListAsync();
    }

    public async Task<IEnumerable<Tool>> GetRelatedToolsAsync(int toolId, int count = 5)
    {
        var relatedToolIds = await _context.RelatedTools
            .Where(rt => rt.ToolId == toolId)
            .OrderByDescending(rt => rt.RelevanceScore)
            .Take(count)
            .Select(rt => rt.RelatedToolId)
            .ToListAsync();

        return await _context.Tools
            .Include(t => t.Category)
            .Where(t => relatedToolIds.Contains(t.Id) && t.IsActive)
            .ToListAsync();
    }

    public async Task<Tool> CreateAsync(Tool tool)
    {
        _context.Tools.Add(tool);
        await _context.SaveChangesAsync();
        return tool;
    }

    public async Task UpdateAsync(Tool tool)
    {
        tool.UpdatedAt = DateTime.UtcNow;
        _context.Tools.Update(tool);
        await _context.SaveChangesAsync();
    }

    public async Task IncrementUsageCountAsync(int toolId)
    {
        await _context.Tools
            .Where(t => t.Id == toolId)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.UsageCount, t => t.UsageCount + 1));
    }
}
