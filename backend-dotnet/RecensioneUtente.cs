namespace Progetto_AI_API
{
    public class RecensioneUtente
    {
        public int? ID { get; set; }
        public required string Model { get; set; }
        public required string OutputClass { get; set; }
        public required bool Correct { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public required int ElapsedTime { get; set; }
    }
}
