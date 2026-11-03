import { useState } from 'react';
import { HOTELS } from '../utils/constants';

export default function BookingPage() {
  const [selectedItem, setSelectedItem] = useState(HOTELS[0]);
  const [bookingType, setBookingType] = useState('all'); // all, homestay, tour, ticket
  const [checkIn, setCheckIn] = useState('2026-11-15');
  const [guests, setGuests] = useState(2);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookNow = (item) => {
    setSelectedItem(item);
    setIsCheckoutOpen(true);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(false);
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <span className="text-primary-600 font-bold uppercase tracking-wider text-xs">
            Direct & Fair Bookings
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
            Stay & Guided Tours
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-2xl">
            Book authentic resident-run homestays, intimate heritage walks, and zero-plastic boat excursions with transparent pricing.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl self-start">
          {['all', 'homestay', 'tour', 'heritage'].map((t) => (
            <button
              key={t}
              onClick={() => setBookingType(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                bookingType === t
                  ? 'bg-white dark:bg-gray-900 text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t === 'all' ? 'All Stays & Tours' : t}
            </button>
          ))}
        </div>
      </div>

      {/* CONFIRMED TICKET BANNER */}
      {bookingConfirmed && (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              Booking Confirmed ✓ E-Voucher #YV-98421
            </span>
            <h3 className="text-2xl font-bold">You are going to {selectedItem?.name}!</h3>
            <p className="text-xs text-white/90">
              Dates: {checkIn} • {guests} Guests • Host Contact Shared with Nearby Local Guardian.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white p-2 rounded-2xl flex items-center justify-center text-center text-gray-900 font-mono text-[9px] font-bold">
              [QR VOUCHER SCAN ON ARRIVAL]
            </div>
            <button
              onClick={() => setBookingConfirmed(false)}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* LISTINGS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {HOTELS.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold">
                🌱 Eco-Certified Homestay
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
                ★ {item.rating}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-amber-300 font-semibold">{item.city}</span>
                <h3 className="text-xl font-bold">{item.name}</h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {item.description || 'Authentic courtyard stay with organic home-cooked meals and local lore storytelling.'}
              </p>

              {item.amenities && (
                <div className="flex flex-wrap gap-1.5">
                  {item.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 text-[11px] font-medium"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400">Starting from</span>
                  <div className="text-xl font-extrabold text-primary-500">{item.price} <span className="text-xs font-normal text-gray-400">/ night</span></div>
                </div>

                <button
                  onClick={() => handleBookNow(item)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-bold text-xs shadow hover:scale-105 active:scale-95 transition-all"
                >
                  Book Instant
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-6 relative">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-bold text-primary-500 uppercase">Instant Confirmation</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                Book {selectedItem.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{selectedItem.city} • Safe & Verified</p>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white text-xs"
                  />
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Base Stay (1 Night)</span>
                  <span className="font-bold">{selectedItem.price}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Local Community Fund Contribution (1%)</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 font-bold text-sm">
                  <span>Total Payable (UPI / Card)</span>
                  <span className="text-primary-500">{selectedItem.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <span>🔒 256-bit Encrypted SSL • Free cancellation up to 24 hrs</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-primary-500/40 transition-all"
              >
                Pay & Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
