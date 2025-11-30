using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeveloperTools.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddClickCountAndUpdatedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "click_count",
                table: "tool_usage",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "tool_usage",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(2245), new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(2257) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4676), new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4677) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4682), new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4682) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4684), new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4684) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4686), new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4686) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4688), new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4688) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4690), new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4690) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4691), new DateTime(2025, 11, 29, 12, 59, 11, 458, DateTimeKind.Utc).AddTicks(4692) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(3547), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(3548) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6711), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6712) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6717), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6718) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6748), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6749) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6752), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6752) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6755), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6755) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6758), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6758) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6760), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6761) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 9,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6763), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6763) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 10,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6766), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6766) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 11,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6769), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6769) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 12,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6772), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6772) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 13,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6775), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6775) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 14,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6778), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6778) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 15,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6780), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6781) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 16,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6783), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6784) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 17,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6786), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6786) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 18,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6789), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6789) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 19,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6792), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6792) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 20,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6795), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6795) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 21,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6810), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6810) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 22,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6813), new DateTime(2025, 11, 29, 12, 59, 11, 459, DateTimeKind.Utc).AddTicks(6813) });

            migrationBuilder.CreateIndex(
                name: "idx_tool_usage_session_slug",
                table: "tool_usage",
                columns: new[] { "session_id", "tool_slug" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "idx_tool_usage_session_slug",
                table: "tool_usage");

            migrationBuilder.DropColumn(
                name: "click_count",
                table: "tool_usage");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "tool_usage");

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(6008), new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(6009) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7051), new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7051) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7054), new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7054) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7076), new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7076) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7077), new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7078) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7079), new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7079) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7081), new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7081) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7082), new DateTime(2025, 11, 29, 12, 51, 50, 234, DateTimeKind.Utc).AddTicks(7082) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(2604), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(2605) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4073), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4073) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4078), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4079) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4081), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4082) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4084), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4084) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4087), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4087) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4089), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4090) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4116), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4117) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 9,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4119), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4119) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 10,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4121), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4121) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 11,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4123), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4124) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 12,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4126), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4126) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 13,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4128), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4128) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 14,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4130), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4131) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 15,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4133), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4133) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 16,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4135), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4135) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 17,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4137), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4137) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 18,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4140), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4140) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 19,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4142), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4142) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 20,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4144), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4144) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 21,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4146), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4147) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 22,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4148), new DateTime(2025, 11, 29, 12, 51, 50, 235, DateTimeKind.Utc).AddTicks(4149) });
        }
    }
}
