namespace DeveloperTools.Application.DTOs;

public record TrackUsageRequest(
    string ToolSlug,
    string? SessionId,
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
