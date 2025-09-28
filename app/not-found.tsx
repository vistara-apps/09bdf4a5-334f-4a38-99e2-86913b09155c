import Link from 'next/link';
import { Button } from './components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="glass-card p-8 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-fg mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button variant="primary">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
