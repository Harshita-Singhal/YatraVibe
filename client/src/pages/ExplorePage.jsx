import { useState, useMemo } from 'react';
import { DESTINATIONS, HOTELS, LOCAL_GUIDES } from '../utils/constants';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'homestays', 'tours', 'monuments'
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [bookingModalItem, setBookingModalItem] = useState(null);
  const [confirmedVoucher, setConfirmedVoucher] = useState(null);
  const [qrModalItem, setQrModalItem] = useState(null);

  // Commercial listings combining homestays, trails & experiences
  const listings = [
    {
      id: 'exp-1',
      title: 'Rawla Haveli: 18th Century Royal Courtyard Stay',
      city: 'Jaipur',
      type: 'homestays',
      rating: 4.9,
      reviewsCount: 384,
      price: 2800,
      ecoKarma: 95,
      crowd: 'Low (15% capacity)',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
      host: 'Thakur Mahendra Singh (Haveli Custodian)',
      highlights: ['Organic Courtyard Dinners', 'Shaded Stepwell Walk', '100% Solar Powered'],
      description: 'Sleep under hand-carved stone arches in a living royal haveli. Zero middleman aggregator commissions.'
    },
    {
      id: 'exp-2',
      title: 'Subah-e-Banaras: Dawn Rowing & Ghat Oral Lore',
      city: 'Varanasi',
      type: 'tours',
      rating: 4.95,
      reviewsCount: 620,
      price: 950,
      ecoKarma: 98,
      crowd: 'Low (Morning Mist)',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
      host: 'Ramesh Sharma (Varanasi Scholar)',
      highlights: ['Zero-Motor Wooden Boat', 'Acoustic Sitar on Water', 'Uncrowded North Ghats'],
      description: 'Row past ancient cremation and bathing ghats at sunrise as bells ring and sadhus chant.'
    },
    {
      id: 'exp-3',
      title: 'Boulder Kingdom Trail & Lost Vijayanagara Temples',
      city: 'Hampi',
      type: 'tours',
      rating: 4.88,
      reviewsCount: 290,
      price: 1200,
      ecoKarma: 92,
      crowd: 'Low (Peaceful)',
      image: 'https://images.unsplash.com/photo-1600100397608-f010f444f479?w=800',
      host: 'Sunita Rao (Archaeologist)',
      highlights: ['Musical Granite Pillars', 'Sacred Coracle Crossing', 'Sanapur Lake Secret'],
      description: 'Trek through balance-rock geological wonders and discover unmapped 14th-century stepwells.'
    },
    {
      id: 'exp-4',
      title: 'Lakefront Heritage Haveli & Miniature Art Studio',
      city: 'Udaipur',
      type: 'homestays',
      rating: 4.85,
      reviewsCount: 410,
      price: 3400,
      ecoKarma: 90,
      crowd: 'Moderate',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
      host: 'Devendra Verma (4th-Gen Miniature Painter)',
      highlights: ['Rooftop Sunset View', 'Stone Carving Masterclass', 'Home-Cooked Mewari Thali'],
      description: 'Wake up to the shimmer of Lake Pichola. Learn single-squirrel-hair miniature painting directly from master artists.'
    },
    {
      id: 'exp-5',
      title: 'Vembanad Solar Canoe & Spice Trail Homestay',
      city: 'Kerala',
      type: 'homestays',
      rating: 4.92,
      reviewsCount: 512,
      price: 2600,
      ecoKarma: 100,
      crowd: 'Low (Serene)',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
      host: 'George Mathew (Naturalist)',
      highlights: ['Zero-Emission Solar Canoe', 'Organic Spice Garden', 'Village Potter Baithak'],
      description: 'Paddle through narrow canal corridors untouched by commercial diesel houseboats.'
    },
    {
      id: 'exp-6',
      title: 'Amer Fort & Underground Jaigarh Water Tunnel Pass',
      city: 'Jaipur',
      type: 'monuments',
      rating: 4.8,
      reviewsCount: 890,
      price: 450,
      ecoKarma: 85,
      crowd: 'Moderate',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
      host: 'Archaeological Survey Verified',
      highlights: ['Instant QR Fast-Track Entry', 'Underground Defense Tunnel', 'Historical Audio Lore'],
      description: 'Skip the 45-minute ticket queue and explore the hidden subterranean rainwater channels.'
    }
  ];

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchCity = selectedCity === 'all' || item.city.toLowerCase() === selectedCity.toLowerCase();
      const matchTab = activeTab === 'all' || item.type === activeTab;
      return matchCity && matchTab;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'eco') return b.ecoKarma - a.ecoKarma;
      return b.rating - a.rating;
    });
  }, [activeTab, selectedCity, sortBy]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const item = bookingModalItem;
    setBookingModalItem(null);
    setConfirmedVoucher({
      title: item.title,
      city: item.city,
      voucherCode: 'YV-2026-' + Math.floor(10000 + Math.random() * 90000),
      price: item.price * 2 + 56
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-12">
      
      {/* COMMERCIAL SEARCH ENGINE HERO (MakeMyTrip Style) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-3 mb-8">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-extrabold uppercase tracking-wider">
            Curated Direct Bookings • Zero Aggregator Traps
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
            Authentic Stays & <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">
              Native-Guided Expeditions
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Direct host bookings without 30% middleman fees. Verified local guides, live crowd meters, and genuine cultural lore.
          </p>
        </div>

        {/* SEARCH WIDGET */}
        <div className="rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-700/80 p-5 space-y-4 shadow-2xl">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-bold overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'all' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              All Experiences
            </button>
            <button
              onClick={() => setActiveTab('homestays')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'homestays' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              🏡 Authentic Homestays & Havelis
            </button>
            <button
              onClick={() => setActiveTab('tours')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'tours' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              🚶 Native-Guided Walking Trails
            </button>
            <button
              onClick={() => setActiveTab('monuments')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'monuments' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              🎟️ Heritage Fast-Track Passes
            </button>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <label className="block text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">CITY / REGION</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-white font-bold text-sm outline-none mt-1 cursor-pointer"
              >
                <option value="all" className="bg-slate-900">All India Destinations</option>
                <option value="Jaipur" className="bg-slate-900">Jaipur, Rajasthan</option>
                <option value="Varanasi" className="bg-slate-900">Varanasi (Kashi), UP</option>
                <option value="Hampi" className="bg-slate-900">Hampi, Karnataka</option>
                <option value="Udaipur" className="bg-slate-900">Udaipur, Rajasthan</option>
                <option value="Kerala" className="bg-slate-900">Alleppey Backwaters, Kerala</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <label className="block text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">DATES</label>
              <input type="text" defaultValue="Nov 15 - Nov 18, 2026" className="w-full bg-transparent text-white font-bold text-sm outline-none mt-1" />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <label className="block text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">TRAVELERS & ROOMS</label>
              <select defaultValue="2" className="w-full bg-transparent text-white font-bold text-sm outline-none mt-1 cursor-pointer">
                <option value="1" className="bg-slate-900">1 Solo Explorer</option>
                <option value="2" className="bg-slate-900">2 Adults (1 Room)</option>
                <option value="4" className="bg-slate-900">4 Friends (Squad Trip)</option>
              </select>
            </div>

            <button
              onClick={() => {}}
              className="w-full rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-600/30 transition-all hover:scale-102 active:scale-98"
            >
              <span>SEARCH EXPERIENCES</span>
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BAR & LISTINGS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Curated Stays & Native Expeditions</h2>
            <p className="text-xs text-slate-400 mt-1">Directly managed by resident families, heritage guardians, and local scholars.</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold"
            >
              <option value="rating">Top Rated & Verified</option>
              <option value="price_low">Price: Low to High</option>
              <option value="eco">Highest Eco Karma</option>
            </select>
          </div>
        </div>

        {/* LISTINGS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-xl hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              {/* Image Box */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-extrabold flex items-center gap-1">
                  ★ {item.rating} <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/90 text-white">
                  ● {item.crowd}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">{item.city}</span>
                  <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-xs">
                <div className="space-y-2">
                  <span className="text-slate-400 block"><strong className="text-slate-200">Host:</strong> {item.host}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((h, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Transparent Rate</span>
                    <div className="text-lg font-black text-white">₹{item.price.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">/ night</span></div>
                  </div>

                  <button
                    onClick={() => setBookingModalItem(item)}
                    className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
                  >
                    Book Instant
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LOCAL BUSINESS CHALLENGES & QR DISCOUNTS */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/30 space-y-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Community Economy
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">
            Local Business Challenges & Instant QR Perks
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Support generational halwais, handloom guilds, and family cafes with 0% aggregator commission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              shop: 'Shri Laxmi Mishthan Bhandar (1894)',
              city: 'Jaipur Old City',
              desc: 'Free Saffron Lassi with any authentic Dal Baati Thali.',
              code: 'FREE-LASSI-1894',
              badge: 'Free Perk'
            },
            {
              shop: 'Kashi Handloom Silk Weavers Guild',
              city: 'Varanasi Ghats',
              desc: '₹500 direct deduction on any GI-Tagged Pure Silk Dupatta or Saree.',
              code: 'WEAVE-KASHI-500',
              badge: '₹500 OFF'
            },
            {
              shop: 'Riverside Organic Mango Tree Baithak',
              city: 'Hampi Ruins',
              desc: '20% off all organic herbal teas, woodfired flatbreads & fresh juices.',
              code: 'ECO-HAMPI-20',
              badge: '20% OFF'
            }
          ].map((deal, i) => (
            <div key={i} className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-orange-400">{deal.city}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">{deal.badge}</span>
                </div>
                <h4 className="font-bold text-white text-base">{deal.shop}</h4>
                <p className="text-xs text-slate-300 mt-1 font-medium">{deal.desc}</p>
              </div>

              <button
                onClick={() => setQrModalItem(deal)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all"
              >
                Claim QR Voucher
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {bookingModalItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-xs space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setBookingModalItem(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase text-orange-400">Direct Host Booking • Zero Commissions</span>
              <h3 className="text-2xl font-bold text-white mt-1">{bookingModalItem.title}</h3>
              <p className="text-slate-400 mt-0.5">{bookingModalItem.city} • {bookingModalItem.host}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Check-in Date</label>
                  <input type="date" defaultValue="2026-11-15" className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Check-out Date</label>
                  <input type="date" defaultValue="2026-11-17" className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Guest Contact</label>
                <input type="text" defaultValue="Aarav Sharma (+91 98765 43210)" required className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Base Host Rate (2 Nights)</span>
                  <span className="font-bold text-white">₹{(bookingModalItem.price * 2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>YatraVibe Host Commission</span>
                  <span className="font-bold">₹0 (100% to Host)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Local Heritage Conservation Cess (1%)</span>
                  <span>₹56</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-sm text-white">
                  <span>Total Payable</span>
                  <span className="text-orange-500">₹{((bookingModalItem.price * 2) + 56).toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black text-sm shadow-xl"
              >
                Confirm & Generate E-Ticket Voucher ⚡
              </button>
            </form>
          </div>
        </div>
      )}

      {/* E-TICKET CONFIRMATION MODAL */}
      {confirmedVoucher && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-xs space-y-5 text-center relative shadow-2xl">
            <button
              onClick={() => setConfirmedVoucher(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
              ✓
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Booking Confirmed & Verified</span>
              <h3 className="text-2xl font-bold text-white mt-1">{confirmedVoucher.title}</h3>
              <p className="text-slate-400 mt-0.5">{confirmedVoucher.voucherCode}</p>
            </div>

            <div className="p-6 bg-white rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center shadow-lg">
              <svg className="w-36 h-36 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 0h35v35H0V0zm5 5v25h25V5H5zm4 4h17v17H9V9zm56-9h35v35H65V0zm5 5v25h25V5H70zm4 4h17v17H74V9zM0 65h35v35H0V65zm5 5v25h25V70H5zm4 4h17v17H9V74zm46-9h10v10H55V65zm15 0h10v10H70V65zm15 0h15v10H85V65zm-30 15h15v10H55V80zm20 0h10v10H75V80zm-20 15h10v10H55V95zm15 0h10v10H70V95zm15 0h15v10H85V95zM40 10h10v10H40V10zm10 15h10v10H50V25zm-10 15h10v10H40V40zm20 0h10v10H60V40z" />
              </svg>
              <span className="text-[9px] font-mono text-slate-600 mt-1 font-bold">SCAN AT CHECK-IN</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
              Host notified. Emergency guardian coverage activated in your destination area.
            </div>

            <button
              onClick={() => setConfirmedVoucher(null)}
              className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-white text-xs"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}

      {/* SHOP QR MODAL */}
      {qrModalItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 max-w-sm w-full text-xs text-center space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-white">{qrModalItem.shop}</h3>
              <button onClick={() => setQrModalItem(null)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            <div className="p-5 bg-white rounded-2xl w-44 h-44 mx-auto flex items-center justify-center shadow-md">
              <svg className="w-32 h-32 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 0h35v35H0V0zm5 5v25h25V5H5zm4 4h17v17H9V9zm56-9h35v35H65V0zm5 5v25h25V5H70zm4 4h17v17H74V9zM0 65h35v35H0V65zm5 5v25h25V70H5zm4 4h17v17H9V74zm46-9h10v10H55V65zm15 0h10v10H70V65zm15 0h15v10H85V65zm-30 15h15v10H55V80zm20 0h10v10H75V80zm-20 15h10v10H55V95zm15 0h10v10H70V95zm15 0h15v10H85V95zM40 10h10v10H40V10zm10 15h10v10H50V25zm-10 15h10v10H40V40zm20 0h10v10H60V40z" />
              </svg>
            </div>

            <div>
              <span className="text-slate-400">Offer Code:</span>
              <div className="font-mono font-extrabold text-amber-400 text-sm mt-0.5">{qrModalItem.code}</div>
              <p className="text-[11px] text-slate-300 mt-1">{qrModalItem.desc}</p>
            </div>

            <button
              onClick={() => setQrModalItem(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
