using System.ComponentModel.DataAnnotations;

namespace DeveloperTools.Application.DTOs;

public record TrackUsageRequest(
    [property: Required, StringLength(150), RegularExpression("^[a-z0-9]+(?:-[a-z0-9]+)*$")]
    string ToolSlug,
    [property: StringLength(100)]
    string? SessionId,
    [property: StringLength(500), HttpUrl]
    string? Referrer
);

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class HttpUrlAttribute : ValidationAttribute
{
    public HttpUrlAttribute()
        : base("The {0} field must be a valid http or https URL.")
    {
    }

    public override bool IsValid(object? value)
    {
        if (value is null)
            return true;

        if (value is not string raw)
            return false;

        var trimmed = raw.Trim();
        if (trimmed.Length == 0)
            return true;

        return Uri.TryCreate(trimmed, UriKind.Absolute, out var uri)
            && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);
    }
}

public record UsageStatsDto(
    int ToolId,
    string ToolName,
    int TotalUsage,
    int Last24Hours,
    int Last7Days,
    int Last30Days
);
