import React, { createContext, useContext, useState, useEffect } from 'react';

const WeddingContext = createContext();

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};

export const WeddingProvider = ({ children }) => {
  const [weddingData, setWeddingData] = useState({
    coupleNames: {
      partner1: 'Sarah',
      partner2: 'Michael'
    },
    weddingDate: '2024-09-15',
    ceremony: {
      time: '7:00 PM',
      location: 'Moonlight Gardens',
      address: '123 Starlight Avenue, Midnight City',
      dressCode: 'Cocktail Attire - Dark & Elegant'
    },
    story: {
      title: 'Our Midnight Story',
      entries: [
        {
          title: 'First Letter',
          date: 'December 2022',
          content: 'Under the winter stars, we found each other in the quiet moments between heartbeats. Your laugh echoed through the midnight air, and I knew then that our story was just beginning.'
        },
        {
          title: 'The Proposal',
          date: 'June 2023',
          content: 'On a rooftop overlooking the city lights, with nothing but the moon as our witness, you asked me to be yours forever. The ring sparkled like the stars above, and my heart whispered yes before my lips could form the words.'
        },
        {
          title: 'Forever Begins',
          date: 'September 2024',
          content: 'Tonight, we write our final letter as two separate souls. Tomorrow, we begin our first chapter as one. In the candlelight, surrounded by love, we promise to keep writing our story together.'
        }
      ]
    },
    gallery: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        caption: 'Our first dance under the stars'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
        caption: 'The moment we said yes'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1594736797933-d0301ba2fe65?w=800&h=600&fit=crop',
        caption: 'Candlelit promises'
      }
    ],
    rsvp: {
      enabled: true,
      deadline: '2024-08-15'
    },
    registry: {
      enabled: true,
      items: [
        { name: 'Vintage Candlesticks', price: 89, store: 'Midnight Antiques' },
        { name: 'Silk Throw Pillows', price: 156, store: 'Moonlight Home' },
        { name: 'Crystal Wine Glasses', price: 240, store: 'Starlight Collections' }
      ]
    },
    audio: {
      enabled: true,
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      title: 'Our Song - Midnight Serenade'
    },
    quotes: [
      'Forever, in this hour of twilight and dreams',
      'Two souls, one moonlit promise',
      'In the quiet of night, love speaks loudest'
    ],
    guestbook: {
      enabled: true,
      entries: []
    }
  });

  const [isDraft, setIsDraft] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const updateWeddingData = (newData) => {
    setWeddingData(prev => ({ ...prev, ...newData }));
  };

  const saveDraft = () => {
    localStorage.setItem('weddingDraft', JSON.stringify(weddingData));
    setIsDraft(true);
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('weddingDraft');
    if (draft) {
      setWeddingData(JSON.parse(draft));
      setIsDraft(true);
    }
  };

  const publishWedding = () => {
    setIsDraft(false);
    localStorage.removeItem('weddingDraft');
  };

  useEffect(() => {
    loadDraft();
  }, []);

  const value = {
    weddingData,
    updateWeddingData,
    isDraft,
    isPreview,
    setIsPreview,
    saveDraft,
    loadDraft,
    publishWedding
  };

  return (
    <WeddingContext.Provider value={value}>
      {children}
    </WeddingContext.Provider>
  );
};