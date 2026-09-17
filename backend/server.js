import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory catalog of premium Chaniya Cholis
const outfits = [
  {
    id: "gfit-01",
    name: "Royal Mirrorwork Peacock Navratri Chaniya Choli",
    navratriDay: 1,
    colorTheme: "Royal Blue & Emerald",
    fabric: "Pure Heavy Gamthi Cotton with Real Mirror Work",
    flair: "9 Meters (Full Twirl Gher)",
    rentPrice: 1499,
    deposit: 2000,
    retailValue: 14500,
    sizes: ["S", "M", "L", "XL"],
    image: "/assets/outfits/outfit1.png",
    rating: 4.9,
    reviewsCount: 42,
    popular: true,
    description: "Handcrafted traditional Kutch mirrorwork lehenga with intricately embroidered handwork blouse and vibrant bandhej dupatta. Designed for maximum twirls during raas-garba."
  },
  {
    id: "gfit-02",
    name: "Sunkissed Marigold Rabari Embroidery Ensemble",
    navratriDay: 2,
    colorTheme: "Mustard Yellow & Crimson",
    fabric: "Organic Khadi Cotton with Cowrie Shell Tassels",
    flair: "10 Meters Ultra Flared",
    rentPrice: 1699,
    deposit: 2500,
    retailValue: 16800,
    sizes: ["XS", "S", "M", "L"],
    image: "/assets/outfits/outfit2.png",
    rating: 5.0,
    reviewsCount: 38,
    popular: true,
    description: "Authentic Rabari tribal craft with geometric mirror embroidery, heavy kodi latkans, and contrasting vibrant patola print border."
  },
  {
    id: "gfit-03",
    name: "Regal Magenta Rani Bandhani Twirl Set",
    navratriDay: 3,
    colorTheme: "Rani Pink & Gold",
    fabric: "Georgette with Heavy Gota Patti & Zari Borders",
    flair: "8.5 Meters Lightweight Twirl",
    rentPrice: 1399,
    deposit: 2000,
    retailValue: 13000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/assets/outfits/outfit3.png",
    rating: 4.8,
    reviewsCount: 29,
    popular: false,
    description: "Vibrant traditional Gujarati bandhani dot patterns paired with contemporary sweetheart neckline blouse and lightweight breathable dupatta."
  },
  {
    id: "gfit-04",
    name: "Heritage Ivory & Multi-Color Kutchi Patchwork",
    navratriDay: 4,
    colorTheme: "Off-White & Multi-Hue",
    fabric: "Pure Slub Cotton with Authentic Kutch Patches",
    flair: "9.5 Meters Heavy Gher",
    rentPrice: 1799,
    deposit: 2500,
    retailValue: 18500,
    sizes: ["S", "M", "L"],
    image: "/assets/outfits/outfit4.png",
    rating: 4.9,
    reviewsCount: 51,
    popular: true,
    description: "Showstopper artisan masterpiece featuring heirloom patchwork squares, antique coin detailing, and handcrafted dori tie-backs."
  },
  {
    id: "gfit-05",
    name: "Midnight Indigo Ajrakh & Foil Print Chaniya Choli",
    navratriDay: 5,
    colorTheme: "Midnight Indigo & Rust",
    fabric: "Natural Dye Ajrakh Modal Silk",
    flair: "8 Meters Graceful Flare",
    rentPrice: 1299,
    deposit: 1800,
    retailValue: 12500,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/assets/outfits/outfit5.png",
    rating: 4.7,
    reviewsCount: 33,
    popular: false,
    description: "Eco-chic elegance with vegetable-dyed Ajrakh block prints, subtle foil accents, and an ultra-breathable comfort fit."
  },
  {
    id: "gfit-06",
    name: "Emerald Green & Tangerine Festive Lehenga",
    navratriDay: 6,
    colorTheme: "Emerald Green & Orange",
    fabric: "Chanderi Silk with Resham & Kasab Work",
    flair: "9 Meters Twirl Flare",
    rentPrice: 1599,
    deposit: 2200,
    retailValue: 15900,
    sizes: ["S", "M", "L", "XL"],
    image: "/assets/outfits/outfit6.png",
    rating: 4.9,
    reviewsCount: 46,
    popular: true,
    description: "Rich jewel-toned green chaniya with contrasting saffron dupatta and high-definition metallic thread embroidery."
  }
];

const bookings = [];
const inquiries = [];

// GET all outfits with query filtering
app.get('/api/outfits', (req, res) => {
  const { day, search, maxPrice } = req.query;
  let filtered = [...outfits];

  if (day) {
    filtered = filtered.filter(item => item.navratriDay === parseInt(day));
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.colorTheme.toLowerCase().includes(q) ||
      item.fabric.toLowerCase().includes(q)
    );
  }
  if (maxPrice) {
    filtered = filtered.filter(item => item.rentPrice <= parseInt(maxPrice));
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// GET outfit by ID
app.get('/api/outfits/:id', (req, res) => {
  const outfit = outfits.find(o => o.id === req.params.id);
  if (!outfit) {
    return res.status(404).json({ success: false, message: 'Outfit not found' });
  }
  res.json({ success: true, data: outfit });
});

// POST rental booking
app.post('/api/rentals', (req, res) => {
  const { outfitId, customerName, email, phone, city, startDate, days, size } = req.body;
  
  if (!outfitId || !customerName || !phone || !startDate) {
    return res.status(400).json({ success: false, message: 'Missing required rental details' });
  }

  const outfit = outfits.find(o => o.id === outfitId);
  const rentalDays = parseInt(days) || 3;
  const totalPrice = outfit ? outfit.rentPrice * (rentalDays > 3 ? (rentalDays * 0.8) : 1) : 1500;
  const deposit = outfit ? outfit.deposit : 2000;

  const booking = {
    id: `GB-${Date.now().toString().slice(-6)}`,
    outfitId,
    outfitName: outfit ? outfit.name : "Custom Fit",
    customerName,
    email,
    phone,
    city: city || "Ahmedabad",
    startDate,
    days: rentalDays,
    size: size || "M",
    totalRent: Math.round(totalPrice),
    refundableDeposit: deposit,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);
  res.status(201).json({
    success: true,
    message: 'Rental booking registered successfully!',
    data: booking
  });
});

// POST contact inquiry / studio trial
app.post('/api/contact', (req, res) => {
  const { name, email, phone, city, message, preferredDate } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required.' });
  }

  const inquiry = {
    id: `INQ-${Date.now().toString().slice(-5)}`,
    name,
    email,
    phone,
    city: city || 'Ahmedabad',
    message: message || 'Studio trial visit request',
    preferredDate,
    createdAt: new Date().toISOString()
  };

  inquiries.push(inquiry);
  res.status(201).json({
    success: true,
    message: 'Thank you! Our fitting stylist will connect with you within 2 hours.',
    data: inquiry
  });
});

// GET testimonials
app.get('/api/testimonials', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: "Devangi Patel",
        location: "Ahmedabad",
        outfitRented: "Royal Mirrorwork Peacock Chaniya",
        quote: "The 10-meter flare was absolutely magical on the GMDC Garba grounds! Everyone asked where I bought it, and it was so hassle-free to return the next morning.",
        rating: 5,
        daysRented: "3 Days"
      },
      {
        id: 2,
        name: "Krupa Shah",
        location: "Mumbai",
        outfitRented: "Heritage Kutchi Patchwork Lehenga",
        quote: "Saved thousands without repeating an outfit across 9 nights of Navratri. The dry-cleaning quality and blouse fitting adjustments were impeccable.",
        rating: 5,
        daysRented: "4 Days"
      },
      {
        id: 3,
        name: "Ananya Joshi",
        location: "Vadodara",
        outfitRented: "Sunkissed Rabari Artisan Set",
        quote: "GarbaFits made dressing up for United Way Navratri effortless. The fabric is 100% breathable pure cotton, perfect for non-stop dancing.",
        rating: 5,
        daysRented: "5 Days"
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`GarbaFits Backend server running on http://localhost:${PORT}`);
});
