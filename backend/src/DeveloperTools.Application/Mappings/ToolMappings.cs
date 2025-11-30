using DeveloperTools.Application.DTOs;
using DeveloperTools.Core.Entities;

namespace DeveloperTools.Application.Mappings;

public static class ToolMappings
{
    public static ToolSummaryDto ToSummaryDto(this Tool tool)
    {
        return new ToolSummaryDto(
            tool.Id,
            tool.Name,
            tool.Slug,
            tool.ShortDescription,
            tool.Category?.Slug ?? string.Empty,
            tool.Category?.Name ?? string.Empty,
            tool.IsFeatured
        );
    }

    public static ToolDetailDto ToDetailDto(this Tool tool)
    {
        return new ToolDetailDto(
            tool.Id,
            tool.Name,
            tool.Slug,
            tool.ShortDescription,
            tool.LongDescription,
            tool.Keywords,
            tool.Category?.Slug ?? string.Empty,
            tool.Category?.Name ?? string.Empty,
            tool.SeoMetadata?.ToDto(),
            tool.Faqs?.Select(f => f.ToDto()) ?? Enumerable.Empty<ToolFaqDto>(),
            tool.RelatedTools?.Select(rt => rt.Related.ToSummaryDto()) ?? Enumerable.Empty<ToolSummaryDto>()
        );
    }

    public static SeoMetadataDto ToDto(this SeoMetadata seo)
    {
        return new SeoMetadataDto(
            seo.Title,
            seo.MetaDescription,
            seo.OgTitle,
            seo.OgDescription,
            seo.OgImageUrl,
            seo.CanonicalUrl,
            seo.StructuredData
        );
    }

    public static ToolFaqDto ToDto(this ToolFaq faq)
    {
        return new ToolFaqDto(faq.Question, faq.Answer);
    }
}
