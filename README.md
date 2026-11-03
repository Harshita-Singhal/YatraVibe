# 🌍 YatraVibe — Next-Gen Tourist Guide Portal
### *"Don't Just Visit India. Live It Like a Local."*

---

## 🏛️ Executive Summary & CEO Vision

Today's travel ecosystem is dominated by transactional aggregators (**MakeMyTrip, TripAdvisor, Booking.com**) that push the same 10 overcrowded tourist traps, sponsored hotel listings, and generic reviews. 

**YatraVibe** solves the 4 fundamental pains of authentic exploration:
1. **The Trap of Commercial Lists:** Tourists get stuck in crowded, paid attractions rather than genuine neighborhood culture.
2. **The Zero-Latency Query Problem:** When you're on the street at 8:00 PM in Varanasi or Jaipur, you can't ask TripAdvisor if a specific alley is safe or which kachori stall is hygienic right now. **"Ask a Local" Live Chat** connects you to verified residents in 90 seconds.
3. **The WhatsApp Splitting Headache:** Group travel turns chaotic when splitting expenses and voting on plans. **YatraVibe Squad Split-Pay & Sync** handles live polling and UPI auto-splits.
4. **The Sustainability & Safety Gap:** Rewarding travelers for low-carbon travel with real perks, paired with a military-grade **1-Tap SOS Emergency Lifeline**.

---

## 🚀 Key Modules & Unique Innovations

### 1. 💬 "Ask a Local" Live Consultation (Socket.io)
- Connect in real time with verified native residents (historians, homestay hosts, rickshaw guilds).
- Micro-tipping via UPI (₹20–₹50) incentivizes lightning-fast, honest answers.

### 2. 💎 Community-Vetted Hidden Gem Maps
- Geofenced submissions of secret stepwells, unmapped waterfalls, and rooftop baithaks.
- Curated two-tier verification: community upvotes + historian vetting.

### 3. 📅 Smart Dynamic Itinerary Builder
- AI day planner factoring in **OpenWeather live conditions**, UV index, and crowd pressure heatmaps.
- Eco-Karma scoring for choosing walking routes and zero-plastic water refill points.

### 4. 🏆 Gamification, Eco-Quests & Local Business Challenges
- Real-world quests (e.g. *"Visit 3 unlisted stepwells before 11 AM"*).
- Direct QR discount redemption at local artisans and family havelis (0% commission).

### 5. 🎙️ Cultural Story Mode (Oral Lore)
- 2-minute native spoken audio snippets with authentic regional accents.
- Preserves oral history, architectural acoustic secrets, and generational recipes.

### 6. 🚨 1-Tap SOS Emergency Guardian Lifeline
- Broadcasts real-time GPS telemetry to verified local guardians within 2km radius + 24/7 Rapid Response.
- Offline SMS fallback generator for remote zones without cellular data.

### 7. 🤝 Squad Split-Pay & Sync Planner (CEO Feature)
- Collaborative group itinerary voting.
- Real-time group expense ledger with 1-click UPI deep links.

---

## 💻 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6, Context API
- **Backend:** Node.js, Express.js, Socket.io, Helmet, Morgan, Express-Validator
- **Database:** MongoDB Atlas (Mongoose ODM), Redis caching layer
- **Security:** JWT authentication, bcryptjs hashing, role-based authorization (`tourist`, `local_guide`, `admin`)
- **External Integrations:** Google Maps Geo-Coordinates, OpenWeather API, Razorpay/UPI mock gateway

---

## 📂 Project Directory Structure

```
yatravibe/
├── client/                      # React 18 + Vite Frontend
│   ├── public/                  # SVG assets & icons
│   ├── src/
│   │   ├── components/          # Reusable UI component modules
│   │   │   ├── layout/          # Navbar, Footer, Sidebar, Layout
│   │   │   ├── common/          # Button, Card, Modal, Loader, Rating, SearchBar
│   │   │   ├── home/            # Hero, Destinations, Testimonials
│   │   │   ├── places/          # Cards, MapView, Filters
│   │   │   ├── hidden-gems/     # GemCards, Upvoting, SubmitForm
│   │   │   ├── chat/            # ChatWindow, GuideCards, Bubbles
│   │   │   ├── itinerary/       # Builder, Timeline, WeatherWidget
│   │   │   ├── gamification/    # QuestBoard, Badges, Leaderboard
│   │   │   ├── stories/         # StoryPlayer, Carousel
│   │   │   ├── booking/         # BookingForm, HotelCard, EVoucher
│   │   │   └── sos/             # SOSButton, RadarModal
│   │   ├── pages/               # 12 Full Production Pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── ExplorePage.jsx
│   │   │   ├── HiddenGemsPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── ItineraryPage.jsx
│   │   │   ├── QuestsPage.jsx
│   │   │   ├── StoriesPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── SOSPage.jsx
│   │   ├── context/             # AuthContext, ThemeContext
│   │   ├── hooks/               # useAuth, useSocket
│   │   ├── services/            # api.js
│   │   ├── utils/               # constants.js, helpers.js
│   │   ├── App.jsx              # Master route tree
│   │   ├── index.css            # Custom glassmorphism & Tailwind styles
│   │   └── main.jsx             # Entry mount
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                      # Node.js + Express Backend
    ├── config/                  # MongoDB database connection
    ├── controllers/             # 12 REST API Controllers
    │   ├── authController.js
    │   ├── badgeController.js
    │   ├── bookingController.js
    │   ├── chatController.js
    │   ├── hiddenGemController.js
    │   ├── itineraryController.js
    │   ├── placeController.js
    │   ├── questController.js
    │   ├── reviewController.js
    │   ├── sosController.js
    │   ├── storyController.js
    │   └── userController.js
    ├── middleware/              # JWT protect, authorize, errorHandler
    ├── models/                  # 10 Mongoose Data Schemas
    ├── routes/                  # 12 Express API Routers
    ├── socket/                  # chatSocket.js (Real-time events)
    ├── utils/                   # generateToken.js, validators.js
    ├── package.json
    └── server.js                # Master server entry point
```

---

## 🏃 Getting Started

### 1. Run the Backend API
```bash
cd server
npm install
npm run dev
# Server listens on http://localhost:5000
```

### 2. Run the React Frontend
```bash
cd client
npm install
npm run dev
# Vite runs at http://localhost:5173
```
