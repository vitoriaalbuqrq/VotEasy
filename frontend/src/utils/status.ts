export function getVotingStatus(startDate: string, startTime: string, endDate: string, endTime: string): "scheduled" | "active" | "finalized" {
  const now = new Date();
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  if (now < start) return "scheduled";
  if (now > end) return "finalized";
  return "active";
}
