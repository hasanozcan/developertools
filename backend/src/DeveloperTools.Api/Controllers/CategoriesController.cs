using Microsoft.AspNetCore.Mvc;
using DeveloperTools.Core.Interfaces;
using DeveloperTools.Application.DTOs;
using DeveloperTools.Application.Mappings;

namespace DeveloperTools.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    /// <summary>
    /// Get all categories with tool counts
    /// </summary>
    [HttpGet]
    [ResponseCache(Duration = 300)] // 5 minutes cache
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return Ok(categories.Select(c => c.ToDto()));
    }

    /// <summary>
    /// Get category by slug with tools
    /// </summary>
    [HttpGet("{slug}")]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<CategoryDetailDto>> GetBySlug(string slug)
    {
        var category = await _categoryRepository.GetBySlugAsync(slug);
        
        if (category == null)
            return NotFound(new { message = $"Category '{slug}' not found" });

        return Ok(category.ToDetailDto());
    }
}
