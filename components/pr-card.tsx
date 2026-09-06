import { ExternalLinkIcon } from "@/components/icons";
import { PR } from "@/lib/prs";

interface PRCardProps {
  pr: PR;
}

export function PRCard({ pr }: PRCardProps) {
  const createdDate = new Date(pr.created_at).toLocaleDateString();
  const updatedDate = new Date(pr.updated_at).toLocaleDateString();

  return (
    <a
      href={pr.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent hover:border-accent"
    >
      <div className="flex items-start gap-4">
        <img
          src={pr.user.avatar_url}
          alt={pr.user.login}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold truncate group-hover:text-primary">
              {pr.title}
            </h3>
            <ExternalLinkIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
          <p className="text-sm text-muted mt-1">
            #{pr.number} by {pr.user.login}
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted">
            <span>Created: {createdDate}</span>
            <span>Updated: {updatedDate}</span>
            <span
              className={`px-2 py-1 rounded ${
                pr.state === "open"
                  ? "bg-green-500/10 text-green-700"
                  : "bg-red-500/10 text-red-700"
              }`}
            >
              {pr.state.toUpperCase()}
            </span>
          </div>
          {pr.body && (
            <p className="mt-3 text-sm text-muted line-clamp-2">
              {pr.body.substring(0, 200)}...
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
