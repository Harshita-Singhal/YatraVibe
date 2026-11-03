import { classNames } from '../../utils/helpers';

export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  padding = 'p-6',
  onClick,
}) {
  return (
    <div
      className={classNames(
        glass ? 'glass-card' : 'bg-white dark:bg-navy-800 rounded-2xl shadow-card',
        hover && 'card-hover cursor-pointer',
        padding,
        'overflow-hidden',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt, overlay = true, badge, className = '' }) {
  return (
    <div className={classNames('relative overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      )}
      {badge && (
        <span className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {badge}
        </span>
      )}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={classNames('', className)}>{children}</div>;
}
