using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeveloperTools.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPageUrlAndIpAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IpAddress",
                table: "tool_usage",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PageUrl",
                table: "tool_usage",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 732, DateTimeKind.Utc).AddTicks(8322), new DateTime(2025, 11, 29, 12, 44, 38, 732, DateTimeKind.Utc).AddTicks(8324) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(980), new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(981) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(986), new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(987) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(988), new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(989) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(990), new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(991) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(992), new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(992) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(994), new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(994) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(1027), new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(1028) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(8558), new DateTime(2025, 11, 29, 12, 44, 38, 733, DateTimeKind.Utc).AddTicks(8559) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(83), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(84) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(88), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(89) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(91), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(92) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(94), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(94) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(96), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(96) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(98), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(99) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(101), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(101) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 9,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(103), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(104) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 10,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(106), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(106) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 11,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(128), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(129) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 12,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(131), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(131) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 13,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(134), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(134) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 14,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(136), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(137) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 15,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(138), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(139) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 16,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(141), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(141) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 17,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(143), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(143) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 18,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(145), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(146) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 19,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(148), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(148) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 20,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(150), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(150) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 21,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(152), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(152) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 22,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(164), new DateTime(2025, 11, 29, 12, 44, 38, 734, DateTimeKind.Utc).AddTicks(164) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IpAddress",
                table: "tool_usage");

            migrationBuilder.DropColumn(
                name: "PageUrl",
                table: "tool_usage");

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(6378), new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(6379) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7406), new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7406) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7409), new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7409) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7429), new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7429) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7431), new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7431) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7433), new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7433) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7435), new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7435) });

            migrationBuilder.UpdateData(
                table: "categories",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7436), new DateTime(2025, 11, 29, 12, 29, 55, 66, DateTimeKind.Utc).AddTicks(7436) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(2770), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(2770) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4375), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4375) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4380), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4380) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 4,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4383), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4384) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 5,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4386), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4386) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 6,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4389), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4389) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 7,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4392), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4392) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 8,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4419), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4420) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 9,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4422), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4422) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 10,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4425), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4425) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 11,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4427), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4427) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 12,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4429), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4430) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 13,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4432), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4432) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 14,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4434), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4434) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 15,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4437), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4437) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 16,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4439), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4439) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 17,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4441), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4442) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 18,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4444), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4444) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 19,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4446), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4446) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 20,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4448), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4449) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 21,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4451), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4451) });

            migrationBuilder.UpdateData(
                table: "tools",
                keyColumn: "id",
                keyValue: 22,
                columns: new[] { "created_at", "updated_at" },
                values: new object[] { new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4453), new DateTime(2025, 11, 29, 12, 29, 55, 67, DateTimeKind.Utc).AddTicks(4453) });
        }
    }
}
