import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { BADGES } from '../utils/constants';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('badges'); // badges, trips, saved, safety

  const profile = {
    name: user?.name || 'Aarav Sharma',
    email: user?.email || 'aarav.travels@yatravibe.com',
    role: user?.role || 'Explorer & Culture Enthusiast',
    points: 1450,
    ecoScore: 94,
    placesVisited: 18,
    storiesListened: 32,
    carbonOffsetKg: 84,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
      {/* PROFILE HEADER CARD */}
      <div className="rounded-3xl p-8 bg-gradient-to-r from-navy-950 via-primary-950 to-navy-950 text-white shadow-2xl border border-white/10 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-amber-400 shadow-xl"
          />
          <span className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-500 border-4 border-navy-950 flex items-center justify-center text-xs font-bold">
            ✓
          </span>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h1 className="text-3xl font-display font-extrabold">{profile.name}</h1>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold self-center sm:self-auto">
              Tier 3: Royal Guardian
            </span>
          </div>

          <p className="text-sm text-gray-300">{profile.email} • {profile.role}</p>

          {/* Quick Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400">Explorer Points</span>
              <div className="text-xl font-bold text-amber-300">{profile.points} Pts</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400">Eco Karma Score</span>
              <div className="text-xl font-bold text-emerald-400">{profile.ecoScore} / 100</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400">Places Discovered</span>
              <div className="text-xl font-bold text-white">{profile.placesVisited}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400">Carbon Saved</span>
              <div className="text-xl font-bold text-teal-300">{profile.carbonOffsetKg} kg CO₂</div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
        {[
          { id: 'badges', label: 'Earned Badges', icon: '🎖️' },
          { id: 'trips', label: 'My Bookings', icon: '🎫' },
          { id: 'saved', label: 'Saved Hidden Gems', icon: '📌' },
          { id: 'safety', label: 'SOS Contacts', icon: '🛡️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT: BADGES */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Verified Explorer Medallions (4 Unlocked)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {BADGES.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-center flex flex-col items-center justify-between"
              >
                <div className="text-5xl mb-3">{b.icon}</div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{b.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{b.description}</p>
                <span className="mt-4 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                  Verified On-Chain
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: TRIPS */}
      {activeTab === 'trips' && (
        <div className="space-y-4">
          {[
            {
              title: 'Heritage Haveli Baori Walk',
              city: 'Jaipur, Rajasthan',
              date: 'Confirmed for Nov 18, 2026',
              status: 'Upcoming',
              price: '₹1,200',
            },
            {
              title: 'Subah-e-Banaras Dawn Boat Trail',
              city: 'Varanasi, UP',
              date: 'Completed Oct 12, 2026',
              status: 'Completed',
              price: '₹850',
            },
          ].map((trip, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${trip.status === 'Upcoming' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {trip.status}
                </span>
                <h4 className="font-bold text-base text-gray-900 dark:text-white mt-1">{trip.title}</h4>
                <p className="text-xs text-gray-500">{trip.city} • {trip.date}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900 dark:text-white">{trip.price}</span>
                <button
                  onClick={() => alert('Opening your digital ticket voucher QR')}
                  className="px-4 py-2 rounded-xl bg-primary-500 text-white font-bold text-xs"
                >
                  View Voucher
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: SOS CONTACTS */}
      {activeTab === 'safety' && (
        <div className="max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-md space-y-6">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Emergency Safety Lifeline</h3>
            <p className="text-xs text-gray-500 mt-1">
              These contacts are instantly notified via SMS & WhatsApp when you trigger the 1-Tap SOS button.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { relation: 'Mother / Primary Contact', name: 'Sunita Sharma', phone: '+91 98765 43210' },
              { relation: 'Travel Buddy', name: 'Vikram Mehta', phone: '+91 98111 22334' },
            ].map((contact, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">{contact.name}</span>
                  <div className="text-gray-400">{contact.relation} • {contact.phone}</div>
                </div>
                <button className="text-primary-500 font-bold hover:underline">Edit</button>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert('Contact addition modal opened')}
            className="w-full py-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 font-bold text-xs text-gray-600 dark:text-gray-300 hover:border-primary-500 transition-colors"
          >
            + Add Another Emergency Contact
          </button>
        </div>
      )}
    </div>
  );
}
