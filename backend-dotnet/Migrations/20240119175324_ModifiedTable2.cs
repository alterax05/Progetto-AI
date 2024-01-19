using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Progetto_AI_API.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ElapsedTime",
                table: "RecensioniUtenti",
                type: "int",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time(6)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "ElapsedTime",
                table: "RecensioniUtenti",
                type: "time(6)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
