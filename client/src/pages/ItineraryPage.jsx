import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ItineraryPage() {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || 'Jaipur';

  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [daysCount, setDaysCount] = useState(1);
  const [pace, setPace] = useState('balanced');
  const [interests, setInterests] = useState(['Heritage', 'Culinary Baithak', 'Eco Walking']);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic itinerary schedule state
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      time: '08:00 AM - 10:30 AM',
      title: 'Sunrise Walk at Nahargarh Fort & Stepwell',
      type: 'Heritage & Morning Breeze',
      crowd: 'Low (12% capacity)',
      ecoScore: '+30 Karma Pts',
      tip: 'Start early to beat tour buses. Local chai vendor at foot of stairs makes fresh cardamom chai.',
      completed: false,
    },
    {
      id: 2,
      time: '11:00 AM - 01:00 PM',
      title: 'Hidden Haveli Blue Pottery Studio & Artisan Workshop',
      type: 'Artisan & Cultural Craft',
      crowd: 'Moderate (35% capacity)',
      ecoScore: '+45 Karma Pts',
      tip: 'Try hand at wheel throwing. Direct payment to family without middleman commissions.',
      completed: false,
    },
    {
      id: 3,
      time: '01:30 PM - 03:00 PM',
      title: 'Authentic Daal Baati Churma Lunch at 80-Yr Old Baithak',
      type: 'Culinary Heritage',
      crowd: 'High (Bustling aroma)',
      ecoScore: '+20 Karma Pts',
      tip: 'Served in organic sal leaf plates with homemade buttermilk.',
      completed: false,
    },
    {
      id: 4,
      time: '04:30 PM - 07:00 PM',
      title: 'Jal Mahal Promenade & Sunset Folk Performance',
      type: 'Sunset Vibe & Music',
      crowd: 'Vibrant sunset crowd',
      ecoScore: '+25 Karma Pts',
      tip: 'Local sarangi and ravanahatha players sit under the banyan tree.',
      completed: false,
    },
  ]);

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  const toggleComplete = (id) => {
    setSchedule((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <span className="text-primary-600 font-bold uppercase tracking-wider text-xs">
            Dynamic Day Planner
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
            Smart Itinerary Builder
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-2xl">
            Optimized for live weather, crowds, and zero plastic footprints. Edit, drag, and tick off tasks on the go.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-primary-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 self-start"
        >
          <span>{isGenerating ? 'Recalculating Crowds...' : '⚡ Re-Generate AI Plan'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: CONTROLS & LIVE WEATHER */}
        <div className="space-y-6">
          {/* Destination & Preferences Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md space-y-5">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Trip Controls</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-bold text-gray-800 dark:text-white"
              >
                <option value="Jaipur">Jaipur (Pink City)</option>
                <option value="Varanasi">Varanasi (Kashi)</option>
                <option value="Hampi">Hampi (Ruins of Vijayanagara)</option>
                <option value="Udaipur">Udaipur (City of Lakes)</option>
                <option value="Goa">Goa (Old Portuguese Trail)</option>
                <option value="Rishikesh">Rishikesh (Ganga Valley)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Duration ({daysCount} {daysCount === 1 ? 'Day' : 'Days'})
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setDaysCount(num)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      daysCount === num
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {num} {num === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Travel Pace
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['relaxed', 'balanced', 'packed'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPace(p)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      pace === p
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Interests & Focus
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Heritage',
                  'Culinary Baithak',
                  'Eco Walking',
                  'Folk Music',
                  'Stepwells',
                  'Spiritual Ghats',
                ].map((item) => {
                  const active = interests.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        active
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Weather & Crowd Insights Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-900 to-navy-950 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-teal-300 font-bold">
                Live Sensor Telemetry
              </span>
              <span className="text-xs bg-teal-500/30 px-2.5 py-0.5 rounded-full border border-teal-400/40">
                Live OpenWeather
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-4xl font-extrabold">26°C</span>
                <p className="text-xs text-teal-200">Sunny • Pleasant breeze in {selectedCity}</p>
              </div>
              <span className="text-4xl">☀️</span>
            </div>

            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400">UV Index: </span>
                <span className="font-bold text-amber-300">Moderate (4.2)</span>
              </div>
              <div>
                <span className="text-gray-400">Golden Hour: </span>
                <span className="font-bold text-teal-300">05:40 PM</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-xs text-teal-100">
              💡 <span className="font-bold">Local Pro Tip:</span> Forts are shaded in early morning. Schedule heritage walks before 11:00 AM to avoid the afternoon direct sun.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TIMELINE SCHEDULE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Day 1: Royal Heritage & Secret Alleys
            </h3>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              🌱 +120 Eco Points Total
            </span>
          </div>

          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border transition-all ${
                  item.completed
                    ? 'bg-gray-50/80 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 opacity-60'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        item.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white text-xs font-bold'
                          : 'border-gray-400 hover:border-primary-500'
                      }`}
                    >
                      {item.completed && '✓'}
                    </button>
                    <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">
                      {item.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold">
                      {item.ecoScore}
                    </span>
                    <span className="text-gray-400">● {item.crowd}</span>
                  </div>
                </div>

                <h4
                  className={`text-lg font-bold ${
                    item.completed
                      ? 'line-through text-gray-500'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {item.title}
                </h4>

                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
                  {item.type}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-gray-800 dark:text-white">Resident Advice: </span>
                  {item.tip}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">Want to customize this day?</h4>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                Add custom coffee breaks, ask verified local guides to vet it, or export as PDF.
              </p>
            </div>
            <button
              onClick={() => alert('Itinerary saved to your YatraVibe offline wallet!')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
            >
              Save Offline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
