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
      <body className="bg-space-950">
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-md p-8 text-start">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Critical Error
            </h2>
            <p className="text-muted mb-6">
              {error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={reset}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
