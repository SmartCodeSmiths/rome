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

function getAllJsonFiles(): string[] {
  try {
    const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
    files.sort().reverse();
    return files.map((f) => path.join(DATA_DIR, f));
  } catch (error) {
    console.error("Error reading data directory:", error);
    return [];
  }
}

function getLatestJsonFile(): string | null {
  const files = getAllJsonFiles();
  return files.length > 0 ? files[0] : null;
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
  const files = getAllJsonFiles();
  if (files.length === 0) return [];

  const allPRs: Map<number, PR> = new Map();

  for (const file of files) {
    try {
      const data = fs.readFileSync(file, "utf-8");
      const prs = JSON.parse(data) as PR[];

      for (const pr of prs) {
        if (!allPRs.has(pr.id)) {
          allPRs.set(pr.id, pr);
        }
      }
    } catch (error) {
      console.error(`Error parsing JSON file ${file}:`, error);
    }
  }

  return Array.from(allPRs.values()).sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });
}

export function getLast10PRs(): PR[] {
  const prs = getAllPRs();
  return prs.slice(0, 10);
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
