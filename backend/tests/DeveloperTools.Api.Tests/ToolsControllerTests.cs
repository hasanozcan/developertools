using DeveloperTools.Api.Controllers;
using DeveloperTools.Application.DTOs;
using DeveloperTools.Core.Entities;
using DeveloperTools.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DeveloperTools.Api.Tests;

public sealed class ToolsControllerTests
{
    [Fact]
    public async Task GetBySlug_RejectsInvalidSlugBeforeRepositoryLookup()
    {
        var repository = new FakeToolRepository();
        var controller = new ToolsController(repository);

        var result = await controller.GetBySlug("JSON_formatter");

        Assert.IsType<BadRequestObjectResult>(result.Result);
        Assert.Equal(0, repository.GetBySlugCalls);
    }

    [Fact]
    public async Task GetBySlug_ReturnsMappedToolWhenFound()
    {
        var repository = new FakeToolRepository
        {
            ToolBySlug = new Tool
            {
                Id = 7,
                Name = "JSON Formatter",
                Slug = "json-formatter",
                Category = new Category { Id = 1, Name = "JSON Tools", Slug = "json" },
            },
        };
        var controller = new ToolsController(repository);

        var result = await controller.GetBySlug("json-formatter");

        var response = Assert.IsType<OkObjectResult>(result.Result);
        var tool = Assert.IsType<ToolDetailDto>(response.Value);
        Assert.Equal("json-formatter", tool.Slug);
        Assert.Equal("json", tool.CategorySlug);
        Assert.Equal(1, repository.GetBySlugCalls);
    }

    [Fact]
    public async Task GetBySlug_ReturnsNotFoundForUnknownCanonicalSlug()
    {
        var controller = new ToolsController(new FakeToolRepository());

        var result = await controller.GetBySlug("unknown-tool");

        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Theory]
    [InlineData(0, 1)]
    [InlineData(-5, 1)]
    [InlineData(51, 50)]
    [InlineData(101, 50)]
    public async Task GetFeatured_ClampsOutOfRangeCount(int count, int expectedCount)
    {
        var repository = new FakeToolRepository();
        var controller = new ToolsController(repository);

        var result = await controller.GetFeatured(count);

        Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(expectedCount, repository.LastFeaturedCount);
    }

    [Theory]
    [InlineData(0, 1)]
    [InlineData(101, 50)]
    public async Task GetPopular_ClampsOutOfRangeCount(int count, int expectedCount)
    {
        var repository = new FakeToolRepository();
        var controller = new ToolsController(repository);

        var result = await controller.GetPopular(count);

        Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(expectedCount, repository.LastPopularCount);
    }

    [Theory]
    [InlineData(0, 1)]
    [InlineData(101, 50)]
    public async Task GetRelated_ClampsOutOfRangeCount(int count, int expectedCount)
    {
        var repository = new FakeToolRepository
        {
            ToolBySlug = new Tool { Id = 7, Name = "JSON Formatter", Slug = "json-formatter" },
        };
        var controller = new ToolsController(repository);

        var result = await controller.GetRelated("json-formatter", count);

        Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(expectedCount, repository.LastRelatedCount);
    }

    private sealed class FakeToolRepository : IToolRepository
    {
        public Tool? ToolBySlug { get; init; }
        public int GetBySlugCalls { get; private set; }
        public int LastFeaturedCount { get; private set; }
        public int LastPopularCount { get; private set; }
        public int LastRelatedCount { get; private set; }

        public Task<IEnumerable<Tool>> GetAllAsync() => Task.FromResult(Enumerable.Empty<Tool>());
        public Task<IEnumerable<Tool>> GetByCategoryAsync(string categorySlug) => Task.FromResult(Enumerable.Empty<Tool>());

        public Task<Tool?> GetBySlugAsync(string slug)
        {
            GetBySlugCalls++;
            return Task.FromResult(ToolBySlug);
        }

        public Task<IEnumerable<Tool>> GetFeaturedAsync(int count = 10)
        {
            LastFeaturedCount = count;
            return Task.FromResult(Enumerable.Empty<Tool>());
        }

        public Task<IEnumerable<Tool>> GetPopularAsync(int count = 10)
        {
            LastPopularCount = count;
            return Task.FromResult(Enumerable.Empty<Tool>());
        }

        public Task<IEnumerable<Tool>> GetRelatedToolsAsync(int toolId, int count = 5)
        {
            LastRelatedCount = count;
            return Task.FromResult(Enumerable.Empty<Tool>());
        }
        public Task<Tool> CreateAsync(Tool tool) => Task.FromResult(tool);
        public Task UpdateAsync(Tool tool) => Task.CompletedTask;
        public Task IncrementUsageCountAsync(int toolId) => Task.CompletedTask;
    }
}
