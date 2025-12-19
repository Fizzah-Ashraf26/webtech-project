// Load environment variables from .env
require('dotenv').config();

const mongoose = require("mongoose");
const Product = require("../models/products");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Array of sample products to seed
const products = [
    {
        name: "Primroses Bouquet",
        price: 2500,
        stock: 50,
        category: "Bouquets",
        image: "/images/primroses.jpg", // Fixed: proper path string
        description: 'Beautiful colorful primroses arranged in a stunning bouquet perfect for any occasion.',
        rating: 4.5
    },
    {
        name: "Summer Bouquet Mix",
        price: 2000,
        stock: 25,
        category: "Mixed",
        image: "/images/summermix.jpg", // Fixed: added extension
        description: 'Vibrant summer flowers mixed together to create a cheerful and bright arrangement.',
        rating: 4.8
    },
    {
        name: "Pink Spring Surprise",
        price: 3000,
        stock: 10,
        category: "Roses",
        image: "/images/pinkflower.jpg", // Fixed: added extension
        description: 'Delicate pink spring flowers that bring freshness and elegance to any room.',
        rating: 5
    },
    {
        name: "Ocean Whisper",
        price: 6000,
        stock: 12,
        category: "Roses",
        image: "/images/oceanwhisper.jpg",
        description: 'A soft blend of pastel blue flowers offering calm beauty and understated elegance',
        rating: 4.8
    },
    {
        name: 'Purple Dream',
        price: 1900,
        stock: 26,
        category: "Mixed",
        image: "/images/purpledream.jpg",
        description: 'Stunning purple and lavender flowers mixed for a dreamy effect.',
        rating: 4.7
    },
    {
        name: "Rose Reverie",
        price: 6699,
        stock: 34,
        category: "Roses",
        image: "/images/rose.jpg",
        description: 'Classic dozen red roses, the perfect symbol of love and romance.',
        rating: 4.6
    },
    {
        name: "Daisy Daze",
        price: 4500,
        stock: 15,
        category: "Daisies",
        image: "/images/daisy.jpg",
        description: 'Soft pastel-colored flowers creating a gentle and soothing display.',
        rating: 4.4
    },
    {
        name: "Cotton Bloom",
        price: 7000,
        stock: 28,
        category: "Roses",
        image: "/images/cottonbloom.jpg",
        description: 'Pure white roses arranged elegantly for weddings and special events.',
        rating: 4.5
    },
    {
        name: "Sunny Blosom",
        price: 2200,
        stock: 30,
        category: "Sunflowers", 
        image: "/images/sunflower.jpg",
        description: 'Bright yellow flowers that bring sunshine into any space.',
        rating: 4.2
    },
    {
        name: "Midnight Orchid",
        price: 5900,
        stock: 10,
        category: "Orchids",
        image: "/images/orchids.jpg",
        description: 'Exotic orchids that add a touch of sophistication and luxury.',
        rating: 4.8
    },
    {
        name: "Velvet Dawn",
        price: 6000,
        stock: 12,
        category: "Bouquets",
        image: "/images/velvet.jpg",
        description: 'Bold, vibrant flowers that make a strong statement.',
        rating: 4.8
    },
    {
        name: "Dreamscape",
        price: 10000,
        stock: 9,
        category: "Bouquets",
        image: "/images/dreamscape.jpg",
        description: 'Pastel, pretty flowers enough to lift your mood.',
        rating: 5
    },
    {
        name: "Snow Bunny",
        price: 6000,
        stock: 5,
        category: "Lillies",
        image: "/images/lillies.jpg",
        description: 'Freshly picked lillies to brighten your lives.',
        rating: 4.8
    },
    {
        name: "Royal Affair",
        price: 6000,
        stock: 22,
        category: "Roses",
        image: "/images/royalaffair.jpg",
        description: 'Bunch of roses packed in love.',
        rating: 4.8
    },
    {
        name: "Peachy Blush",
        price: 5990,
        stock: 8,
        category: "Roses",
        image: "/images/peachyblush.jpg",
        description: 'A soft peach and pink floral blend radiating warmth, elegance, and gentle romance.',
        rating: 4.8
    },
    {
        name: "Buttery Bliss",
        price: 7400,
        stock: 18,
        category: "Roses",
        image: "/images/peachyblush.jpg",
        description: 'A light yellow floral arrangement that brings warmth, joy, and gentle elegance.',
        rating: 4.8
    }

    


];

// Seed function
const seedDB = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products cleared');

    // Insert new sample products
    await Product.insertMany(products);
    console.log('Sample products inserted successfully');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDB();