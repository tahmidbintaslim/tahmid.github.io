'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#030014]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-md p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Critical Error
            </h2>
            <p className="mb-6 text-gray-400">
              {error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={reset}
              className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
