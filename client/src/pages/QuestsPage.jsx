import { useState } from 'react';
import { QUESTS, BADGES, LEADERBOARD } from '../utils/constants';

export default function QuestsPage() {
  const [activeTab, setActiveTab] = useState('quests'); // 'quests', 'badges', 'leaderboard', 'qr-discounts'
  const [userPoints, setUserPoints] = useState(1450);
  const [questList, setQuestList] = useState(QUESTS);
  const [redeemedCode, setRedeemedCode] = useState(null);

  const handleClaim = (questId, points) => {
    setQuestList((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
    );
    setUserPoints((p) => p + points);
    alert(`🎉 Quest completed! +${points} Explorer Points added to your wallet.`);
  };

  const handleRedeemDiscount = (title, code) => {
    setRedeemedCode({ title, code });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
      {/* HEADER & WALLET STATS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <span className="text-amber-500 font-bold uppercase tracking-wider text-xs">
            Gamified Travel System
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
            Quest Board & Rewards
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-2xl">
            Turn walking, cultural discovery, and eco-friendly choices into points, badges, and discounts at verified local businesses.
          </p>
        </div>

        {/* User Explorer Points Card */}
        <div className="p-4 px-6 rounded-3xl bg-gradient-to-r from-amber-500 to-primary-500 text-white shadow-xl flex items-center gap-4 self-start">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold">
            🏆
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-100 font-bold">Your Explorer Wallet</span>
            <div className="text-3xl font-extrabold">{userPoints.toLocaleString()} Pts</div>
            <span className="text-[11px] text-amber-200">Rank #14 • Tier: Royal Explorer</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
        {[
          { id: 'quests', label: 'Active Quests', icon: '🎯' },
          { id: 'badges', label: 'Badge Collection', icon: '🎖️' },
          { id: 'leaderboard', label: 'Global Leaderboard', icon: '🥇' },
          { id: 'qr-discounts', label: 'Local Business QR Deals', icon: '🏷️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: QUESTS BOARD */}
      {activeTab === 'quests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questList.map((q) => (
            <div
              key={q.id}
              className={`p-6 rounded-3xl border transition-all ${
                q.completed
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                    {q.icon}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-primary-500 tracking-wider">
                      {q.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{q.title}</h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-extrabold text-xs">
                  +{q.points} Pts
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                {q.description}
              </p>

              {/* Progress bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold text-gray-500">
                  <span>Progress: {q.progress || '1/3'}</span>
                  <span>{q.completed ? '100%' : '66%'}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-primary-500 rounded-full transition-all duration-500"
                    style={{ width: q.completed ? '100%' : '66%' }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-[11px] text-gray-400">
                  Badge Reward: <strong className="text-gray-700 dark:text-gray-200">{q.badgeReward || 'Heritage Hero'}</strong>
                </span>
                {q.completed ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    ✓ Quest Completed
                  </span>
                ) : (
                  <button
                    onClick={() => handleClaim(q.id, q.points)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-bold text-xs shadow hover:scale-105 active:scale-95 transition-all"
                  >
                    Check In & Claim
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: BADGES SHOWCASE */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {BADGES.map((b) => (
            <div
              key={b.id}
              className={`p-6 rounded-3xl border text-center flex flex-col items-center justify-between transition-all ${
                b.unlocked
                  ? 'bg-white dark:bg-gray-800 border-amber-300 dark:border-amber-700 shadow-lg'
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-60'
              }`}
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-4xl shadow-inner border border-amber-300/60">
                  {b.icon}
                </div>
                {b.unlocked ? (
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
                    ✓
                  </span>
                ) : (
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center">
                    🔒
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{b.title}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{b.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 w-full text-[10px] font-bold text-amber-600 dark:text-amber-400">
                {b.unlocked ? 'Unlocked & Verified' : 'Needs 3 More Quests'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-500/10 via-primary-500/10 to-teal-500/10 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Top Community Explorers This Month</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Rankings calculated by eco-choices, verified reviews, and completed hidden-gem visits.
            </p>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {LEADERBOARD.map((user, idx) => (
              <div
                key={user.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                      idx === 0
                        ? 'bg-amber-400 text-amber-950'
                        : idx === 1
                        ? 'bg-gray-300 text-gray-900'
                        : idx === 2
                        ? 'bg-amber-700 text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    #{user.rank || idx + 1}
                  </span>

                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-11 h-11 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />

                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                      {user.name}
                      {idx === 0 && <span className="text-xs">👑</span>}
                    </h4>
                    <span className="text-xs text-gray-500">{user.city} • {user.badgesCount || 8} Badges</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                    {user.points.toLocaleString()} Pts
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold">🌱 Eco-Score {user.ecoScore || 96}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LOCAL BUSINESS QR DEALS */}
      {activeTab === 'qr-discounts' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-200 dark:border-amber-800">
            <h3 className="font-bold text-base text-amber-950 dark:text-amber-200">
              Direct Local Business Support System
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
              Unlike big delivery/booking platforms charging 30% aggregator cuts, YatraVibe connects you directly with neighborhood artisans, heritage haveli cafes, and family bakeries with 0% commission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                business: 'Laxmi Mishthan Baithak',
                city: 'Jaipur',
                offer: 'Free Sweet Lassi with Any Authentic Thali',
                task: 'Take photo of royal hand-carved jali inside courtyard',
                code: 'JAIPUR-LASSI-2026',
                discount: 'Free Perk',
              },
              {
                business: 'Banaras Silk Weavers Guild',
                city: 'Varanasi',
                offer: '₹500 Direct Discount on Handloom Saree/Scarf',
                task: 'Watch live pit-loom demonstration & scan artisan QR',
                code: 'KASHI-WEAVE-500',
                discount: '₹500 OFF',
              },
              {
                business: 'Kashi Organic Spice Cafe',
                city: 'Varanasi',
                offer: '20% Off All Chai & Woodfired Flatbreads',
                task: 'Bring your own reusable tumbler/cup',
                code: 'ECO-CHAI-20',
                discount: '20% OFF',
              },
            ].map((deal, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-500">
                      {deal.city}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-xs font-bold">
                      {deal.discount}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-gray-900 dark:text-white">{deal.business}</h4>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
                    {deal.offer}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    🎯 <strong>Challenge:</strong> {deal.task}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => handleRedeemDiscount(deal.business, deal.code)}
                    className="w-full py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs hover:scale-102 transition-all"
                  >
                    Reveal QR Claim Voucher
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Reveal Modal / Banner */}
          {redeemedCode && (
            <div className="p-6 rounded-3xl bg-emerald-500 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-lg">QR Voucher Ready for {redeemedCode.title}!</h4>
                <p className="text-xs opacity-90 mt-0.5">
                  Show this code to the vendor at billing: <strong className="font-mono text-sm tracking-wider bg-white/20 px-2 py-0.5 rounded">{redeemedCode.code}</strong>
                </p>
              </div>
              <button
                onClick={() => setRedeemedCode(null)}
                className="px-4 py-2 rounded-xl bg-white text-emerald-900 font-bold text-xs"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
