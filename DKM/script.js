/* ==========================================================================
   DIGITAL KIRANA MART - JAVASCRIPT LOGIC (script.js)
   चरण 2: संपूर्ण प्रोडक्ट्स डेटासेट, लाइव रेट्स, कार्ट, फ्री डिलीवरी मीटर,
   स्मार्ट अकाउंट (localStorage), द्विभाषी भाषा स्विच (Bilingual Toggle),
   कन्फ़ेट्टी सेलिब्रेशन, WhatsApp ऑर्डर व असली थर्मल प्रिंट रसीद (Print Bill)
   ========================================================================== */

// 🛡️ 1. ग्लोबल इमेज लोड एरर फॉलबैक (Bulletproof Image Fallbacks - Capturing Phase)
window.addEventListener("error", function(e) {
  if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === "img") {
    if (!e.target.dataset.fallbackApplied) {
      e.target.dataset.fallbackApplied = "true";
      e.target.src = "https://placehold.co/400x400/f8fafc/0f172a?text=Fresh+Kirana";
    }
  }
}, true);

/* =============================================================
   1. संपूर्ण प्रोडक्ट्स डेटासेट (PRODUCTS DATABASE)
   चावल की 5+ किस्में, मसालों की पूरी रेंज (100% सटीक तस्वीरें),
   तेल-घी, दालें, आटा, स्नैक्स, पेय, ब्रेकफास्ट और ड्राई फ्रूट्स
   हर उत्पाद में ⭐ 4.8+ रेटिंग और Bestseller बैज
   ============================================================= */
let PRODUCTS = [
  // ----------------- 1. चावल की 5+ किस्में (RICE VARIETIES) -----------------
  {
    id: 1,
    title: "इंडिया गेट क्लासिक बासमती चावल (Aged Rice)",
    titleEn: "India Gate Classic Premium Aged Basmati Rice",
    brand: "India Gate",
    category: "grains",
    subCategory: "rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "4.8k",
    tag: "#1 Bestseller बासमती",
    variants: [
      { weight: "1 kg", price: 195, mrp: 240, save: 45 },
      { weight: "5 kg", price: 920, mrp: 1150, save: 230 },
      { weight: "10 kg", price: 1780, mrp: 2250, save: 470 }
    ]
  },
  {
    id: 2,
    title: "दावत रोज़ाना सुपर बासमती चावल",
    titleEn: "Daawat Rozana Super Everyday Basmati Rice",
    brand: "Daawat",
    category: "grains",
    subCategory: "rice",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "3.2k",
    tag: "रोज़ाना के लिए बेस्ट",
    variants: [
      { weight: "1 kg", price: 82, mrp: 105, save: 23 },
      { weight: "5 kg", price: 390, mrp: 490, save: 100 },
      { weight: "10 kg", price: 760, mrp: 960, save: 200 }
    ]
  },
  {
    id: 3,
    title: "फॉर्च्यून स्पेशल बिरयानी क्लासिक बासमती",
    titleEn: "Fortune Special Biryani Classic Long Grain Basmati",
    brand: "Fortune",
    category: "grains",
    subCategory: "rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "2.1k",
    tag: "एक्स्ट्रा लंबा दाना",
    variants: [
      { weight: "1 kg", price: 145, mrp: 185, save: 40 },
      { weight: "5 kg", price: 690, mrp: 880, save: 190 },
      { weight: "10 kg", price: 1340, mrp: 1720, save: 380 }
    ]
  },
  {
    id: 4,
    title: "रॉयल सोना मसूरी स्टीम चावल (Sona Masoori)",
    titleEn: "Royal Sona Masoori Lightweight Steam Rice",
    brand: "India Gate",
    category: "grains",
    subCategory: "rice",
    image: "https://images.unsplash.com/photo-1568271679792-dd7c140d04c6?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "1.9k",
    tag: "हल्का व आसानी से पचने वाला",
    variants: [
      { weight: "1 kg", price: 68, mrp: 85, save: 17 },
      { weight: "5 kg", price: 320, mrp: 410, save: 90 },
      { weight: "10 kg", price: 610, mrp: 790, save: 180 }
    ]
  },
  {
    id: 5,
    title: "वाडा कोलम स्टीम प्रीमियम चावल (Kolam Rice)",
    titleEn: "Wada Kolam Steam Premium Soft Cook Rice",
    brand: "Daawat",
    category: "grains",
    subCategory: "rice",
    image: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "1.5k",
    tag: "मुलायम और खुशबूदार",
    variants: [
      { weight: "1 kg", price: 74, mrp: 95, save: 21 },
      { weight: "5 kg", price: 355, mrp: 460, save: 105 },
      { weight: "10 kg", price: 680, mrp: 890, save: 210 }
    ]
  },
  {
    id: 6,
    title: "ऑर्गेनिक ब्राउन राइस (High Fibre Brown Rice)",
    titleEn: "Organic 100% Whole Grain Healthy Brown Rice",
    brand: "Tata Sampann",
    category: "grains",
    subCategory: "rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "980",
    tag: "हाई फाइबर व डाइट फ्रेंडली",
    variants: [
      { weight: "1 kg", price: 110, mrp: 140, save: 30 },
      { weight: "5 kg", price: 520, mrp: 670, save: 150 },
      { weight: "10 kg", price: 990, mrp: 1290, save: 300 }
    ]
  },

  // ----------------- 2. मसाले व खड़े मसाले (SPICES & WHOLE SPICES) -----------------
  // 100% सटीक तस्वीरें: मिर्च में लाल मिर्च, हल्दी में हल्दी, जीरे में जीरा
  {
    id: 7,
    title: "एवरेस्ट तीखालाल शुद्ध लाल मिर्च पाउडर",
    titleEn: "Everest Tikhalal Pure Red Chilli Powder",
    brand: "Everest",
    category: "spices",
    subCategory: "mirch",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "5.2k",
    tag: "#1 Bestseller मिर्च",
    variants: [
      { weight: "100 g", price: 46, mrp: 55, save: 9 },
      { weight: "250 g", price: 110, mrp: 135, save: 25 },
      { weight: "500 g", price: 215, mrp: 265, save: 50 },
      { weight: "1 kg", price: 410, mrp: 510, save: 100 }
    ]
  },
  {
    id: 8,
    title: "एवरेस्ट शुद्ध हल्दी पाउडर (Golden Turmeric)",
    titleEn: "Everest Pure Golden Turmeric Haldi Powder",
    brand: "Everest",
    category: "spices",
    subCategory: "haldi",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "4.7k",
    tag: "नेचुरल करक्यूमिन युक्त",
    variants: [
      { weight: "100 g", price: 36, mrp: 44, save: 8 },
      { weight: "250 g", price: 86, mrp: 105, save: 19 },
      { weight: "500 g", price: 165, mrp: 205, save: 40 },
      { weight: "1 kg", price: 315, mrp: 395, save: 80 }
    ]
  },
  {
    id: 9,
    title: "एमडीएच शुद्ध धनिया पाउडर (Dhaniya Powder)",
    titleEn: "MDH Dhania Pure Ground Coriander Powder",
    brand: "MDH",
    category: "spices",
    subCategory: "dhaniya",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "3.4k",
    tag: "ताजा पिसा सुगंधित",
    variants: [
      { weight: "100 g", price: 38, mrp: 46, save: 8 },
      { weight: "250 g", price: 90, mrp: 112, save: 22 },
      { weight: "500 g", price: 172, mrp: 215, save: 43 },
      { weight: "1 kg", price: 330, mrp: 420, save: 90 }
    ]
  },
  {
    id: 10,
    title: "एमडीएच शाही गरम मसाला (Shahi Garam Masala)",
    titleEn: "MDH Shahi Garam Masala Authentic Aromatic Blend",
    brand: "MDH",
    category: "spices",
    subCategory: "masala",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "4.9k",
    tag: "शाही सुगंध व स्वाद",
    variants: [
      { weight: "100 g", price: 92, mrp: 110, save: 18 },
      { weight: "250 g", price: 220, mrp: 265, save: 45 },
      { weight: "500 g", price: 425, mrp: 515, save: 90 },
      { weight: "1 kg", price: 830, mrp: 1010, save: 180 }
    ]
  },
  {
    id: 11,
    title: "एवरेस्ट साबुत जीरा (Pure Whole Cumin Seeds)",
    titleEn: "Everest Whole Cumin Seeds Sabut Jeera",
    brand: "Everest",
    category: "spices",
    subCategory: "jeera",
    image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "3.8k",
    tag: "साफ व कुरकुरा तड़का",
    variants: [
      { weight: "100 g", price: 62, mrp: 78, save: 16 },
      { weight: "250 g", price: 150, mrp: 190, save: 40 },
      { weight: "500 g", price: 290, mrp: 370, save: 80 },
      { weight: "1 kg", price: 560, mrp: 720, save: 160 }
    ]
  },
  {
    id: 12,
    title: "कैच कस्तूरी मेथी व शुद्ध हींग ब्लेंड",
    titleEn: "Catch Pure Kasuri Methi & Royal Hing Combo",
    brand: "Everest",
    category: "spices",
    subCategory: "hing",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "2.3k",
    tag: "लाजवाब तड़का खुशबू",
    variants: [
      { weight: "100 g", price: 55, mrp: 70, save: 15 },
      { weight: "250 g", price: 130, mrp: 165, save: 35 },
      { weight: "500 g", price: 250, mrp: 320, save: 70 }
    ]
  },

  // ----------------- 3. तेल व शुद्ध देशी घी (OILS & GHEE) -----------------
  {
    id: 13,
    title: "अमूल स्पेशल शुद्ध देशी गाय का घी",
    titleEn: "Amul Pure Cow Ghee Tins / Refill Pouch",
    brand: "Amul",
    category: "oils",
    subCategory: "ghee",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "6.1k",
    tag: "#1 Bestseller देशी घी",
    variants: [
      { weight: "500 ml", price: 315, mrp: 345, save: 30 },
      { weight: "1 Litre", price: 615, mrp: 680, save: 65 },
      { weight: "2 Litre", price: 1210, mrp: 1350, save: 140 },
      { weight: "5 Litre", price: 2980, mrp: 3350, save: 370 }
    ]
  },
  {
    id: 14,
    title: "फॉर्च्यून कच्ची घानी शुद्ध सरसों का तेल",
    titleEn: "Fortune Kachi Ghani Pure Mustard Cold-Pressed Oil",
    brand: "Fortune",
    category: "oils",
    subCategory: "mustard",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "4.5k",
    tag: "तीखा व 100% शुद्ध",
    variants: [
      { weight: "1 Litre", price: 138, mrp: 165, save: 27 },
      { weight: "2 Litre", price: 272, mrp: 325, save: 53 },
      { weight: "5 Litre", price: 665, mrp: 790, save: 125 }
    ]
  },
  {
    id: 15,
    title: "फॉर्च्यून सनलाइट रिफाइंड सनफ्लावर ऑइल",
    titleEn: "Fortune Sunlite Refined Cooking Sunflower Oil",
    brand: "Fortune",
    category: "oils",
    subCategory: "sunflower",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "4.1k",
    tag: "लाइट व हेल्दी कुकिंग",
    variants: [
      { weight: "1 Litre", price: 145, mrp: 190, save: 45 },
      { weight: "2 Litre", price: 285, mrp: 375, save: 90 },
      { weight: "5 Litre", price: 695, mrp: 910, save: 215 }
    ]
  },
  {
    id: 16,
    title: "सफ़ोला गोल्ड प्रो-हेल्दी हार्ट कुकिंग ऑइल",
    titleEn: "Saffola Gold Blended Healthy Cooking Oil",
    brand: "Fortune",
    category: "oils",
    subCategory: "refined",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "3.6k",
    tag: "दिल के लिए सुरक्षित",
    variants: [
      { weight: "1 Litre", price: 168, mrp: 210, save: 42 },
      { weight: "2 Litre", price: 330, mrp: 415, save: 85 },
      { weight: "5 Litre", price: 799, mrp: 1010, save: 211 }
    ]
  },

  // ----------------- 4. दालें व आटा (DAL, PULSES & ATTA) -----------------
  {
    id: 17,
    title: "टाटा सम्पन्न अनपॉलिश्ड अरहर / तुअर दाल",
    titleEn: "Tata Sampann Unpolished Protein Rich Toor Dal",
    brand: "Tata Sampann",
    category: "grains",
    subCategory: "dal",
    image: "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "5.4k",
    tag: "100% अनपॉलिश्ड शुद्ध प्रोटीन",
    variants: [
      { weight: "500 g", price: 92, mrp: 110, save: 18 },
      { weight: "1 kg", price: 178, mrp: 215, save: 37 },
      { weight: "2 kg", price: 350, mrp: 425, save: 75 },
      { weight: "5 kg", price: 860, mrp: 1050, save: 190 }
    ]
  },
  {
    id: 18,
    title: "टाटा सम्पन्न मूंग दाल (धुली पीली दाल)",
    titleEn: "Tata Sampann Yellow Moong Dal (Dhuli)",
    brand: "Tata Sampann",
    category: "grains",
    subCategory: "dal",
    image: "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "3.1k",
    tag: "स्वादिष्ट व पौष्टिक",
    variants: [
      { weight: "500 g", price: 78, mrp: 95, save: 17 },
      { weight: "1 kg", price: 152, mrp: 185, save: 33 },
      { weight: "2 kg", price: 298, mrp: 365, save: 67 }
    ]
  },
  {
    id: 19,
    title: "टाटा सम्पन्न चना दाल (Unpolished Chana Dal)",
    titleEn: "Tata Sampann High Protein Chana Dal",
    brand: "Tata Sampann",
    category: "grains",
    subCategory: "dal",
    image: "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "2.7k",
    tag: "प्राकृतिक स्वाद व खुशबू",
    variants: [
      { weight: "500 g", price: 58, mrp: 72, save: 14 },
      { weight: "1 kg", price: 112, mrp: 140, save: 28 },
      { weight: "2 kg", price: 218, mrp: 275, save: 57 }
    ]
  },
  {
    id: 20,
    title: "आशीर्वाद शुद्ध चक्की 100% साबुत गेहूं आटा",
    titleEn: "Aashirvaad Shuddh Chakki 100% Whole Wheat Atta",
    brand: "Aashirvaad",
    category: "grains",
    subCategory: "atta",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "7.8k",
    tag: "#1 Bestseller आटा",
    variants: [
      { weight: "1 kg", price: 48, mrp: 55, save: 7 },
      { weight: "5 kg", price: 228, mrp: 265, save: 37 },
      { weight: "10 kg", price: 435, mrp: 510, save: 75 }
    ]
  },
  {
    id: 21,
    title: "राजधानी सुपरफाइन शुद्ध चना बेसन",
    titleEn: "Rajdhani Superfine Pure Gram Flour Besan",
    brand: "Tata Sampann",
    category: "grains",
    subCategory: "besan",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "1.9k",
    tag: "कढ़ी व पकौड़ों के लिए उत्तम",
    variants: [
      { weight: "500 g", price: 55, mrp: 68, save: 13 },
      { weight: "1 kg", price: 105, mrp: 130, save: 25 },
      { weight: "2 kg", price: 205, mrp: 255, save: 50 }
    ]
  },

  // ----------------- 5. कोल्ड ड्रिंक्स व जूस (COLD DRINKS & JUICES) -----------------
  {
    id: 22,
    title: "कोका-कोला ओरिजिनल चिल्ड टेस्ट (Coca-Cola)",
    titleEn: "Coca-Cola Original Refreshing Taste Cold Drink",
    brand: "Coca-Cola",
    category: "drinks",
    subCategory: "soda",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "5.1k",
    tag: "ठंडी और रिफ्रेशिंग",
    variants: [
      { weight: "250 ml", price: 20, mrp: 20, save: 0 },
      { weight: "750 ml", price: 40, mrp: 45, save: 5 },
      { weight: "1.25 Litre", price: 65, mrp: 75, save: 10 },
      { weight: "2.25 Litre", price: 92, mrp: 105, save: 13 }
    ]
  },
  {
    id: 23,
    title: "थम्स अप तूफानी थंडर टेस्ट (Thums Up)",
    titleEn: "Thums Up Charged Strong Taste Soft Drink",
    brand: "Coca-Cola",
    category: "drinks",
    subCategory: "soda",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "4.3k",
    tag: "तूफानी टेस्ट",
    variants: [
      { weight: "250 ml", price: 20, mrp: 20, save: 0 },
      { weight: "750 ml", price: 40, mrp: 45, save: 5 },
      { weight: "2.25 Litre", price: 92, mrp: 105, save: 13 }
    ]
  },
  {
    id: 24,
    title: "रियल फ्रूट पावर मिक्स्ड फ्रूट जूस",
    titleEn: "Real Fruit Power 100% Mixed Fruit Natural Juice",
    brand: "Coca-Cola",
    category: "drinks",
    subCategory: "juice",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "2.8k",
    tag: "विटामिन सी से भरपूर",
    variants: [
      { weight: "1 Litre", price: 115, mrp: 135, save: 20 },
      { weight: "2 Litre", price: 220, mrp: 265, save: 45 }
    ]
  },
  {
    id: 25,
    title: "स्प्राइट फ्रेश लाइम चिल्ड कोल्ड ड्रिंक (Sprite)",
    titleEn: "Sprite Refreshing Lemon-Lime Chilled Drink",
    brand: "Coca-Cola",
    category: "drinks",
    subCategory: "soda",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "3.7k",
    tag: "प्यास बुझाए तुरंत",
    variants: [
      { weight: "250 ml", price: 20, mrp: 20, save: 0 },
      { weight: "750 ml", price: 40, mrp: 45, save: 5 },
      { weight: "2.25 Litre", price: 92, mrp: 105, save: 13 }
    ]
  },

  // ----------------- 6. नमकीन व स्नैक्स (SNACKS & NAMKEEN) -----------------
  {
    id: 26,
    title: "हल्दीराम नागपुर भुजिया सेव नमकीन",
    titleEn: "Haldiram's Nagpur Famous Crispy Bhujia Sev",
    brand: "Haldiram's",
    category: "snacks",
    subCategory: "namkeen",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "6.8k",
    tag: "#1 Bestseller नमकीन",
    variants: [
      { weight: "200 g", price: 55, mrp: 65, save: 10 },
      { weight: "400 g", price: 105, mrp: 125, save: 20 },
      { weight: "1 kg", price: 245, mrp: 295, save: 50 }
    ]
  },
  {
    id: 27,
    title: "लेज़ क्लासिक क्रीम व अनियन पोटैटो चिप्स",
    titleEn: "Lay's American Style Cream & Onion Potato Chips",
    brand: "Haldiram's",
    category: "snacks",
    subCategory: "chips",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "4.4k",
    tag: "सुपर क्रंची स्वाद",
    variants: [
      { weight: "90 g", price: 38, mrp: 40, save: 2 },
      { weight: "160 g", price: 68, mrp: 75, save: 7 }
    ]
  },
  {
    id: 28,
    title: "कुरकुरे चटपटा मसाला मंच (Kurkure Crunchy)",
    titleEn: "Kurkure Chatpata Masala Munch Crunchy Snacks",
    brand: "Haldiram's",
    category: "snacks",
    subCategory: "chips",
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "3.9k",
    tag: "चटपटा देसी स्वाद",
    variants: [
      { weight: "90 g", price: 38, mrp: 40, save: 2 },
      { weight: "160 g", price: 68, mrp: 75, save: 7 }
    ]
  },
  {
    id: 29,
    title: "हल्दीराम स्पेशल टेस्टी पीनट्स व आलू भुजिया",
    titleEn: "Haldiram's Spicy Aloo Bhujia & Roasted Peanuts",
    brand: "Haldiram's",
    category: "snacks",
    subCategory: "namkeen",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "3.2k",
    tag: "चाय के साथ बेस्ट स्नैक",
    variants: [
      { weight: "200 g", price: 58, mrp: 68, save: 10 },
      { weight: "400 g", price: 110, mrp: 130, save: 20 },
      { weight: "1 kg", price: 255, mrp: 305, save: 50 }
    ]
  },

  // ----------------- 7. नाश्ता व इंस्टेंट फूड (BREAKFAST & MAGGI) -----------------
  {
    id: 30,
    title: "नेस्ले मैगी 2-मिनट मसाला नूडल्स",
    titleEn: "Nestle Maggi 2-Minute Masala Instant Noodles",
    brand: "Maggi",
    category: "breakfast",
    subCategory: "noodles",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "8.9k",
    tag: "#1 Bestseller नाश्ता",
    variants: [
      { weight: "4-Pack (280g)", price: 54, mrp: 60, save: 6 },
      { weight: "8-Pack (560g)", price: 104, mrp: 116, save: 12 },
      { weight: "16-Pack (1.1kg)", price: 205, mrp: 232, save: 27 }
    ]
  },
  {
    id: 31,
    title: "कैलॉग्स कॉर्न फ्लेक्स ओरिजिनल (Breakfast Cereal)",
    titleEn: "Kellogg's Corn Flakes Original Healthy Breakfast",
    brand: "Maggi",
    category: "breakfast",
    subCategory: "cereal",
    image: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "2.5k",
    tag: "एनर्जी व न्यूट्रिशन से भरपूर",
    variants: [
      { weight: "300 g", price: 115, mrp: 135, save: 20 },
      { weight: "500 g", price: 185, mrp: 220, save: 35 },
      { weight: "1 kg", price: 345, mrp: 410, save: 65 }
    ]
  },

  // ----------------- 8. प्रीमियम ड्राई फ्रूट्स (DRY FRUITS & NUTS) -----------------
  {
    id: 32,
    title: "प्रीमियम साबुत काजू दाना W240 (Whole Cashews)",
    titleEn: "Premium Whole Raw Cashews W240 Crunchy Kaju",
    brand: "Tata Sampann",
    category: "dryfruits",
    subCategory: "cashews",
    image: "https://images.unsplash.com/photo-1508061257970-4a641c4f2dd8?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "3.8k",
    tag: "सफेद व क्रंची दाने",
    variants: [
      { weight: "250 g", price: 245, mrp: 310, save: 65 },
      { weight: "500 g", price: 475, mrp: 600, save: 125 },
      { weight: "1 kg", price: 920, mrp: 1180, save: 260 }
    ]
  },
  {
    id: 33,
    title: "कैलिफ़ोर्निया बादाम गिरी (Raw California Badam)",
    titleEn: "California Whole Natural Raw Almonds Badam",
    brand: "Tata Sampann",
    category: "dryfruits",
    subCategory: "almonds",
    image: "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "4.2k",
    tag: "ताजा व 100% नेचुरल",
    variants: [
      { weight: "250 g", price: 215, mrp: 275, save: 60 },
      { weight: "500 g", price: 410, mrp: 530, save: 120 },
      { weight: "1 kg", price: 790, mrp: 1040, save: 250 }
    ]
  },
  {
    id: 34,
    title: "हरी मीठी किशमिश (Premium Seedless Green Raisins)",
    titleEn: "Premium Seedless Sweet Green Kishmish Raisins",
    brand: "Tata Sampann",
    category: "dryfruits",
    subCategory: "raisins",
    image: "https://images.unsplash.com/photo-1508061257970-4a641c4f2dd8?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "1.7k",
    tag: "मीठी नेचुरल किशमिश",
    variants: [
      { weight: "250 g", price: 120, mrp: 160, save: 40 },
      { weight: "500 g", price: 230, mrp: 310, save: 80 },
      { weight: "1 kg", price: 440, mrp: 600, save: 160 }
    ]
  }
];

/* =============================================================
   2. एप्लीकेशन स्टेट (GLOBAL APPLICATION STATE)
   ============================================================= */
let cart = []; // [{ product, variant, quantity }]
let activeCategory = 'all';
let activeBrand = 'all';
let appliedCoupon = null;
let currentLocation = "Indore - 452001";
let selectedPaymentMethod = "COD"; // 'COD' या 'UPI'
let selectedVariantMap = {}; // { [productId]: variantIndex }
let currentLanguage = 'hi'; // 'hi' या 'en'
let lastCreatedOrder = null; // हाल ही में किया गया ऑर्डर

// स्मार्ट अकाउंट सिस्टम (localStorage आधारित)
let currentUser = null; // { name, phone, address, landmark, pincode, isLoggedIn }
let userOrders = []; // ऑर्डर हिस्ट्री

// स्टॉक स्थिति (Admin Inventory Sync - localStorage)
let stockStatusMap = {};

function loadStockStatus() {
  try {
    const stored = localStorage.getItem("dkm_stock_status");
    if (stored) {
      stockStatusMap = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading stock status:", e);
  }
}

// 📦 एडमिन कस्टम प्रोडक्ट्स व प्राइस/फ़ोटो सिंक (Sync Custom Products & Price/Photo Edits from localStorage)
function syncCustomProducts() {
  try {
    const raw = localStorage.getItem("dkm_custom_products");
    if (!raw) return;
    const customList = JSON.parse(raw);
    if (!customList) return;

    const items = Array.isArray(customList) ? customList : (customList.items || customList.newProducts || []);
    const overrides = (!Array.isArray(customList) && customList.overrides) ? customList.overrides : {};

    // 1. यदि ऑब्जेक्ट-आधारित ओवरराइड्स हों
    Object.keys(overrides).forEach(idStr => {
      const prodId = Number(idStr) || idStr;
      const existing = PRODUCTS.find(p => p.id == prodId);
      if (existing) {
        const ov = overrides[idStr];
        if (ov.image) existing.image = ov.image;
        if (ov.price !== undefined && existing.variants && existing.variants.length > 0) {
          const newPrice = Number(ov.price);
          const newMrp = ov.mrp ? Number(ov.mrp) : existing.variants[0].mrp;
          existing.variants[0].price = newPrice;
          existing.variants[0].mrp = newMrp;
          existing.variants[0].save = Math.max(0, newMrp - newPrice);
        }
      }
    });

    // 2. एरे आइटम्स प्रोसेस करें (मूल्य/फ़ोटो अपडेट्स + नए जोड़े गए उत्पाद)
    items.forEach(item => {
      if (!item || !item.id) return;
      const existing = PRODUCTS.find(p => p.id == item.id);
      if (existing) {
        // मौजूदा उत्पाद पर मूल्य, MRP व फ़ोटो अपडेट करें
        if (item.image) existing.image = item.image;
        if (item.price !== undefined && existing.variants && existing.variants.length > 0) {
          const newPrice = Number(item.price);
          const newMrp = item.mrp ? Number(item.mrp) : existing.variants[0].mrp;
          existing.variants[0].price = newPrice;
          existing.variants[0].mrp = newMrp;
          existing.variants[0].save = Math.max(0, newMrp - newPrice);
        }
        if (item.title) existing.title = item.title;
        if (item.titleEn) existing.titleEn = item.titleEn;
      } else {
        // एडमिन द्वारा जोड़ा गया नया उत्पाद!
        const newPrice = Number(item.price) || 99;
        const newMrp = Number(item.mrp) || Math.round(newPrice * 1.25);
        const weightVal = item.weight || (item.variants && item.variants[0] ? item.variants[0].weight : "1 kg");
        const newProd = {
          id: item.id,
          title: item.title || "ताज़ा किराना उत्पाद",
          titleEn: item.titleEn || item.title || "Fresh Kirana Product",
          brand: item.brand || "Digital Kirana",
          category: item.category || item.cat || "grains",
          subCategory: item.subCategory || item.category || "grocery",
          image: item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
          rating: Number(item.rating) || 4.9,
          reviews: item.reviews || "150",
          tag: item.tag || "नया उत्पाद (New)",
          variants: (item.variants && item.variants.length > 0) ? item.variants : [
            {
              weight: weightVal,
              price: newPrice,
              mrp: newMrp,
              save: Math.max(0, newMrp - newPrice)
            }
          ]
        };
        PRODUCTS.push(newProd);
      }
    });
  } catch (err) {
    console.error("Error syncing custom products:", err);
  }
}

/* =============================================================
   3. पेज लोड होने पर प्रारंभ (DOM INITIALIZATION)
   ============================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // 0. एडमिन इन्वेंट्री स्टॉक व कस्टम प्रोडक्ट्स लोड करें
  loadStockStatus();
  syncCustomProducts();

  // 1. हर उत्पाद का डिफ़ॉल्ट वजन पहला (इंडेक्स 0) सेट करें
  PRODUCTS.forEach(p => {
    selectedVariantMap[p.id] = 0;
  });

  // 2. स्मार्ट अकाउंट सत्र (Session) लोड करें
  initUserSession();

  // 2b. डिफ़ॉल्ट पेमेंट मेथड (COD) व डिलीवरी स्लॉट इनिशियलाइज़ करें
  setPaymentMethod('COD', true);
  updateDeliverySlotSelection();

  // 3. प्रोडक्ट्स रेंडर करें
  renderProducts(PRODUCTS);

  // 4. लाइटनिंग डील्स रेंडर करें
  renderLightningDeals();

  // 5. आइकन्स लोड करें (Immediate + Fallback Timers for CDN sync)
  refreshLucideIcons();
  setTimeout(refreshLucideIcons, 60);
  setTimeout(refreshLucideIcons, 300);

  // 6. काउंटडाउन टाइमर्स शुरू करें
  startLightningCountdown();
  startOfferCountdown();

  // 7. सर्च इनपुट और कैटेगरी सेलेक्टर्स को बाइंड करें
  setupEventListeners();

  // 8. कार्ट की प्रारंभिक स्थिति को ताज़ा करें
  updateCartUI();
});

// 🔮 सुरक्षित Lucide आइकन्स रिफ्रेश हेल्पर
function refreshLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    try {
      window.lucide.createIcons();
    } catch (e) {
      console.warn("Lucide render notice:", e);
    }
  }
}

// ⚡ परफॉर्मेंस ऑप्टिमाइजेशन: 200ms सर्च इनपुट डिबाउंस (Debounce Helper)
function debounce(func, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function setupEventListeners() {
  const searchInput = document.getElementById("searchInput") || document.getElementById("mainSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(filterProducts, 200));
  }

  const mobileSearchInput = document.getElementById("mobileSearchInput");
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", debounce((e) => {
      if (searchInput) searchInput.value = e.target.value;
      filterProducts();
    }, 200));
  }

  const categorySelect = document.getElementById("searchCategorySelect");
  if (categorySelect) {
    categorySelect.addEventListener("change", (e) => {
      selectCategory(e.target.value, null, true);
    });
  }

  const sortSelect = document.getElementById("sortFilter");
  if (sortSelect) {
    sortSelect.addEventListener("change", filterProducts);
  }

  // विज़ुअल कैटेगरी सर्कुलर लिंक्स (केवल बिना इनलाइन onclick वाले बटनों के लिए सुरक्षित बाइंडिंग)
  const catLinks = document.querySelectorAll(".category-circle-btn:not([onclick])");
  catLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const cat = this.getAttribute("data-category");
      selectCategory(cat, this, true);
    });
  });

  // ⌨️ ग्लोबल कीबोर्ड 'Escape' (Esc) हैंडलर (Close Any Open Modal or Drawer)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggleCartDrawer(false);
      closeAccountModal();
      closeLocationModal();
      closeUpiModal();
      closeOrderSuccessModal();
      document.body.style.overflow = "auto";
    }
  });

  // मोडल बैकड्रॉप पर क्लिक करने पर बंद करने का सपोर्ट
  [
    { id: "accountModal", closeFn: closeAccountModal },
    { id: "locationModal", closeFn: closeLocationModal },
    { id: "upiModal", closeFn: closeUpiModal },
    { id: "orderSuccessModal", closeFn: closeOrderSuccessModal }
  ].forEach(m => {
    const el = document.getElementById(m.id);
    if (el) {
      el.addEventListener("click", function(event) {
        if (event.target === this) {
          m.closeFn();
        }
      });
    }
  });
}

/* =============================================================
   4. Amazon-स्टाइल "🔥 महा-बचत धमाका (Top Lightning Deals)"
   ============================================================= */
function renderLightningDeals() {
  const container = document.getElementById("lightningDealsGrid");
  if (!container) return;

  // 4 मुख्य भारी छूट वाले उत्पाद (Basmati, Pure Ghee, Almonds, Sunflower Oil)
  const dealIds = [1, 13, 33, 15];
  const deals = dealIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const claimedPercent = [78, 86, 92, 69];

  container.innerHTML = deals.map((product, idx) => {
    const variantIdx = product.variants.length > 1 ? 1 : 0;
    const variant = product.variants[variantIdx] || product.variants[0];
    const percent = claimedPercent[idx] || 75;
    const isEn = currentLanguage === 'en';

    return `
      <div class="bg-white rounded-3xl border border-slate-200/90 p-4 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 relative group">
        <div>
          <div class="flex items-center justify-between gap-1 mb-2.5">
            <span class="bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-lg shadow-xs flex items-center gap-1 font-outfit">
              <i data-lucide="zap" class="w-3 h-3 fill-current"></i>
              <span>Save ₹${variant.save}</span>
            </span>
            <span class="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              ${isEn ? '⚡ Flash Deal' : '⚡ बिजली डील'}
            </span>
          </div>

          <div class="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-slate-100 mb-3 flex items-center justify-center p-2 border border-slate-100 aspect-[4/3] sm:aspect-auto">
            <img src="${product.image}" alt="${product.title}" width="280" height="160" onerror="this.onerror=null; this.src='https://placehold.co/400x400/f8fafc/0f172a?text=Fresh+Kirana';" class="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-300" ${idx === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
            <div class="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-white px-2 py-0.5 rounded-md shadow-xs font-outfit">
              ${variant.weight}
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span class="font-extrabold text-brand-700 uppercase tracking-wider font-outfit">${product.brand}</span>
            <span class="flex items-center gap-0.5 text-amber-500 font-bold">★ ${product.rating}</span>
          </div>

          <h4 class="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2" title="${isEn ? product.titleEn : product.title}">
            ${isEn ? product.titleEn : product.title}
          </h4>

          <div class="mt-3 space-y-1">
            <div class="flex justify-between text-[10px] font-extrabold text-slate-500 font-outfit">
              <span class="text-red-600 font-bold">${percent}% ${isEn ? 'Claimed' : 'बिक चुका'}</span>
              <span class="text-slate-400">${isEn ? 'Limited Stock' : 'सीमित स्टॉक'}</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div class="deal-progress-bar h-2 rounded-full" style="width: ${percent}%"></div>
            </div>
          </div>
        </div>

        <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div class="flex items-baseline gap-1.5">
              <span class="text-base sm:text-lg font-black text-slate-900 font-outfit">₹${variant.price}</span>
              <span class="text-xs text-slate-400 line-through font-outfit">₹${variant.mrp}</span>
            </div>
          </div>
          <button onclick="addCustomVariantToCart(${product.id}, ${variantIdx})" type="button" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1 shrink-0 cursor-pointer font-outfit">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>${isEn ? 'Grab Deal' : 'लूटें (Add)'}</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  refreshLucideIcons();
}

// डील से सीधे कस्टम वजन जोड़ना
function addCustomVariantToCart(productId, variantIdx) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const variant = product.variants[variantIdx] || product.variants[0];

  const existingItem = cart.find(item => item.product.id === productId && item.variant.weight === variant.weight);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      product: product,
      variant: variant,
      quantity: 1
    });
  }

  showToast(`⚡ '${product.title} (${variant.weight})' टोकरी में जुड़ा!`);
  updateCartUI();
  refreshSingleProductButton(productId);
}

// लाइटनिंग डील उलटी गिनती टाइमर
function startLightningCountdown() {
  let seconds = 3 * 3600 + 45 * 60 + 12; // 03h:45m:12s
  const timerEl = document.getElementById("lightningDealTimer");
  if (!timerEl) return;

  setInterval(() => {
    if (seconds > 0) {
      seconds--;
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      timerEl.innerText = `${String(hrs).padStart(2, '0')}h : ${String(mins).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
    }
  }, 1000);
}

// हीरो ऑफर बैनर टाइमर
function startOfferCountdown() {
  let secondsLeft = 4 * 3600 + 30 * 60 + 15;
  const timerElement = document.getElementById("offerTimer");
  if (!timerElement) return;

  setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      const hrs = Math.floor(secondsLeft / 3600);
      const mins = Math.floor((secondsLeft % 3600) / 60);
      const secs = secondsLeft % 60;
      timerElement.innerText = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }, 1000);
}

/* =============================================================
   5. टॉप स्ट्रिप "🔥 Top Discounts" फ़िल्टर व ऑटो-स्क्रोल
   ============================================================= */
function filterTopDiscounts() {
  const sortSelect = document.getElementById("sortFilter");
  if (sortSelect) sortSelect.value = "discount";

  filterProducts();

  const target = document.getElementById("lightningDealsSection") || document.getElementById("productsSection");
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }

  showToast(currentLanguage === 'en' ? "🔥 Showing Highest Discount Products First!" : "🔥 सबसे ज्यादा बचत (Top Discounts) वाले सामान दिखाए जा रहे हैं!");
}

/* =============================================================
   6. मुख्य प्रोडक्ट ग्रिड रेंडरिंग और लाइव वजन सेलेक्टर
   ============================================================= */
function renderProducts(productsToRender) {
  const container = document.getElementById("productsGrid");
  const noFound = document.getElementById("noProductsFound");
  const countText = document.getElementById("productsCountText");

  if (!container) return;

  const isEn = currentLanguage === 'en';

  if (countText) {
    countText.innerText = isEn 
      ? `${productsToRender.length} Kirana Products Available` 
      : `${productsToRender.length} किराना उत्पाद उपलब्ध हैं`;
  }

  if (productsToRender.length === 0) {
    container.innerHTML = "";
    if (noFound) noFound.classList.remove("hidden");
    return;
  }

  if (noFound) noFound.classList.add("hidden");

  container.innerHTML = productsToRender.map(product => {
    const currentVariantIdx = selectedVariantMap[product.id] || 0;
    const currentVariant = product.variants[currentVariantIdx] || product.variants[0];
    const inStock = stockStatusMap[product.id] !== false;

    const cartItem = cart.find(item => item.product.id === product.id && item.variant.weight === currentVariant.weight);
    const qty = cartItem ? cartItem.quantity : 0;
    const displayTitle = isEn ? product.titleEn : product.title;
    const subTitle = isEn ? product.title : product.titleEn;

    return `
      <div class="product-card bg-white rounded-3xl border border-slate-200/90 p-4 flex flex-col justify-between hover:shadow-xl hover:border-brand-500/50 group relative transition-all duration-300 ${inStock ? '' : 'opacity-85'}">
        
        <div>
          <div class="flex items-center justify-between gap-1 mb-2.5">
            <span id="badge-${product.id}" class="bg-festive-500 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-lg shadow-xs font-outfit">
              ${isEn ? `Save ₹${currentVariant.save}` : `₹${currentVariant.save} की बचत`}
            </span>
            <span class="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md flex items-center gap-1 font-outfit">
              ⚡ ${isEn ? '15 Min' : '15 मिनट'}
            </span>
          </div>

          <!-- प्रोडक्ट इमेज (CLS प्रिवेंशन हेतु रिजर्व्ड कंटेनर) -->
          <div class="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3 flex items-center justify-center p-2 border border-slate-100">
            <img 
              src="${product.image}" 
              alt="${product.title}" 
              onerror="this.onerror=null; this.src='https://placehold.co/400x400/f8fafc/0f172a?text=Fresh+Kirana';"
              class="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-300 ${inStock ? '' : 'grayscale opacity-60'}"
              loading="lazy"
              decoding="async"
            >
            <div class="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-white px-2 py-0.5 rounded-md shadow-xs font-outfit">
              ${product.brand}
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span class="font-extrabold text-brand-700 uppercase tracking-wider font-outfit">${product.brand}</span>
            <span class="flex items-center gap-0.5 text-amber-500 font-bold">
              ★ ${product.rating} <span class="text-slate-400 font-normal">(${product.reviews})</span>
            </span>
          </div>

          <h3 class="font-bold text-sm text-slate-900 leading-snug line-clamp-2" title="${displayTitle}">
            ${displayTitle}
          </h3>
          <p class="text-[11px] text-slate-400 truncate mt-0.5 font-outfit">${subTitle}</p>

          <!-- वजन चुनने का विकल्प (Weight Selector Pills) -->
          <div class="mt-3 pt-2 border-t border-slate-100">
            <div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between font-outfit">
              <span>${isEn ? 'Choose Weight:' : 'वजन चुनें (Weight):'}</span>
              <span class="text-brand-700 font-bold" id="selectedWeightText-${product.id}">${currentVariant.weight}</span>
            </div>
            
            <div class="flex flex-wrap gap-1.5">
              ${product.variants.map((v, idx) => `
                <button 
                  type="button" 
                  onclick="changeProductVariant(${product.id}, ${idx})" 
                  id="varBtn-${product.id}-${idx}"
                  class="px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer font-outfit ${
                    idx === currentVariantIdx 
                      ? 'bg-brand-600 text-white shadow-xs ring-2 ring-brand-500/30' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }"
                >
                  ${v.weight}
                </button>
              `).join("")}
            </div>
          </div>

        </div>

        <!-- मूल्य, MRP और 'जोड़ें' बटन -->
        <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div class="flex items-baseline gap-1.5">
              <span class="text-base sm:text-lg font-black text-slate-900 font-outfit" id="priceDisplay-${product.id}">
                ₹${currentVariant.price}
              </span>
              <span class="text-xs text-slate-400 line-through font-outfit" id="mrpDisplay-${product.id}">
                ₹${currentVariant.mrp}
              </span>
            </div>
            <div class="text-[10px] text-emerald-600 font-bold font-outfit" id="savingDisplay-${product.id}">
              ${isEn ? `Save: ₹${currentVariant.save} OFF` : `छूट: ₹${currentVariant.save} OFF`}
            </div>
          </div>

          <div id="productBtnContainer-${product.id}">
            ${!inStock ? `
              <button 
                type="button" 
                disabled 
                class="bg-rose-50 text-rose-600 border border-rose-200 font-extrabold text-xs px-3 py-2 rounded-xl cursor-not-allowed font-outfit"
              >
                ${isEn ? 'Out of Stock' : 'स्टॉक समाप्त'}
              </button>
            ` : (qty === 0 ? `
              <button 
                onclick="addToCart(${product.id})" 
                class="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-sm hover:shadow transition active:scale-95 flex items-center gap-1 cursor-pointer font-outfit"
              >
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>${isEn ? 'Add' : 'जोड़ें'}</span>
              </button>
            ` : `
              <div class="flex items-center bg-brand-600 text-white rounded-xl overflow-hidden shadow-sm font-outfit">
                <button onclick="updateCartQuantity(${product.id}, '${currentVariant.weight}', -1)" class="px-2.5 py-1.5 hover:bg-brand-700 transition font-bold text-xs cursor-pointer">
                  <i data-lucide="minus" class="w-3.5 h-3.5"></i>
                </button>
                <span class="px-2.5 py-1 text-xs font-black bg-brand-700">${qty}</span>
                <button onclick="updateCartQuantity(${product.id}, '${currentVariant.weight}', 1)" class="px-2.5 py-1.5 hover:bg-brand-700 transition font-bold text-xs cursor-pointer">
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            `)}
          </div>

        </div>

      </div>
    `;
  }).join("");

  refreshLucideIcons();
}

// वजन बदलने पर कार्ड के मूल्य, MRP व बचत को तुरंत बदलना
function changeProductVariant(productId, variantIdx) {
  selectedVariantMap[productId] = variantIdx;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const variant = product.variants[variantIdx];
  const isEn = currentLanguage === 'en';

  const priceEl = document.getElementById(`priceDisplay-${productId}`);
  const mrpEl = document.getElementById(`mrpDisplay-${productId}`);
  const saveEl = document.getElementById(`savingDisplay-${productId}`);
  const weightLabel = document.getElementById(`selectedWeightText-${productId}`);
  const badgeEl = document.getElementById(`badge-${productId}`);

  if (priceEl) priceEl.innerText = `₹${variant.price}`;
  if (mrpEl) mrpEl.innerText = `₹${variant.mrp}`;
  if (saveEl) saveEl.innerText = isEn ? `Save: ₹${variant.save} OFF` : `छूट: ₹${variant.save} OFF`;
  if (weightLabel) weightLabel.innerText = variant.weight;
  if (badgeEl) badgeEl.innerText = isEn ? `Save ₹${variant.save}` : `₹${variant.save} की बचत`;

  // पिल्स की एक्टिव स्टाइल अपडेट करें
  product.variants.forEach((_, idx) => {
    const btn = document.getElementById(`varBtn-${productId}-${idx}`);
    if (btn) {
      if (idx === variantIdx) {
        btn.className = "px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer font-outfit bg-brand-600 text-white shadow-xs ring-2 ring-brand-500/30";
      } else {
        btn.className = "px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer font-outfit bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200";
      }
    }
  });

  refreshSingleProductButton(productId);
}

/* =============================================================
   7. कार्ट प्रबंधन (CART LOGIC & OPERATIONS)
   ============================================================= */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // यदि उत्पाद आउट ऑफ स्टॉक हो तो जोड़ना रोकें
  if (stockStatusMap[productId] === false) {
    showToast(currentLanguage === 'en' ? "⚠️ Sorry, this item is currently Out of Stock!" : "⚠️ क्षमा करें, यह उत्पाद वर्तमान में स्टॉक में नहीं है!");
    return;
  }

  const currentVariantIdx = selectedVariantMap[productId] || 0;
  const currentVariant = product.variants[currentVariantIdx] || product.variants[0];

  const existingItem = cart.find(item => item.product.id === productId && item.variant.weight === currentVariant.weight);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      product: product,
      variant: currentVariant,
      quantity: 1
    });
  }

  showToast(`✓ '${product.title} (${currentVariant.weight})' कार्ट में जोड़ा गया! 🛒`);
  updateCartUI();
  refreshSingleProductButton(productId);
}

function updateCartQuantity(productId, variantWeight, change) {
  const itemIndex = cart.findIndex(item => item.product.id === productId && item.variant.weight === variantWeight);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += change;

  if (cart[itemIndex].quantity <= 0) {
    const removedItem = cart[itemIndex];
    cart.splice(itemIndex, 1);
    showToast(`'${removedItem.product.title}' को टोकरी से हटाया गया`);
  }

  updateCartUI();
  refreshSingleProductButton(productId);
}

function refreshSingleProductButton(productId) {
  const btnContainer = document.getElementById(`productBtnContainer-${productId}`);
  if (!btnContainer) return;

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const isEn = currentLanguage === 'en';

  if (stockStatusMap[productId] === false) {
    btnContainer.innerHTML = `
      <button 
        type="button" 
        disabled 
        class="bg-rose-50 text-rose-600 border border-rose-200 font-extrabold text-xs px-3 py-2 rounded-xl cursor-not-allowed font-outfit"
      >
        ${isEn ? 'Out of Stock' : 'स्टॉक समाप्त'}
      </button>
    `;
    return;
  }

  const currentVariantIdx = selectedVariantMap[productId] || 0;
  const currentVariant = product.variants[currentVariantIdx] || product.variants[0];

  const cartItem = cart.find(item => item.product.id === productId && item.variant.weight === currentVariant.weight);
  const qty = cartItem ? cartItem.quantity : 0;

  if (qty === 0) {
    btnContainer.innerHTML = `
      <button 
        onclick="addToCart(${productId})" 
        class="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-sm hover:shadow transition active:scale-95 flex items-center gap-1 cursor-pointer font-outfit"
      >
        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
        <span>${isEn ? 'Add' : 'जोड़ें'}</span>
      </button>
    `;
  } else {
    btnContainer.innerHTML = `
      <div class="flex items-center bg-brand-600 text-white rounded-xl overflow-hidden shadow-sm font-outfit">
        <button type="button" aria-label="मात्रा घटाएं" onclick="updateCartQuantity(${productId}, '${currentVariant.weight}', -1)" class="px-2.5 py-1.5 hover:bg-brand-700 transition font-bold text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400">
          <i data-lucide="minus" class="w-3.5 h-3.5"></i>
        </button>
        <span class="px-2.5 py-1 text-xs font-black bg-brand-700">${qty}</span>
        <button type="button" aria-label="मात्रा बढ़ाएं" onclick="updateCartQuantity(${productId}, '${currentVariant.weight}', 1)" class="px-2.5 py-1.5 hover:bg-brand-700 transition font-bold text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
  }

  refreshLucideIcons();
}

function refreshAllProductGridButtons() {
  PRODUCTS.forEach(p => refreshSingleProductButton(p.id));
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
  const isEn = currentLanguage === 'en';
  
  // फ्री डिलीवरी की सीमा ₹199 (लगभग ₹200)
  const deliveryThreshold = 199;
  const deliveryFee = subtotal >= deliveryThreshold || subtotal === 0 ? 0 : 29;

  let discount = 0;
  if (appliedCoupon === 'SHUDDH50') {
    if (subtotal >= 499) {
      discount = 50;
    } else {
      appliedCoupon = null;
      const msg = document.getElementById("couponSuccessMsg");
      if (msg) msg.classList.add("hidden");
      showToast(isEn ? "Coupon SHUDDH50 requires min order of ₹499" : "कूपन SHUDDH50 के लिए न्यूनतम राशि ₹499 आवश्यक है");
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  // 1. नेवबार बैज व कुल बिल अपडेट
  const navBadge = document.getElementById("navCartCountBadge");
  const navTotal = document.getElementById("navCartTotalText");
  if (navBadge) {
    navBadge.innerText = totalCount;
    navBadge.classList.remove("badge-pop");
    void navBadge.offsetWidth;
    navBadge.classList.add("badge-pop");
  }
  if (navTotal) navTotal.innerText = `₹${grandTotal}`;

  // 2. ड्रावर काउंट
  const drawerCount = document.getElementById("drawerItemCount");
  if (drawerCount) {
    drawerCount.innerText = isEn 
      ? `${totalCount} items in basket (15 Min Delivery)` 
      : `${totalCount} सामान जोड़े गए (15 मिनट डिलीवरी)`;
  }

  // 3. फ्री डिलीवरी प्रोग्रेस बार लॉजिक
  const progressBar = document.getElementById("deliveryProgressBar");
  const deliveryStatus = document.getElementById("freeDeliveryStatus");
  const deliveryMsg = document.getElementById("deliveryMessage");
  
  if (progressBar && deliveryStatus && deliveryMsg) {
    if (subtotal >= deliveryThreshold) {
      progressBar.style.width = "100%";
      progressBar.className = "delivery-progress-active h-2.5 rounded-full transition-all duration-300";
      deliveryStatus.innerHTML = `<span class="text-brand-700 font-black">${isEn ? 'FREE' : 'मुफ्त (FREE)'}</span>`;
      deliveryMsg.innerHTML = isEn 
        ? `🎉 Yay! Your order qualifies for <strong>FREE Delivery</strong>` 
        : `🎉 बधाई! आपका ऑर्डर <strong>मुफ्त डिलीवरी</strong> के योग्य है`;
    } else {
      const remaining = deliveryThreshold - subtotal;
      const percent = Math.min(100, Math.round((subtotal / deliveryThreshold) * 100));
      progressBar.style.width = `${percent}%`;
      progressBar.className = "bg-brand-600 h-2.5 rounded-full transition-all duration-300";
      deliveryStatus.innerText = `₹${remaining} ${isEn ? 'left' : 'शेष'}`;
      deliveryMsg.innerHTML = isEn 
        ? `Add <strong>₹${remaining}</strong> more for <strong>FREE Delivery</strong>` 
        : `बस <strong>₹${remaining}</strong> का सामान और जोड़ें और पाएँ <strong>FREE Delivery</strong>`;
    }
  }

  // 4. बिल विवरण अपडेट
  const subtotalEl = document.getElementById("billSubtotal");
  const feeEl = document.getElementById("billDeliveryFee");
  const discountRow = document.getElementById("discountRow");
  const discountEl = document.getElementById("billDiscount");
  const grandTotalEl = document.getElementById("billGrandTotal");
  const upiModalAmount = document.getElementById("upiModalAmount");

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
  if (feeEl) feeEl.innerText = deliveryFee === 0 ? (isEn ? "FREE" : "मुफ्त (FREE)") : `₹${deliveryFee}`;
  
  if (discountRow) {
    if (discount > 0) {
      discountRow.style.display = "flex";
      if (discountEl) discountEl.innerText = `- ₹${discount}`;
    } else {
      discountRow.style.display = "none";
    }
  }

  if (grandTotalEl) grandTotalEl.innerText = `₹${grandTotal}`;
  if (upiModalAmount) upiModalAmount.innerText = `₹${grandTotal}`;

  // 5. मोबाइल फ्लोटिंग बॉटम बार अपडेट
  const mobBadge = document.getElementById("mobileCartCountBadge");
  const mobTotal = document.getElementById("mobileCartTotalText");
  const mobSubtext = document.getElementById("mobileCartSubtext");
  const mobDelivery = document.getElementById("mobileDeliveryStatus");
  if (mobBadge) mobBadge.innerText = totalCount;
  if (mobTotal) mobTotal.innerText = `₹${grandTotal}`;
  if (mobSubtext) mobSubtext.innerText = isEn ? `${totalCount} items in basket` : `${totalCount} सामान टोकरी में जोड़े गए`;
  if (mobDelivery) {
    if (subtotal >= deliveryThreshold) {
      mobDelivery.innerText = isEn ? "FREE Delivery" : "मुफ्त डिलीवरी";
      mobDelivery.className = "text-[9px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800";
    } else {
      mobDelivery.innerText = `₹${deliveryThreshold - subtotal} ${isEn ? 'left' : 'शेष'}`;
      mobDelivery.className = "text-[9px] text-amber-400 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800";
    }
  }

  // 6. ड्रावर आइटम्स लिस्ट रेंडर
  renderCartDrawerItems();
}

function renderCartDrawerItems() {
  const listContainer = document.getElementById("cartItemsList");
  const emptyView = document.getElementById("emptyCartView");
  const checkoutFlow = document.getElementById("cartCheckoutFlow");
  const cartFooter = document.getElementById("cartFooter");

  if (!listContainer) return;

  if (cart.length === 0) {
    listContainer.innerHTML = "";
    if (emptyView) emptyView.classList.remove("hidden");
    if (checkoutFlow) checkoutFlow.classList.add("hidden");
    if (cartFooter) cartFooter.classList.add("hidden");
    return;
  }

  if (emptyView) emptyView.classList.add("hidden");
  if (checkoutFlow) checkoutFlow.classList.remove("hidden");
  if (cartFooter) cartFooter.classList.remove("hidden");

  const isEn = currentLanguage === 'en';

  listContainer.innerHTML = cart.map(item => {
    const itemTotal = item.variant.price * item.quantity;
    const title = isEn ? item.product.titleEn : item.product.title;

    return `
      <div class="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-3 transition hover:border-slate-300">
        <img src="${item.product.image}" alt="${item.product.title}" onerror="this.onerror=null; this.src='https://placehold.co/400x400/f8fafc/0f172a?text=Fresh+Kirana';" class="w-14 h-14 object-cover rounded-xl shrink-0 bg-slate-100" loading="lazy" decoding="async">
        
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-xs text-slate-900 truncate" title="${title}">${title}</h4>
          <div class="inline-block bg-brand-50 text-brand-800 font-extrabold text-[10px] px-2 py-0.5 rounded mt-0.5 font-outfit">
            ${item.variant.weight}
          </div>
          <div class="text-xs font-black text-brand-700 mt-0.5 font-outfit">₹${item.variant.price}</div>
        </div>

        <div class="flex items-center bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shrink-0 font-outfit">
          <button type="button" aria-label="मात्रा घटाएं" onclick="updateCartQuantity(${item.product.id}, '${item.variant.weight}', -1)" class="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-700 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <i data-lucide="minus" class="w-3.5 h-3.5"></i>
          </button>
          <span class="w-7 text-center font-black text-xs text-slate-800">${item.quantity}</span>
          <button type="button" aria-label="मात्रा बढ़ाएं" onclick="updateCartQuantity(${item.product.id}, '${item.variant.weight}', 1)" class="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-700 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <div class="text-right shrink-0">
          <div class="text-xs font-black text-slate-900 font-outfit">₹${itemTotal}</div>
        </div>
      </div>
    `;
  }).join("");

  refreshLucideIcons();
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (!drawer || !backdrop) return;

  if (open) {
    drawer.classList.remove("translate-x-full");
    backdrop.classList.remove("opacity-0", "pointer-events-none");
    document.body.style.overflow = "hidden";
  } else {
    drawer.classList.add("translate-x-full");
    backdrop.classList.add("opacity-0", "pointer-events-none");
    document.body.style.overflow = "auto";
  }
}

/* =============================================================
   8. कूपन कोड लॉजिक ('SHUDDH50' - ₹50 की तत्काल छूट)
   ============================================================= */
function copyCouponCode(code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      const btnText = document.getElementById("couponBtnText");
      if (btnText) btnText.innerText = "कॉपी हुआ! ✓";
      showToast(`कूपन '${code}' कॉपी हो गया! चेकआउट पर पेस्ट करें।`);
      setTimeout(() => {
        if (btnText) btnText.innerText = "कॉपी करें";
      }, 2500);
    }).catch(() => {
      showToast(`कूपन कोड: ${code}`);
    });
  } else {
    showToast(`कूपन कोड: ${code}`);
  }
}

function applyCartCoupon() {
  const input = document.getElementById("cartCouponInput");
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  const subtotal = cart.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
  const isEn = currentLanguage === 'en';

  if (code === "SHUDDH50") {
    if (subtotal < 499) {
      showToast(isEn ? "Coupon SHUDDH50 requires min order of ₹499" : "कूपन SHUDDH50 के लिए न्यूनतम ₹499 का सामान आवश्यक है!");
      return;
    }
    appliedCoupon = "SHUDDH50";
    const msg = document.getElementById("couponSuccessMsg");
    if (msg) msg.classList.remove("hidden");
    showToast(isEn ? "🎉 Coupon SHUDDH50 Applied! ₹50 Instant OFF" : "🎉 कूपन SHUDDH50 लागू हुआ! ₹50 की तत्काल छूट");
    updateCartUI();
  } else {
    showToast(isEn ? "Invalid Coupon! Please enter 'SHUDDH50'" : "अमान्य कूपन कोड! कृपया 'SHUDDH50' दर्ज करें।");
  }
}

function removeCoupon() {
  appliedCoupon = null;
  const msg = document.getElementById("couponSuccessMsg");
  if (msg) msg.classList.add("hidden");
  const input = document.getElementById("cartCouponInput");
  if (input) input.value = "";
  showToast(currentLanguage === 'en' ? "Coupon removed" : "कूपन हटा दिया गया");
  updateCartUI();
}

/* =============================================================
   9. विज़ुअल कैटेगरी, ऑटो-स्क्रोल और लाइव सर्च फ़िल्टर
   ============================================================= */
function selectCategory(categoryKey, clickedButton = null, autoScroll = true) {
  activeCategory = categoryKey;

  const allCircleBtns = document.querySelectorAll(".category-circle-btn");
  allCircleBtns.forEach(btn => {
    btn.classList.remove("active");
  });

  if (clickedButton) {
    const targetBtn = clickedButton.closest ? (clickedButton.closest(".category-circle-btn") || clickedButton) : clickedButton;
    targetBtn.classList.add("active");
  } else {
    const matchingBtn = document.querySelector(`.category-circle-btn[data-category="${categoryKey}"]`);
    if (matchingBtn) matchingBtn.classList.add("active");
  }

  const catSelect = document.getElementById("searchCategorySelect");
  if (catSelect) catSelect.value = categoryKey;

  const headingBadge = document.getElementById("categoryHeadingBadge");
  const isEn = currentLanguage === 'en';
  const categoryNames = {
    all: isEn ? "All Products" : "सभी उत्पाद (All)",
    grains: isEn ? "🌾 Rice, Atta & Dal" : "🌾 आटा, चावल व दालें",
    oils: isEn ? "🫒 Cooking Oils & Pure Ghee" : "🫒 तेल व शुद्ध घी",
    spices: isEn ? "🌶️ Spices & Whole Masala" : "🌶️ मसाले व खड़े मसाले",
    drinks: isEn ? "🥤 Cold Drinks & Juices" : "🥤 Cold Drinks & Juices",
    snacks: isEn ? "🥨 Snacks & Munchies" : "🥨 Snacks & Munchies",
    breakfast: isEn ? "🍜 Breakfast & Instant Food" : "🍜 Breakfast & Instant Food",
    dryfruits: isEn ? "🥜 Dry Fruits & Nuts" : "🥜 ड्राई फ्रूट्स"
  };
  if (headingBadge) headingBadge.innerText = categoryNames[categoryKey] || "उत्पाद";

  filterProducts();

  if (autoScroll) {
    const target = document.getElementById("productsSection");
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function selectBrand(brandName, clickedButton = null) {
  activeBrand = brandName;

  const allBrandPills = document.querySelectorAll(".brand-pill");
  allBrandPills.forEach(pill => {
    pill.className = "brand-pill px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer";
  });

  if (clickedButton) {
    clickedButton.className = "brand-pill active px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap bg-slate-800 text-white transition cursor-pointer";
  }

  filterProducts();

  const target = document.getElementById("productsSection");
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

function filterProducts() {
  const searchInput = document.getElementById("searchInput") || document.getElementById("mainSearchInput");
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  const clearBtn = document.getElementById("searchClearBtn");
  const catSelect = document.getElementById("searchCategorySelect");
  const sortSelect = document.getElementById("sortFilter");

  const query = (searchInput && searchInput.value ? searchInput.value : (mobileSearchInput ? mobileSearchInput.value : "")).trim().toLowerCase();
  const selectedCategory = catSelect ? catSelect.value : activeCategory;

  if (clearBtn) {
    if (query.length > 0) {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
  }

  let filtered = PRODUCTS.filter(product => {
    const matchesCat = (selectedCategory === "all") || (product.category === selectedCategory);
    const matchesBrand = (activeBrand === "all") || (product.brand.toLowerCase() === activeBrand.toLowerCase());
    const matchesQuery = !query || 
      product.title.toLowerCase().includes(query) ||
      product.titleEn.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      (product.subCategory && product.subCategory.toLowerCase().includes(query)) ||
      (product.tag && product.tag.toLowerCase().includes(query));

    return matchesCat && matchesBrand && matchesQuery;
  });

  const sortValue = sortSelect ? sortSelect.value : "featured";
  if (sortValue === "price-low") {
    filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
  } else if (sortValue === "price-high") {
    filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
  } else if (sortValue === "discount") {
    filtered.sort((a, b) => b.variants[0].save - a.variants[0].save);
  }

  renderProducts(filtered);
}

function clearSearchInput() {
  const searchInput = document.getElementById("searchInput") || document.getElementById("mainSearchInput");
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  if (searchInput) {
    searchInput.value = "";
  }
  if (mobileSearchInput) {
    mobileSearchInput.value = "";
  }
  filterProducts();
  if (searchInput) searchInput.focus();
}

function resetFilters() {
  const searchInput = document.getElementById("searchInput") || document.getElementById("mainSearchInput");
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  if (searchInput) searchInput.value = "";
  if (mobileSearchInput) mobileSearchInput.value = "";
  selectCategory('all', null, false);
  selectBrand('all', null);
}

/* =============================================================
   10. द्विभाषी भाषा स्विच (BILINGUAL TOGGLE: [ EN | हिं ])
   ============================================================= */
function toggleLanguage() {
  currentLanguage = (currentLanguage === 'hi') ? 'en' : 'hi';
  const isEn = currentLanguage === 'en';

  const btn = document.getElementById("langToggleBtn");
  if (btn) {
    if (isEn) {
      btn.innerHTML = `<i data-lucide="globe" class="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform"></i><span class="font-outfit text-white font-black">English</span><span class="text-slate-500">|</span><span class="text-slate-400 font-normal">हिंदी</span>`;
    } else {
      btn.innerHTML = `<i data-lucide="globe" class="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform"></i><span class="font-outfit text-amber-300">English</span><span class="text-slate-500">|</span><span class="font-semibold text-white">हिंदी</span>`;
    }
  }

  // सर्च इनपुट प्लेसहोल्डर अपडेट
  const searchInput = document.getElementById("searchInput") || document.getElementById("mainSearchInput");
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  if (searchInput) {
    searchInput.placeholder = isEn 
      ? "Search: Basmati Rice, Aashirvaad Atta, Maggi, Coca Cola, Spices..." 
      : "सर्च करें: बासमती चावल, आशीर्वाद आटा, मैगी, कोका कोला, मसाले...";
  }
  if (mobileSearchInput) {
    mobileSearchInput.placeholder = isEn
      ? "Search: Basmati, Atta, Spices, Maggi..."
      : "सर्च: बासमती, आटा, मसाले, मैगी...";
  }

  // प्रोडक्ट्स और डील्स पुनः रेंडर
  filterProducts();
  renderLightningDeals();
  updateCartUI();
  setPaymentMethod(selectedPaymentMethod, true);

  showToast(isEn ? "🌐 Switched to English mode" : "🌐 भाषा बदलकर हिंदी कर दी गई");
  if (window.lucide) lucide.createIcons();
}
// Phase 1 डेमो कम्पैटिबिलिटी
window.toggleLanguageDemo = toggleLanguage;

/* =============================================================
   11. स्मार्ट अकाउंट सिस्टम (LOGIN, PROFILE & LOCALSTORAGE)
   ============================================================= */
function initUserSession() {
  try {
    const savedUser = localStorage.getItem("dkm_user");
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
    } else {
      currentUser = {
        name: "राजेश शर्मा",
        phone: "9826012345",
        address: "मकान नं. 14, आनंद नगर, मेन रोड, इंदौर",
        landmark: "शिव मंदिर के पास",
        pincode: "452001",
        isLoggedIn: true
      };
      localStorage.setItem("dkm_user", JSON.stringify(currentUser));
    }

    const savedOrders = localStorage.getItem("dkm_orders");
    if (savedOrders) {
      userOrders = JSON.parse(savedOrders);
    } else {
      // प्रारंभिक सैंपल डिलीवर्ड ऑर्डर
      userOrders = [
        {
          orderId: "DKM-849201",
          date: "26 Oct 2026, 02:15 PM",
          customer: { ...currentUser },
          paymentMode: "COD",
          items: [
            { title: "इंडिया गेट क्लासिक बासमती चावल", weight: "5 kg", price: 920, quantity: 1, total: 920 },
            { title: "इंडिया गेट क्लासिक बासमती चावल", weight: "1 kg", price: 195, quantity: 1, total: 195 }
          ],
          subtotal: 1115,
          deliveryFee: 0,
          discount: 50,
          grandTotal: 1065,
          status: "सफलतापूर्वक डिलीवर हुआ"
        }
      ];
      localStorage.setItem("dkm_orders", JSON.stringify(userOrders));
    }
  } catch (e) {
    console.error("Local storage error:", e);
  }

  updateNavbarUserButton();
  autoFillCartAddress();
}

function updateNavbarUserButton() {
  const btn = document.getElementById("navbarUserBtn");
  const btnText = document.getElementById("navUserBtnText");
  if (!btn || !btnText) return;

  if (currentUser && currentUser.isLoggedIn) {
    btnText.innerText = `${currentUser.name} (My Account)`;
    btn.classList.add("border-amber-400", "bg-amber-500/10");
  } else {
    btnText.innerText = "Login / Sign In";
    btn.classList.remove("border-amber-400", "bg-amber-500/10");
  }
}

function autoFillCartAddress() {
  if (!currentUser) return;
  const nameInput = document.getElementById("custNameInput");
  const phoneInput = document.getElementById("custPhoneInput");
  const addrInput = document.getElementById("custAddressInput");
  const landmarkInput = document.getElementById("custLandmarkInput");
  const pinInput = document.getElementById("custPincodeInput");

  if (nameInput && currentUser.name) nameInput.value = currentUser.name;
  if (phoneInput && currentUser.phone) phoneInput.value = currentUser.phone;
  if (addrInput && currentUser.address) addrInput.value = currentUser.address;
  if (landmarkInput && currentUser.landmark) landmarkInput.value = currentUser.landmark;
  if (pinInput && currentUser.pincode) pinInput.value = currentUser.pincode;
}

function openAccountModal() {
  const modal = document.getElementById("accountModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  if (currentUser) {
    const nameEl = document.getElementById("profileUserName");
    const phoneEl = document.getElementById("profileUserPhone");
    const addrEl = document.getElementById("profileSavedAddress");
    const landmarkEl = document.getElementById("profileSavedLandmark");
    const pinEl = document.getElementById("profileSavedPincode");

    if (nameEl) nameEl.innerText = currentUser.name || "राजेश शर्मा";
    if (phoneEl) phoneEl.innerText = "+91 " + (currentUser.phone || "9826012345");
    if (addrEl) addrEl.innerText = currentUser.address || "मकान नं. 14, आनंद नगर, मेन रोड, इंदौर";
    if (landmarkEl) landmarkEl.innerText = currentUser.landmark ? `(लैंडमार्क: ${currentUser.landmark})` : "";
    if (pinEl) pinEl.innerText = `पिनकोड: ${currentUser.pincode || "452001"}`;
  }

  renderOrderHistoryList();
}

function closeAccountModal() {
  const modal = document.getElementById("accountModal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function toggleAddressEditForm(show) {
  const displayBox = document.getElementById("addressDisplayBox");
  const editBox = document.getElementById("addressEditBox");

  if (!displayBox || !editBox) return;

  if (show) {
    displayBox.classList.add("hidden");
    editBox.classList.remove("hidden");
    const addr = document.getElementById("editUserAddressInput");
    const landmark = document.getElementById("editUserLandmarkInput");
    const pin = document.getElementById("editUserPincodeInput");
    if (addr && currentUser) addr.value = currentUser.address || "";
    if (landmark && currentUser) landmark.value = currentUser.landmark || "";
    if (pin && currentUser) pin.value = currentUser.pincode || "452001";
  } else {
    displayBox.classList.remove("hidden");
    editBox.classList.add("hidden");
  }
}

function saveAddressChanges() {
  const addrEl = document.getElementById("editUserAddressInput");
  const landmarkEl = document.getElementById("editUserLandmarkInput");
  const pinEl = document.getElementById("editUserPincodeInput");

  const newAddr = addrEl ? addrEl.value.trim() : "";
  const newLandmark = landmarkEl ? landmarkEl.value.trim() : "";
  const newPin = pinEl ? pinEl.value.trim() : "452001";

  if (!newAddr) {
    showToast("कृपया पता खाली न छोड़ें!");
    return;
  }

  if (!currentUser) {
    currentUser = { name: "राजेश शर्मा", phone: "9826012345", isLoggedIn: true };
  }

  currentUser.address = newAddr;
  currentUser.landmark = newLandmark;
  currentUser.pincode = newPin || "452001";

  try {
    localStorage.setItem("dkm_user", JSON.stringify(currentUser));
  } catch (e) {}

  autoFillCartAddress();
  
  const savedAddr = document.getElementById("profileSavedAddress");
  const savedLandmark = document.getElementById("profileSavedLandmark");
  const savedPin = document.getElementById("profileSavedPincode");
  if (savedAddr) savedAddr.innerText = newAddr;
  if (savedLandmark) savedLandmark.innerText = newLandmark ? `(लैंडमार्क: ${newLandmark})` : "";
  if (savedPin) savedPin.innerText = `पिनकोड: ${newPin}`;

  toggleAddressEditForm(false);
  showToast("✓ आपका नया डिलीवरी पता सफलतापूर्वक सुरक्षित हुआ!");
}

function switchAccountTab(tabName) {
  const profileTab = document.getElementById("accountProfileTabContent");
  const ordersTab = document.getElementById("accountOrdersTabContent");
  const btnProfile = document.getElementById("tabBtnProfile");
  const btnOrders = document.getElementById("tabBtnOrders");

  if (!profileTab || !ordersTab) return;

  if (tabName === 'profile') {
    profileTab.classList.remove("hidden");
    ordersTab.classList.add("hidden");
    if (btnProfile) btnProfile.classList.add("active");
    if (btnOrders) btnOrders.classList.remove("active");
  } else {
    profileTab.classList.add("hidden");
    ordersTab.classList.remove("hidden");
    if (btnProfile) btnProfile.classList.remove("active");
    if (btnOrders) btnOrders.classList.add("active");
    renderOrderHistoryList();
  }
}

function renderOrderHistoryList() {
  const container = document.getElementById("orderHistoryContainer");
  const emptyView = document.getElementById("emptyOrderHistoryView");
  if (!container) return;

  if (!userOrders || userOrders.length === 0) {
    container.innerHTML = "";
    if (emptyView) emptyView.classList.remove("hidden");
    return;
  }

  if (emptyView) emptyView.classList.add("hidden");

  container.innerHTML = userOrders.map(order => `
    <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
      <div class="flex items-center justify-between text-xs pb-1.5 border-b border-slate-100">
        <div>
          <span class="font-mono font-black text-slate-900 font-outfit">#${order.orderId}</span>
          <span class="text-[10px] text-slate-400 ml-1.5 font-outfit">${order.date}</span>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200 font-outfit">
          <i data-lucide="check-circle" class="w-3 h-3"></i>
          <span>${order.status}</span>
        </span>
      </div>

      <div class="space-y-1 text-xs text-slate-600">
        ${order.items.map(item => `
          <div class="flex justify-between items-center text-[11px]">
            <span class="truncate max-w-[240px]">▪ ${item.title} (${item.weight}) x ${item.quantity}</span>
            <span class="font-bold text-slate-800 font-outfit">₹${item.total}</span>
          </div>
        `).join("")}
      </div>

      <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span class="text-[11px] text-slate-500">मोड: <strong>${order.paymentMode === 'COD' ? '💵 नकद (COD)' : '⚡ UPI'}</strong></span>
        <div class="flex items-center gap-3">
          <div class="text-right">
            <span class="text-[10px] text-slate-400">कुल बिल:</span>
            <span class="font-black text-sm text-brand-700 ml-1 font-outfit">₹${order.grandTotal}</span>
          </div>
          <!-- 🖨️ बिल प्रिंट करें बटन -->
          <button 
            onclick="printOrderReceipt('${order.orderId}')" 
            type="button" 
            class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1 transition cursor-pointer font-outfit"
            title="इस ऑर्डर का बिल प्रिंट करें"
          >
            <i data-lucide="printer" class="w-3.5 h-3.5 text-brand-600"></i>
            <span>🖨️ बिल प्रिंट करें</span>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  refreshLucideIcons();
}

function handleUserLogout() {
  if (currentUser) {
    currentUser.isLoggedIn = false;
    try {
      localStorage.setItem("dkm_user", JSON.stringify(currentUser));
    } catch (e) {}
  }
  updateNavbarUserButton();
  closeAccountModal();
  showToast("आप सफलतापूर्वक लॉग-आउट हो चुके हैं।");
}

/* =============================================================
   12. चेकआउट: डायनामिक बटन, WHATSAPP ऑर्डर जनरेटर, कन्फ़ेट्टी व प्रिंट
   ============================================================= */
function setPaymentMethod(method, silent = false) {
  selectedPaymentMethod = method;
  const codRadio = document.getElementById("payMethodCOD");
  const upiRadio = document.getElementById("payMethodUPI");
  const codCard = document.getElementById("payMethodCODCard");
  const upiCard = document.getElementById("payMethodUPICard");
  const btn = document.getElementById("dynamicPlaceOrderBtn");
  const btnText = document.getElementById("dynamicPlaceOrderText");
  const btnIcon = document.getElementById("dynamicPlaceOrderIcon");

  const isEn = currentLanguage === 'en';

  if (method === 'COD') {
    if (codRadio) codRadio.checked = true;
    if (codCard) {
      codCard.className = "flex items-center gap-2.5 p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/70 shadow-xs cursor-pointer transition";
    }
    if (upiCard) {
      upiCard.className = "flex items-center gap-2.5 p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition";
    }
    if (btn) {
      btn.className = "w-full bg-[#059669] hover:bg-[#047857] text-white font-black py-4 px-4 rounded-2xl shadow-lg hover:shadow-glow transition-all transform active:scale-98 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer font-outfit";
    }
    if (btnText) {
      btnText.innerText = isEn ? "📦 Place Order (Cash on Delivery)" : "📦 ऑर्डर प्लेस करें (Cash on Delivery)";
    }
    if (btnIcon) {
      btnIcon.setAttribute("data-lucide", "package-check");
    }
    if (!silent) {
      showToast(isEn ? "💵 Cash on Delivery (COD) Selected" : "💵 भुगतान: Cash on Delivery (COD) चुना गया");
    }
  } else {
    if (upiRadio) upiRadio.checked = true;
    if (upiCard) {
      upiCard.className = "flex items-center gap-2.5 p-3 rounded-2xl border-2 border-brand-500 bg-emerald-50/70 shadow-xs cursor-pointer transition";
    }
    if (codCard) {
      codCard.className = "flex items-center gap-2.5 p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition";
    }
    if (btn) {
      btn.className = "w-full bg-gradient-to-r from-emerald-600 to-brand-600 hover:from-emerald-500 hover:to-brand-500 text-white font-black py-4 px-4 rounded-2xl shadow-lg hover:shadow-glow transition-all transform active:scale-98 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer font-outfit";
    }
    if (btnText) {
      btnText.innerText = isEn ? "⚡ Pay via UPI & Place Order" : "⚡ Pay via UPI & ऑर्डर प्लेस करें";
    }
    if (btnIcon) {
      btnIcon.setAttribute("data-lucide", "qr-code");
    }
    if (!silent) {
      showToast(isEn ? "⚡ Pay via UPI Selected" : "⚡ भुगतान: Pay via UPI चुना गया");
    }
  }

  refreshLucideIcons();
}

function updateDeliverySlotSelection() {
  const expressRadio = document.getElementById("slotExpress");
  const eveningRadio = document.getElementById("slotEvening");
  const expressCard = document.getElementById("slotExpressCard");
  const eveningCard = document.getElementById("slotEveningCard");

  if (expressRadio && expressRadio.checked) {
    if (expressCard) {
      expressCard.className = "flex items-center gap-2.5 p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/70 cursor-pointer text-xs font-bold text-slate-900 transition hover:bg-emerald-50";
    }
    if (eveningCard) {
      eveningCard.className = "flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs font-bold text-slate-700 transition";
    }
  } else if (eveningRadio && eveningRadio.checked) {
    if (eveningCard) {
      eveningCard.className = "flex items-center gap-2.5 p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/70 cursor-pointer text-xs font-bold text-slate-900 transition hover:bg-emerald-50";
    }
    if (expressCard) {
      expressCard.className = "flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs font-bold text-slate-700 transition";
    }
  }
}

// 🛡️ फॉर्म वैलिडेशन व एरर हाइलाइटर (Form Validation Helpers)
function markInputError(el, containerEl = null) {
  if (!el) return;
  el.classList.add("border-red-500", "ring-2", "ring-red-200", "input-error");
  if (containerEl) {
    containerEl.classList.add("border-red-500", "ring-2", "ring-red-200", "input-error");
  }

  const clearHandler = function() {
    el.classList.remove("border-red-500", "ring-2", "ring-red-200", "input-error");
    if (containerEl) {
      containerEl.classList.remove("border-red-500", "ring-2", "ring-red-200", "input-error");
    }
    el.removeEventListener("input", clearHandler);
  };
  el.addEventListener("input", clearHandler);
}

function clearAllCheckoutErrors() {
  const fields = ["custNameInput", "custPhoneInput", "custAddressInput", "custPincodeInput"];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("border-red-500", "ring-2", "ring-red-200", "input-error");
    }
  });
  const phoneContainer = document.getElementById("custPhoneContainer");
  if (phoneContainer) {
    phoneContainer.classList.remove("border-red-500", "ring-2", "ring-red-200", "input-error");
  }
}

function validateCheckoutForm() {
  const isEn = currentLanguage === 'en';
  const nameInput = document.getElementById("custNameInput");
  const phoneInput = document.getElementById("custPhoneInput");
  const phoneContainer = document.getElementById("custPhoneContainer");
  const addrInput = document.getElementById("custAddressInput");
  const pinInput = document.getElementById("custPincodeInput");

  const name = nameInput ? nameInput.value.trim() : "";
  let rawPhone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : "";
  if (rawPhone.length === 12 && rawPhone.startsWith('91')) {
    rawPhone = rawPhone.slice(2);
  } else if (rawPhone.length === 11 && rawPhone.startsWith('0')) {
    rawPhone = rawPhone.slice(1);
  }
  const address = addrInput ? addrInput.value.trim() : "";
  let pincode = pinInput ? pinInput.value.trim().replace(/\D/g, '') : "";
  if (!pincode) {
    pincode = "452001";
    if (pinInput) pinInput.value = "452001";
  }

  clearAllCheckoutErrors();

  // 1. ग्राहक का पूरा नाम: कम से कम 2 अक्षर (Full Name: Min 2 characters)
  if (!name || name.length < 2) {
    markInputError(nameInput);
    if (nameInput) nameInput.focus();
    showToast(isEn ? "⚠️ Please enter customer's full name!" : "⚠️ कृपया अपना पूरा नाम दर्ज करें!");
    return false;
  }

  // 2. मोबाइल नंबर: 10 अंकों का वैध नंबर
  if (!rawPhone || rawPhone.length !== 10) {
    markInputError(phoneInput, phoneContainer);
    if (phoneInput) phoneInput.focus();
    showToast(isEn ? "⚠️ Please enter a 10-digit mobile number!" : "⚠️ कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें!");
    return false;
  }

  // 3. पूरा पता: कम से कम 4 अक्षर (Full Address: Min 4 characters)
  if (!address || address.length < 4) {
    markInputError(addrInput);
    if (addrInput) addrInput.focus();
    showToast(isEn ? "⚠️ Please enter delivery address!" : "⚠️ कृपया अपना डिलीवरी पता दर्ज करें!");
    return false;
  }

  // 4. पिनकोड: 6 अंक (Pincode: 6 digits)
  if (pincode.length !== 6) {
    markInputError(pinInput);
    if (pinInput) pinInput.focus();
    showToast(isEn ? "⚠️ Please enter a valid 6-digit pincode!" : "⚠️ कृपया 6 अंकों का सही पिनकोड दर्ज करें!");
    return false;
  }

  return true;
}

function handleDynamicPlaceOrder() {
  if (cart.length === 0) {
    showToast(currentLanguage === 'en' ? "Please add grocery items to basket first!" : "कृपया पहले टोकरी में कुछ किराना सामान जोड़ें!");
    return;
  }

  // सख्त फॉर्म वैलिडेशन (Strict Form Validation)
  if (!validateCheckoutForm()) {
    return;
  }

  if (selectedPaymentMethod === 'COD') {
    checkoutViaWhatsApp();
  } else {
    openUpiPaymentModal();
  }
}

function launchCelebrationConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  }
}

function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    showToast(currentLanguage === 'en' ? "Please add grocery items to basket first!" : "कृपया पहले टोकरी में कुछ किराना सामान जोड़ें!");
    return;
  }

  // डिलीवरी पते व फ़ील्ड्स का पुनः सत्यापन (Strict Verification)
  if (!validateCheckoutForm()) {
    return;
  }

  const isEn = currentLanguage === 'en';
  const nameInput = document.getElementById("custNameInput");
  const phoneInput = document.getElementById("custPhoneInput");
  const addrInput = document.getElementById("custAddressInput");
  const landmarkInput = document.getElementById("custLandmarkInput");
  const pinInput = document.getElementById("custPincodeInput");

  const name = nameInput ? nameInput.value.trim() : "राजेश शर्मा";
  const phone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : "9826012345";
  const address = addrInput ? addrInput.value.trim() : "मकान नं. 14, आनंद नगर, मेन रोड, इंदौर";
  const landmark = landmarkInput ? landmarkInput.value.trim() : "";
  const pincode = pinInput ? pinInput.value.trim().replace(/\D/g, '') : "452001";

  // चयनित डिलीवरी समय स्लॉट (Selected Delivery Slot)
  const deliverySlotRadio = document.querySelector('input[name="deliverySlot"]:checked');
  const deliverySlot = deliverySlotRadio ? deliverySlotRadio.value : "⚡ तुरंत 15 मिनट डिलीवरी";

  // यूजर प्रोफाइल को localStorage में अपडेट करें
  currentUser = { name, phone, address, landmark, pincode: pincode || "452001", isLoggedIn: true };
  try {
    localStorage.setItem("dkm_user", JSON.stringify(currentUser));
  } catch (e) {}
  updateNavbarUserButton();

  const subtotal = cart.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
  const deliveryFee = subtotal >= 199 ? 0 : 29;
  const discount = appliedCoupon === 'SHUDDH50' && subtotal >= 499 ? 50 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const paymentModeLabel = selectedPaymentMethod === 'COD' 
    ? "💵 Cash on Delivery (COD - डिलीवरी पर नकद)" 
    : "⚡ Pay via UPI / Online (ऑनलाइन तुरंत भुगतान)";

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // नया ऑर्डर बनाएँ
  const newOrder = {
    orderId: "DKM-" + Math.floor(100000 + Math.random() * 900000),
    date: dateFormatted,
    deliverySlot: deliverySlot,
    customer: { name, phone, address, landmark, pincode: pincode || "452001" },
    paymentMode: selectedPaymentMethod,
    items: cart.map(i => ({
      title: i.product.title,
      weight: i.variant.weight,
      price: i.variant.price,
      quantity: i.quantity,
      total: i.variant.price * i.quantity
    })),
    subtotal,
    deliveryFee,
    discount,
    grandTotal,
    status: `Order Placed (${deliverySlot})`
  };

  lastCreatedOrder = newOrder;

  userOrders.unshift(newOrder);
  try {
    localStorage.setItem("dkm_orders", JSON.stringify(userOrders));
  } catch (e) {}

  // 1. डायनामिक अल्ट्रा-प्रोफेशनल WhatsApp ऑर्डर इनवॉइस संदेश (Unicode Itemized Invoice)
  let msg = `🛒 *डिजिटल किराना मार्ट (Digital Kirana Mart)*\n`;
  msg += `🌾 *100% शुद्ध देशी किराना | एक्सप्रेस डिलीवरी*\n`;
  msg += `══════════════════════════════════\n`;
  msg += `🧾 *ऑर्डर रसीद / TAX INVOICE*\n`;
  msg += `🔢 *ऑर्डर ID:* #${newOrder.orderId}\n`;
  msg += `📅 *दिनांक व समय:* ${dateFormatted}\n`;
  msg += `══════════════════════════════════\n\n`;

  msg += `👤 *ग्राहक विवरण (Customer Details):*\n`;
  msg += `• *ग्राहक का नाम:* ${name}\n`;
  msg += `• *मोबाइल नंबर:* +91 ${phone}\n`;
  msg += `• *डिलीवरी पता:* ${address}\n`;
  if (landmark) {
    msg += `• *लैंडमार्क:* ${landmark}\n`;
  }
  msg += `• *पिनकोड:* ${pincode} (${currentLocation || 'इंदौर'})\n`;
  msg += `• *डिलीवरी स्लॉट:* ${deliverySlot}\n`;
  msg += `• *भुगतान का तरीका:* ${paymentModeLabel}\n\n`;

  msg += `📦 *ऑर्डर किए गए सामानों की सूची (Itemized List):*\n`;
  msg += `──────────────────────────────────\n`;

  cart.forEach((item, idx) => {
    const itemLineTotal = item.variant.price * item.quantity;
    msg += `${idx + 1}. ▪️ *${item.product.title}*\n`;
    msg += `   └ [${item.variant.weight}] × ${item.quantity} = *₹${itemLineTotal}* (दर: ₹${item.variant.price})\n`;
  });

  msg += `──────────────────────────────────\n`;
  msg += `💰 *सामान का मूल्य (Subtotal):* ₹${subtotal}\n`;
  msg += `🚚 *डिलीवरी शुल्क (Delivery Fee):* ${deliveryFee === 0 ? "मुफ्त (FREE)" : "₹" + deliveryFee}\n`;
  if (discount > 0) {
    msg += `🏷️ *कूपन छूट (SHUDDH50):* -₹${discount}\n`;
  }
  msg += `══════════════════════════════════\n`;
  msg += `✨ *कुल देय राशि (Grand Total):* *₹${grandTotal}*\n`;
  msg += `══════════════════════════════════\n\n`;

  msg += `🛡️ *शुद्धता व ताज़गी की 100% गारंटी!* समय पर सुरक्षित डिलीवरी।\n`;
  msg += `🙏 *डिजिटल किराना मार्ट चुनने के लिए धन्यवाद! फिर पधारें।*`;

  const encodedMsg = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/919826012345?text=${encodedMsg}`;

  // 1b. 📋 ईमेल व CRM के लिए सामानों की सूची तैयार करें (Itemized Summary)
  const orderSummaryEmail = cart.map((item, idx) => {
    return `${idx + 1}. ${item.product.title} [${item.variant.weight}] × Qty: ${item.quantity} = ₹${item.variant.price * item.quantity}`;
  }).join("\n") + `\n\nSubtotal: ₹${subtotal}\nDelivery: ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}\nDiscount: ₹${discount}\nGrand Total: ₹${grandTotal}\nPayment: ${paymentModeLabel}\nSlot: ${deliverySlot}`;

  // 1c. 📊 Google Sheets Webhook Integration (Google CRM Auto-Sync)
  try {
    const googleSheetPayload = {
      customer_name: name,
      customer_phone: phone,
      customer_address: `${address}${landmark ? ', Landmark: ' + landmark : ''}${pincode ? ', Pincode: ' + pincode : ''}`,
      order_summary: orderSummaryEmail,
      total_bill: `₹${grandTotal}`,
      payment_method: selectedPaymentMethod === 'COD' ? "Cash on Delivery (COD)" : "Pay via UPI"
    };

    fetch("https://script.google.com/macros/s/AKfycbzQ5J3ZXd6AdjH_P5ZlfppZRx--rgdjSGiY-v-gMtH52LPluoUP34xB8_k-tb2U-jXDqA/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(googleSheetPayload)
    }).catch(err => console.warn("Google Sheet sync notice:", err));
  } catch (err) {
    console.warn("Google Sheet dispatch notice:", err);
  }

  // 1d. 📧 Web3Forms बैकग्राउंड ईमेल सबमिशन (Store Owner Email Integration)
  try {
    const web3Payload = {
      access_key: "f92f0e40-cfdb-4c32-ac54-b714cd38157b",
      subject: "🛒 Naya Grocery Order - Digital Kirana Mart",
      from_name: "Digital Kirana Mart",
      customer_name: name,
      customer_phone: phone,
      customer_address: `${address}${landmark ? ', Landmark: ' + landmark : ''}${pincode ? ', Pincode: ' + pincode : ''}`,
      order_summary: orderSummaryEmail,
      total_bill: `₹${grandTotal}`
    };

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(web3Payload)
    }).catch(err => console.warn("Web3Forms email notice:", err));
  } catch (err) {
    console.warn("Web3Forms dispatch notice:", err);
  }

  // 2. ऑर्डर सक्सेस मोडल को नए ऑर्डर से भरें
  const orderIdEl = document.getElementById("successModalOrderId");
  const totalEl = document.getElementById("successModalTotal");
  const payModeEl = document.getElementById("successModalPayMode");
  const addrEl = document.getElementById("successModalAddress");

  if (orderIdEl) orderIdEl.innerText = `#${newOrder.orderId}`;
  if (totalEl) totalEl.innerText = `₹${newOrder.grandTotal}`;
  if (payModeEl) payModeEl.innerText = selectedPaymentMethod === 'COD' ? "💵 Cash on Delivery (COD)" : "⚡ Pay via UPI";
  if (addrEl) addrEl.innerText = `${name}, ${address}`;

  // 3. प्रिंट रसीद एरिया भरें
  preparePrintableReceipt(newOrder);

  // 4. कार्ट ड्रॉअर बंद करें व सक्सेस मोडल खोलें
  toggleCartDrawer(false);
  const successModal = document.getElementById("orderSuccessModal");
  if (successModal) {
    successModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  // 5. स्क्रीन पर कन्फ़ेट्टी लॉन्च करें 🎉
  launchCelebrationConfetti();

  // 6. कार्ट साफ़ करें
  cart = [];
  appliedCoupon = null;
  updateCartUI();
  refreshAllProductGridButtons();

  showToast(isEn ? "🎉 Congratulations! Your order is placed and being sent to WhatsApp!" : "🎉 बधाई! आपका ऑर्डर सफलतापूर्वक दर्ज हुआ और WhatsApp पर भेजा जा रहा है!");
  
  // 7. WhatsApp तुरंत खोलें (Popup Blocker से बचाव)
  try {
    const waWindow = window.open(whatsappUrl, '_blank');
    if (!waWindow || waWindow.closed || typeof waWindow.closed === 'undefined') {
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 1000);
    }
  } catch (e) {
    window.location.href = whatsappUrl;
  }

  // 8. बटन टेक्स्ट रीसेट करें
  const placeOrderBtnText = document.getElementById("dynamicPlaceOrderText");
  if (placeOrderBtnText) {
    placeOrderBtnText.innerText = selectedPaymentMethod === 'COD' 
      ? "📦 ऑर्डर प्लेस करें (Cash on Delivery)" 
      : "⚡ UPI से भुगतान व ऑर्डर करें";
  }
}

// Phase 1 डेमो कम्पैटिबिलिटी
window.openOrderSuccessDemo = checkoutViaWhatsApp;

/* =============================================================
   13. असली प्रिंट रसीद जनरेटर (Print Bill Functionality)
   ============================================================= */
function preparePrintableReceipt(order) {
  const printArea = document.getElementById("printableReceiptArea");
  if (!printArea) return;

  const dateStr = order.date || new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const paymentModeStr = order.paymentMode === 'COD' ? "💵 Cash on Delivery (COD)" : "⚡ Pay via UPI / Online";

  const rowsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 4px 0;">${item.title} (${item.weight})</td>
      <td style="text-align: center; padding: 4px 0;">${item.quantity}</td>
      <td style="text-align: right; padding: 4px 0;">₹${item.total}.00</td>
    </tr>
  `).join("");

  printArea.innerHTML = `
    <div style="text-align: center; margin-bottom: 10px;">
      <h2 style="font-size: 18px; font-weight: bold; margin: 0; font-family: sans-serif;">DIGITAL KIRANA MART</h2>
      <p style="font-size: 11px; margin: 2px 0;">दुकान नं 24, मेन राजवाड़ा मार्केट, एम.जी. रोड, इंदौर (म.प्र.)</p>
      <p style="font-size: 10px; margin: 2px 0;">FSSAI Lic No: 11422850001234 | फोन: 1800-123-5566</p>
    </div>

    <div class="print-dashed-divider"></div>

    <div style="font-size: 11px; margin-bottom: 8px; line-height: 1.5;">
      <div><strong>ऑर्डर ID:</strong> #${order.orderId}</div>
      <div><strong>दिनांक व समय:</strong> ${dateStr}</div>
      <div><strong>ग्राहक:</strong> ${order.customer.name} (+91 ${order.customer.phone})</div>
      <div><strong>पता:</strong> ${order.customer.address} (पिन: ${order.customer.pincode})</div>
      <div><strong>भुगतान:</strong> ${paymentModeStr}</div>
      <div><strong>डिलीवरी स्लॉट:</strong> ${order.deliverySlot || "⚡ 15 मिनट सुपरफास्ट एक्सप्रेस"}</div>
    </div>

    <div class="print-dashed-divider"></div>

    <table style="width: 100%; font-size: 11px; border-collapse: collapse; margin: 6px 0;">
      <thead>
        <tr style="border-bottom: 1px dashed #000; text-align: left;">
          <th style="padding: 3px 0;">सामान का विवरण</th>
          <th style="text-align: center; padding: 3px 0;">मात्रा</th>
          <th style="text-align: right; padding: 3px 0;">रकम</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="print-dashed-divider"></div>

    <div style="font-size: 11px; line-height: 1.6;">
      <div style="display: flex; justify-content: space-between;">
        <span>सामान का कुल मूल्य (Subtotal):</span>
        <span>₹${order.subtotal}.00</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>डिलीवरी शुल्क (15 मिनट एक्सप्रेस):</span>
        <span>${order.deliveryFee === 0 ? "₹0.00 (FREE)" : `₹${order.deliveryFee}.00`}</span>
      </div>
      ${order.discount > 0 ? `
        <div style="display: flex; justify-content: space-between;">
          <span>कूपन छूट (SHUDDH50):</span>
          <span>- ₹${order.discount}.00</span>
        </div>
      ` : ''}
      <div class="print-dashed-divider"></div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: bold;">
        <span>कुल देय राशि (Grand Total):</span>
        <span>₹${order.grandTotal}.00</span>
      </div>
    </div>

    <div class="print-dashed-divider"></div>

    <div style="text-align: center; font-size: 10px; margin-top: 10px; line-height: 1.4;">
      <p style="margin: 2px 0;">*** 100% शुद्ध देशी उत्पाद की संपूर्ण गारंटी ***</p>
      <p style="margin: 2px 0;">🙏 आपके विश्वास के लिए धन्यवाद! फिर पधारें 🙏</p>
      <p style="margin: 2px 0;">हेल्पलाइन: 1800-123-5566 | care@digitalkiranamart.com</p>
    </div>
  `;
}

function printCurrentOrderReceipt() {
  if (lastCreatedOrder) {
    preparePrintableReceipt(lastCreatedOrder);
  } else if (userOrders.length > 0) {
    preparePrintableReceipt(userOrders[0]);
  }
  window.print();
}

function printOrderReceipt(orderId) {
  const order = userOrders.find(o => o.orderId === orderId || o.orderId === `#${orderId}`);
  if (order) {
    preparePrintableReceipt(order);
    window.print();
  } else {
    showToast("ऑर्डर विवरण नहीं मिला!");
  }
}

/* =============================================================
   14. UPI पेमेंट मोडल और लोकेशन
   ============================================================= */
function openUpiPaymentModal() {
  if (cart.length === 0) {
    showToast("कृपया पहले टोकरी में कुछ सामान जोड़ें!");
    return;
  }
  const subtotal = cart.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
  const deliveryFee = subtotal >= 199 ? 0 : 29;
  const discount = appliedCoupon === 'SHUDDH50' && subtotal >= 499 ? 50 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const qrImg = document.getElementById("upiQrCodeImg");
  if (qrImg) {
    const upiString = encodeURIComponent(`upi://pay?pa=digitalkirana@upi&pn=DigitalKiranaMart&am=${grandTotal}&cu=INR`);
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${upiString}`;
  }

  const modal = document.getElementById("upiModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeUpiModal() {
  const modal = document.getElementById("upiModal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function simulateSuccessfulPayment() {
  closeUpiModal();
  setPaymentMethod('UPI', true);
  checkoutViaWhatsApp();
}

function openLocationModal() {
  const modal = document.getElementById("locationModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeLocationModal() {
  const modal = document.getElementById("locationModal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function closeOrderSuccessModal() {
  const modal = document.getElementById("orderSuccessModal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function selectCityLocation(cityText) {
  currentLocation = cityText;
  updateLocationDisplay();
  closeLocationModal();
  showToast(`डिलीवरी लोकेशन बदलकर '${cityText}' कर दी गई! 📍`);
}

function saveCustomLocation() {
  const pinInput = document.getElementById("pincodeInput");
  const pin = pinInput ? pinInput.value.trim() : "";
  if (!pin || pin.length < 6) {
    showToast("कृपया 6 अंकों का सही पिनकोड दर्ज करें!");
    return;
  }
  currentLocation = `पिनकोड: ${pin}`;
  updateLocationDisplay();
  closeLocationModal();
  showToast(`डिलीवरी पिनकोड ${pin} सेट किया गया!`);
}

function updateLocationDisplay() {
  const locEl = document.getElementById("currentLocationText");
  const mobileLoc = document.getElementById("currentLocationTextMobile");
  if (locEl) locEl.innerText = currentLocation;
  if (mobileLoc) mobileLoc.innerText = currentLocation;
}

/* =============================================================
   15. टोस्ट नोटिफिकेशन अलर्ट
   ============================================================= */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMessage");
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.classList.remove("opacity-0", "pointer-events-none");
  toast.classList.add("opacity-100");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add("opacity-0", "pointer-events-none");
    toast.classList.remove("opacity-100");
  }, 3200);
}
