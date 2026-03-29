import mongoose from "mongoose";
import Product from "./models/Product.js";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://ecommerceUser:ecom2027@cluster0.svnxy4c.mongodb.net/ecommerce?retryWrites=true&w=majority";

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium sound quality with noise cancellation and 30-hour battery life.",
    price: 79.99,
    countInStock: 25,
    category: "Electronics",
    brand: "SoundMax",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    name: "Mechanical Gaming Keyboard",
    description:
      "RGB backlit mechanical keyboard with tactile switches for the best gaming experience.",
    price: 49.99,
    countInStock: 15,
    category: "Electronics",
    brand: "GamePro",
    imageUrl:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
  },
  {
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with precision tracking and long battery life.",
    price: 29.99,
    countInStock: 40,
    category: "Electronics",
    brand: "LogiTech",
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
  },
  {
    name: "USB-C Hub 7-in-1",
    description:
      "Expand your ports with HDMI, USB 3.0, SD card reader and more.",
    price: 39.99,
    countInStock: 20,
    category: "Electronics",
    brand: "HubMax",
    imageUrl:
      "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=400",
  },
  {
    name: "Laptop Stand Adjustable",
    description:
      "Aluminum adjustable laptop stand for better ergonomics and cooling.",
    price: 34.99,
    countInStock: 30,
    category: "Accessories",
    brand: "ErgoDesk",
    imageUrl:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400",
  },
  {
    name: "27-inch 4K Monitor",
    description:
      "Ultra-sharp 4K display with IPS panel, 144Hz refresh rate and HDR support.",
    price: 299.99,
    countInStock: 10,
    category: "Electronics",
    brand: "ViewPro",
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
  },
  {
    name: "Webcam 1080p HD",
    description:
      "Full HD webcam with built-in microphone, perfect for video calls and streaming.",
    price: 59.99,
    countInStock: 18,
    category: "Electronics",
    brand: "CamPro",
    imageUrl:
      "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400",
  },
  {
    name: "Desk Organizer Set",
    description:
      "Keep your workspace tidy with this 5-piece bamboo desk organizer set.",
    price: 24.99,
    countInStock: 50,
    category: "Accessories",
    brand: "NeatDesk",
    imageUrl:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
  },
  {
    name: "Portable SSD 1TB",
    description:
      "Ultra-fast portable SSD with USB 3.2, read speeds up to 1050MB/s.",
    price: 89.99,
    countInStock: 22,
    category: "Storage",
    brand: "SpeedDrive",
    imageUrl:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
  },
  {
    name: "Smart LED Desk Lamp",
    description:
      "Touch-controlled LED lamp with adjustable brightness and USB charging port.",
    price: 44.99,
    countInStock: 35,
    category: "Accessories",
    brand: "LightPro",
    imageUrl:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany({});
    console.log("Existing products cleared");

    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products inserted successfully`);

    await mongoose.connection.close();
    console.log("Done! Database seeded.");
    process.exit(0);
  } catch (error) {
    console.error("Seed Error:", error.message);
    process.exit(1);
  }
};

seedDB();
