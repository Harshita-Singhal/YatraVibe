export default function Rating({ value = 0, max = 5, size = 'md', showValue = true, reviews, className = '' }) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(value);
          const half = !filled && i < value;
          return (
            <svg
              key={i}
              className={`${sizeClasses[size]} ${
                filled ? 'text-accent-500' : half ? 'text-accent-400' : 'text-gray-300 dark:text-gray-600'
              } transition-colors`}
              fill={filled || half ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={filled || half ? 0 : 1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          );
        })}
      </div>
      {showValue && (
        <span className={`font-semibold text-gray-700 dark:text-gray-300 ${textSizes[size]}`}>
          {value.toFixed(1)}
        </span>
      )}
      {reviews !== undefined && (
        <span className={`text-gray-400 dark:text-gray-500 ${textSizes[size]}`}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
