export default function Loader({ size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-primary-500 animate-spin`}
        />
        <div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-4 border-transparent border-b-accent-500 animate-spin`}
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>
      {text && <p className="text-gray-500 dark:text-gray-400 animate-pulse">{text}</p>}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-light dark:bg-surface-dark">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-primary-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-accent-500 animate-spin" style={{ animationDirection: 'reverse' }} />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-secondary-500 animate-spin" style={{ animationDuration: '2s' }} />
        </div>
        <h3 className="text-xl font-display font-bold gradient-text">YatraVibe</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Loading your adventure...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-card animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      </div>
    </div>
  );
}
