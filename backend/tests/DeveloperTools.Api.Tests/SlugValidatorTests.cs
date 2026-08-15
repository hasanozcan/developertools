using DeveloperTools.Api.Validation;

namespace DeveloperTools.Api.Tests;

public sealed class SlugValidatorTests
{
    [Theory]
    [InlineData("json")]
    [InlineData("json-formatter")]
    [InlineData("tool-42")]
    public void IsValid_AcceptsCanonicalSlugs(string value)
    {
        Assert.True(SlugValidator.IsValid(value, 150));
    }

    [Theory]
    [InlineData("")]
    [InlineData("-json")]
    [InlineData("json-")]
    [InlineData("json--formatter")]
    [InlineData("JSON")]
    [InlineData("json_formatter")]
    public void IsValid_RejectsNonCanonicalSlugs(string value)
    {
        Assert.False(SlugValidator.IsValid(value, 150));
    }

    [Fact]
    public void IsValid_EnforcesMaximumLength()
    {
        Assert.False(SlugValidator.IsValid(new string('a', 151), 150));
    }
}
