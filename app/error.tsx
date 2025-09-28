'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="glass-card p-8 rounded-lg">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-fg mb-4">
            Something went wrong!
          </h2>
          <p className="text-text-secondary mb-6">
            We encountered an error while loading ErrandMate. Please try again.
          </p>
          <button
            onClick={reset}
            className="btn-primary"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
