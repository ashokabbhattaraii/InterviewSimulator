import { console } from "inspector";

export default function calculateStreak(
  attemptDates?: { createdAt?: string | Date }[],
) {
  if (!attemptDates || attemptDates.length === 0) {
    return 0;
  }

  const sortedDates = attemptDates
    .map((date) => new Date(date.createdAt || ""))
    .sort((a, b) => a.getTime() - b.getTime());

  let maxStreak = 1;
  let currentStreak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currentDate = sortedDates[i];
    const diffTime = currentDate.getTime() - prevDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays === 1) {
      currentStreak += 1;
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }
  }

  return maxStreak;
}
