import { oatsBreads } from './oatsBreads';
import { fruits } from './fruits';
import { nuts } from './nuts';
import { seeds } from './seeds';
import { butters } from './butters';

export { oatsBreads } from './oatsBreads';
export { fruits } from './fruits';
export { nuts } from './nuts';
export { seeds } from './seeds';
export { butters } from './butters';

export const ADDONS = {
  "Spreads & Sweeteners": butters,
  "Fresh Fruits": fruits,
  "Premium Nuts": nuts,
  "Healthy Seeds": seeds,
};

export const COMBOS = [
  {
    "id": "c1",
    "name": "The Power Bowl",
    "base": "High Protein Oats Chocolate",
    "addons": [
      "Almonds",
      "Peanut Butter",
      "Banana"
    ],
    "price": 235,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80",
    "tag": "Best for Gym",
    "inStock": true
  },
  {
    "id": "c2",
    "name": "The Fruit Paradise",
    "base": "Fruit Oats",
    "addons": [
      "Strawberry",
      "Blueberry",
      "Mango"
    ],
    "price": 195,
    "image": "https://images.unsplash.com/photo-1614961909372-5e11b6a0ae54?w=400&q=80",
    "tag": "Vitamins Rich",
    "inStock": true
  },
  {
    "id": "c3",
    "name": "The Nut Crunch",
    "base": "Muesli",
    "addons": [
      "All Mix Nuts",
      "Dark Chocolate Peanut Butter",
      "Chia Seeds"
    ],
    "price": 250,
    "image": "https://images.unsplash.com/photo-1504308805006-0f7a5f1adea4?w=400&q=80",
    "tag": "High Energy",
    "inStock": true
  }
];

export const TAG_COLORS = {
  "High Protein": { bg: "bg-[#FFF3E0]", text: "text-[#E65100]", border: "border-[#FFCC80]" },
  "Fiber Rich": { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]", border: "border-[#A5D6A7]" },
  "Fresh Fruits": { bg: "bg-[#FCE4EC]", text: "text-[#AD1457]", border: "border-[#F48FB1]" },
  "Healthy Fats": { bg: "bg-[#FFF8E1]", text: "text-[#F57F17]", border: "border-[#FFE082]" },
};

export const REVIEWS = [
  { name: "Priya S.", text: "Best breakfast in Hyderabad! The Fruit Oats with almonds and strawberry is my go-to every morning.", rating: 5, location: "Kondapur Hyderabad" },
  { name: "Rahul K.", text: "High Protein Oats with peanut butter changed my gym mornings completely. Highly recommend!", rating: 5, location: "Heritage Rocks" },
  { name: "Ananya M.", text: "So fresh and healthy. Loved the multigrain bread combo. Will definitely order again!", rating: 5, location: " Near Malkam Cheruvu" },
];

export const WHATSAPP_NUMBER = "919876543210";
export const HERO_BG = "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=1400&q=80";
export const STORY_BG = "https://images.unsplash.com/photo-1504308805006-0f7a5f1adea4?w=1400&q=80";
