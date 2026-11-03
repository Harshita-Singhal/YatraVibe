import { useState } from 'react';

export default function StoriesPage() {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      id: 1,
      title: 'The Subterranean Tunnels of Manikarnika',
      city: 'Varanasi, UP',
      category: 'Folklore & Architecture',
      author: 'Pandit Harishankar (72 yrs)',
      desc: '400-year old underground river channels used by sadhus for midnight meditation.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-oriental-arch-in-a-park-42354-large.mp4',
      poster: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800'
    },
    {
      id: 2,
      title: 'The Musical Granite Pillars of Vitthala Temple',
      city: 'Hampi, Karnataka',
      category: 'Musical Acoustics',
      author: 'Sunita Rao (Archaeologist)',
      desc: 'Granite resonant columns tuned to classical Indian saptak sa-re-ga-ma.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-ancient-temple-ruins-in-the-jungle-42468-large.mp4',
      poster: 'https://images.unsplash.com/photo-1600100397608-f010f444f479?w=800'
    },
    {
      id: 3,
      title: 'The 140-Yr Pyaaz Kachori Spice Preservation Secret',
      city: 'Jaipur, Rajasthan',
      category: 'Living Culinary Lore',
      author: 'Halwai Ramprasad (4th-Gen)',
      desc: 'Why desert camel caravans never had food spoil in 45°C heat.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-river-flowing-between-mountains-41009-large.mp4',
      poster: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'
    }
  ];

  const phrases = [
    {
      region: 'Hindi / North India',
      tag: 'Auto / Taxi',
      phrase: 'Bhaiya, meter se chalo',
      meaning: 'Brother, please run by the official meter rate.',
      tip: 'Prevents inflated tourist taxi rates at stations and airports.'
    },
    {
      region: 'Bhojpuri / Varanasi',
      tag: 'Respect & Greeting',
      phrase: 'Pranam pandit ji, ka haal ba?',
      meaning: 'Respectful greetings elder, how are you doing?',
      tip: 'Instantly connects warmly with temple priests and boat rowers.'
    },
    {
      region: 'Rajasthani / Marwari',
      tag: 'Food & Hygiene',
      phrase: 'Mirchi thodi kam rakhna sa',
      meaning: 'Please keep the chili spice mild with honor.',
      tip: 'Ensures traditional dhaba cooks do not overpower your dish.'
    }
  ];

  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } else {
      alert(`Native Phrase: "${text}"`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-12">
      {/* Header */}
      <div className="rounded-3xl p-8 bg-slate-900 border border-slate-800 space-y-3">
        <span className="text-xs uppercase font-black text-orange-400 tracking-wider">
          Oral Heritage & Dialects
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Cultural Story Reels & "Bol Bhasha"
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Short on-location video reels narrated by resident elders and an interactive audio phrasebook to communicate with honor.
        </p>
      </div>

      {/* Video Reels Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Native Video Story Reels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, idx) => (
            <div key={s.id} className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group flex flex-col justify-between">
              <div className="relative h-80 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={s.poster}
                  className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
                >
                  <source src={s.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-amber-300 text-xs font-bold">
                  {s.category}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold text-orange-400">{s.city}</span>
                  <h3 className="text-base font-bold leading-tight">{s.title}</h3>
                </div>
              </div>

              <div className="p-5 text-xs space-y-3">
                <p className="text-slate-300">{s.desc}</p>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-slate-400">
                  <span>{s.author}</span>
                  <button
                    onClick={() => alert(`Playing audio commentary for: ${s.title}`)}
                    className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center shadow"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bol Bhasha Audio Phrasebook */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">"Bol Bhasha" Native Dialect Phrasebook</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phrases.map((p, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-extrabold text-orange-400">{p.region}</span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-bold">{p.tag}</span>
                </div>
                <h4 className="text-lg font-bold text-white">"{p.phrase}"</h4>
                <p className="text-xs text-slate-300 italic mt-1">{p.meaning}</p>
                <p className="text-[11px] text-slate-400 mt-2">{p.tip}</p>
              </div>

              <button
                onClick={() => playSpeech(p.phrase)}
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <span>🔊</span> Play Audio Pronunciation
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
