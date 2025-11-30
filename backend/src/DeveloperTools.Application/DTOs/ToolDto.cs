namespace DeveloperTools.Application.DTOs;

public record ToolSummaryDto(
    int Id,
    string Name,
    string Slug,
    string? ShortDescription,
    string CategorySlug,
    string CategoryName,
    bool IsFeatured
);

public record ToolDetailDto(
    int Id,
    string Name,
    string Slug,
    string? ShortDescription,
    string? LongDescription,
    string[] Keywords,
    string CategorySlug,
    string CategoryName,
    SeoMetadataDto? Seo,
    IEnumerable<ToolFaqDto> Faqs,
    IEnumerable<ToolSummaryDto> RelatedTools
);

public record SeoMetadataDto(
    string? Title,
    string? MetaDescription,
    string? OgTitle,
    string? OgDescription,
    string? OgImageUrl,
    string? CanonicalUrl,
    string? StructuredData
);

public record ToolFaqDto(
    string Question,
    string Answer
);
