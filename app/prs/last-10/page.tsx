import { HistoryIcon } from "@/components/icons";

export default function Last10PRs() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
          <HistoryIcon className="h-4 w-4" />
          /prs/last-10
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Last 10 PRs
        </h1>
        <p className="max-w-xl text-lg text-muted">
          The ten most recent pull requests.
        </p>
      </div>
      <div className="mt-10 rounded-2xl border border-dashed border-border p-16 text-center text-muted">
        Coming soon.
      </div>
    </div>
  );
}
