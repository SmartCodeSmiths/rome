import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.resolve(
  process.cwd(),
  "../github-ai-project/data"
);

export interface PR {
  url: string;
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  body: string;
}

function getLatestJsonFile(): string | null {
  try {
    const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
    if (files.length === 0) return null;

    files.sort().reverse();
    return path.join(DATA_DIR, files[0]);
  } catch (error) {
    console.error("Error reading data directory:", error);
    return null;
  }
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

export function getAllPRs(): PR[] {
  const file = getLatestJsonFile();
  if (!file) return [];

  try {
    const data = fs.readFileSync(file, "utf-8");
    return JSON.parse(data) as PR[];
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}

export function getLast10PRs(): PR[] {
  const prs = getAllPRs();

  return prs
    .sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime();
      const dateB = new Date(b.updated_at).getTime();
      return dateB - dateA;
    })
    .slice(0, 10);
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
