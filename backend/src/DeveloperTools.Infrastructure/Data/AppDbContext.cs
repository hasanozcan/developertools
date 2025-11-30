using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using DeveloperTools.Core.Entities;

namespace DeveloperTools.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.ConfigureWarnings(warnings =>
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
    }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Tool> Tools => Set<Tool>();
    public DbSet<SeoMetadata> SeoMetadata => Set<SeoMetadata>();
    public DbSet<ToolUsage> ToolUsages => Set<ToolUsage>();
    public DbSet<ToolFaq> ToolFaqs => Set<ToolFaq>();
    public DbSet<RelatedTool> RelatedTools => Set<RelatedTool>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Category
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("categories");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name").HasMaxLength(100).IsRequired();
            entity.Property(e => e.Slug).HasColumnName("slug").HasMaxLength(100).IsRequired();
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Icon).HasColumnName("icon").HasMaxLength(50);
            entity.Property(e => e.DisplayOrder).HasColumnName("display_order").HasDefaultValue(0);
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasIndex(e => e.Slug).IsUnique();
        });

        // Tool
        modelBuilder.Entity<Tool>(entity =>
        {
            entity.ToTable("tools");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Name).HasColumnName("name").HasMaxLength(150).IsRequired();
            entity.Property(e => e.Slug).HasColumnName("slug").HasMaxLength(150).IsRequired();
            entity.Property(e => e.ShortDescription).HasColumnName("short_description").HasMaxLength(300);
            entity.Property(e => e.LongDescription).HasColumnName("long_description");
            entity.Property(e => e.Keywords).HasColumnName("keywords");
            entity.Property(e => e.IsActive).HasColumnName("is_active").HasDefaultValue(true);
            entity.Property(e => e.IsFeatured).HasColumnName("is_featured").HasDefaultValue(false);
            entity.Property(e => e.ProcessingType).HasColumnName("processing_type").HasMaxLength(20).HasDefaultValue("client");
            entity.Property(e => e.DisplayOrder).HasColumnName("display_order").HasDefaultValue(0);
            entity.Property(e => e.UsageCount).HasColumnName("usage_count").HasDefaultValue(0);
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasIndex(e => e.Slug).IsUnique();
            
            entity.HasOne(e => e.Category)
                .WithMany(c => c.Tools)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // SeoMetadata
        modelBuilder.Entity<SeoMetadata>(entity =>
        {
            entity.ToTable("seo_metadata");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ToolId).HasColumnName("tool_id");
            entity.Property(e => e.Title).HasColumnName("title").HasMaxLength(70);
            entity.Property(e => e.MetaDescription).HasColumnName("meta_description").HasMaxLength(160);
            entity.Property(e => e.OgTitle).HasColumnName("og_title").HasMaxLength(95);
            entity.Property(e => e.OgDescription).HasColumnName("og_description").HasMaxLength(200);
            entity.Property(e => e.OgImageUrl).HasColumnName("og_image_url").HasMaxLength(500);
            entity.Property(e => e.CanonicalUrl).HasColumnName("canonical_url").HasMaxLength(500);
            entity.Property(e => e.StructuredData).HasColumnName("structured_data").HasColumnType("jsonb");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasIndex(e => e.ToolId).IsUnique();
            
            entity.HasOne(e => e.Tool)
                .WithOne(t => t.SeoMetadata)
                .HasForeignKey<SeoMetadata>(e => e.ToolId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // ToolUsage
        modelBuilder.Entity<ToolUsage>(entity =>
        {
            entity.ToTable("tool_usage");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ToolId).HasColumnName("tool_id").IsRequired(false);
            entity.Property(e => e.ToolSlug).HasColumnName("tool_slug").HasMaxLength(150).IsRequired();
            entity.Property(e => e.SessionId).HasColumnName("session_id").HasMaxLength(100);
            entity.Property(e => e.UserAgent).HasColumnName("user_agent");
            entity.Property(e => e.Referrer).HasColumnName("referrer").HasMaxLength(500);
            entity.Property(e => e.CountryCode).HasColumnName("country_code").HasMaxLength(10);
            entity.Property(e => e.ClickCount).HasColumnName("click_count").HasDefaultValue(1);
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            entity.HasIndex(e => new { e.ToolSlug, e.CreatedAt }).HasDatabaseName("idx_tool_usage_slug_date");
            entity.HasIndex(e => e.CreatedAt).HasDatabaseName("idx_tool_usage_created_at");
            entity.HasIndex(e => new { e.SessionId, e.ToolSlug }).HasDatabaseName("idx_tool_usage_session_slug");
            
            entity.HasOne(e => e.Tool)
                .WithMany(t => t.Usages)
                .HasForeignKey(e => e.ToolId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
        });

        // ToolFaq
        modelBuilder.Entity<ToolFaq>(entity =>
        {
            entity.ToTable("tool_faqs");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ToolId).HasColumnName("tool_id");
            entity.Property(e => e.Question).HasColumnName("question").IsRequired();
            entity.Property(e => e.Answer).HasColumnName("answer").IsRequired();
            entity.Property(e => e.DisplayOrder).HasColumnName("display_order").HasDefaultValue(0);
            
            entity.HasOne(e => e.Tool)
                .WithMany(t => t.Faqs)
                .HasForeignKey(e => e.ToolId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // RelatedTool
        modelBuilder.Entity<RelatedTool>(entity =>
        {
            entity.ToTable("related_tools");
            entity.HasKey(e => new { e.ToolId, e.RelatedToolId });
            entity.Property(e => e.ToolId).HasColumnName("tool_id");
            entity.Property(e => e.RelatedToolId).HasColumnName("related_tool_id");
            entity.Property(e => e.RelevanceScore).HasColumnName("relevance_score").HasDefaultValue(0);
            
            entity.HasOne(e => e.Tool)
                .WithMany(t => t.RelatedTools)
                .HasForeignKey(e => e.ToolId)
                .OnDelete(DeleteBehavior.Cascade);
                
            entity.HasOne(e => e.Related)
                .WithMany()
                .HasForeignKey(e => e.RelatedToolId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Seed Data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Categories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "JSON Tools", Slug = "json", Description = "JSON formatting, validation, and conversion tools", Icon = "braces", DisplayOrder = 1 },
            new Category { Id = 2, Name = "Encoding & Decoding", Slug = "encoding", Description = "Base64, URL encoding and decoding tools", Icon = "code", DisplayOrder = 2 },
            new Category { Id = 3, Name = "Generators", Slug = "generators", Description = "UUID, password, QR code, and other generators", Icon = "wand", DisplayOrder = 3 },
            new Category { Id = 4, Name = "Cryptography", Slug = "crypto", Description = "Hash generators and encryption tools", Icon = "lock", DisplayOrder = 4 },
            new Category { Id = 5, Name = "Text Tools", Slug = "text", Description = "Text manipulation and formatting tools", Icon = "text", DisplayOrder = 5 },
            new Category { Id = 6, Name = "Converters", Slug = "converters", Description = "Data format converters", Icon = "arrows", DisplayOrder = 6 },
            new Category { Id = 7, Name = "Formatters", Slug = "formatters", Description = "SQL, CSS, JavaScript formatters", Icon = "code", DisplayOrder = 7 },
            new Category { Id = 8, Name = "Utilities", Slug = "utilities", Description = "Developer utilities and helpers", Icon = "tool", DisplayOrder = 8 }
        );

        // Tools
        modelBuilder.Entity<Tool>().HasData(
            // JSON Tools
            new Tool { Id = 1, CategoryId = 1, Name = "JSON Formatter", Slug = "json-formatter", ShortDescription = "Format and beautify JSON data", LongDescription = "Free online JSON formatter and beautifier. Paste your JSON data and get formatted, indented output instantly.", Keywords = new[] { "json formatter", "json beautifier", "format json online", "json pretty print" }, IsFeatured = true, DisplayOrder = 1 },
            
            // Encoding Tools
            new Tool { Id = 2, CategoryId = 2, Name = "Base64 Encoder/Decoder", Slug = "base64", ShortDescription = "Encode or decode Base64 strings", LongDescription = "Free online Base64 encoder and decoder. Convert text to Base64 and vice versa instantly.", Keywords = new[] { "base64 encoder", "base64 decoder", "base64 online", "encode base64" }, IsFeatured = true, DisplayOrder = 1 },
            new Tool { Id = 3, CategoryId = 2, Name = "URL Encoder/Decoder", Slug = "url-encoder", ShortDescription = "Encode or decode URL strings", LongDescription = "URL encode or decode your strings online. Perfect for working with query parameters and URLs.", Keywords = new[] { "url encoder", "url decoder", "urlencode online", "percent encoding" }, IsFeatured = true, DisplayOrder = 2 },
            new Tool { Id = 4, CategoryId = 2, Name = "JWT Decoder", Slug = "jwt-decoder", ShortDescription = "Decode and inspect JWT tokens", LongDescription = "Decode JSON Web Tokens (JWT) and inspect their header, payload, and signature.", Keywords = new[] { "jwt decoder", "decode jwt", "jwt parser", "json web token decoder" }, IsFeatured = true, DisplayOrder = 3 },
            new Tool { Id = 5, CategoryId = 2, Name = "HTML Entity Encoder/Decoder", Slug = "html-entity", ShortDescription = "Encode or decode HTML entities", LongDescription = "Convert special characters to HTML entities or decode HTML entities back to characters.", Keywords = new[] { "html entity encoder", "html entity decoder", "html encode", "special characters html" }, DisplayOrder = 4 },
            
            // Generators
            new Tool { Id = 6, CategoryId = 3, Name = "UUID Generator", Slug = "uuid-generator", ShortDescription = "Generate random UUIDs/GUIDs", LongDescription = "Generate random UUID v4 (GUID) values. Create single or bulk UUIDs instantly.", Keywords = new[] { "uuid generator", "guid generator", "random uuid", "uuid v4" }, IsFeatured = true, DisplayOrder = 1 },
            new Tool { Id = 7, CategoryId = 3, Name = "Password Generator", Slug = "password-generator", ShortDescription = "Generate secure random passwords", LongDescription = "Generate strong, secure random passwords with customizable length and character sets.", Keywords = new[] { "password generator", "random password", "secure password generator", "strong password" }, IsFeatured = true, DisplayOrder = 2 },
            new Tool { Id = 8, CategoryId = 3, Name = "Lorem Ipsum Generator", Slug = "lorem-ipsum", ShortDescription = "Generate placeholder text", LongDescription = "Generate Lorem Ipsum placeholder text for designs and mockups.", Keywords = new[] { "lorem ipsum generator", "placeholder text", "dummy text", "filler text" }, DisplayOrder = 3 },
            new Tool { Id = 9, CategoryId = 3, Name = "QR Code Generator", Slug = "qr-code", ShortDescription = "Generate QR codes from text or URLs", LongDescription = "Generate QR codes for URLs, text, email, phone, WiFi, and more.", Keywords = new[] { "qr code generator", "create qr code", "qr code maker", "free qr code" }, IsFeatured = true, DisplayOrder = 4 },
            new Tool { Id = 10, CategoryId = 3, Name = "Slug Generator", Slug = "slug-generator", ShortDescription = "Generate SEO-friendly URL slugs", LongDescription = "Convert text to clean, SEO-friendly URL slugs with transliteration support.", Keywords = new[] { "slug generator", "url slug", "seo friendly url", "permalink generator" }, DisplayOrder = 5 },
            
            // Crypto Tools
            new Tool { Id = 11, CategoryId = 4, Name = "MD5 Hash Generator", Slug = "md5-hash", ShortDescription = "Generate MD5 hash from text", LongDescription = "Generate MD5 hash values from any text input. Fast and free online MD5 generator.", Keywords = new[] { "md5 generator", "md5 hash", "md5 online", "generate md5" }, IsFeatured = true, DisplayOrder = 1 },
            new Tool { Id = 12, CategoryId = 4, Name = "SHA256 Hash Generator", Slug = "sha256-hash", ShortDescription = "Generate SHA256 hash from text", LongDescription = "Generate SHA256 hash values from any text input. Secure hashing algorithm.", Keywords = new[] { "sha256 generator", "sha256 hash", "sha256 online", "generate sha256" }, IsFeatured = true, DisplayOrder = 2 },
            
            // Text Tools
            new Tool { Id = 13, CategoryId = 5, Name = "Regex Tester", Slug = "regex-tester", ShortDescription = "Test and debug regular expressions", LongDescription = "Test your regular expressions in real-time. Supports JavaScript regex with match highlighting.", Keywords = new[] { "regex tester", "regex online", "test regex", "regular expression tester" }, IsFeatured = true, DisplayOrder = 1 },
            new Tool { Id = 14, CategoryId = 5, Name = "Text Diff Tool", Slug = "text-diff", ShortDescription = "Compare two texts and find differences", LongDescription = "Compare two texts side-by-side and visualize additions, deletions, and changes.", Keywords = new[] { "text diff", "compare text", "diff checker", "text comparison" }, DisplayOrder = 2 },
            new Tool { Id = 15, CategoryId = 5, Name = "Markdown Preview", Slug = "markdown-preview", ShortDescription = "Preview Markdown in real-time", LongDescription = "Write Markdown and see the rendered output in real-time. Export to HTML.", Keywords = new[] { "markdown preview", "markdown editor", "markdown to html", "md preview" }, DisplayOrder = 3 },
            
            // Converters
            new Tool { Id = 16, CategoryId = 6, Name = "Timestamp Converter", Slug = "timestamp-converter", ShortDescription = "Convert Unix timestamps to dates", LongDescription = "Convert Unix timestamps to human-readable dates and vice versa.", Keywords = new[] { "timestamp converter", "unix timestamp", "epoch converter", "date converter" }, IsFeatured = true, DisplayOrder = 1 },
            new Tool { Id = 17, CategoryId = 6, Name = "Color Converter", Slug = "color-converter", ShortDescription = "Convert colors between formats", LongDescription = "Convert colors between HEX, RGB, and HSL formats with color picker.", Keywords = new[] { "color converter", "hex to rgb", "rgb to hex", "hsl converter" }, IsFeatured = true, DisplayOrder = 2 },
            new Tool { Id = 18, CategoryId = 6, Name = "JSON to CSV Converter", Slug = "json-csv", ShortDescription = "Convert JSON to CSV and vice versa", LongDescription = "Convert JSON arrays to CSV format or CSV data to JSON.", Keywords = new[] { "json to csv", "csv to json", "json converter", "csv converter" }, DisplayOrder = 3 },
            
            // Formatters
            new Tool { Id = 19, CategoryId = 7, Name = "SQL Formatter", Slug = "sql-formatter", ShortDescription = "Format and beautify SQL queries", LongDescription = "Beautify messy SQL queries with proper indentation and formatting.", Keywords = new[] { "sql formatter", "format sql", "sql beautifier", "sql pretty print" }, IsFeatured = true, DisplayOrder = 1 },
            new Tool { Id = 20, CategoryId = 7, Name = "CSS Minifier", Slug = "css-minifier", ShortDescription = "Minify CSS code for production", LongDescription = "Reduce CSS file size by removing comments, whitespace, and optimizing values.", Keywords = new[] { "css minifier", "minify css", "css compressor", "css optimizer" }, DisplayOrder = 2 },
            new Tool { Id = 21, CategoryId = 7, Name = "JavaScript Minifier", Slug = "js-minifier", ShortDescription = "Minify JavaScript code", LongDescription = "Reduce JS file size by removing comments, whitespace, and console.log statements.", Keywords = new[] { "js minifier", "javascript minifier", "minify js", "javascript compressor" }, DisplayOrder = 3 },
            
            // Utilities
            new Tool { Id = 22, CategoryId = 8, Name = "Cron Expression Parser", Slug = "cron-parser", ShortDescription = "Parse and explain cron expressions", LongDescription = "Understand what your cron job schedule means in plain English and see next execution times.", Keywords = new[] { "cron parser", "cron expression", "cron schedule", "crontab helper" }, IsFeatured = true, DisplayOrder = 1 }
        );
    }
}
