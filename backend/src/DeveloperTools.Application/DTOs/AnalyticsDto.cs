using System.ComponentModel.DataAnnotations;

namespace DeveloperTools.Application.DTOs;

public record TrackUsageRequest(
    [property: Required, StringLength(150), RegularExpression("^[a-z0-9]+(?:-[a-z0-9]+)*$")]
    string ToolSlug,
    [property: StringLength(100)]
    string? SessionId,
    [property: StringLength(500), Url]
    string? Referrer
);

public record UsageStatsDto(
    int ToolId,
    string ToolName,
    int TotalUsage,
    int Last24Hours,
    int Last7Days,
    int Last30Days
);
