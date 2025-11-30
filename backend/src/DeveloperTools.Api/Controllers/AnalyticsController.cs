using Microsoft.AspNetCore.Mvc;
using DeveloperTools.Core.Entities;
using DeveloperTools.Core.Interfaces;
using DeveloperTools.Application.DTOs;

namespace DeveloperTools.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly IToolUsageRepository _usageRepository;
    private readonly IToolRepository _toolRepository;

    public AnalyticsController(IToolUsageRepository usageRepository, IToolRepository toolRepository)
    {
        _usageRepository = usageRepository;
        _toolRepository = toolRepository;
    }

    /// <summary>
    /// Track tool usage (works even if tool doesn't exist in DB)
    /// </summary>
    [HttpPost("track")]
    public async Task<IActionResult> TrackUsage([FromBody] TrackUsageRequest request)
    {
        if (string.IsNullOrEmpty(request.ToolSlug))
            return BadRequest(new { message = "ToolSlug is required" });

        // Try to find tool, but don't fail if not found
        var tool = await _toolRepository.GetBySlugAsync(request.ToolSlug);

        // Check if there's an existing record for this session and tool
        ToolUsage? existingUsage = null;
        if (!string.IsNullOrEmpty(request.SessionId))
        {
            existingUsage = await _usageRepository.GetBySessionAndSlugAsync(request.SessionId, request.ToolSlug);
        }

        if (existingUsage != null)
        {
            // Update existing record - increment click count
            existingUsage.ClickCount++;
            existingUsage.Referrer = request.Referrer ?? existingUsage.Referrer;
            existingUsage.UserAgent = Request.Headers.UserAgent.ToString();
            await _usageRepository.UpdateAsync(existingUsage);
        }
        else
        {
            // Create new record
            var usage = new ToolUsage
            {
                ToolId = tool?.Id,
                ToolSlug = request.ToolSlug,
                SessionId = request.SessionId,
                Referrer = request.Referrer,
                UserAgent = Request.Headers.UserAgent.ToString(),
                CountryCode = GetCountryFromHeaders(),
                ClickCount = 1
            };
            await _usageRepository.CreateAsync(usage);
        }
        
        if (tool != null)
        {
            await _toolRepository.IncrementUsageCountAsync(tool.Id);
        }

        return Ok(new { success = true });
    }

    /// <summary>
    /// Get tool usage statistics
    /// </summary>
    [HttpGet("stats")]
    [ResponseCache(Duration = 60)]
    public async Task<ActionResult<IEnumerable<ToolUsageStatsDto>>> GetUsageStats([FromQuery] int days = 30)
    {
        var stats = await _usageRepository.GetUsageStatsAsync(days);
        return Ok(stats);
    }

    /// <summary>
    /// Get top used tools
    /// </summary>
    [HttpGet("top-tools")]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<object>>> GetTopTools([FromQuery] int count = 10, [FromQuery] int days = 30)
    {
        var topTools = await _usageRepository.GetTopToolsAsync(count, days);
        return Ok(topTools);
    }

    /// <summary>
    /// Get sitemap data for SEO
    /// </summary>
    [HttpGet("sitemap")]
    [ResponseCache(Duration = 3600)] // 1 hour cache
    public async Task<ActionResult<IEnumerable<object>>> GetSitemapData()
    {
        var tools = await _toolRepository.GetAllAsync();
        
        var sitemapData = tools.Select(t => new
        {
            slug = t.Slug,
            categorySlug = t.Category?.Slug,
            updatedAt = t.UpdatedAt,
            priority = t.IsFeatured ? 0.9 : 0.7
        });

        return Ok(sitemapData);
    }

    private string? GetCountryFromHeaders()
    {
        // Cloudflare header
        if (Request.Headers.TryGetValue("CF-IPCountry", out var cfCountry))
            return cfCountry.ToString();
        
        // Vercel/other headers
        if (Request.Headers.TryGetValue("X-Vercel-IP-Country", out var vercelCountry))
            return vercelCountry.ToString();

        return null;
    }

}
