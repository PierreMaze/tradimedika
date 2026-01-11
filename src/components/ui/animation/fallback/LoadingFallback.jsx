/**
 * LoadingFallback Component
 *
 * Displays a loading spinner while lazy-loaded pages are being fetched.
 * Used as Suspense fallback in React Router lazy loading.
 */

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
    </div>
  );
}

export default LoadingFallback;
