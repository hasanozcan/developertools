using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeveloperTools.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovePageUrlAndIpAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ip_address",
                table: "tool_usage");

            migrationBuilder.DropColumn(
                name: "page_url",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ip_address",
                table: "tool_usage",
                type: "character varying(45)",
                maxLength: 45,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "page_url",
                table: "tool_usage",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 13, DateTimeKind.Utc).AddTicks(9383), new DateTime(2025, 11, 29, 12, 48, 16, 13, DateTimeKind.Utc).AddTicks(9384) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(420), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(421) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(424), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(424) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(426), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(426) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(427), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(428) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(438), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(438) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(440), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(440) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(441), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(441) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(5793), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(5794) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7394), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7395) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7400), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7400) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7403), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7403) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7405), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7406) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7433), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7434) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7436), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7436) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7438), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7439) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 9,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7441), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7441) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 10,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7443), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7443) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 11,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7445), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7445) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 12,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7447), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7448) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 13,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7450), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7450) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 14,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7452), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7452) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 15,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7454), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7454) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 16,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7456), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7457) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 17,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7459), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7459) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 18,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7461), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7461) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 19,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7463), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7464) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 20,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7467), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7467) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 21,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7469), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7469) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 22,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7471), new DateTime(2025, 11, 29, 12, 48, 16, 14, DateTimeKind.Utc).AddTicks(7472) });
        }
    }
}
