import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import HiddenGemsPage from './pages/HiddenGemsPage';
import ChatPage from './pages/ChatPage';
import ItineraryPage from './pages/ItineraryPage';
import QuestsPage from './pages/QuestsPage';
import StoriesPage from './pages/StoriesPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SOSPage from './pages/SOSPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/hidden-gems" element={<HiddenGemsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sos" element={<SOSPage />} />
      </Routes>
    </Layout>
  );
}
