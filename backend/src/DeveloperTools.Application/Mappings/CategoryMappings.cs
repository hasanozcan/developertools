using DeveloperTools.Application.DTOs;
using DeveloperTools.Core.Entities;

namespace DeveloperTools.Application.Mappings;

public static class CategoryMappings
{
    public static CategoryDto ToDto(this Category category)
    {
        return new CategoryDto(
            category.Id,
            category.Name,
            category.Slug,
            category.Description,
            category.Icon,
            category.Tools?.Count(t => t.IsActive) ?? 0
        );
    }

    public static CategoryDetailDto ToDetailDto(this Category category)
    {
        return new CategoryDetailDto(
            category.Id,
            category.Name,
            category.Slug,
            category.Description,
            category.Icon,
            category.Tools?.Where(t => t.IsActive).Select(t => t.ToSummaryDto()) ?? Enumerable.Empty<ToolSummaryDto>()
        );
    }
}
