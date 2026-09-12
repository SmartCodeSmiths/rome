'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PR } from '@/lib/prs';
import { PRCard } from './pr-card';
import { EmptyState } from './empty-state';

interface InfinitePRListProps {
  prs: PR[];
  title: string;
  description: string;
}

const ITEMS_PER_PAGE = 20;

export function InfinitePRList({ prs }: InfinitePRListProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const displayedPRs = prs.slice(0, visibleCount);
  const hasMore = visibleCount < prs.length;

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((count) => count + ITEMS_PER_PAGE);
      setIsLoading(false);
    }, 300);
  }, [isLoading]);

  useEffect(() => {
    if (!observerTarget.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, loadMore]);

  if (prs.length === 0) {
    return (
      <EmptyState
        title="No pull requests found"
        description="We couldn't find any pull requests. This might happen if the data directory doesn't contain any JSON files yet. Add PR data to the data/ directory and rebuild, or contact support if the problem persists."
        icon="📭"
        action={{
          label: "Go to Dashboard",
          href: "/",
        }}
      />
    );
  }

  return (
    <>
      <div className="mt-10 grid gap-4">
        <p className="text-sm text-muted">
          Showing {displayedPRs.length} of {prs.length} pull requests
        </p>
        <div className="grid gap-4">
          {displayedPRs.map((pr) => (
            <PRCard key={pr.id} pr={pr} />
          ))}
        </div>
      </div>

      {hasMore && (
        <div
          ref={observerTarget}
          className="mt-8 flex justify-center py-8"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              Loading more PRs...
            </div>
          ) : (
            <div className="text-sm text-muted">Scroll to load more</div>
          )}
        </div>
      )}
    </>
  );
}