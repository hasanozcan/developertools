using Microsoft.AspNetCore.Mvc;
using DeveloperTools.Core.Entities;
using DeveloperTools.Core.Interfaces;
using DeveloperTools.Application.DTOs;
using Microsoft.AspNetCore.RateLimiting;

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
    /// Track usage for a known tool.
    /// </summary>
    [HttpPost("track")]
    [EnableRateLimiting("analytics-write")]
    [RequestSizeLimit(16 * 1024)]
    public async Task<IActionResult> TrackUsage([FromBody] TrackUsageRequest request)
    {
        var toolSlug = request.ToolSlug.Trim();
        var sessionId = request.SessionId?.Trim();
        var referrer = request.Referrer?.Trim();

        var tool = await _toolRepository.GetBySlugAsync(toolSlug);
        if (tool == null)
            return BadRequest(new { message = "Unknown tool slug" });

        // Check if there's an existing record for this session and tool
        ToolUsage? existingUsage = null;
        if (!string.IsNullOrEmpty(sessionId))
        {
            existingUsage = await _usageRepository.GetBySessionAndSlugAsync(sessionId, toolSlug);
        }

        if (existingUsage != null)
        {
            // Update existing record - increment click count
            existingUsage.ClickCount++;
            existingUsage.Referrer = referrer ?? existingUsage.Referrer;
            existingUsage.UserAgent = GetBoundedUserAgent();
            await _usageRepository.UpdateAsync(existingUsage);
        }
        else
        {
            // Create new record
            var usage = new ToolUsage
            {
                ToolId = tool.Id,
                ToolSlug = toolSlug,
                SessionId = sessionId,
                Referrer = referrer,
                UserAgent = GetBoundedUserAgent(),
                CountryCode = GetCountryFromHeaders(),
                ClickCount = 1
            };
            await _usageRepository.CreateAsync(usage);
        }
        
        await _toolRepository.IncrementUsageCountAsync(tool.Id);

        return Ok(new { success = true });
    }

    /// <summary>
    /// Get tool usage statistics
    /// </summary>
    [HttpGet("stats")]
    [ResponseCache(Duration = 60)]
    public async Task<ActionResult<IEnumerable<ToolUsageStatsDto>>> GetUsageStats([FromQuery] int days = 30)
    {
        if (days is < 1 or > 365)
            return BadRequest(new { message = "days must be between 1 and 365" });

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
        if (count is < 1 or > 100)
            return BadRequest(new { message = "count must be between 1 and 100" });
        if (days is < 1 or > 365)
            return BadRequest(new { message = "days must be between 1 and 365" });

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
            return NormalizeCountryCode(cfCountry.ToString());
        
        // Vercel/other headers
        if (Request.Headers.TryGetValue("X-Vercel-IP-Country", out var vercelCountry))
            return NormalizeCountryCode(vercelCountry.ToString());

        return null;
    }

    private string? GetBoundedUserAgent()
    {
        var userAgent = Request.Headers.UserAgent.ToString();
        return userAgent.Length <= 500 ? userAgent : userAgent[..500];
    }

    private static string? NormalizeCountryCode(string value)
    {
        var countryCode = value.Trim().ToUpperInvariant();
        return countryCode.Length == 2 && countryCode.All(char.IsAsciiLetter)
            ? countryCode
            : null;
    }

}
