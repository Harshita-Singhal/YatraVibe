import { NavLink } from 'react-router-dom';

const sidebarLinks = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/explore', label: 'Explore', icon: '🗺️' },
  { path: '/hidden-gems', label: 'Hidden Gems', icon: '💎' },
  { path: '/itinerary', label: 'Itinerary', icon: '📅' },
  { path: '/quests', label: 'Quests', icon: '🎯' },
  { path: '/stories', label: 'Stories', icon: '📖' },
  { path: '/booking', label: 'Booking', icon: '🏨' },
  { path: '/chat', label: 'Chat', icon: '💬' },
  { path: '/profile', label: 'Profile', icon: '👤' },
  { path: '/sos', label: 'SOS', icon: '🚨' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-navy-900 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xl font-display font-bold">
            <span className="text-primary-500">Yatra</span>
            <span className="text-secondary-500 dark:text-white">Vibe</span>
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
