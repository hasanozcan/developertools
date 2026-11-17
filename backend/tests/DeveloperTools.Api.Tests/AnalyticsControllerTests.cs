using System.ComponentModel.DataAnnotations;
using System.Reflection;
using DeveloperTools.Api.Controllers;
using DeveloperTools.Application.DTOs;
using DeveloperTools.Core.Entities;
using DeveloperTools.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Configuration;

namespace DeveloperTools.Api.Tests;

public sealed class AnalyticsControllerTests
{
    [Fact]
    public async Task TrackUsage_ReturnsBadRequestForUnknownToolSlug()
    {
        var usageRepository = new FakeToolUsageRepository();
        var toolRepository = new FakeToolRepository();
        var controller = CreateController(usageRepository, toolRepository);

        var result = await controller.TrackUsage(new TrackUsageRequest("unknown-tool", "sess-1", null));

        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(0, usageRepository.TryIncrementCalls);
        Assert.Equal(0, usageRepository.CreateCalls);
        Assert.Equal(0, toolRepository.IncrementUsageCalls);
    }

    [Fact]
    public async Task TrackUsage_CreatesUsageRecordWhenSessionIsNew()
    {
        var usageRepository = new FakeToolUsageRepository { TryIncrementResult = false };
        var toolRepository = new FakeToolRepository
        {
            ToolBySlug = new Tool { Id = 12, Name = "MD5 Hash", Slug = "md5-hash" },
        };
        var controller = CreateController(usageRepository, toolRepository);
        controller.HttpContext.Request.Headers.UserAgent = new string('x', 600);
        controller.HttpContext.Request.Headers["CF-IPCountry"] = " tr ";

        var result = await controller.TrackUsage(new TrackUsageRequest(" md5-hash ", " sess-new ", " https://devstools.app "));

        Assert.IsType<OkObjectResult>(result);
        Assert.Equal(1, usageRepository.TryIncrementCalls);
        Assert.Equal(1, usageRepository.CreateCalls);
        Assert.NotNull(usageRepository.CreatedUsage);
        Assert.Equal(12, usageRepository.CreatedUsage!.ToolId);
        Assert.Equal("md5-hash", usageRepository.CreatedUsage.ToolSlug);
        Assert.Equal("sess-new", usageRepository.CreatedUsage.SessionId);
        Assert.Equal("https://devstools.app", usageRepository.CreatedUsage.Referrer);
        Assert.Equal(500, usageRepository.CreatedUsage.UserAgent?.Length);
        Assert.Null(usageRepository.CreatedUsage.CountryCode);
        Assert.Equal(1, usageRepository.CreatedUsage.ClickCount);
        Assert.Equal(1, toolRepository.IncrementUsageCalls);
        Assert.Equal(12, toolRepository.LastIncrementedToolId);
    }

    [Theory]
    [InlineData("true", "TR")]
    [InlineData("false", null)]
    public async Task TrackUsage_RespectsTrustProxyCountryHeadersSetting(string settingValue, string? expectedCountry)
    {
        var usageRepository = new FakeToolUsageRepository { TryIncrementResult = false };
        var toolRepository = new FakeToolRepository
        {
            ToolBySlug = new Tool { Id = 12, Name = "MD5 Hash", Slug = "md5-hash" },
        };
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Analytics:TrustProxyCountryHeaders"] = settingValue,
            })
            .Build();
        var controller = CreateController(usageRepository, toolRepository, configuration);
        controller.HttpContext.Request.Headers["CF-IPCountry"] = " tr ";

        var result = await controller.TrackUsage(new TrackUsageRequest("md5-hash", "sess-country", null));

        Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(usageRepository.CreatedUsage);
        Assert.Equal(expectedCountry, usageRepository.CreatedUsage!.CountryCode);
    }

    [Theory]
    [InlineData("ftp://example.com/file")]
    [InlineData("javascript:alert(1)")]
    [InlineData("data:text/html,hi")]
    [InlineData("not-a-url")]
    public async Task TrackUsage_RejectsNonHttpReferrerSchemes(string referrer)
    {
        var usageRepository = new FakeToolUsageRepository();
        var toolRepository = new FakeToolRepository
        {
            ToolBySlug = new Tool { Id = 5, Name = "JSON Formatter", Slug = "json-formatter" },
        };
        var controller = CreateController(usageRepository, toolRepository);

        var result = await controller.TrackUsage(new TrackUsageRequest("json-formatter", "sess-1", referrer));

        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(0, usageRepository.TryIncrementCalls);
        Assert.Equal(0, usageRepository.CreateCalls);
        Assert.Equal(0, toolRepository.IncrementUsageCalls);

        var validationResults = new List<ValidationResult>();
        var dto = new TrackUsageRequest("json-formatter", "sess-1", referrer);
        var isValid = Validator.TryValidateObject(dto, new ValidationContext(dto), validationResults, validateAllProperties: true);
        Assert.False(isValid);
    }

    [Theory]
    [InlineData("https://devstools.app/tools/json/json-formatter")]
    [InlineData("http://localhost:3000/tools")]
    [InlineData(null)]
    public void TrackUsageRequest_AllowsHttpHttpsAndNullReferrer(string? referrer)
    {
        var validationResults = new List<ValidationResult>();
        var dto = new TrackUsageRequest("json-formatter", "sess-1", referrer);
        var isValid = Validator.TryValidateObject(dto, new ValidationContext(dto), validationResults, validateAllProperties: true);
        Assert.True(isValid);
    }

    [Fact]
    public async Task TrackUsage_SkipsCreateWhenAtomicSessionIncrementSucceeds()
    {
        var usageRepository = new FakeToolUsageRepository { TryIncrementResult = true };
        var toolRepository = new FakeToolRepository
        {
            ToolBySlug = new Tool { Id = 5, Name = "JSON Formatter", Slug = "json-formatter" },
        };
        var controller = CreateController(usageRepository, toolRepository);
        controller.HttpContext.Request.Headers.UserAgent = "Mozilla/5.0";

        var result = await controller.TrackUsage(new TrackUsageRequest("json-formatter", "sess-existing", "https://devstools.app/tools"));

        Assert.IsType<OkObjectResult>(result);
        Assert.Equal(1, usageRepository.TryIncrementCalls);
        Assert.Equal("sess-existing", usageRepository.LastIncrementSessionId);
        Assert.Equal("json-formatter", usageRepository.LastIncrementSlug);
        Assert.Equal("https://devstools.app/tools", usageRepository.LastIncrementReferrer);
        Assert.Equal("Mozilla/5.0", usageRepository.LastIncrementUserAgent);
        Assert.Equal(0, usageRepository.CreateCalls);
        Assert.Equal(1, toolRepository.IncrementUsageCalls);
    }

    [Fact]
    public async Task TrackUsage_CreatesUsageRecordWithoutSessionIncrementWhenSessionIdIsMissing()
    {
        var usageRepository = new FakeToolUsageRepository { TryIncrementResult = true };
        var toolRepository = new FakeToolRepository
        {
            ToolBySlug = new Tool { Id = 8, Name = "Base64", Slug = "base64" },
        };
        var controller = CreateController(usageRepository, toolRepository);

        var result = await controller.TrackUsage(new TrackUsageRequest("base64", "   ", null));

        Assert.IsType<OkObjectResult>(result);
        Assert.Equal(0, usageRepository.TryIncrementCalls);
        Assert.Equal(1, usageRepository.CreateCalls);
        Assert.Equal(1, toolRepository.IncrementUsageCalls);
    }

    [Theory]
    [InlineData(0, 1)]
    [InlineData(-1, 1)]
    [InlineData(91, 90)]
    [InlineData(366, 90)]
    public async Task GetUsageStats_ClampsOutOfRangeDays(int days, int expectedDays)
    {
        var usageRepository = new FakeToolUsageRepository();
        var controller = CreateController(usageRepository, new FakeToolRepository());

        var result = await controller.GetUsageStats(days);

        Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(1, usageRepository.GetUsageStatsCalls);
        Assert.Equal(expectedDays, usageRepository.LastStatsDays);
    }

    [Fact]
    public async Task GetUsageStats_ReturnsRepositoryStatsForValidDays()
    {
        var expected = new[]
        {
            new ToolUsageStatsDto { ToolSlug = "json-formatter", UsageCount = 15, UniqueUsers = 4, Date = DateTime.UtcNow.Date },
        };
        var usageRepository = new FakeToolUsageRepository { UsageStats = expected };
        var controller = CreateController(usageRepository, new FakeToolRepository());

        var result = await controller.GetUsageStats(7);

        var ok = Assert.IsType<OkObjectResult>(result.Result);
        var stats = Assert.IsAssignableFrom<IEnumerable<ToolUsageStatsDto>>(ok.Value);
        Assert.Single(stats);
        Assert.Equal(7, usageRepository.LastStatsDays);
    }

    [Theory]
    [InlineData(0, 30, 1, 30)]
    [InlineData(51, 30, 50, 30)]
    [InlineData(10, 0, 10, 1)]
    [InlineData(10, 91, 10, 90)]
    public async Task GetTopTools_ClampsOutOfRangeParameters(int count, int days, int expectedCount, int expectedDays)
    {
        var usageRepository = new FakeToolUsageRepository();
        var controller = CreateController(usageRepository, new FakeToolRepository());

        var result = await controller.GetTopTools(count, days);

        Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(1, usageRepository.GetTopToolsCalls);
        Assert.Equal(expectedCount, usageRepository.LastTopToolsCount);
        Assert.Equal(expectedDays, usageRepository.LastTopToolsDays);
    }

    [Fact]
    public async Task GetTopTools_ReturnsRepositoryResultsForValidParameters()
    {
        var expected = new[]
        {
            new TopToolDto { ToolSlug = "sha256-hash", TotalUsage = 42, UniqueUsers = 12 },
        };
        var usageRepository = new FakeToolUsageRepository { TopTools = expected };
        var controller = CreateController(usageRepository, new FakeToolRepository());

        var result = await controller.GetTopTools(5, 14);

        var ok = Assert.IsType<OkObjectResult>(result.Result);
        var topTools = Assert.IsAssignableFrom<IEnumerable<TopToolDto>>(ok.Value);
        Assert.Single(topTools);
        Assert.Equal(5, usageRepository.LastTopToolsCount);
        Assert.Equal(14, usageRepository.LastTopToolsDays);
    }

    [Theory]
    [InlineData(typeof(ToolsController), nameof(ToolsController.GetFeatured), new[] { "count" })]
    [InlineData(typeof(ToolsController), nameof(ToolsController.GetPopular), new[] { "count" })]
    [InlineData(typeof(ToolsController), nameof(ToolsController.GetRelated), new[] { "count" })]
    [InlineData(typeof(AnalyticsController), nameof(AnalyticsController.GetUsageStats), new[] { "days" })]
    [InlineData(typeof(AnalyticsController), nameof(AnalyticsController.GetTopTools), new[] { "count", "days" })]
    public void QueryParameterizedEndpoints_ConfigureResponseCacheVaryByQueryKeys(
        Type controllerType,
        string methodName,
        string[] expectedVaryByQueryKeys)
    {
        var method = controllerType.GetMethod(methodName);
        Assert.NotNull(method);

        var attribute = method!.GetCustomAttribute<ResponseCacheAttribute>();
        Assert.NotNull(attribute);
        Assert.NotNull(attribute!.VaryByQueryKeys);
        Assert.Equal(expectedVaryByQueryKeys, attribute.VaryByQueryKeys);
    }

    [Theory]
    [InlineData(typeof(ToolsController), null)]
    [InlineData(typeof(CategoriesController), null)]
    [InlineData(typeof(AnalyticsController), nameof(AnalyticsController.GetUsageStats))]
    [InlineData(typeof(AnalyticsController), nameof(AnalyticsController.GetTopTools))]
    [InlineData(typeof(AnalyticsController), nameof(AnalyticsController.GetSitemapData))]
    public void PublicReadEndpoints_EnableApiReadRateLimiting(Type controllerType, string? methodName)
    {
        MemberInfo target = methodName is null
            ? controllerType
            : controllerType.GetMethod(methodName)!;

        Assert.NotNull(target);
        var attribute = target.GetCustomAttribute<EnableRateLimitingAttribute>();
        Assert.NotNull(attribute);
        Assert.Equal("api-read", attribute!.PolicyName);
    }

    private static AnalyticsController CreateController(
        FakeToolUsageRepository usageRepository,
        FakeToolRepository toolRepository,
        IConfiguration? configuration = null)
    {
        return new AnalyticsController(usageRepository, toolRepository, configuration)
        {
            ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext(),
            },
        };
    }

    private sealed class FakeToolUsageRepository : IToolUsageRepository
    {
        public bool TryIncrementResult { get; init; }
        public int TryIncrementCalls { get; private set; }
        public string? LastIncrementSessionId { get; private set; }
        public string? LastIncrementSlug { get; private set; }
        public string? LastIncrementReferrer { get; private set; }
        public string? LastIncrementUserAgent { get; private set; }

        public int CreateCalls { get; private set; }
        public ToolUsage? CreatedUsage { get; private set; }

        public IEnumerable<ToolUsageStatsDto> UsageStats { get; init; } = Array.Empty<ToolUsageStatsDto>();
        public int GetUsageStatsCalls { get; private set; }
        public int LastStatsDays { get; private set; }

        public IEnumerable<TopToolDto> TopTools { get; init; } = Array.Empty<TopToolDto>();
        public int GetTopToolsCalls { get; private set; }
        public int LastTopToolsCount { get; private set; }
        public int LastTopToolsDays { get; private set; }

        public Task<ToolUsage> CreateAsync(ToolUsage usage)
        {
            CreateCalls++;
            CreatedUsage = usage;
            return Task.FromResult(usage);
        }

        public Task<ToolUsage?> GetBySessionAndSlugAsync(string sessionId, string toolSlug)
            => Task.FromResult<ToolUsage?>(null);

        public Task<ToolUsage> UpdateAsync(ToolUsage usage)
            => Task.FromResult(usage);

        public Task<bool> TryIncrementSessionUsageAsync(string sessionId, string toolSlug, string? referrer, string? userAgent)
        {
            TryIncrementCalls++;
            LastIncrementSessionId = sessionId;
            LastIncrementSlug = toolSlug;
            LastIncrementReferrer = referrer;
            LastIncrementUserAgent = userAgent;
            return Task.FromResult(TryIncrementResult);
        }

        public Task<IEnumerable<ToolUsage>> GetByToolIdAsync(int toolId, DateTime? from = null, DateTime? to = null)
            => Task.FromResult(Enumerable.Empty<ToolUsage>());

        public Task<Dictionary<int, int>> GetUsageCountsByToolAsync(DateTime? from = null, DateTime? to = null)
            => Task.FromResult(new Dictionary<int, int>());

        public Task<IEnumerable<ToolUsageStatsDto>> GetUsageStatsAsync(int days = 30)
        {
            GetUsageStatsCalls++;
            LastStatsDays = days;
            return Task.FromResult(UsageStats);
        }

        public Task<IEnumerable<TopToolDto>> GetTopToolsAsync(int count = 10, int days = 30)
        {
            GetTopToolsCalls++;
            LastTopToolsCount = count;
            LastTopToolsDays = days;
            return Task.FromResult(TopTools);
        }
    }

    private sealed class FakeToolRepository : IToolRepository
    {
        public Tool? ToolBySlug { get; init; }
        public int IncrementUsageCalls { get; private set; }
        public int? LastIncrementedToolId { get; private set; }

        public Task<IEnumerable<Tool>> GetAllAsync() => Task.FromResult(Enumerable.Empty<Tool>());
        public Task<IEnumerable<Tool>> GetByCategoryAsync(string categorySlug) => Task.FromResult(Enumerable.Empty<Tool>());
        public Task<Tool?> GetBySlugAsync(string slug) => Task.FromResult(ToolBySlug);
        public Task<IEnumerable<Tool>> GetFeaturedAsync(int count = 10) => Task.FromResult(Enumerable.Empty<Tool>());
        public Task<IEnumerable<Tool>> GetPopularAsync(int count = 10) => Task.FromResult(Enumerable.Empty<Tool>());
        public Task<IEnumerable<Tool>> GetRelatedToolsAsync(int toolId, int count = 5) => Task.FromResult(Enumerable.Empty<Tool>());
        public Task<Tool> CreateAsync(Tool tool) => Task.FromResult(tool);
        public Task UpdateAsync(Tool tool) => Task.CompletedTask;

        public Task IncrementUsageCountAsync(int toolId)
        {
            IncrementUsageCalls++;
            LastIncrementedToolId = toolId;
            return Task.CompletedTask;
        }
    }
}
