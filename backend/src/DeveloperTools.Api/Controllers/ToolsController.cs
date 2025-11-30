using Microsoft.AspNetCore.Mvc;
using DeveloperTools.Core.Interfaces;
using DeveloperTools.Application.DTOs;
using DeveloperTools.Application.Mappings;

namespace DeveloperTools.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToolsController : ControllerBase
{
    private readonly IToolRepository _toolRepository;

    public ToolsController(IToolRepository toolRepository)
    {
        _toolRepository = toolRepository;
    }

    /// <summary>
    /// Get all active tools
    /// </summary>
    [HttpGet]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<ToolSummaryDto>>> GetAll()
    {
        var tools = await _toolRepository.GetAllAsync();
        return Ok(tools.Select(t => t.ToSummaryDto()));
    }

    /// <summary>
    /// Get tool by slug with full details
    /// </summary>
    [HttpGet("{slug}")]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<ToolDetailDto>> GetBySlug(string slug)
    {
        var tool = await _toolRepository.GetBySlugAsync(slug);
        
        if (tool == null)
            return NotFound(new { message = $"Tool '{slug}' not found" });

        return Ok(tool.ToDetailDto());
    }

    /// <summary>
    /// Get tools by category
    /// </summary>
    [HttpGet("category/{categorySlug}")]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<ToolSummaryDto>>> GetByCategory(string categorySlug)
    {
        var tools = await _toolRepository.GetByCategoryAsync(categorySlug);
        return Ok(tools.Select(t => t.ToSummaryDto()));
    }

    /// <summary>
    /// Get featured tools
    /// </summary>
    [HttpGet("featured")]
    [ResponseCache(Duration = 600)]
    public async Task<ActionResult<IEnumerable<ToolSummaryDto>>> GetFeatured([FromQuery] int count = 10)
    {
        var tools = await _toolRepository.GetFeaturedAsync(count);
        return Ok(tools.Select(t => t.ToSummaryDto()));
    }

    /// <summary>
    /// Get popular tools
    /// </summary>
    [HttpGet("popular")]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<ToolSummaryDto>>> GetPopular([FromQuery] int count = 10)
    {
        var tools = await _toolRepository.GetPopularAsync(count);
        return Ok(tools.Select(t => t.ToSummaryDto()));
    }

    /// <summary>
    /// Get related tools
    /// </summary>
    [HttpGet("{slug}/related")]
    [ResponseCache(Duration = 600)]
    public async Task<ActionResult<IEnumerable<ToolSummaryDto>>> GetRelated(string slug, [FromQuery] int count = 5)
    {
        var tool = await _toolRepository.GetBySlugAsync(slug);
        
        if (tool == null)
            return NotFound(new { message = $"Tool '{slug}' not found" });

        var relatedTools = await _toolRepository.GetRelatedToolsAsync(tool.Id, count);
        return Ok(relatedTools.Select(t => t.ToSummaryDto()));
    }
}
