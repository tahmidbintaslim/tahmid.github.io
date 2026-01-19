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
    <div className="flex min-h-screen items-center justify-center bg-[#030014]">
      <div className="max-w-md p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Page Error</h2>
        <p className="mb-6 text-gray-400">
          {error.message || 'Something went wrong on this page'}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-lg bg-gray-700 px-6 py-3 text-white transition-colors hover:bg-gray-600"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
