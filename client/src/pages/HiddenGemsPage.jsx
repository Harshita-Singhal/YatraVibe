import { useState } from 'react';
import { HIDDEN_GEMS } from '../utils/constants';

export default function HiddenGemsPage() {
  const [gems, setGems] = useState(HIDDEN_GEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newGem, setNewGem] = useState({
    title: '',
    location: '',
    description: '',
    whySpecial: '',
    category: 'nature',
    image: '',
  });

  const handleUpvote = (id) => {
    setGems((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const isUpvoted = g.hasUpvoted;
          return {
            ...g,
            upvotes: isUpvoted ? g.upvotes - 1 : g.upvotes + 1,
            hasUpvoted: !isUpvoted,
          };
        }
        return g;
      })
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newGem.title || !newGem.location) return;

    const created = {
      id: Date.now(),
      title: newGem.title,
      location: newGem.location,
      description: newGem.description || 'Community submitted authentic spot.',
      whySpecial: newGem.whySpecial || 'Unspoiled by crowds and tourist traps.',
      category: newGem.category,
      upvotes: 1,
      hasUpvoted: true,
      image:
        newGem.image ||
        'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800',
      submittedBy: 'You (Explorer)',
      isVetted: false, // Pending admin curation
      status: 'In Review',
    };

    setGems([created, ...gems]);
    setIsSubmitModalOpen(false);
    setNewGem({ title: '', location: '', description: '', whySpecial: '', category: 'nature', image: '' });
  };

  const filteredGems = gems.filter((g) =>
    selectedCategory === 'all' ? true : g.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs mb-2">
            ✨ Community Curated Secrets
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white">
            Hidden Gem Maps
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-2xl">
            Places that aren't trending on Instagram or sold in tour packages. Submitted by resident locals, community-upvoted, and vetted by YatraVibe historians.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-primary-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 self-start"
        >
          <span>+ Submit a Secret Spot</span>
        </button>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {['all', 'heritage', 'nature', 'food', 'spiritual', 'viewpoint'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat === 'all' ? 'All Hidden Gems' : `${cat} spots`}
          </button>
        ))}
      </div>

      {/* GEMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGems.map((gem) => (
          <div
            key={gem.id}
            className="group rounded-3xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={gem.image}
                alt={gem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Status Pill */}
              <div className="absolute top-4 left-4">
                {gem.status === 'In Review' ? (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-[10px] uppercase tracking-wider">
                    ⏳ Admin Curating
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                    ✓ Vetted by Locals
                  </span>
                )}
              </div>

              {/* Upvote Button on Card */}
              <button
                onClick={() => handleUpvote(gem.id)}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 font-bold text-xs transition-all ${
                  gem.hasUpvoted
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <span>▲</span>
                <span>{gem.upvotes}</span>
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-amber-300 font-semibold">{gem.location}</span>
                <h3 className="text-xl font-bold">{gem.title}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {gem.description}
              </p>

              {gem.whySpecial && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold">Why it's magical: </span>
                  {gem.whySpecial}
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500">
                <span>By: {gem.submittedBy || 'Local Resident'}</span>
                <button
                  onClick={() => alert(`Coordinates copied for ${gem.title}! Opening off-line directions.`)}
                  className="font-bold text-primary-500 hover:underline"
                >
                  Get Offline GPS ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Submit a Secret Hidden Gem</h3>
              <p className="text-xs text-gray-500 mt-1">
                Help fellow mindful travelers explore beyond the tourist traps. Once submitted, our local curator verifies coordinates within 2 hours.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Spot Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chand Baori Secret Viewpoint"
                  value={newGem.title}
                  onChange={(e) => setNewGem({ ...newGem, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Exact City / Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abhaneri, 95km from Jaipur"
                  value={newGem.location}
                  onChange={(e) => setNewGem({ ...newGem, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  value={newGem.category}
                  onChange={(e) => setNewGem({ ...newGem, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
                >
                  <option value="heritage">Heritage & Ruins</option>
                  <option value="nature">Nature & Waterfalls</option>
                  <option value="food">Secret Food Stall</option>
                  <option value="spiritual">Quiet Baithak / Temple</option>
                  <option value="viewpoint">Sunset Viewpoint</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">What makes this place special?</label>
                <textarea
                  rows="3"
                  placeholder="How do you get there? Why is it better than commercial attractions?"
                  value={newGem.whySpecial}
                  onChange={(e) => setNewGem({ ...newGem, whySpecial: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Photo URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newGem.image}
                  onChange={(e) => setNewGem({ ...newGem, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-bold text-gray-700 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-bold shadow-lg"
                >
                  Submit for Curation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
