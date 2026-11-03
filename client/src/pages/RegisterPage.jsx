import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tourist',
    city: 'Jaipur',
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register) {
      register(formData);
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-surface-light dark:bg-surface-dark">
      {/* LEFT: VISUAL SHOWCASE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200"
          alt="Coastal Goa & Backwaters"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 font-bold text-xs">
            Join The Movement
          </span>
          <h2 className="text-4xl font-display font-extrabold leading-tight">
            Explore With Purpose. Reward Local Communities.
          </h2>
          <p className="text-sm text-gray-200 font-light">
            Every step you take on YatraVibe directly empowers local artisans, oral storytellers, and sustainable homestays.
          </p>
        </div>
      </div>

      {/* RIGHT: REGISTER FORM */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold">
                Y
              </div>
              <span className="text-xl font-bold font-display text-gray-900 dark:text-white">YatraVibe</span>
            </Link>
            <h1 className="text-3xl font-display font-extrabold text-gray-900 dark:text-white">
              Create an Account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Start earning explorer badges and booking verified local experiences.
            </p>
          </div>

          {/* Role selector */}
          <div className="flex rounded-2xl bg-gray-100 dark:bg-gray-800 p-1">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'tourist' })}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                formData.role === 'tourist'
                  ? 'bg-white dark:bg-gray-900 text-primary-500 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🧭 I am a Traveler
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'local_guide' })}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                formData.role === 'local_guide'
                  ? 'bg-white dark:bg-gray-900 text-primary-500 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              📍 I am a Local Guide
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Aarav Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="aarav@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-primary-500/40 hover:scale-102 active:scale-98 transition-all"
            >
              Sign Up & Get 100 Welcome Points
            </button>
          </form>

          <p className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
