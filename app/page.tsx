import Link from "next/link";
import { GitBranchIcon } from "@/components/icons";

const STATS = [
  { label: "Open PRs", value: "12" },
  { label: "Merged yesterday", value: "5" },
  { label: "Awaiting review", value: "7" },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            PR Dashboard
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Browse pull requests across your repositories with Rome.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <div className="text-sm font-medium uppercase tracking-wide text-muted">
                {stat.label}
              </div>
              <div className="mt-2 text-4xl font-bold text-accent">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/prs"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90"
          >
            <GitBranchIcon className="h-4 w-4" />
            View all PRs
          </Link>
          <Link
            href="/prs/last-10"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
          >
            Last 10 PRs
          </Link>
        </div>
      </section>
    </div>
  );
}
