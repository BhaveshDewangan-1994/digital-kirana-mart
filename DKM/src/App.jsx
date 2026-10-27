import React, { useState, useMemo } from 'react';

// =============================================================================
// DIGITAL KIRANA MART - REACT FRONTEND (src/App.jsx)
// Integrations:
// 1. Supabase REST API (Live Database Orders Table Logging)
// 2. Web3Forms API (Instant Email Notifications)
// 3. WhatsApp Order Chat Redirection (Instant Customer Receipt)
// 4. Dynamic Category Filter, Live Search, Weight Variants, Cart Drawer & Modal
// =============================================================================

// Supabase, Web3Forms & WhatsApp Configurations
const SUPABASE_REST_URL = "https://wskcqzhukpfpfrituwvu.supabase.co/rest/v1/orders";
const SUPABASE_ANON_KEY = "sb_publishable_vnd9F3n0I5lqUjzpzcvStA_V_JqBn9Y";
const WEB3FORMS_ACCESS_KEY = "f92f0e40-cfdb-4c32-ac54-b714cd38157b";
const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzQ5J3ZXd6AdjH_P5ZlfppZRx--rgdjSGiY-v-gMtH52LPluoUP34xB8_k-tb2U-jXDqA/exec";
const WHATSAPP_PHONE_NUMBER = "919826012345"; // Store WhatsApp Helpline

// Category Master List
const CATEGORIES = [
  { id: 'all', name: 'सभी उत्पाद (All)', icon: '🛒' },
  { id: 'grains', name: 'आटा, चावल व दालें', icon: '🌾' },
  { id: 'oils', name: 'तेल व शुद्ध देशी घी', icon: '🫒' },
  { id: 'spices', name: 'मसाले व खड़े मसाले', icon: '🌶️' },
  { id: 'drinks', name: 'Cold Drinks & Juices', icon: '🥤' },
  { id: 'snacks', name: 'Snacks & Namkeen', icon: '🥨' },
  { id: 'breakfast', name: 'Instant Food & Oats', icon: '🍜' },
  { id: 'dryfruits', name: 'प्रीमियम ड्राई फ्रूट्स', icon: '🥜' }
];

// Rich Product Catalog with Multiple Weight Variants & Authentic Images
const PRODUCTS = [
  // 1. चावल व दालें (Grains & Pulses)
  {
    id: 1,
    name: "इंडिया गेट क्लासिक बासमती चावल (India Gate Basmati)",
    brand: "India Gate",
    category: "grains",
    rating: 4.9,
    reviews: "4.8k",
    tag: "#1 Bestseller बासमती",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "1 kg", price: 195, mrp: 240 },
      { weight: "5 kg", price: 920, mrp: 1150 },
      { weight: "10 kg", price: 1780, mrp: 2250 }
    ]
  },
  {
    id: 2,
    name: "दावत रोज़ाना सुपर बासमती चावल (Daawat Rozana)",
    brand: "Daawat",
    category: "grains",
    rating: 4.8,
    reviews: "3.2k",
    tag: "रोज़ाना के लिए बेस्ट",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "1 kg", price: 82, mrp: 105 },
      { weight: "5 kg", price: 390, mrp: 490 },
      { weight: "10 kg", price: 760, mrp: 960 }
    ]
  },
  {
    id: 3,
    name: "आशीर्वाद शुद्ध चक्की आटा (Aashirvaad Shudh Chakki Atta)",
    brand: "Aashirvaad",
    category: "grains",
    rating: 4.9,
    reviews: "5.1k",
    tag: "100% साबुत गेहूं",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "5 kg", price: 235, mrp: 275 },
      { weight: "10 kg", price: 445, mrp: 520 }
    ]
  },
  {
    id: 4,
    name: "टाटा सम्पन्न अनपॉलिश्ड अरहर / तुअर दाल (Toor Dal)",
    brand: "Tata Sampann",
    category: "grains",
    rating: 4.8,
    reviews: "2.1k",
    tag: "हाई प्रोटीन अनपॉलिश्ड",
    image: "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "1 kg", price: 172, mrp: 210 },
      { weight: "2 kg", price: 335, mrp: 410 }
    ]
  },

  // 2. तेल व शुद्ध देशी घी (Oils & Ghee)
  {
    id: 5,
    name: "फॉर्च्यून कच्ची घानी शुद्ध सरसों तेल (Mustard Oil)",
    brand: "Fortune",
    category: "oils",
    rating: 4.8,
    reviews: "3.7k",
    tag: "तीखा व 100% शुद्ध",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "1 Litre", price: 142, mrp: 175 },
      { weight: "5 Litre", price: 690, mrp: 860 }
    ]
  },
  {
    id: 6,
    name: "अमुल स्पेशल शुद्ध देशी गाय का घी (Amul Pure Cow Ghee)",
    brand: "Amul",
    category: "oils",
    rating: 4.9,
    reviews: "6.4k",
    tag: "100% देशी दानेदार",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "500 ml", price: 315, mrp: 350 },
      { weight: "1 Litre", price: 610, mrp: 675 }
    ]
  },
  {
    id: 7,
    name: "फॉर्च्यून सनलाइट रिफाइंड सनफ्लावर ऑयल (Sunflower Oil)",
    brand: "Fortune",
    category: "oils",
    rating: 4.7,
    reviews: "1.8k",
    tag: "विटामिन A, D युक्त",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "1 Litre", price: 135, mrp: 165 },
      { weight: "5 Litre", price: 645, mrp: 810 }
    ]
  },

  // 3. मसाले व खड़े मसाले (Spices)
  {
    id: 8,
    name: "टाटा सम्पन्न तीखा लाल मिर्च पाउडर (Red Chilli Powder)",
    brand: "Tata Sampann",
    category: "spices",
    rating: 4.8,
    reviews: "2.3k",
    tag: "नेचुरल ऑयल युक्त",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "100g", price: 42, mrp: 52 },
      { weight: "250g", price: 98, mrp: 125 },
      { weight: "500g", price: 185, mrp: 240 }
    ]
  },
  {
    id: 9,
    name: "एवरेस्ट असली गरम मसाला (Everest Garam Masala)",
    brand: "Everest",
    category: "spices",
    rating: 4.9,
    reviews: "4.2k",
    tag: "शाही सुगंध व स्वाद",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "100g", price: 78, mrp: 92 },
      { weight: "200g", price: 148, mrp: 180 }
    ]
  },
  {
    id: 10,
    name: "कैच शुद्ध हल्दी पाउडर (Catch Haldi Powder)",
    brand: "Catch",
    category: "spices",
    rating: 4.8,
    reviews: "1.9k",
    tag: "उच्च करक्यूमिन युक्त",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "200g", price: 65, mrp: 80 },
      { weight: "500g", price: 145, mrp: 185 }
    ]
  },

  // 4. कोल्ड ड्रिंक्स व जूस (Drinks)
  {
    id: 11,
    name: "कोका-कोला ओरिजिनल टेस्ट (Coca-Cola Soft Drink)",
    brand: "Coca-Cola",
    category: "drinks",
    rating: 4.8,
    reviews: "8.5k",
    tag: "चिल्ड रिफ्रेशमेंट",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "750 ml", price: 40, mrp: 45 },
      { weight: "1.25 Litre", price: 65, mrp: 75 },
      { weight: "2 Litre", price: 95, mrp: 110 }
    ]
  },
  {
    id: 12,
    name: "रियल एक्टिव 100% अनार फ्रूट जूस (Real Pomegranate Juice)",
    brand: "Real",
    category: "drinks",
    rating: 4.7,
    reviews: "1.4k",
    tag: "नो एडेड शुगर",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "1 Litre", price: 125, mrp: 150 }
    ]
  },

  // 5. स्नैक्स व नमकीन (Snacks)
  {
    id: 13,
    name: "हल्दीराम नागपुर भुजिया सेव (Haldiram Bhujia Sev)",
    brand: "Haldiram's",
    category: "snacks",
    rating: 4.9,
    reviews: "9.2k",
    tag: "चटपटा टी-टाइम साथी",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "400g", price: 110, mrp: 130 },
      { weight: "1 kg", price: 255, mrp: 310 }
    ]
  },

  // 6. ब्रेकफास्ट व नूडल्स (Breakfast)
  {
    id: 14,
    name: "मैगी 2-मिनट मसाला नूडल्स (Maggi Noodles Pack)",
    brand: "Maggi",
    category: "breakfast",
    rating: 4.9,
    reviews: "11k",
    tag: "सबका पसंदीदा नाश्ता",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "Pack of 4 (280g)", price: 54, mrp: 60 },
      { weight: "Pack of 8 (560g)", price: 102, mrp: 120 }
    ]
  },

  // 7. ड्राई फ्रूट्स (Dry Fruits)
  {
    id: 15,
    name: "न्यूट्रैज 100% प्रीमियम कैलिफोर्निया बादाम (Raw Almonds)",
    brand: "Nutraj",
    category: "dryfruits",
    rating: 4.9,
    reviews: "3.9k",
    tag: "100% क्रंची व ताज़ा",
    image: "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?w=500&auto=format&fit=crop&q=80",
    variants: [
      { weight: "250g", price: 235, mrp: 295 },
      { weight: "500g", price: 450, mrp: 575 },
      { weight: "1 kg", price: 880, mrp: 1150 }
    ]
  }
];

export default function App() {
  // ---------------- STATE VARIABLES ----------------
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState({}); // { [productId]: variantIndex }
  const [couponCode, setCouponCode] = useState('SHUDDH50');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [deliverySlot, setDeliverySlot] = useState('⚡ तुरंत 15 मिनट डिलीवरी');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [toast, setToast] = useState(null);

  // Customer Delivery Details State
  const [customer, setCustomer] = useState({
    name: 'राजेश शर्मा',
    phone: '9826012345',
    address: 'मकान नं. 14, आनंद नगर, मेन रोड',
    landmark: 'शिव मंदिर के पास',
    pincode: '452001'
  });

  // ---------------- HELPER: SHOW TOAST ----------------
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // ---------------- VARIANT SELECTION HANDLER ----------------
  const handleVariantChange = (productId, variantIndex) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantIndex
    }));
  };

  // ---------------- CART MANAGEMENT ----------------
  const addToCart = (product) => {
    const variantIdx = selectedVariants[product.id] || 0;
    const variant = product.variants[variantIdx];

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.variant.weight === variant.weight
      );

      if (existingItemIndex > -1) {
        const updated = [...prevCart];
        updated[existingItemIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { product, variant, quantity: 1 }];
      }
    });

    showToast(`✓ '${product.name} (${variant.weight})' कार्ट में जोड़ा गया! 🛒`);
  };

  const updateQuantity = (productId, variantWeight, change) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.product.id === productId && item.variant.weight === variantWeight) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const getItemQuantityInCart = (productId, variantWeight) => {
    const item = cart.find(
      i => i.product.id === productId && i.variant.weight === variantWeight
    );
    return item ? item.quantity : 0;
  };

  // ---------------- CALCULATIONS (SUBTOTAL, BILL, DISCOUNTS) ----------------
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
  }, [cart]);

  const deliveryFee = useMemo(() => {
    if (subtotal === 0 || subtotal >= 199) return 0;
    return 29;
  }, [subtotal]);

  const discount = useMemo(() => {
    if (isCouponApplied && subtotal >= 499) return 50;
    return 0;
  }, [isCouponApplied, subtotal]);

  const totalBill = useMemo(() => {
    return Math.max(0, subtotal + deliveryFee - discount);
  }, [subtotal, deliveryFee, discount]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // ---------------- COUPON HANDLER ----------------
  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SHUDDH50') {
      if (subtotal >= 499) {
        setIsCouponApplied(true);
        showToast("🎉 कूपन SHUDDH50 लागू हुआ! ₹50 की छूट प्राप्त हुई।");
      } else {
        showToast("⚠️ कूपन 'SHUDDH50' के लिए कम से कम ₹499 का ऑर्डर आवश्यक है!");
      }
    } else {
      showToast("अमान्य कूपन कोड! कृपया 'SHUDDH50' दर्ज करें।");
    }
  };

  // ---------------- FILTERED PRODUCTS LIST ----------------
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            prod.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // ---------------- ORDER SUBMISSION FLOW: SUPABASE REST + WEB3FORMS + WHATSAPP ----------------
  const handleOrderOnWhatsApp = async (e) => {
    if (e) e.preventDefault();

    // 1. Validate customer name, phone, address and cart state
    if (cart.length === 0) {
      showToast("⚠️ आपकी टोकरी खाली है! कृपया पहले सामान जोड़ें।");
      return;
    }

    const customerName = customer.name.trim();
    if (!customerName || customerName.length < 3) {
      showToast("⚠️ कृपया अपना पूरा नाम (कम से कम 3 अक्षर) दर्ज करें!");
      return;
    }

    const cleanPhone = customer.phone.trim().replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      showToast("⚠️ कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें!");
      return;
    }
    const customerPhone = cleanPhone.slice(-10);

    const rawAddress = customer.address.trim();
    if (!rawAddress || rawAddress.length < 5) {
      showToast("⚠️ कृपया अपना पूरा डिलीवरी पता दर्ज करें!");
      return;
    }

    const customerAddress = `${rawAddress}${customer.landmark ? ', Landmark: ' + customer.landmark.trim() : ''}${customer.pincode ? ', Pincode: ' + customer.pincode.trim() : ''} (Indore)`;

    // Set loading state to true ("Processing Order...")
    setIsSubmitting(true);

    const generatedOrderId = "DKM-" + Math.floor(100000 + Math.random() * 900000);
    const orderTimestamp = new Date().toLocaleString('hi-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const paymentMethodLabel = paymentMethod === 'COD' ? "Cash on Delivery (COD)" : "Pay via UPI / Online";
    const totalPrice = totalBill;

    // Itemized summary formatted for Supabase & Email
    const formattedSummary = cart.map((item, idx) => {
      const lineTotal = item.variant.price * item.quantity;
      return `${idx + 1}. ${item.product.name} [${item.variant.weight}] × Qty: ${item.quantity} = ₹${lineTotal} (₹${item.variant.price}/unit)`;
    }).join("\n");

    const fullOrderSummaryText = `${formattedSummary}

----------------------------------------
Subtotal: ₹${subtotal}
Delivery Fee: ${deliveryFee === 0 ? 'FREE (15 Min Express)' : '₹' + deliveryFee}
Coupon Discount (SHUDDH50): ${discount > 0 ? '₹' + discount : '₹0'}
----------------------------------------
TOTAL BILL: ₹${totalPrice}
Payment Mode: ${paymentMethodLabel}
Delivery Slot: ${deliverySlot}`;

    // 2. Prepare Supabase Payload
    const supabasePayload = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress,
      order_summary: formattedSummary,
      total_bill: totalPrice,
      payment_method: "COD"
    };

    // 3. Prepare Web3Forms Email Payload
    const web3FormsPayload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "🛒 Naya Grocery Order - Digital Kirana Mart",
      from_name: "Digital Kirana Mart",
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress,
      order_summary: fullOrderSummaryText,
      total_bill: `₹${totalPrice}`,
      payment_method: paymentMethodLabel
    };

    // 4. Prepare WhatsApp Message
    let waMessage = `🛒 *डिजिटल किराना मार्ट (Digital Kirana Mart)*\n`;
    waMessage += `🌾 *100% शुद्ध देशी किराना | 15 मिनट सुपरफास्ट डिलीवरी*\n`;
    waMessage += `══════════════════════════════════\n`;
    waMessage += `🧾 *नया किराना ऑर्डर (New Order)*\n`;
    waMessage += `🔢 *ऑर्डर ID:* #${generatedOrderId}\n`;
    waMessage += `📅 *दिनांक व समय:* ${orderTimestamp}\n`;
    waMessage += `══════════════════════════════════\n\n`;

    waMessage += `👤 *ग्राहक विवरण (Customer Details):*\n`;
    waMessage += `• *नाम:* ${customerName}\n`;
    waMessage += `• *मोबाइल नंबर:* +91 ${customerPhone}\n`;
    waMessage += `• *डिलीवरी पता:* ${customerAddress}\n`;
    waMessage += `• *डिलीवरी स्लॉट:* ${deliverySlot}\n`;
    waMessage += `• *भुगतान विधि:* ${paymentMethodLabel}\n\n`;

    waMessage += `📦 *ऑर्डर किए गए किराना सामान:*\n`;
    waMessage += `──────────────────────────────────\n`;
    cart.forEach((item, index) => {
      const lineTotal = item.variant.price * item.quantity;
      waMessage += `${index + 1}. ▪️ *${item.product.name}*\n`;
      waMessage += `   └ [${item.variant.weight}] × ${item.quantity} = *₹${lineTotal}*\n`;
    });
    waMessage += `──────────────────────────────────\n`;
    waMessage += `💰 *सामान का मूल्य (Subtotal):* ₹${subtotal}\n`;
    waMessage += `🚚 *डिलीवरी शुल्क:* ${deliveryFee === 0 ? "मुफ्त (FREE)" : "₹" + deliveryFee}\n`;
    if (discount > 0) {
      waMessage += `🏷️ *कूपन छूट (SHUDDH50):* -₹${discount}\n`;
    }
    waMessage += `══════════════════════════════════\n`;
    waMessage += `✨ *कुल देय राशि (Grand Total):* *₹${totalPrice}*\n`;
    waMessage += `══════════════════════════════════\n\n`;
    waMessage += `🙏 *डिजिटल किराना मार्ट से खरीदारी करने के लिए धन्यवाद!*`;

    const encodedWhatsAppUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // 2 & 3. Send requests to Supabase and Web3Forms (with keepalive)
    try {
      const supabasePromise = fetch(SUPABASE_REST_URL, {
        method: "POST",
        keepalive: true,
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(supabasePayload)
      });

      const web3FormsPromise = fetch(WEB3FORMS_API_URL, {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(web3FormsPayload)
      });

      const googleSheetPromise = fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_address: customerAddress,
          order_summary: formattedSummary,
          total_bill: `₹${totalPrice}`,
          payment_method: paymentMethodLabel
        })
      });

      await Promise.allSettled([supabasePromise, web3FormsPromise, googleSheetPromise]);
    } catch (err) {
      console.warn("Order synchronization notice:", err);
    }

    // 4. Open WhatsApp URL (wa.me) with pre-filled bill
    try {
      const waWindow = window.open(encodedWhatsAppUrl, '_blank');
      if (!waWindow || waWindow.closed || typeof waWindow.closed === 'undefined') {
        window.location.href = encodedWhatsAppUrl;
      }
    } catch (popupErr) {
      window.location.href = encodedWhatsAppUrl;
    }

    // Save order details for success modal
    setOrderSuccess({
      orderId: generatedOrderId,
      date: orderTimestamp,
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      total: totalPrice,
      paymentMode: paymentMethodLabel,
      items: [...cart]
    });

    // 5. Reset cart and clear customer input fields
    setCart([]);
    setCustomer({
      name: '',
      phone: '',
      address: '',
      landmark: '',
      pincode: ''
    });
    setIsCouponApplied(false);
    setIsCartOpen(false);
    setIsSubmitting(false);

    showToast("🎉 बधाई! ऑर्डर Supabase DB में सेव हुआ और WhatsApp पर भेजा गया!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-2 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 font-medium">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              15 Min Express
            </span>
            <span>⚡ सुपरफास्ट 15 मिनट डिलीवरी | 100% शुद्ध देशी किराना की गारंटी</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-300">
            <span>📍 डिलीवरी: <strong>इंदौर (452001)</strong></span>
            <span className="hidden sm:inline">📞 हेल्पलाइन: <strong>1800-123-5566</strong></span>
          </div>
        </div>
      </div>

      {/* 2. SMART NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0B0F19] text-white shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Store Name */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setSelectedCategory('all')}>
            <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-amber-400 shadow flex items-center justify-center font-black text-slate-900 text-lg">
              🛒
            </div>
            <div>
              <h1 className="font-black text-lg sm:text-xl tracking-tight leading-tight">
                Digital <span className="text-amber-400">Kirana</span> Mart
              </h1>
              <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                शुद्धता व ताज़गी की गारंटी
              </p>
            </div>
          </div>

          {/* Amazon-style Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="ताज़ा आटा, बासमती चावल, मसाले, कोल्ड ड्रिंक्स खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-700 focus:border-amber-400 focus:bg-slate-950 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 text-slate-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
              <div className="absolute right-2 bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
                🔍 खोजें
              </div>
            </div>
          </div>

          {/* Cart Trigger Button with Live Counter Badge */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-md transition cursor-pointer shrink-0"
          >
            <div className="relative">
              <span className="text-lg">🛍️</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-emerald-200 font-semibold uppercase leading-none">मेरी टोकरी</div>
              <div className="text-xs font-black leading-tight">₹{totalBill}</div>
            </div>
          </button>
        </div>

        {/* Mobile Search Input */}
        <div className="p-2.5 bg-slate-900 border-t border-slate-800 md:hidden">
          <input
            type="text"
            placeholder="किराना सामान खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-400"
          />
        </div>
      </header>

      {/* 3. HERO PROMO BANNER */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white py-6 px-4 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              त्योहारों की महा-बचत
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black">
              कूपन कोड <span className="text-amber-300 underline underline-offset-4 font-mono">SHUDDH50</span> पर ₹50 की छूट!
            </h2>
            <p className="text-xs text-emerald-200">
              ₹199 से अधिक के सभी ऑर्डर्स पर 15 मिनट एक्सप्रेस डिलीवरी बिल्कुल मुफ्त।
            </p>
          </div>
          <div className="bg-slate-950/70 border border-amber-400/30 p-3 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="text-[10px] text-amber-300 font-semibold uppercase">ऑफर समाप्ति समय</div>
              <div className="text-lg font-black font-mono text-white">04:45:12</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CATEGORY CIRCULAR FILTER PILLS */}
      <section className="bg-white border-b border-slate-200 py-4 shadow-xs sticky top-[60px] z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. MAIN CONTENT - PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'किराना उत्पाद'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              कुल {filteredProducts.length} उत्पाद उपलब्ध (थोक भाव पर 15 मिनट डिलीवरी)
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-xl font-bold">
            100% शुद्ध देशी गारंटी
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <span className="text-4xl block mb-2">🔍</span>
            <h4 className="font-bold text-slate-700">कोई उत्पाद नहीं मिला!</h4>
            <p className="text-xs text-slate-400 mt-1">कृपया कोई अन्य कीवर्ड या श्रेणी खोजें।</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              सभी उत्पाद देखें
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const currentVariantIdx = selectedVariants[product.id] || 0;
              const activeVariant = product.variants[currentVariantIdx] || product.variants[0];
              const inCartQty = getItemQuantityInCart(product.id, activeVariant.weight);
              const saveAmount = activeVariant.mrp - activeVariant.price;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Badge & Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-lg shadow-xs">
                        ₹{saveAmount} की बचत
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                        ⭐ {product.rating} <span className="text-slate-400 text-[10px]">({product.reviews})</span>
                      </span>
                    </div>

                    {/* Product Image */}
                    <div className="w-full h-44 rounded-2xl bg-slate-100 overflow-hidden mb-3 relative flex items-center justify-center p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/400x400/f8fafc/0f172a?text=Fresh+Kirana";
                        }}
                      />
                      <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {product.brand}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2" title={product.name}>
                      {product.name}
                    </h4>

                    {/* Weight Variant Selector Dropdown/Pills */}
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex justify-between">
                        <span>वजन चुनें (Weight):</span>
                        <span className="text-emerald-700 font-extrabold">{activeVariant.weight}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.variants.map((v, idx) => (
                          <button
                            key={v.weight}
                            type="button"
                            onClick={() => handleVariantChange(product.id, idx)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                              currentVariantIdx === idx
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {v.weight}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Add to Cart Controls with [- qty +] */}
                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-slate-900">₹{activeVariant.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{activeVariant.mrp}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {product.tag || '15 मिनट डिलीवरी'}
                      </span>
                    </div>

                    {inCartQty === 0 ? (
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition cursor-pointer flex items-center gap-1"
                      >
                        <span>+ जोड़ें</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-emerald-600 text-white rounded-xl overflow-hidden shadow">
                        <button
                          type="button"
                          aria-label="मात्रा घटाएं"
                          onClick={() => updateQuantity(product.id, activeVariant.weight, -1)}
                          className="px-2.5 py-1.5 hover:bg-emerald-700 transition font-black text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-black bg-emerald-700">
                          {inCartQty}
                        </span>
                        <button
                          type="button"
                          aria-label="मात्रा बढ़ाएं"
                          onClick={() => updateQuantity(product.id, activeVariant.weight, 1)}
                          className="px-2.5 py-1.5 hover:bg-emerald-700 transition font-black text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 6. SLIDE-OVER CART DRAWER & CHECKOUT MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-50 shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <h3 className="font-black text-base text-slate-900">मेरी टोकरी (My Basket)</h3>
                    <p className="text-xs text-slate-500">{totalItemsCount} सामान जोड़े गए</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Free Delivery Meter */}
              <div className="bg-emerald-50 border-b border-emerald-100 p-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-1">
                  <span>{deliveryFee === 0 ? '🎉 मुफ्त एक्सप्रेस डिलीवरी लागू!' : `₹${199 - subtotal} और जोड़ें मुफ्त डिलीवरी के लिए`}</span>
                  <span>{deliveryFee === 0 ? 'FREE' : '₹29'}</span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 199) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-5xl block mb-3">🧺</span>
                    <h4 className="font-bold text-slate-800">आपकी टोकरी अभी खाली है!</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                       शुद्ध बासमती चावल, मसाले, दालें व कोल्ड ड्रिंक्स कार्ट में जोड़ें।
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
                    >
                      खरीदारी शुरू करें
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Itemized Cart List with [- 1 +] Controls */}
                    <div className="space-y-2.5">
                      {cart.map((item) => (
                        <div
                          key={`${item.product.id}-${item.variant.weight}`}
                          className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-xl bg-slate-100 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/400x400/f8fafc/0f172a?text=Fresh+Kirana";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-xs text-slate-900 truncate">{item.product.name}</h5>
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded">
                              {item.variant.weight}
                            </span>
                            <div className="text-xs font-black text-emerald-700 mt-0.5">
                              ₹{item.variant.price * item.quantity}
                            </div>
                          </div>

                          <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200">
                            <button
                              type="button"
                              aria-label="मात्रा घटाएं"
                              onClick={() => updateQuantity(item.product.id, item.variant.weight, -1)}
                              className="w-7 h-7 flex items-center justify-center font-bold text-xs hover:bg-slate-200 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label="मात्रा बढ़ाएं"
                              onClick={() => updateQuantity(item.product.id, item.variant.weight, 1)}
                              className="w-7 h-7 flex items-center justify-center font-bold text-xs hover:bg-slate-200 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address Form */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                        <span>📍</span> डिलीवरी का पता (Delivery Address) *
                      </h4>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block mb-1">पूरा नाम (Full Name) *</label>
                        <input
                          type="text"
                          required
                          value={customer.name}
                          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                          placeholder="उदा. राजेश शर्मा"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block mb-1">मोबाइल नंबर (Phone) *</label>
                        <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 overflow-hidden">
                          <span className="px-2 text-xs font-bold text-slate-500 border-r">+91</span>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            value={customer.phone}
                            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                            placeholder="10 अंकों का नंबर"
                            className="w-full bg-transparent px-2.5 py-2 text-xs font-semibold outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block mb-1">पूरा पता (House No, Street, Area) *</label>
                        <textarea
                          rows={2}
                          required
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          placeholder="उदा. मकान नं. 14, आनंद नगर, मेन रोड, इंदौर"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-1">लैंडमार्क</label>
                          <input
                            type="text"
                            value={customer.landmark}
                            onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                            placeholder="नजदीकी स्थान"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-1">पिनकोड</label>
                          <input
                            type="text"
                            maxLength={6}
                            value={customer.pincode}
                            onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                            placeholder="452001"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Delivery Slot Selection */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
                      <h4 className="font-bold text-xs text-slate-900 mb-2">🕒 डिलीवरी समय स्लॉट</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <label className={`p-2 rounded-xl border flex items-center gap-1.5 cursor-pointer font-bold ${
                          deliverySlot.includes('15 मिनट') ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200'
                        }`}>
                          <input
                            type="radio"
                            name="deliverySlot"
                            checked={deliverySlot.includes('15 मिनट')}
                            onChange={() => setDeliverySlot('⚡ तुरंत 15 मिनट डिलीवरी')}
                          />
                          <span>⚡ 15 मिनट डिलीवरी</span>
                        </label>
                        <label className={`p-2 rounded-xl border flex items-center gap-1.5 cursor-pointer font-bold ${
                          deliverySlot.includes('शाम') ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200'
                        }`}>
                          <input
                            type="radio"
                            name="deliverySlot"
                            checked={deliverySlot.includes('शाम')}
                            onChange={() => setDeliverySlot('🕒 आज शाम 6:00 - 8:00')}
                          />
                          <span>🕒 शाम 6:00 - 8:00</span>
                        </label>
                      </div>
                    </div>

                    {/* Payment Mode Selection */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
                      <h4 className="font-bold text-xs text-slate-900 mb-2">💳 भुगतान विधि (Payment Mode)</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer font-bold ${
                          paymentMethod === 'COD' ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200'
                        }`}>
                          <input
                            type="radio"
                            name="payMethod"
                            checked={paymentMethod === 'COD'}
                            onChange={() => setPaymentMethod('COD')}
                          />
                          <span>💵 नकद (COD)</span>
                        </label>
                        <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer font-bold ${
                          paymentMethod === 'UPI' ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200'
                        }`}>
                          <input
                            type="radio"
                            name="payMethod"
                            checked={paymentMethod === 'UPI'}
                            onChange={() => setPaymentMethod('UPI')}
                          />
                          <span>⚡ Pay via UPI</span>
                        </label>
                      </div>
                    </div>

                    {/* Coupon Code Section */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="कूपन कोड (SHUDDH50)"
                          className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase flex-1 outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="bg-slate-800 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
                        >
                          लागू करें
                        </button>
                      </div>
                      {isCouponApplied && (
                        <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex justify-between">
                          <span>✓ कूपन SHUDDH50 लागू! (₹50 छूट)</span>
                          <button onClick={() => setIsCouponApplied(false)} className="text-red-600 underline cursor-pointer">हटाएं</button>
                        </div>
                      )}
                    </div>

                    {/* Bill Breakdown Summary */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>सामान का मूल्य (Subtotal)</span>
                        <span className="font-bold text-slate-900">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>डिलीवरी शुल्क (Delivery Fee)</span>
                        <span className="font-bold text-emerald-600">{deliveryFee === 0 ? 'मुफ्त (FREE)' : `₹${deliveryFee}`}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>कूपन छूट (SHUDDH50)</span>
                          <span>- ₹${discount}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between items-center text-sm font-black text-slate-900">
                        <span>कुल देय राशि (Total Bill)</span>
                        <span className="text-xl text-emerald-700">₹{totalBill}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer with Dynamic Order on WhatsApp Button */}
              {cart.length > 0 && (
                <div className="bg-white p-4 border-t border-slate-200 space-y-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleOrderOnWhatsApp}
                    className={`w-full py-4 px-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 shadow-lg transition active:scale-98 cursor-pointer ${
                      isSubmitting
                        ? 'bg-emerald-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin text-lg">⏳</span>
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">💬</span>
                        <span>Order on WhatsApp (व्हाट्सएप पर ऑर्डर करें) • ₹{totalBill}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    💾 Supabase DB, 📧 ईमेल अलर्ट व 💬 WhatsApp रसीद स्वतः सिंक होंगी।
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 7. ORDER SUCCESS CONFIRMATION MODAL */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-emerald-100 relative">
            <span className="text-5xl block mb-2">🎉</span>
            <span className="inline-block bg-emerald-50 text-emerald-800 text-[11px] font-black px-3 py-1 rounded-full border border-emerald-200 mb-2">
              ⚡ 15 मिनट सुपरफास्ट डिलीवरी
            </span>
            <h3 className="text-xl font-black text-slate-900">
              बधाई! आपका ऑर्डर दर्ज हो गया है!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ऑर्डर विवरण Supabase Database और आपके ईमेल/WhatsApp पर भेज दिया गया है।
            </p>

            {/* Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-4 my-4 text-left space-y-1.5 text-xs border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">ऑर्डर ID:</span>
                <span className="font-mono font-black text-slate-900">#{orderSuccess.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">कुल बिल:</span>
                <span className="font-black text-emerald-700 text-sm">₹{orderSuccess.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ग्राहक:</span>
                <span className="font-bold text-slate-800">{orderSuccess.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">भुगतान:</span>
                <span className="font-bold text-slate-800">{orderSuccess.paymentMode}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOrderSuccess(null)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 rounded-2xl shadow transition cursor-pointer"
            >
              🛍️ और खरीदारी करें (Continue Shopping)
            </button>
          </div>
        </div>
      )}

      {/* 8. FLOATING TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B0F19] text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2 max-w-[90vw] animate-bounce">
          <span className="text-emerald-400">✓</span>
          <span>{toast}</span>
        </div>
      )}

      {/* 9. FOOTER */}
      <footer className="bg-[#0B0F19] text-slate-400 text-xs py-8 px-4 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-white font-bold text-sm">Digital Kirana Mart (राजवाड़ा, इंदौर)</div>
            <div className="text-[11px] text-slate-500">100% शुद्ध देशी किराना | FSSAI Lic No: 11422850001234</div>
          </div>
          <div className="text-[11px]">
            © 2026 Digital Kirana Mart. Supabase Database, Web3Forms & WhatsApp Integrated.
          </div>
        </div>
      </footer>

    </div>
  );
}
