'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-space-950 flex min-h-screen items-center justify-center">
      <div className="max-w-md p-8 text-start">
        <h2 className="mb-4 text-2xl font-bold text-white">Page Error</h2>
        <p className="text-muted mb-6">
          {error.message || 'Something went wrong on this page'}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="btn-primary"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="btn-outline hover:bg-purple-500/10"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
