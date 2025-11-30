using Microsoft.EntityFrameworkCore;
using DeveloperTools.Core.Entities;
using DeveloperTools.Core.Interfaces;
using DeveloperTools.Infrastructure.Data;

namespace DeveloperTools.Infrastructure.Repositories;

public class ToolUsageRepository : IToolUsageRepository
{
    private readonly AppDbContext _context;

    public ToolUsageRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ToolUsage> CreateAsync(ToolUsage usage)
    {
        _context.ToolUsages.Add(usage);
        await _context.SaveChangesAsync();
        return usage;
    }

    public async Task<ToolUsage?> GetBySessionAndSlugAsync(string sessionId, string toolSlug)
    {
        return await _context.ToolUsages
            .FirstOrDefaultAsync(u => u.SessionId == sessionId && u.ToolSlug == toolSlug);
    }

    public async Task<ToolUsage> UpdateAsync(ToolUsage usage)
    {
        usage.UpdatedAt = DateTime.UtcNow;
        _context.ToolUsages.Update(usage);
        await _context.SaveChangesAsync();
        return usage;
    }

    public async Task<IEnumerable<ToolUsage>> GetByToolIdAsync(int toolId, DateTime? from = null, DateTime? to = null)
    {
        var query = _context.ToolUsages.Where(u => u.ToolId == toolId);

        if (from.HasValue)
            query = query.Where(u => u.CreatedAt >= from.Value);

        if (to.HasValue)
            query = query.Where(u => u.CreatedAt <= to.Value);

        return await query.OrderByDescending(u => u.CreatedAt).ToListAsync();
    }

    public async Task<Dictionary<int, int>> GetUsageCountsByToolAsync(DateTime? from = null, DateTime? to = null)
    {
        var query = _context.ToolUsages.Where(u => u.ToolId.HasValue);

        if (from.HasValue)
            query = query.Where(u => u.CreatedAt >= from.Value);

        if (to.HasValue)
            query = query.Where(u => u.CreatedAt <= to.Value);

        return await query
            .GroupBy(u => u.ToolId!.Value)
            .ToDictionaryAsync(g => g.Key, g => g.Count());
    }

    public async Task<IEnumerable<ToolUsageStatsDto>> GetUsageStatsAsync(int days = 30)
    {
        var fromDate = DateTime.UtcNow.AddDays(-days);

        return await _context.ToolUsages
            .Where(u => u.CreatedAt >= fromDate)
            .GroupBy(u => new { u.ToolSlug, Date = u.CreatedAt.Date })
            .Select(g => new ToolUsageStatsDto
            {
                ToolSlug = g.Key.ToolSlug,
                Date = g.Key.Date,
                UsageCount = g.Count(),
                UniqueUsers = g.Select(x => x.SessionId).Distinct().Count()
            })
            .OrderByDescending(s => s.Date)
            .ThenByDescending(s => s.UsageCount)
            .ToListAsync();
    }

    public async Task<IEnumerable<TopToolDto>> GetTopToolsAsync(int count = 10, int days = 30)
    {
        var fromDate = DateTime.UtcNow.AddDays(-days);

        return await _context.ToolUsages
            .Where(u => u.CreatedAt >= fromDate && !string.IsNullOrEmpty(u.ToolSlug))
            .GroupBy(u => u.ToolSlug)
            .Select(g => new TopToolDto
            {
                ToolSlug = g.Key,
                TotalUsage = g.Sum(x => x.ClickCount),
                UniqueUsers = g.Select(x => x.SessionId).Distinct().Count()
            })
            .OrderByDescending(t => t.TotalUsage)
            .Take(count)
            .ToListAsync();
    }
}
