import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOCAL_GUIDES, TESTIMONIALS } from '../utils/constants';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Jaipur');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION (MakeMyTrip + Luxury Travel Visual Splendor) */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 px-4">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80"
            alt="Majestic India Heritage"
            className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/40 via-transparent to-slate-950/70" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-orange-400 text-xs font-bold tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>3,140+ Verified Local Guides Online Across India</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight font-serif">
            Don't Just Visit India. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">
              Live It Like a Local.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-200 text-base sm:text-lg font-light leading-relaxed">
            Real-time local resident advice, uncrowded stepwells, direct haveli bookings, and gamified eco-quests. Say goodbye to commercial tourist traps.
          </p>

          {/* SEARCH WIDGET (MakeMyTrip Style) */}
          <div className="max-w-4xl mx-auto rounded-3xl p-4 sm:p-5 bg-slate-950/85 backdrop-blur-2xl border border-slate-700/80 shadow-2xl space-y-3">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Where to? (e.g. Jaipur secret forts, Varanasi quiet ghats, Hampi ruins)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-400 font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
              >
                <span>SEARCH EXPERIENCES</span>
                <span>→</span>
              </button>
            </form>

            <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-400 overflow-x-auto scrollbar-none">
              <span className="font-bold text-slate-500">Trending:</span>
              {['Varanasi Sunrise Rowing', 'Jaipur Stepwell Baithak', 'Hampi Musical Pillars', 'Kerala Solar Canoe'].map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(`/explore?search=${encodeURIComponent(item)}`)}
                  className="hover:text-orange-400 transition-colors whitespace-nowrap"
                >
                  {item} •
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THREE LAYERS THAT REVOLUTIONIZE TRAVEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">
            The YatraVibe Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Why Generic Booking Portals Fail You
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm">
            Commercial aggregators give you a hotel key. YatraVibe gives you the keys to the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center text-2xl font-bold">
                💬
              </div>
              <h3 className="text-xl font-bold text-white">"Ask a Local" Real-Time Chat</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Connect directly with verified residents on the ground in under 90 seconds. Find out which street stall is hygienic today and which alley has zero tourists.
              </p>
            </div>
            <Link to="/chat" className="text-orange-400 font-bold hover:underline inline-flex items-center gap-1 text-xs mt-6">
              Meet Verified Guides →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold">
                💎
              </div>
              <h3 className="text-xl font-bold text-white">Community Hidden Gems</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Stepwells, secret rooftop baithaks, and artisan studios voted by residents and vetted by curators. Never spoiled by commercial tour buses.
              </p>
            </div>
            <Link to="/hidden-gems" className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1 text-xs mt-6">
              Explore Secret Maps →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                🌱
              </div>
              <h3 className="text-xl font-bold text-white">Gamified Eco-Quests & Perks</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Earn explorer karma and redeem instant discount vouchers at family havelis, thali dhabas, and handloom guilds by traveling plastic-free.
              </p>
            </div>
            <Link to="/quests" className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1 text-xs mt-6">
              View Quest Board →
            </Link>
          </div>
        </div>
      </section>

      {/* VERIFIED LOCAL GUIDES MARQUEE */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-orange-400 tracking-wider">Direct Resident Hotline</span>
              <h2 className="text-3xl font-extrabold text-white mt-1 font-serif">Verified Locals Online Right Now</h2>
              <p className="text-slate-400 text-xs mt-1">Honest advice with ₹20–₹40 micro-tipping direct to the guide.</p>
            </div>
            <Link to="/chat" className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 self-start">
              Open Live Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCAL_GUIDES.map((g) => (
              <div key={g.id} className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-orange-500/40 transition-all space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img src={g.avatar} alt={g.name} className="w-12 h-12 rounded-full object-cover border border-orange-500" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{g.name}</h4>
                      <span className="text-xs text-slate-400">{g.city} • ★ {g.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{g.bio}"</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold">{g.rate}</span>
                  <Link to={`/chat?guideId=${g.id}`} className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-[11px]">
                    Chat Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold text-orange-400 tracking-wider">Real Explorer Experiences</span>
          <h2 className="text-3xl font-extrabold text-white font-serif">Loved by 85,000+ Mindful Travelers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-400 text-sm">★★★★★</div>
                <p className="text-xs text-slate-300 leading-relaxed italic">"{t.comment}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-white text-xs">{t.name}</h4>
                  <span className="text-[10px] text-slate-500">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
