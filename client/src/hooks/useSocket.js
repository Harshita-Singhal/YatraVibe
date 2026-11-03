import { useEffect, useRef, useState, useCallback } from 'react';

export default function useSocket(url) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    // Mock socket connection for demo
    const timer = setTimeout(() => setConnected(true), 500);
    return () => {
      clearTimeout(timer);
      setConnected(false);
    };
  }, [url]);

  const sendMessage = useCallback((message) => {
    setMessages((prev) => [...prev, { ...message, timestamp: new Date().toISOString(), fromSelf: true }]);
    // Simulate reply after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: getAutoReply(message.text),
          timestamp: new Date().toISOString(),
          fromSelf: false,
          sender: 'Guide',
        },
      ]);
    }, 1500);
  }, []);

  return { connected, messages, sendMessage };
}

function getAutoReply(text) {
  const replies = [
    'That sounds wonderful! I highly recommend visiting during the early morning hours for the best experience.',
    'Great choice! Make sure to try the local street food nearby. The chaat is amazing! 🍛',
    'I can arrange a private tour for you. Would you prefer morning or afternoon?',
    'The weather is perfect right now! You will love it. Pack light and bring sunscreen ☀️',
    'Absolutely! This is one of my favorite spots. Let me share some insider tips with you.',
    'I suggest spending at least 2-3 hours here. There is so much to explore!',
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
