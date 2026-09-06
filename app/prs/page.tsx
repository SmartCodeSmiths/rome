import { GitBranchIcon } from "@/components/icons";
import { InfinitePRList } from "@/components/infinite-pr-list";
import { getAllPRs } from "@/lib/prs";

export default function ListPRs() {
  const prs = getAllPRs();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
          <GitBranchIcon className="h-4 w-4" />
          /prs
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          List PRs
        </h1>
        <p className="max-w-xl text-lg text-muted">
          All pull requests across your repositories.
        </p>
      </div>
      <InfinitePRList prs={prs} title="List PRs" description="All pull requests across your repositories." />
    </div>
  );
}
