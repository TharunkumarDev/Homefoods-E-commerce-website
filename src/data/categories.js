// Categories definition
export const CATEGORIES = [
  {
    id: 'appalams',
    label: 'Appalams',
    emoji: '🫓',
    color: '#F4A61B',
    accent: '#C87D00',
    description: 'Crispy, thin crackers made from lentil or rice flour — a South Indian staple.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80',
  },
  {
    id: 'podis',
    label: 'Podis',
    emoji: '🌶️',
    color: '#C8360B',
    accent: '#8B1A00',
    description: 'Aromatic spiced powder blends to elevate every meal with authentic flavour.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
  },
  {
    id: 'instant-mixes',
    label: 'Instant Mixes',
    emoji: '⚡',
    color: '#2D8C4E',
    accent: '#1B5E35',
    description: 'Ready-to-cook homemade mixes for idli, dosa, sambar and more.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80',
  },
  {
    id: 'pickles',
    label: 'Pickles',
    emoji: '🥒',
    color: '#7B4F2A',
    accent: '#4A2A0A',
    description: 'Tangy, spiced pickles made with traditional recipes passed down generations.',
    image: 'https://images.unsplash.com/photo-1612257416648-a3f7e6a09a43?w=400&q=80',
  },
  {
    id: 'vathal',
    label: 'Vathal',
    emoji: '☀️',
    color: '#C8820B',
    accent: '#8B5500',
    description: 'Sun-dried vegetables perfect for curries and rice dishes — pure tradition.',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&q=80',
  },
];

export const getCategoryById = (id) => CATEGORIES.find(c => c.id === id);
