export function formatTimestamp(timestamp: string | number): string {
  const date = new Date(Number(timestamp) * 1000); // timestamp em segundos
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
