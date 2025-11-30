using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeveloperTools.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixColumnNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PageUrl",
                table: "tool_usage",
                newName: "page_url");

            migrationBuilder.RenameColumn(
                name: "IpAddress",
                table: "tool_usage",
                newName: "ip_address");

            migrationBuilder.AlterColumn<string>(
                name: "page_url",
                table: "tool_usage",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ip_address",
                table: "tool_usage",
                type: "character varying(45)",
                maxLength: 45,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "page_url",
                table: "tool_usage",
                newName: "PageUrl");

            migrationBuilder.RenameColumn(
                name: "ip_address",
                table: "tool_usage",
                newName: "IpAddress");

            migrationBuilder.AlterColumn<string>(
                name: "PageUrl",
                table: "tool_usage",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IpAddress",
                table: "tool_usage",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(45)",
                oldMaxLength: 45,
                oldNullable: true);

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
    }
}
