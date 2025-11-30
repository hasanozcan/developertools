namespace DeveloperTools.Application.DTOs;

public record CategoryDto(
    int Id,
    string Name,
    string Slug,
    string? Description,
    string? Icon,
    int ToolCount
);

public record CategoryDetailDto(
    int Id,
    string Name,
    string Slug,
    string? Description,
    string? Icon,
    IEnumerable<ToolSummaryDto> Tools
);
