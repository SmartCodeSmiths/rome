import { readJsonFiles } from "@/lib/data";
import type { PR } from "@/lib/data";

export type { PR };

export function getAllPRs(): PR[] {
  const prs = readJsonFiles();

  return prs.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });
}

export function getLast10PRs(): PR[] {
  const prs = getAllPRs();
  return prs.slice(0, 10);
}

function getYesterdayDate(): { start: Date; end: Date } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const nextDay = new Date(yesterday);
  nextDay.setDate(nextDay.getDate() + 1);

  return { start: yesterday, end: nextDay };
}

export function getYesterdayPRs(): PR[] {
  const prs = getAllPRs();
  const { start, end } = getYesterdayDate();

  return prs.filter((pr) => {
    const updatedDate = new Date(pr.updated_at);
    return updatedDate >= start && updatedDate < end;
  }).sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });
}