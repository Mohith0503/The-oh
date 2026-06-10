import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'menu.json');

const oatsBreads = [
  { 
    id: "b1", 
    name: "Peanut Butter Power Oats", 
    price: 130, 
    tags: ["High Protein", "Healthy Fats"], 
    desc: "A powerful blend of organic oats and creamy peanut butter, perfect for a high-energy start to your day.",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&q=80",
    ingredients: ["Organic Rolled Oats", "Peanut Butter", "Honey", "Chia Seeds"],
    nutrition: { calories: 350, protein: "15g", carbs: "45g", fiber: "8g", fat: "12g" },
    prepTime: "5 min",
    inStock: true
  },
  { 
    id: "b2", 
    name: "Cocoa Banana Oat Cup", 
    price: 140, 
    tags: ["Energy Booster", "Rich Taste"], 
    desc: "Delicious cocoa and fresh bananas mixed with rolled oats for a sweet, nutritious morning treat.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    ingredients: ["Organic Rolled Oats", "Cocoa Powder", "Fresh Banana", "Almond Milk"],
    nutrition: { calories: 320, protein: "10g", carbs: "55g", fiber: "9g", fat: "6g" },
    prepTime: "5 min",
    inStock: true
  },
  { 
    id: "b3", 
    name: "Cinnamon Apple Oat Porridge", 
    price: 120, 
    tags: ["Classic", "Fiber Rich"], 
    desc: "Warm and comforting oat porridge topped with cinnamon-spiced apples. A classic, healthy breakfast.",
    image: "https://images.unsplash.com/photo-1614961909372-5e11b6a0ae54?w=600&q=80",
    ingredients: ["Organic Rolled Oats", "Fresh Apples", "Cinnamon", "Honey"],
    nutrition: { calories: 290, protein: "8g", carbs: "60g", fiber: "7g", fat: "4g" },
    prepTime: "5 min",
    inStock: true
  },
  { 
    id: "b4", 
    name: "Peanut Butter Banana Overnight Oats", 
    price: 150, 
    tags: ["High Protein", "Overnight"], 
    desc: "Creamy overnight oats layered with rich peanut butter and fresh banana slices.",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80",
    ingredients: ["Organic Rolled Oats", "Peanut Butter", "Banana", "Almond Milk", "Chia Seeds"],
    nutrition: { calories: 380, protein: "16g", carbs: "50g", fiber: "10g", fat: "14g" },
    prepTime: "Overnight",
    inStock: true
  },
  { 
    id: "b5", 
    name: "Apple Cinnamon Overnight Oats", 
    price: 135, 
    tags: ["Fiber Rich", "Overnight"], 
    desc: "Refreshingly cool overnight oats infused with apple chunks and a dash of cinnamon.",
    image: "https://images.unsplash.com/photo-1504308805006-0f7a5f1adea4?w=600&q=80",
    ingredients: ["Organic Rolled Oats", "Apple", "Cinnamon", "Almond Milk", "Flax Seeds"],
    nutrition: { calories: 310, protein: "9g", carbs: "58g", fiber: "8g", fat: "6g" },
    prepTime: "Overnight",
    inStock: true
  },
  { 
    id: "b6", 
    name: "Chocolate Fiber Overnight Oats", 
    price: 145, 
    tags: ["Fiber Rich", "Overnight"], 
    desc: "Indulgent yet healthy chocolate overnight oats packed with dietary fiber.",
    image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=600&q=80",
    ingredients: ["Organic Rolled Oats", "Dark Cocoa", "Chia Seeds", "Almond Milk"],
    nutrition: { calories: 330, protein: "12g", carbs: "48g", fiber: "12g", fat: "8g" },
    prepTime: "Overnight",
    inStock: true
  },
  { 
    id: "b7", 
    name: "Brown Bread", 
    price: 80, 
    tags: ["Fiber Rich"], 
    desc: "Two slices of freshly baked, wholesome brown bread made from local organic wheat. Perfect with our nut butters and spreads.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    ingredients: ["Organic Whole Wheat Flour", "Yeast", "Salt", "Water"],
    nutrition: { calories: 180, protein: "6g", carbs: "35g", fiber: "4g", fat: "2g" },
    prepTime: "Ready to serve",
    inStock: true
  },
  { 
    id: "b8", 
    name: "Multi Grain Bread", 
    price: 95, 
    tags: ["Fiber Rich", "High Protein"], 
    desc: "Two slices of rustic multi-grain bread baked fresh with linseed, sunflowers, pumpkin, and sesame seeds. A protein-packed wholesome start.",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=600&q=80",
    ingredients: ["Multi-grain Flour", "Linseed", "Sunflower Seeds", "Pumpkin Seeds", "Sesame Seeds"],
    nutrition: { calories: 210, protein: "9g", carbs: "38g", fiber: "6g", fat: "5g" },
    prepTime: "Ready to serve",
    inStock: true
  },
  { 
    id: "b9", 
    name: "Whole Grain Bread", 
    price: 90, 
    tags: ["Fiber Rich"], 
    desc: "Dense, nutrient-dense whole wheat grain loaf. Fresh, earthy, and deeply satisfying. Pairs wonderfully with avocado or peanut butter.",
    image: "https://images.unsplash.com/photo-1565181152879-bc96b4ccfd69?w=600&q=80",
    ingredients: ["Whole Wheat Flour", "Oat Bran", "Flax Seeds", "Water", "Salt"],
    nutrition: { calories: 190, protein: "7g", carbs: "37g", fiber: "5g", fat: "3g" },
    prepTime: "Ready to serve",
    inStock: true
  }
];

async function seed() {
  try {
    let data = { bases: [], addons: [], combos: [] };
    try {
      const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (e) {
      console.log('menu.json not found or invalid, starting fresh.');
    }

    // Merge existing bases with rich oatsBreads
    // If an existing base matches id, update it. If it doesn't match, keep it. 
    // Add any oatsBreads that don't exist.
    const updatedBases = [];
    const oatsMap = new Map(oatsBreads.map(o => [o.id, o]));

    for (const base of data.bases) {
      if (oatsMap.has(base.id)) {
        updatedBases.push({ ...base, ...oatsMap.get(base.id) }); // overwrite with rich data
        oatsMap.delete(base.id);
      } else {
        updatedBases.push(base); // keep existing custom bases
      }
    }

    // Add remaining
    for (const base of oatsMap.values()) {
      updatedBases.push(base);
    }

    data.bases = updatedBases;

    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Seed successful! Bases enriched.');
  } catch (err) {
    console.error('Seed failed:', err);
  }
}

seed();
