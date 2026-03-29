const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Setting = require('./models/Setting');
const connectDB = require('./config/db');

dotenv.config();

const CATEGORIES = [
  { id: 'appalams', label: 'Appalams', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
  { id: 'podis', label: 'Podis', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80' },
  { id: 'instant-mixes', label: 'Instant Mixes', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80' },
  { id: 'pickles', label: 'Pickles', image: 'https://images.unsplash.com/photo-1612257416648-a3f7e6a09a43?w=400&q=80' },
  { id: 'vathal', label: 'Vathal', image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&q=80' },
];

const SEED_PRODUCTS = [
  { name: 'Classic Rice Appalam', category: 'appalams', price: 120, unit: '200g', description: 'Traditional rice flour appalams, hand-rolled and sun-dried.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80', isFeatured: true, isPublished: true },
  { name: 'Urad Dal Appalam', category: 'appalams', price: 150, unit: '250g', description: 'Made from premium urad dal, these pappadums puff beautifully when fried.', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=500&q=80', isFeatured: false, isPublished: true },
  { name: 'Garlic Pepper Appalam', category: 'appalams', price: 160, unit: '200g', description: 'Infused with roasted garlic and fresh black pepper for a bold, spiced crunch.', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80', isFeatured: false, isPublished: true },
  { name: 'Idli Milagai Podi', category: 'podis', price: 180, unit: '300g', description: 'The quintessential gunpowder chutney powder — perfectly spiced and aromatic.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80', isFeatured: true, isPublished: true },
  { name: 'Paruppu Podi', category: 'podis', price: 165, unit: '250g', description: 'Roasted lentil powder with asafoetida and black pepper.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80', isFeatured: false, isPublished: true },
  { name: 'Curry Leaf Podi', category: 'podis', price: 200, unit: '200g', description: 'Fresh sun-dried curry leaves ground with spices.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80', isFeatured: false, isPublished: true },
  { name: 'Sesame Rice Podi', category: 'podis', price: 175, unit: '250g', description: 'Nutty sesame seeds stone-ground with spices.', image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=500&q=80', isFeatured: false, isPublished: true },
  { name: 'Idli Dosa Batter Mix', category: 'instant-mixes', price: 220, unit: '500g', description: 'Just add water, ferment overnight and get perfectly soft idlis.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80', isFeatured: true, isPublished: true },
  { name: 'Sambar Mix', category: 'instant-mixes', price: 160, unit: '300g', description: 'A carefully balanced blend of 18 spices for making restaurant-quality sambar.', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=500&q=80', isFeatured: false, isPublished: true },
  { name: 'Raw Mango Pickle', category: 'pickles', price: 250, unit: '350g', description: 'Tangy, oily and intensely flavoured — made from raw Alphonso mangoes.', image: 'https://images.unsplash.com/photo-1612257416648-a3f7e6a09a43?w=500&q=80', isFeatured: true, isPublished: true },
  { name: 'Garlic Pickle', category: 'pickles', price: 240, unit: '250g', description: 'Whole garlic cloves preserved in a rich blend of red chillies, tamarind and sesame oil.', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80', isFeatured: false, isPublished: true },
  { name: 'Sundakkai Vathal', category: 'vathal', price: 140, unit: '100g', description: 'Sun-dried turkey berries — a traditional ingredient for authentic vathal kuzhambu.', image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&q=80', isFeatured: true, isPublished: true },
];

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing
    await Category.deleteMany();
    await Product.deleteMany();
    await Setting.deleteMany();

    // Map categories
    const createdCats = [];
    for (const [idx, cat] of CATEGORIES.entries()) {
      const inserted = await Category.create({
        name: cat.label,
        slug: cat.id,
        image: { url: cat.image },
        displayOrder: idx
      });
      createdCats.push(inserted);
    }
    
    // Map products to appropriate category ID
    const productsToInsert = SEED_PRODUCTS.map(p => {
      const catObj = createdCats.find(c => c.slug === p.category);
      // create a slug
      const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return {
        name: p.name,
        slug,
        description: p.description,
        category: catObj ? catObj._id : createdCats[0]._id,
        price: p.price,
        stock: 100,
        images: [{ url: p.image, publicId: 'dummy', isPrimary: true }],
        specifications: p.unit ? [{ key: 'Unit', value: p.unit }] : [],
        isFeatured: p.isFeatured,
        isPublished: p.isPublished
      };
    });

    await Product.insertMany(productsToInsert);
    
    // Create default settings if not exists
    await Setting.create({
      businessName: 'Nalam Vaazha - நலம் வாழ',
      whatsappNumber: '919999999999',
    });

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

seedData();
