import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LOCAL_GUIDES } from '../utils/constants';

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const initialGuideId = Number(searchParams.get('guideId')) || LOCAL_GUIDES[0].id;

  const [activeGuide, setActiveGuide] = useState(
    LOCAL_GUIDES.find((g) => g.id === initialGuideId) || LOCAL_GUIDES[0]
  );

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'guide',
      text: `Namaste! I am ${activeGuide.name}, born and brought up in ${activeGuide.city}. What can I guide you with right now?`,
      time: '10:14 AM',
    },
    {
      id: 2,
      sender: 'user',
      text: `Hey ${activeGuide.name}! I am near the main market. Are the kachori stalls near the gate safe and fresh right now?`,
      time: '10:15 AM',
    },
    {
      id: 3,
      sender: 'guide',
      text: `Great question! Avoid the outer stall near the bus stop—it gets dusty. Instead walk 40 meters inside to "Lalchand Sweets & Baati". Hot batches come out every 15 mins and they use pure desi ghee. Safe for drinking water too!`,
      time: '10:16 AM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tipSuccess, setTipSuccess] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate verified local guide prompt response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'guide',
          text: `Got it! Also note: after 6:30 PM, take the pedestrian alley towards the north courtyard. You will skip the heavy rickshaw rush and catch the live sitar player!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1800);
  };

  const handleQuickQuestion = (q) => {
    setInputMessage(q);
  };

  const handleTipGuide = () => {
    setTipSuccess(true);
    setTimeout(() => setTipSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* LEFT: GUIDES DIRECTORY */}
        <div className="w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-between">
              <span>Verified Locals</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                Live Now
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Ask quick on-the-spot questions. Locals earn micro-tips for honest answers.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700/60 p-2 space-y-1">
            {LOCAL_GUIDES.map((guide) => {
              const isSelected = guide.id === activeGuide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => {
                    setActiveGuide(guide);
                    setMessages([
                      {
                        id: 1,
                        sender: 'guide',
                        text: `Namaste! I am ${guide.name} from ${guide.city}. What can I guide you with today?`,
                        time: 'Just now',
                      },
                    ]);
                  }}
                  className={`w-full p-4 rounded-2xl text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={guide.avatar}
                      alt={guide.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                        {guide.name}
                      </h4>
                      <span className="text-[11px] font-bold text-amber-500">★ {guide.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{guide.city}</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                      {guide.rate}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: LIVE CHAT WINDOW */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeGuide.avatar}
                  alt={activeGuide.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary-500"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-1.5">
                  {activeGuide.name}
                  <span className="text-primary-500 text-xs">✓ Verified Resident</span>
                </h3>
                <span className="text-xs text-emerald-500 flex items-center gap-1">
                  ● Active in {activeGuide.city} • Fast response (&lt; 2 mins)
                </span>
              </div>
            </div>

            {/* Micro-Tip Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTipGuide}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>🪙 Tip ₹30 UPI</span>
              </button>
            </div>
          </div>

          {/* Tip Notification */}
          {tipSuccess && (
            <div className="bg-emerald-500 text-white text-xs font-bold py-2 px-4 text-center animate-fade-in">
              🎉 ₹30 Tip transferred directly to {activeGuide.name} via UPI! Guide rewarded.
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/50 dark:bg-gray-900/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl shadow-sm text-sm space-y-1 ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-primary-500 to-amber-500 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span
                    className={`block text-[10px] text-right ${
                      m.sender === 'user' ? 'text-white/80' : 'text-gray-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-gray-400 italic">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:0.4s]" />
                <span>{activeGuide.name} is typing local advice...</span>
              </div>
            )}
          </div>

          {/* Quick Questions Helper */}
          <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
            <span className="text-gray-400 text-[11px] font-bold whitespace-nowrap">Instant Tips:</span>
            {[
              'Which auto fare is fair right now?',
              'Is this street stall hygienic today?',
              'Where is the best quiet sunset spot?',
              'What time does the crowd thin out?',
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q)}
                className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 whitespace-nowrap hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-center gap-3"
          >
            <input
              type="text"
              placeholder={`Ask ${activeGuide.name} anything about ${activeGuide.city}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-700/60 border-none text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Send</span>
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
