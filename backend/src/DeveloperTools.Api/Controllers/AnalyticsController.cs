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
    private readonly bool _trustProxyCountryHeaders;

    public AnalyticsController(
        IToolUsageRepository usageRepository,
        IToolRepository toolRepository,
        IConfiguration? configuration = null)
    {
        _usageRepository = usageRepository;
        _toolRepository = toolRepository;
        _trustProxyCountryHeaders = configuration?.GetValue<bool>("Analytics:TrustProxyCountryHeaders") ?? false;
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
        var referrer = string.IsNullOrWhiteSpace(request.Referrer) ? null : request.Referrer.Trim();

        if (referrer is not null &&
            (!Uri.TryCreate(referrer, UriKind.Absolute, out var referrerUri) ||
             (referrerUri.Scheme != Uri.UriSchemeHttp && referrerUri.Scheme != Uri.UriSchemeHttps)))
        {
            return BadRequest(new { message = "Referrer must be a valid http or https URL" });
        }

        var tool = await _toolRepository.GetBySlugAsync(toolSlug);
        if (tool == null)
            return BadRequest(new { message = "Unknown tool slug" });

        var userAgent = GetBoundedUserAgent();
        var incremented = !string.IsNullOrEmpty(sessionId) &&
            await _usageRepository.TryIncrementSessionUsageAsync(sessionId, toolSlug, referrer, userAgent);

        if (!incremented)
        {
            // Create new record
            var usage = new ToolUsage
            {
                ToolId = tool.Id,
                ToolSlug = toolSlug,
                SessionId = sessionId,
                Referrer = referrer,
                UserAgent = userAgent,
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
    [EnableRateLimiting("api-read")]
    [ResponseCache(Duration = 60, VaryByQueryKeys = new[] { "days" })]
    public async Task<ActionResult<IEnumerable<ToolUsageStatsDto>>> GetUsageStats([FromQuery] int days = 30)
    {
        days = Math.Clamp(days, 1, 90);

        var stats = await _usageRepository.GetUsageStatsAsync(days);
        return Ok(stats);
    }

    /// <summary>
    /// Get top used tools
    /// </summary>
    [HttpGet("top-tools")]
    [EnableRateLimiting("api-read")]
    [ResponseCache(Duration = 300, VaryByQueryKeys = new[] { "count", "days" })]
    public async Task<ActionResult<IEnumerable<object>>> GetTopTools([FromQuery] int count = 10, [FromQuery] int days = 30)
    {
        count = Math.Clamp(count, 1, 50);
        days = Math.Clamp(days, 1, 90);

        var topTools = await _usageRepository.GetTopToolsAsync(count, days);
        return Ok(topTools);
    }

    /// <summary>
    /// Get sitemap data for SEO
    /// </summary>
    [HttpGet("sitemap")]
    [EnableRateLimiting("api-read")]
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
        if (!_trustProxyCountryHeaders)
            return null;

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
