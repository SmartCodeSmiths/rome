import * as fs from "node:fs";
import * as path from "node:path";

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

const DATA_DIR = path.join(process.cwd(), "data");

function getJsonFilePaths(): string[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      console.warn(`⚠️  Data directory not found: ${DATA_DIR}`);
      console.warn("Add JSON files to the data/ directory at the repository root.");
      return [];
    }

    const files = fs
      .readdirSync(DATA_DIR)
      .filter((f) => f.endsWith(".json"));

    if (files.length === 0) {
      console.warn(`⚠️  No JSON files found in: ${DATA_DIR}`);
      return [];
    }

    files.sort().reverse();
    return files.map((f) => path.join(DATA_DIR, f));
  } catch (error) {
    console.error("❌ Error reading data directory:", error);
    return [];
  }
}

export function readJsonFiles(): PR[] {
  const files = getJsonFilePaths();
  if (files.length === 0) {
    console.warn("⚠️  No PR data available in the data/ directory.");
    return [];
  }

  const allPRs: Map<number, PR> = new Map();
  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const data = fs.readFileSync(file, "utf-8");
      const prs = JSON.parse(data) as PR[];

      for (const pr of prs) {
        if (!allPRs.has(pr.id)) {
          allPRs.set(pr.id, pr);
        }
      }
      successCount++;
    } catch (error) {
      errorCount++;
      console.error(`❌ Error parsing JSON file ${file}:`, error);
    }
  }

  console.log(
    `✓ Loaded ${allPRs.size} unique PRs from ${successCount} files (${errorCount} errors)`
  );
  return Array.from(allPRs.values());
}