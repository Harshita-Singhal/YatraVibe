import { Link } from 'react-router-dom';

const footerLinks = {
  explore: [
    { label: 'Destinations', path: '/explore' },
    { label: 'Hidden Gems', path: '/hidden-gems' },
    { label: 'Cultural Stories', path: '/stories' },
    { label: 'Quests & Badges', path: '/quests' },
  ],
  travel: [
    { label: 'Itinerary Builder', path: '/itinerary' },
    { label: 'Book Hotels', path: '/booking' },
    { label: 'Local Guides', path: '/chat' },
    { label: 'SOS Emergency', path: '/sos' },
  ],
  company: [
    { label: 'About Us', path: '/' },
    { label: 'Blog', path: '/' },
    { label: 'Careers', path: '/' },
    { label: 'Contact', path: '/' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
    { label: 'Cookie Policy', path: '/' },
    { label: 'Refund Policy', path: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary-500 dark:bg-navy-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">Stay in the Vibe ✨</h3>
              <p className="text-white/70">Get travel tips, hidden gems, and exclusive deals straight to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 font-semibold rounded-r-xl transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <span className="text-xl font-display font-bold">YatraVibe</span>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Discover India like never before. Your AI-powered travel companion for authentic, unforgettable experiences.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'Instagram', 'YouTube', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={social}
                >
                  <span className="text-sm">
                    {social === 'Twitter' && '𝕏'}
                    {social === 'Instagram' && '📷'}
                    {social === 'YouTube' && '▶'}
                    {social === 'Facebook' && 'f'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-white mb-4 capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-primary-400 text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-sm">
            <p>© 2024 YatraVibe. Made with ❤️ in India</p>
            <p>Crafted for travelers, by travelers 🌍</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
