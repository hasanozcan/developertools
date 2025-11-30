using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DeveloperTools.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    slug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    icon = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    display_order = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tools",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    category_id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    slug = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    short_description = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    long_description = table.Column<string>(type: "text", nullable: true),
                    keywords = table.Column<string[]>(type: "text[]", nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    is_featured = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    processing_type = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "client"),
                    display_order = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    usage_count = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tools", x => x.id);
                    table.ForeignKey(
                        name: "FK_tools_categories_category_id",
                        column: x => x.category_id,
                        principalTable: "categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "related_tools",
                columns: table => new
                {
                    tool_id = table.Column<int>(type: "integer", nullable: false),
                    related_tool_id = table.Column<int>(type: "integer", nullable: false),
                    relevance_score = table.Column<int>(type: "integer", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_related_tools", x => new { x.tool_id, x.related_tool_id });
                    table.ForeignKey(
                        name: "FK_related_tools_tools_related_tool_id",
                        column: x => x.related_tool_id,
                        principalTable: "tools",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_related_tools_tools_tool_id",
                        column: x => x.tool_id,
                        principalTable: "tools",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "seo_metadata",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tool_id = table.Column<int>(type: "integer", nullable: false),
                    title = table.Column<string>(type: "character varying(70)", maxLength: 70, nullable: true),
                    meta_description = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    og_title = table.Column<string>(type: "character varying(95)", maxLength: 95, nullable: true),
                    og_description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    og_image_url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    canonical_url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    structured_data = table.Column<string>(type: "jsonb", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_seo_metadata", x => x.id);
                    table.ForeignKey(
                        name: "FK_seo_metadata_tools_tool_id",
                        column: x => x.tool_id,
                        principalTable: "tools",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tool_faqs",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tool_id = table.Column<int>(type: "integer", nullable: false),
                    question = table.Column<string>(type: "text", nullable: false),
                    answer = table.Column<string>(type: "text", nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tool_faqs", x => x.id);
                    table.ForeignKey(
                        name: "FK_tool_faqs_tools_tool_id",
                        column: x => x.tool_id,
                        principalTable: "tools",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tool_usage",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tool_id = table.Column<int>(type: "integer", nullable: true),
                    tool_slug = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    session_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    user_agent = table.Column<string>(type: "text", nullable: true),
                    referrer = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    country_code = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tool_usage", x => x.id);
                    table.ForeignKey(
                        name: "FK_tool_usage_tools_tool_id",
                        column: x => x.tool_id,
                        principalTable: "tools",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.InsertData(
                table: "categories",
                columns: new[] { "id", "created_at", "description", "display_order", "icon", "name", "slug", "updated_at" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(6378), "JSON formatting, validation, and conversion tools", 1, "braces", "JSON Tools", "json", new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(6379) },
                    { 2, new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7406), "Base64, URL encoding and decoding tools", 2, "code", "Encoding & Decoding", "encoding", new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7406) },
                    { 3, new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7409), "UUID, password, QR code, and other generators", 3, "wand", "Generators", "generators", new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7409) },
                    { 4, new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7429), "Hash generators and encryption tools", 4, "lock", "Cryptography", "crypto", new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7429) },
                    { 5, new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7431), "Text manipulation and formatting tools", 5, "text", "Text Tools", "text", new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7431) },
                    { 6, new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7433), "Data format converters", 6, "arrows", "Converters", "converters", new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7433) },
                    { 7, new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7435), "SQL, CSS, JavaScript formatters", 7, "code", "Formatters", "formatters", new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7435) },
                    { 8, new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7436), "Developer utilities and helpers", 8, "tool", "Utilities", "utilities", new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7436) }
                });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "is_featured", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(2770), 1, true, true, new[] { "json formatter", "json beautifier", "format json online", "json pretty print" }, "Free online JSON formatter and beautifier. Paste your JSON data and get formatted, indented output instantly.", "JSON Formatter", "client", "Format and beautify JSON data", "json-formatter", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(2770) },
                    { 2, 2, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4375), 1, true, true, new[] { "base64 encoder", "base64 decoder", "base64 online", "encode base64" }, "Free online Base64 encoder and decoder. Convert text to Base64 and vice versa instantly.", "Base64 Encoder/Decoder", "client", "Encode or decode Base64 strings", "base64", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4375) },
                    { 3, 2, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4380), 2, true, true, new[] { "url encoder", "url decoder", "urlencode online", "percent encoding" }, "URL encode or decode your strings online. Perfect for working with query parameters and URLs.", "URL Encoder/Decoder", "client", "Encode or decode URL strings", "url-encoder", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4380) },
                    { 4, 2, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4383), 3, true, true, new[] { "jwt decoder", "decode jwt", "jwt parser", "json web token decoder" }, "Decode JSON Web Tokens (JWT) and inspect their header, payload, and signature.", "JWT Decoder", "client", "Decode and inspect JWT tokens", "jwt-decoder", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4384) }
                });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[] { 5, 2, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4386), 4, true, new[] { "html entity encoder", "html entity decoder", "html encode", "special characters html" }, "Convert special characters to HTML entities or decode HTML entities back to characters.", "HTML Entity Encoder/Decoder", "client", "Encode or decode HTML entities", "html-entity", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4386) });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "is_featured", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[,]
                {
                    { 6, 3, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4389), 1, true, true, new[] { "uuid generator", "guid generator", "random uuid", "uuid v4" }, "Generate random UUID v4 (GUID) values. Create single or bulk UUIDs instantly.", "UUID Generator", "client", "Generate random UUIDs/GUIDs", "uuid-generator", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4389) },
                    { 7, 3, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4392), 2, true, true, new[] { "password generator", "random password", "secure password generator", "strong password" }, "Generate strong, secure random passwords with customizable length and character sets.", "Password Generator", "client", "Generate secure random passwords", "password-generator", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4392) }
                });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[] { 8, 3, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4419), 3, true, new[] { "lorem ipsum generator", "placeholder text", "dummy text", "filler text" }, "Generate Lorem Ipsum placeholder text for designs and mockups.", "Lorem Ipsum Generator", "client", "Generate placeholder text", "lorem-ipsum", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4420) });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "is_featured", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[] { 9, 3, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4422), 4, true, true, new[] { "qr code generator", "create qr code", "qr code maker", "free qr code" }, "Generate QR codes for URLs, text, email, phone, WiFi, and more.", "QR Code Generator", "client", "Generate QR codes from text or URLs", "qr-code", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4422) });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[] { 10, 3, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4425), 5, true, new[] { "slug generator", "url slug", "seo friendly url", "permalink generator" }, "Convert text to clean, SEO-friendly URL slugs with transliteration support.", "Slug Generator", "client", "Generate SEO-friendly URL slugs", "slug-generator", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4425) });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "is_featured", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[,]
                {
                    { 11, 4, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4427), 1, true, true, new[] { "md5 generator", "md5 hash", "md5 online", "generate md5" }, "Generate MD5 hash values from any text input. Fast and free online MD5 generator.", "MD5 Hash Generator", "client", "Generate MD5 hash from text", "md5-hash", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4427) },
                    { 12, 4, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4429), 2, true, true, new[] { "sha256 generator", "sha256 hash", "sha256 online", "generate sha256" }, "Generate SHA256 hash values from any text input. Secure hashing algorithm.", "SHA256 Hash Generator", "client", "Generate SHA256 hash from text", "sha256-hash", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4430) },
                    { 13, 5, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4432), 1, true, true, new[] { "regex tester", "regex online", "test regex", "regular expression tester" }, "Test your regular expressions in real-time. Supports JavaScript regex with match highlighting.", "Regex Tester", "client", "Test and debug regular expressions", "regex-tester", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4432) }
                });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[,]
                {
                    { 14, 5, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4434), 2, true, new[] { "text diff", "compare text", "diff checker", "text comparison" }, "Compare two texts side-by-side and visualize additions, deletions, and changes.", "Text Diff Tool", "client", "Compare two texts and find differences", "text-diff", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4434) },
                    { 15, 5, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4437), 3, true, new[] { "markdown preview", "markdown editor", "markdown to html", "md preview" }, "Write Markdown and see the rendered output in real-time. Export to HTML.", "Markdown Preview", "client", "Preview Markdown in real-time", "markdown-preview", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4437) }
                });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "is_featured", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[,]
                {
                    { 16, 6, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4439), 1, true, true, new[] { "timestamp converter", "unix timestamp", "epoch converter", "date converter" }, "Convert Unix timestamps to human-readable dates and vice versa.", "Timestamp Converter", "client", "Convert Unix timestamps to dates", "timestamp-converter", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4439) },
                    { 17, 6, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4441), 2, true, true, new[] { "color converter", "hex to rgb", "rgb to hex", "hsl converter" }, "Convert colors between HEX, RGB, and HSL formats with color picker.", "Color Converter", "client", "Convert colors between formats", "color-converter", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4442) }
                });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[] { 18, 6, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4444), 3, true, new[] { "json to csv", "csv to json", "json converter", "csv converter" }, "Convert JSON arrays to CSV format or CSV data to JSON.", "JSON to CSV Converter", "client", "Convert JSON to CSV and vice versa", "json-csv", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4444) });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "is_featured", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[] { 19, 7, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4446), 1, true, true, new[] { "sql formatter", "format sql", "sql beautifier", "sql pretty print" }, "Beautify messy SQL queries with proper indentation and formatting.", "SQL Formatter", "client", "Format and beautify SQL queries", "sql-formatter", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4446) });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[,]
                {
                    { 20, 7, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4448), 2, true, new[] { "css minifier", "minify css", "css compressor", "css optimizer" }, "Reduce CSS file size by removing comments, whitespace, and optimizing values.", "CSS Minifier", "client", "Minify CSS code for production", "css-minifier", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4449) },
                    { 21, 7, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4451), 3, true, new[] { "js minifier", "javascript minifier", "minify js", "javascript compressor" }, "Reduce JS file size by removing comments, whitespace, and console.log statements.", "JavaScript Minifier", "client", "Minify JavaScript code", "js-minifier", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4451) }
                });

            migrationBuilder.InsertData(
                table: "tools",
                columns: new[] { "id", "category_id", "created_at", "display_order", "is_active", "is_featured", "keywords", "long_description", "name", "processing_type", "short_description", "slug", "updated_at" },
                values: new object[] { 22, 8, new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4453), 1, true, true, new[] { "cron parser", "cron expression", "cron schedule", "crontab helper" }, "Understand what your cron job schedule means in plain English and see next execution times.", "Cron Expression Parser", "client", "Parse and explain cron expressions", "cron-parser", new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4453) });

            migrationBuilder.CreateIndex(
                name: "IX_categories_slug",
                table: "categories",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_related_tools_related_tool_id",
                table: "related_tools",
                column: "related_tool_id");

            migrationBuilder.CreateIndex(
                name: "IX_seo_metadata_tool_id",
                table: "seo_metadata",
                column: "tool_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tool_faqs_tool_id",
                table: "tool_faqs",
                column: "tool_id");

            migrationBuilder.CreateIndex(
                name: "IX_tool_usage_tool_id",
                table: "tool_usage",
                column: "tool_id");

            migrationBuilder.CreateIndex(
                name: "idx_tool_usage_created_at",
                table: "tool_usage",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "idx_tool_usage_slug_date",
                table: "tool_usage",
                columns: new[] { "tool_slug", "created_at" });

            migrationBuilder.CreateIndex(
                name: "IX_tools_category_id",
                table: "tools",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_tools_slug",
                table: "tools",
                column: "slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "related_tools");

            migrationBuilder.DropTable(
                name: "seo_metadata");

            migrationBuilder.DropTable(
                name: "tool_faqs");

            migrationBuilder.DropTable(
                name: "tool_usage");

            migrationBuilder.DropTable(
                name: "tools");

            migrationBuilder.DropTable(
                name: "categories");
        }
    }
}
