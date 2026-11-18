// Mitti Se - Product Catalog & Traceability Database

const PRODUCTS_DATA = [
  {
    id: "ghee-a2-bilona",
    name: "A2 Gir Cow Vedic Bilona Ghee",
    hindiName: "वैदिक बिलोना घी",
    category: "ghee",
    tagline: "Slow-cooked on cow dung chulha from whole curd of grass-fed Gir cows",
    badge: "Bestseller",
    method: "Traditional 5-Step Bilona Churn",
    origin: "Kathiawar Grasslands, Gujarat",
    shelfLife: "12 Months",
    rating: 4.9,
    reviewsCount: 384,
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&q=80",
    description: "Our Vedic A2 Ghee is prepared strictly following the ancient Shastrokt Bilona method. Fresh milk from freely grazed native Gir cows is boiled, naturally cultured into whole curd overnight, churned both clockwise and counter-clockwise with a wooden bilona to extract Makhan (cultured butter), and then gently simmered on a slow earthen flame. Result: A fragrant, golden, danedar (granular) nectar packed with natural CLA, butyric acid, and vitamins A, D, E, and K.",
    variants: [
      { size: "500 ml", price: 950, mrp: 1100, inStock: true },
      { size: "1000 ml (1 L)", price: 1850, mrp: 2150, inStock: true }
    ],
    highlights: [
      "100% A2 Beta-Casein Protein (zero A1)",
      "Danedar (Granular) golden texture",
      "Cruelty-free: Calves fed first (Dohan method)",
      "Zero chemicals, artificial essence, or preservatives"
    ],
    nutrition: {
      servingSize: "10g",
      energy: "897 kcal / 100g",
      fat: "99.7g",
      saturatedFat: "65g",
      omega3: "1.8g",
      cholesterol: "250mg",
      protein: "0g"
    },
    batch: {
      code: "MS-GHEE-B42",
      mfgDate: "10 Oct 2026",
      expiryDate: "09 Oct 2027",
      farm: "Devbhumi Gir Sanctuary Farm, Gujarat",
      butterfatPurity: "99.8%",
      chemicalResidue: "0.00% (Nil)",
      rmValue: "28.4 (Standard: 28-32)",
      peroxideValue: "0.4 meq/kg (Superior Freshness)"
    }
  },
  {
    id: "mustard-oil-kacchi-ghani",
    name: "Wood-Pressed Kacchi Ghani Mustard Oil",
    hindiName: "कच्ची घानी सरसों का तेल",
    category: "oils",
    tagline: "Cold crushed in wooden Kolhu below 38°C from indigenous black mustard seeds",
    badge: "Farm Favourite",
    method: "Slow Wooden Chekku Press",
    origin: "Alwar & Bharatpur, Rajasthan",
    shelfLife: "9 Months",
    rating: 4.8,
    reviewsCount: 247,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    description: "Extracted without external heating, solvents, or bleaching. We use whole organic black mustard (Sarson) seeds sourced directly from farmers in the Chambal-Alwar belt. Crushed at under 14 RPM in traditional Vaagai wood churns, the natural pungency (allyl isothiocyanate) and essential fatty acids remain 100% intact. Ideal for daily Indian tadka, pickles, and traditional body massage.",
    variants: [
      { size: "1 Litre", price: 320, mrp: 380, inStock: true },
      { size: "5 Litre Can", price: 1520, mrp: 1800, inStock: true }
    ],
    highlights: [
      "Natural tears-inducing sharp pungency",
      "Zero argemone oil & zero synthetic adulterants",
      "Unrefined & single-filtered via cotton muslin",
      "Optimal 1:1.2 Omega-3 to Omega-6 ratio"
    ],
    nutrition: {
      servingSize: "15ml",
      energy: "884 kcal / 100ml",
      fat: "100g",
      monounsaturated: "60g",
      polyunsaturated: "22g",
      saturatedFat: "8g",
      vitaminE: "34mg"
    },
    batch: {
      code: "MS-OIL-M108",
      mfgDate: "15 Oct 2026",
      expiryDate: "14 Jul 2027",
      farm: "Mewat Organic Farmers FPO, Alwar",
      purityTest: "100% Pure Mustard Oil",
      argemoneTest: "Negative (Absent)",
      erucicAcid: "Within statutory organic limits",
      acidValue: "1.1 (Standard: <4.0)"
    }
  },
  {
    id: "rice-kalanamak-aromatic",
    name: "Heirloom Kalanamak Buddha Rice",
    hindiName: "सुगंधित कालानमक चावल",
    category: "rice",
    tagline: "The ancient black-husked scented pearl of the Himalayan foothills",
    badge: "Rare Heritage",
    method: "Unpolished & Naturally Aged 12 Mos",
    origin: "Terai Belt, Siddharthnagar, UP",
    shelfLife: "18 Months",
    rating: 4.9,
    reviewsCount: 168,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    description: "Known since the 6th century BCE as the gift of Lord Buddha, Kalanamak is an ancient, naturally scented non-Basmati heritage rice. Our grain is kept unpolished with its nutrient-dense aleurone layer intact. While cooking, it fills the house with a distinctive floral earthy aroma, and stays light and non-sticky with a remarkably low Glycemic Index (GI).",
    variants: [
      { size: "1 kg", price: 210, mrp: 260, inStock: true },
      { size: "5 kg Cloth Bag", price: 980, mrp: 1200, inStock: true }
    ],
    highlights: [
      "Low Glycemic Index (Safe for diabetics)",
      "4x more Iron & 2x more Zinc than regular polished rice",
      "100% Unpolished; natural bran intact",
      "Packed in breathable unbleached cotton bag"
    ],
    nutrition: {
      servingSize: "50g raw",
      energy: "354 kcal / 100g",
      carbohydrates: "77g",
      protein: "9.2g",
      dietaryFiber: "4.8g",
      iron: "4.5mg",
      zinc: "3.2mg"
    },
    batch: {
      code: "MS-RICE-KN77",
      mfgDate: "20 Sep 2026",
      expiryDate: "19 Mar 2028",
      farm: "Sakya Valley Heirloom Collective, UP",
      polishingLoss: "0% (Raw unpolished)",
      pesticides: "Not Detected (0.0 ppm)",
      aromaCompounds: "Standard 2-AP Peak Verified"
    }
  },
  {
    id: "wheat-kathiya-stoneground",
    name: "Kathiya Wheat Stone-Ground Chakki Atta",
    hindiName: "कठिया गेहूं का चक्की आटा",
    category: "grains",
    tagline: "Milled at slow speed on natural emery stones with 100% bran intact",
    badge: "Daily Essential",
    method: "Slow Cold Stone Chakki",
    origin: "Malwa Plateau, Madhya Pradesh",
    shelfLife: "4 Months (Zero Preservatives)",
    rating: 4.8,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    description: "Unlike commercial supermarket flours where the germ and fiber-rich bran are removed to increase shelf life, Mitti Se Kathiya Atta is milled from rain-fed, golden Durum-family Kathiya wheat. Grated slowly on traditional water/motor-driven stone chakkis without heating the grain, preserving living digestive enzymes, dietary fiber, and sweet natural taste for super soft rotis.",
    variants: [
      { size: "5 kg Eco-Sack", price: 395, mrp: 450, inStock: true },
      { size: "10 kg Eco-Sack", price: 760, mrp: 880, inStock: true }
    ],
    highlights: [
      "100% Whole Grain with intact bran & germ",
      "Milled fresh every week in small batches",
      "Zero maida mixing, zero chemical bleaching (potassium bromate free)",
      "High natural elasticity and deep golden rotis"
    ],
    nutrition: {
      servingSize: "100g",
      energy: "341 kcal",
      carbohydrates: "71g",
      protein: "12.8g",
      dietaryFiber: "11.5g",
      fat: "1.9g"
    },
    batch: {
      code: "MS-ATTA-KT09",
      mfgDate: "02 Nov 2026",
      expiryDate: "01 Mar 2027",
      farm: "Sehore Bio-Farms Cluster, MP",
      branContent: "100% Whole Kernel",
      bleachingAgents: "Nil / Not Added",
      glutenQuality: "High Elasticity Natural"
    }
  },
  {
    id: "sesame-oil-wood-pressed",
    name: "Wood-Pressed Til (Sesame) Oil",
    hindiName: "लकड़ी घाणी शुद्ध तिल का तेल",
    category: "oils",
    tagline: "Pure unrefined golden sesame oil crushed with natural palm jaggery",
    badge: "Ayurvedic Grade",
    method: "Traditional Wood Chekku",
    origin: "Saurashtra, Gujarat",
    shelfLife: "9 Months",
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    description: "Known in Ayurveda as 'Taila' (the father of all oils). Cold crushed from natural white and brown sesame seeds with a pinch of palm jaggery in traditional wooden churners. Retains sesamol, sesamolin, and vitamin E, giving it exceptional antioxidant stability and an irresistible nutty aroma.",
    variants: [
      { size: "500 ml", price: 380, mrp: 440, inStock: true },
      { size: "1 Litre", price: 720, mrp: 820, inStock: true }
    ],
    highlights: [
      "High Sesamin & Sesamol antioxidant balance",
      "Unrefined, unbleached, and unheated",
      "Superb for South Indian tadka, milagai podi, and oil pulling",
      "Glass bottle packaging"
    ],
    nutrition: {
      servingSize: "15ml",
      energy: "884 kcal / 100ml",
      fat: "100g",
      polyunsaturated: "42g",
      monounsaturated: "40g",
      saturatedFat: "14g"
    },
    batch: {
      code: "MS-OIL-TL55",
      mfgDate: "18 Oct 2026",
      expiryDate: "17 Jul 2027",
      farm: "Somnath Agro Ecological Network, Gujarat",
      sesamolLevel: "High Natural Retention",
      adulteration: "0% (Pure Sesame)"
    }
  },
  {
    id: "rice-red-rakthashali",
    name: "Ancient Rakthashali Red Rice",
    hindiName: "प्राचीन रक्तशाली लाल चावल",
    category: "rice",
    tagline: "Rare Ayurvedic medicinal rice mentioned in the Charaka Samhita",
    badge: "Immunity Rich",
    method: "Sun-Dried & Hand-Pounded Style",
    origin: "Palakkad Gap, Kerala",
    shelfLife: "12 Months",
    rating: 4.8,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    description: "Rakthashali is celebrated in Charaka Samhita as the finest among all rices for boosting Tridosha balance, purifying the blood, and rejuvenating the cells. Grown by traditional tribal seed keepers without chemical fertilizers, this unpolished red rice has a distinct earthy, nutty flavor and a firm chew.",
    variants: [
      { size: "1 kg", price: 230, mrp: 280, inStock: true },
      { size: "3 kg Cloth Bag", price: 650, mrp: 780, inStock: true }
    ],
    highlights: [
      "Rich in natural anthocyanin red antioxidants",
      "Tridosha balancing (Vata, Pitta, Kapha)",
      "Unpolished with germ layer intact",
      "High mineral bioavailability"
    ],
    nutrition: {
      servingSize: "50g raw",
      energy: "360 kcal / 100g",
      protein: "8.5g",
      dietaryFiber: "5.2g",
      iron: "5.1mg",
      magnesium: "112mg"
    },
    batch: {
      code: "MS-RICE-RD21",
      mfgDate: "05 Oct 2026",
      expiryDate: "04 Oct 2027",
      farm: "Wayanad Tribal Seed Conservation Collective",
      polishing: "0% Bran Retained",
      chemicalPesticides: "0.00 ppm (Clean Soil Certified)"
    }
  },
  {
    id: "honey-wild-satpura",
    name: "Raw Wild Flora Forest Honey",
    hindiName: "जंगली सतपुड़ा कच्चा शहद",
    category: "honey",
    tagline: "Collected by indigenous tribals from cliff bees in deep Satpura forests",
    badge: "100% Unprocessed",
    method: "Gravity-Strained, Unheated",
    origin: "Satpura Mountain Biosphere, MP",
    shelfLife: "24 Months (Never Spoils)",
    rating: 4.9,
    reviewsCount: 219,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    description: "Our wild honey is sustainably harvested by forest dwellers from the nests of Apis Dorsata (giant rock bees) pollinating medicinal flora like Mahua, Jamun, Palash, and Neem. It is cold gravity-filtered through natural cheesecloth. Never heated, never micro-filtered, and never fed with inverted sugar syrup. Contains live propolis, pollen grains, and bio-active enzymes.",
    variants: [
      { size: "500 g Glass Jar", price: 550, mrp: 650, inStock: true },
      { size: "1 kg Glass Jar", price: 990, mrp: 1200, inStock: true }
    ],
    highlights: [
      "Naturally crystallizes in winter (mark of genuine honey)",
      "Rich in active pollen, propolis & royal jelly traces",
      "NMR tested for zero corn/rice syrup adulteration",
      "Collected sustainably without harming wild bee colonies"
    ],
    nutrition: {
      servingSize: "20g",
      energy: "304 kcal / 100g",
      naturalSugars: "82g",
      fructoseGlucoseRatio: "1.25",
      protein: "0.3g",
      enzymaticActivity: "High Diastase Number"
    },
    batch: {
      code: "MS-HNY-ST33",
      mfgDate: "12 Oct 2026",
      expiryDate: "11 Oct 2028",
      farm: "Satpura Tribal Honey Collectors Sangham",
      nmrTest: "100% Authentic Flower Nectar",
      addedSyrups: "0% (Passed Carbon Isotope C4 test)",
      moistureLevel: "18.2% (Perfect Shelf Stability)"
    }
  },
  {
    id: "groundnut-oil-wood-pressed",
    name: "Wood-Pressed Groundnut (Peanut) Oil",
    hindiName: "कच्ची घानी मूंगफली का तेल",
    category: "oils",
    tagline: "Cold pressed from sun-dried Saurashtra groundnuts with rich nutty taste",
    badge: "Kitchen Staple",
    method: "Wooden Kolhu Press",
    origin: "Junagadh, Gujarat",
    shelfLife: "9 Months",
    rating: 4.8,
    reviewsCount: 175,
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=800&q=80",
    description: "Made from native Saurashtra red-skin peanuts that are slow-dried under the desert sun. Crushed at room temperature in neem wood expellers, producing an aromatic, light golden oil with a high smoke point (230°C)—making it the healthiest choice for daily Indian frying, roasting, and curries.",
    variants: [
      { size: "1 Litre", price: 340, mrp: 400, inStock: true },
      { size: "5 Litre Can", price: 1620, mrp: 1900, inStock: true }
    ],
    highlights: [
      "Natural nutty aroma & sweet undertone",
      "High smoke point: Excellent for traditional deep frying",
      "Zero trans fats, zero mineral oils, zero hexane",
      "Naturally sedimented & sun-settled"
    ],
    nutrition: {
      servingSize: "15ml",
      energy: "884 kcal / 100ml",
      fat: "100g",
      monounsaturated: "52g",
      polyunsaturated: "32g",
      saturatedFat: "16g",
      resveratrol: "Present"
    },
    batch: {
      code: "MS-OIL-GN12",
      mfgDate: "22 Oct 2026",
      expiryDate: "21 Jul 2027",
      farm: "Gir Somnath Peanut Farmers Collective",
      aflatoxinTest: "Safe / Undetected (<2 ppb)",
      refiningAgents: "None (Raw & Unprocessed)"
    }
  }
];

// Comparison Matrix Data
const COMPARISON_DATA = [
  {
    aspect: "Extraction / Processing Method",
    industrial: "High heat (200°C+) with hexane chemical solvents, degummed, bleached, and deodorized.",
    mittiSe: "Slow cold-press in wooden Kolhus & stone mills under 38°C. No heating, no chemicals."
  },
  {
    aspect: "Ghee Preparation",
    industrial: "Commercial cream/butter melted and boiled rapidly with artificial flavor enhancers.",
    mittiSe: "Vedic Bilona method: Whole milk turned to curd, hand-churned for butter, slow boiled over cow dung chulha."
  },
  {
    aspect: "Grain & Rice Processing",
    industrial: "Polished 3-4 times to strip fiber, aleurone layer & minerals so it stays glossy for years.",
    mittiSe: "Unpolished, unbleached, retaining whole bran, germ, living enzymes, and natural aroma."
  },
  {
    aspect: "Farmer Fairness & Origin",
    industrial: "Anonymous aggregated grain from middlemen with zero traceability.",
    mittiSe: "Single-origin directly from dedicated organic farmer collectives with batch QR codes."
  },
  {
    aspect: "Packaging & Freshness",
    industrial: "Low-grade single-use plastic pouches that leach microplastics into oils and fats.",
    mittiSe: "Food-grade amber glass jars, recyclable metal tins, and unbleached cotton/paper sacks."
  }
];

// Customer Testimonials
const TESTIMONIALS = [
  {
    name: "Dr. Ananya Sharma",
    city: "New Delhi",
    role: "Integrative Nutritionist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    text: "The Danedar texture of Mitti Se's A2 Bilona Ghee took me back to my grandmother’s kitchen in Rohtak. You can smell the earthiness and grass-fed nourishment the moment you unseal the jar.",
    rating: 5,
    product: "A2 Gir Cow Vedic Bilona Ghee"
  },
  {
    name: "Vikramaditya Sengupta",
    city: "Kolkata",
    role: "Heritage Food Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    text: "Their wood-pressed Kacchi Ghani mustard oil has that authentic sharp jhal (pungency) that makes authentic Shorshe Ilish and pickle preparation sing. It’s impossible to go back to refined store oils.",
    rating: 5,
    product: "Wood-Pressed Kacchi Ghani Mustard Oil"
  },
  {
    name: "Pooja Hegde",
    city: "Bengaluru",
    role: "Mother & Clean Eating Advocate",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    text: "The Kalanamak rice aroma fills the entire apartment when it's boiling. The fact that I can look up the exact lab test report and farmer village via the batch code gives me total peace of mind.",
    rating: 5,
    product: "Heirloom Kalanamak Buddha Rice"
  }
];
