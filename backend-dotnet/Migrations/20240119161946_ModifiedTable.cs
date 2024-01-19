using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Progetto_AI_API.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedAT",
                table: "RecensioniUtenti",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "ElapsedTime",
                table: "RecensioniUtenti",
                type: "time(6)",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ElapsedTime",
                table: "RecensioniUtenti");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "RecensioniUtenti",
                newName: "CreatedAT");
        }
    }
}
