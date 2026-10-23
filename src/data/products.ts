export interface Product {
  id: string;
  sku: string;
  name: string;
  franchise: string; // e.g. "Club C", "Classic Leather", "Nano", "FloatZig", "Zig Kinetica"
  category: string; // "Adult Unisex", "Mens", "Womens", "Accessories"
  gender: 'unisex' | 'men' | 'women';
  priceZAR: number;
  formattedPrice: string;
  image: string;
  additionalImages?: string[];
  colorway: string;
  badge?: string;
  tags: string[]; // ['trending', 'classics', 'sports', 'men', 'women', 'accessories']
  description: string;
  techSpecs: {
    upper: string;
    midsole: string;
    outsole: string;
    closure: string;
  };
  sizesUK: {
    size: string;
    stock: number;
  }[];
}

export const PRODUCTS: Product[] = [
  // CLASSICS / LIFESTYLE
  {
    id: 'rbk-club-c-85-vintage',
    sku: '100000078',
    name: 'Club C 85 Vintage Sneakers',
    franchise: 'Club C',
    category: 'Adult Unisex Classics',
    gender: 'unisex',
    priceZAR: 1699,
    formattedPrice: 'R 1,699.00 ZAR',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Chalk / Glen Green / Paperwhite',
    badge: 'Iconic Classic',
    tags: ['trending', 'classics', 'men', 'women'],
    description: 'A genuine tennis court legend from 1985. Crafted from premium garment leather with retro terry cloth lining and archival Reebok woven label with the Union Jack crest. Timeless low-cut profile built for all-day comfort on South African streets.',
    techSpecs: {
      upper: 'Soft premium garment leather upper with toe box perforations',
      midsole: 'Lightweight die-cut EVA foam midsole for responsive cushioning',
      outsole: 'High-abrasion durable rubber cupsole with pivot circle',
      closure: 'Heritage cotton laces with reinforced eyelets'
    },
    sizesUK: [
      { size: '5', stock: 3 },
      { size: '6', stock: 4 },
      { size: '7', stock: 6 },
      { size: '8', stock: 8 },
      { size: '9', stock: 5 },
      { size: '10', stock: 2 },
      { size: '11', stock: 4 },
      { size: '12', stock: 1 }
    ]
  },
  {
    id: 'rbk-classic-leather-1983',
    sku: '100000183',
    name: 'Classic Leather 1983 Vintage',
    franchise: 'Classic Leather',
    category: 'Adult Unisex Classics',
    gender: 'unisex',
    priceZAR: 1799,
    formattedPrice: 'R 1,799.00 ZAR',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Chalk / Alabaster / Vector Red',
    badge: 'Archival 1983',
    tags: ['trending', 'classics', 'men', 'women'],
    description: 'First introduced in 1983 as a premier runner, the Classic Leather remains the definition of effortless heritage. Hand-feel garment leather feels broken-in from the first wear with dual-density bi-color EVA midsole.',
    techSpecs: {
      upper: 'Buttery soft garment leather with French terry lining',
      midsole: 'Dual-density Bi-blend EVA midsole for retro running support',
      outsole: 'Lugged high-traction rubber outsole with flex grooves',
      closure: 'Tonal flat cotton laces with archive tongue tag'
    },
    sizesUK: [
      { size: '5', stock: 2 },
      { size: '6', stock: 5 },
      { size: '7', stock: 7 },
      { size: '8', stock: 9 },
      { size: '9', stock: 6 },
      { size: '10', stock: 3 },
      { size: '11', stock: 2 },
      { size: '12', stock: 2 }
    ]
  },
  {
    id: 'rbk-club-c-revenge',
    sku: '100033102',
    name: 'Club C Revenge Vintage',
    franchise: 'Club C',
    category: 'Adult Unisex',
    gender: 'unisex',
    priceZAR: 1599,
    formattedPrice: 'R 1,599.00 ZAR',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Chalk / Collegiate Navy / Vector Red',
    badge: 'Retro Stripes',
    tags: ['classics', 'men', 'women'],
    description: 'Inspired by retro 80s court competition, the Club C Revenge incorporates bold contrast side-stripes and vector branding into the clean Club C silhouette.',
    techSpecs: {
      upper: 'Smooth leather upper with textured suede toe cap',
      midsole: 'Molded EVA sockliner and shock-absorbing midsole',
      outsole: 'Non-marking high-durability rubber outsole',
      closure: 'Lace-up closure'
    },
    sizesUK: [
      { size: '6', stock: 4 },
      { size: '7', stock: 5 },
      { size: '8', stock: 7 },
      { size: '9', stock: 4 },
      { size: '10', stock: 3 },
      { size: '11', stock: 1 }
    ]
  },
  {
    id: 'rbk-classic-leather-sp-extra',
    sku: '100074128',
    name: "Classic Leather SP Extra Platform",
    franchise: 'Classic Leather',
    category: "Womens Lifestyle",
    gender: 'women',
    priceZAR: 1899,
    formattedPrice: 'R 1,899.00 ZAR',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Cloud White / Pure Grey / Core Black',
    badge: 'Platform Lift',
    tags: ['trending', 'women', 'classics'],
    description: "An exaggerated, elevated platform midsole gives this modern update to the Classic Leather a bold attitude. Designed specifically for women seeking streetwise height without compromising all-day cushion.",
    techSpecs: {
      upper: 'Supple leather with clean tonal overlays',
      midsole: 'Sculpted high-profile lightweight EVA platform',
      outsole: 'Chunky ripple-textured rubber tread',
      closure: 'Lace closure with padded collar'
    },
    sizesUK: [
      { size: '4', stock: 3 },
      { size: '5', stock: 6 },
      { size: '6', stock: 8 },
      { size: '7', stock: 5 },
      { size: '8', stock: 2 }
    ]
  },

  // TRAINING & SPORTS (NANO & PERFORMANCE)
  {
    id: 'rbk-nano-x4-training',
    sku: '100074601',
    name: 'Nano X4 Cross-Training Shoes',
    franchise: 'Nano',
    category: 'Adult Unisex Sports',
    gender: 'unisex',
    priceZAR: 2699,
    formattedPrice: 'R 2,699.00 ZAR',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Core Black / Cold Grey / Pure Red',
    badge: 'Official Gym Benchmark',
    tags: ['trending', 'sports', 'men', 'women'],
    description: 'The official benchmark for CrossFit, HYROX, and functional fitness. Features the upgraded Lift and Run (L.A.R.) Chassis system that locks down heel stability during heavy barbell squats and softens for sprint intervals.',
    techSpecs: {
      upper: 'FLEXWEAVE engineered woven textile for ultra-breathable containment',
      midsole: 'Floatride Energy Foam with L.A.R. Chassis stability plate',
      outsole: 'Full-length ROPEPRO carbon rubber with multi-surface grip',
      closure: 'Anatomical lacing with midfoot lockdown cage'
    },
    sizesUK: [
      { size: '6', stock: 3 },
      { size: '7', stock: 5 },
      { size: '8', stock: 8 },
      { size: '9', stock: 10 },
      { size: '10', stock: 7 },
      { size: '11', stock: 4 },
      { size: '12', stock: 2 }
    ]
  },
  {
    id: 'rbk-nano-2-heritage',
    sku: '100047230',
    name: 'Nano 2.0 Heritage Cross-Trainer',
    franchise: 'Nano',
    category: 'Mens Sports',
    gender: 'men',
    priceZAR: 2499,
    formattedPrice: 'R 2,499.00 ZAR',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Core Black / Ftwr White / Vector Red',
    badge: 'CrossFit Fan Favorite',
    tags: ['sports', 'men'],
    description: 'The community demanded its return: the iconic Nano 2.0 brings back the wide anatomical toe box, low-to-the-ground ground feel, and indestructible lateral wrap that made it a legend.',
    techSpecs: {
      upper: 'Open-hole breathable mesh with DuraGrip protective toe cap',
      midsole: 'Low-profile EVA core for natural proprioception and barbell stability',
      outsole: 'High-traction rubber outsole with rope-wrap medial bridge',
      closure: 'Reinforced lace system'
    },
    sizesUK: [
      { size: '7', stock: 3 },
      { size: '8', stock: 6 },
      { size: '9', stock: 8 },
      { size: '10', stock: 5 },
      { size: '11', stock: 3 }
    ]
  },
  {
    id: 'rbk-floatzig-1-running',
    sku: '100074890',
    name: 'FloatZig 1 Running Shoes',
    franchise: 'FloatZig',
    category: 'Adult Unisex Sports',
    gender: 'unisex',
    priceZAR: 2599,
    formattedPrice: 'R 2,599.00 ZAR',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Acid Lime / Core Black / Vector Cyan',
    badge: 'Floatride + Zig Tech',
    tags: ['trending', 'sports', 'men', 'women'],
    description: 'Reebok’s premier daily trainer unites high-energy Floatride Energy Foam with iconic geometric Zig shape geometry. Delivers lightweight rebound and smooth transitions from 5K morning jogs to marathon training.',
    techSpecs: {
      upper: 'Engineered mono-mesh with targeted zonal ventilation panels',
      midsole: 'Full-length Floatride Energy Foam wrapped in Zig geometric chassis',
      outsole: 'All-surface targeted rubber pods for energy return and road traction',
      closure: 'Ghillie lace system with plush heel collar'
    },
    sizesUK: [
      { size: '6', stock: 4 },
      { size: '7', stock: 7 },
      { size: '8', stock: 9 },
      { size: '9', stock: 11 },
      { size: '10', stock: 8 },
      { size: '11', stock: 4 }
    ]
  },
  {
    id: 'rbk-zig-kinetica-25-edge',
    sku: '100034011',
    name: 'Zig Kinetica 2.5 Edge Techwear',
    franchise: 'Zig Kinetica',
    category: 'Adult Unisex Sports & Trail',
    gender: 'unisex',
    priceZAR: 2899,
    formattedPrice: 'R 2,899.00 ZAR',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Pure Black / Ash Grey / Tactical Camo',
    badge: 'Vibram Traction',
    tags: ['sports', 'men'],
    description: 'Outdoor utility meets cutting-edge streetwear. Equipped with a rugged Vibram ECOSTEP lugged outsole, water-repellent Cordura overlays, and responsive Floatride Fuel cushioning inside a signature Zig Energy Shell.',
    techSpecs: {
      upper: 'Ballistic CORDURA nylon textile with seamless abrasion barriers',
      midsole: 'Floatride Fuel core enveloped in Zig Energy Shell',
      outsole: 'Vibram ECOSTEP lugged rubber outsole made with 30% recycled rubber',
      closure: 'Speed lacing toggle system with trail eyelets'
    },
    sizesUK: [
      { size: '7', stock: 2 },
      { size: '8', stock: 4 },
      { size: '9', stock: 6 },
      { size: '10', stock: 4 },
      { size: '11', stock: 2 }
    ]
  },
  {
    id: 'rbk-bb4000-ii-mid',
    sku: '100032904',
    name: 'BB 4000 II Mid Basketball Shoes',
    franchise: 'BB Series',
    category: 'Mens Classics',
    gender: 'men',
    priceZAR: 2199,
    formattedPrice: 'R 2,199.00 ZAR',
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Chalk / Vector Navy / Gum 4',
    badge: 'Hardwood Heritage',
    tags: ['classics', 'men'],
    description: 'Throwing it back to 1989 hardwood dominance. Mid-top padded collar locks your ankle with vintage court swagger, full-grain leather, and a heritage gum rubber cupsole.',
    techSpecs: {
      upper: 'Full grain leather with suede toe and collar accents',
      midsole: 'Die-cut EVA cushioning wedge',
      outsole: 'Gum rubber pivot cupsole with court herringbone pattern',
      closure: 'High lace-up design with mid-top collar strap'
    },
    sizesUK: [
      { size: '7', stock: 3 },
      { size: '8', stock: 5 },
      { size: '9', stock: 5 },
      { size: '10', stock: 4 },
      { size: '11', stock: 2 }
    ]
  },
  {
    id: 'rbk-energen-tech-plus',
    sku: '100044991',
    name: 'Energen Tech Plus Daily Runner',
    franchise: 'Energen',
    category: 'Womens Sports',
    gender: 'women',
    priceZAR: 1499,
    formattedPrice: 'R 1,499.00 ZAR',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Core Black / Ftwr White / Silver Metallic',
    badge: 'Floatride Fuel',
    tags: ['sports', 'women'],
    description: 'Engineered for everyday fitness runners seeking smooth forward propulsion without unnecessary weight. Features responsive FuelFoam cushioning for comfortable road mileage.',
    techSpecs: {
      upper: 'Engineered mesh with synthetic heel stabilizer clip',
      midsole: 'FuelFoam midsole with dual-density arch support',
      outsole: 'Flex-groove rubber outsole',
      closure: 'Lace-up closure'
    },
    sizesUK: [
      { size: '4', stock: 4 },
      { size: '5', stock: 7 },
      { size: '6', stock: 8 },
      { size: '7', stock: 6 },
      { size: '8', stock: 3 }
    ]
  },

  // APPAREL
  {
    id: 'rbk-classics-vector-track-jacket',
    sku: '100067420',
    name: 'Classics Vector Track Jacket',
    franchise: 'Vector Heritage',
    category: 'Adult Unisex Apparel',
    gender: 'unisex',
    priceZAR: 1299,
    formattedPrice: 'R 1,299.00 ZAR',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Vector Navy / White / Vector Red',
    badge: 'Original 90s Fit',
    tags: ['classics', 'men', 'women'],
    description: 'An unmistakable throwback to 90s athletics. Colorblocked with oversized Reebok Vector chevron geometry across the chest and back in crisp woven crinkle nylon with stand-up collar.',
    techSpecs: {
      upper: '100% recycled nylon plain weave crinkle shell',
      midsole: 'Breathable polyester mesh interior lining',
      outsole: 'Elasticated cuffs and hem with branded zip pull',
      closure: 'Full front zip with high protective collar'
    },
    sizesUK: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 3 }
    ]
  },
  {
    id: 'rbk-identity-fleece-hoodie',
    sku: '100028114',
    name: 'Reebok Identity Fleece Hoodie',
    franchise: 'Identity',
    category: 'Mens Apparel',
    gender: 'men',
    priceZAR: 999,
    formattedPrice: 'R 999.00 ZAR',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80'
    ],
    colorway: 'Medium Grey Heather / Black Vector',
    badge: 'Soft Cotton Fleece',
    tags: ['men'],
    description: 'Premium brushed cotton fleece pullover hoodie crafted for gym warmups and chilled weekend downtime. Emblazoned with the iconic contrast Reebok wordmark on the chest.',
    techSpecs: {
      upper: '80% cotton / 20% recycled polyester fleece',
      midsole: 'Brushed back ultra-soft interior feel',
      outsole: 'Ribbed cuffs and hem to lock warmth',
      closure: 'Drawcord adjustable lined hood with kangaroo pocket'
    },
    sizesUK: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 9 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 4 }
    ]
  },

  // ACCESSORIES
  {
    id: 'rbk-classics-archive-backpack',
    sku: '100055102',
    name: 'Classics Archive Backpack 24L',
    franchise: 'Archive',
    category: 'Unisex Accessories',
    gender: 'unisex',
    priceZAR: 899,
    formattedPrice: 'R 899.00 ZAR',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    colorway: 'Vector Navy / Chalk White',
    badge: 'Laptop Sleeve',
    tags: ['accessories'],
    description: 'Retro collegiate backpack with 24-litre capacity, internal padded 15-inch laptop sleeve, front organizer zip pocket, and water-resistant coated base.',
    techSpecs: {
      upper: '100% recycled 600D polyester with wipe-clean coating',
      midsole: 'Ergonomic padded air-mesh shoulder straps',
      outsole: 'Reinforced heavy-duty base panel',
      closure: 'Two-way heavy duty zippers with cord pulls'
    },
    sizesUK: [
      { size: 'One Size', stock: 12 }
    ]
  },
  {
    id: 'rbk-training-duffle-bag-m',
    sku: '100055203',
    name: 'Training Essentials Grip Duffle Medium',
    franchise: 'Essentials',
    category: 'Unisex Accessories',
    gender: 'unisex',
    priceZAR: 799,
    formattedPrice: 'R 799.00 ZAR',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    colorway: 'Black / Pure Red Accent',
    badge: 'Separate Shoe Pocket',
    tags: ['accessories'],
    description: 'Designed specifically for gym goers and cross-trainers. Includes an isolated ventilated side compartment for muddy training shoes, side mesh shaker pouch, and padded carry handle.',
    techSpecs: {
      upper: 'Durable 100% recycled polyester weave',
      midsole: 'Padded detachable shoulder strap',
      outsole: 'Ventilated footwear side tunnel compartment',
      closure: 'Full length U-zip main entry'
    },
    sizesUK: [
      { size: 'One Size', stock: 15 }
    ]
  },
  {
    id: 'rbk-foundation-vector-cap',
    sku: '100078901',
    name: 'Classics Foundation Vector Cap',
    franchise: 'Classics',
    category: 'Unisex Accessories',
    gender: 'unisex',
    priceZAR: 399,
    formattedPrice: 'R 399.00 ZAR',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
    colorway: 'Black / White Embroidered Vector',
    badge: '100% Cotton Twill',
    tags: ['accessories'],
    description: 'Classic 6-panel unstructured dad cap featuring crisp 3D embroidered Reebok Vector logo on front and buckle strapback closure.',
    techSpecs: {
      upper: '100% washed cotton twill fabric',
      midsole: 'Embroidered eyelets for breathability',
      outsole: 'Curved brim with moisture-wicking internal sweatband',
      closure: 'Adjustable metal buckle backstrap'
    },
    sizesUK: [
      { size: 'One Size', stock: 24 }
    ]
  },
  {
    id: 'rbk-active-core-socks-3pk',
    sku: '100078999',
    name: 'Active Core Graphic Crew Socks (3-Pack)',
    franchise: 'Active Core',
    category: 'Unisex Accessories',
    gender: 'unisex',
    priceZAR: 249,
    formattedPrice: 'R 249.00 ZAR',
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1000&q=80',
    colorway: 'White / Black / Vector Red',
    badge: 'Cushioned Sole',
    tags: ['accessories'],
    description: 'Pack of three athletic ribbed crew socks engineered with ribbed arch compression and padded terry sole for heavy lifting and running impact absorption.',
    techSpecs: {
      upper: '67% cotton / 30% polyester / 3% elastane',
      midsole: 'Arch support band prevents bunching',
      outsole: 'Reinforced heel and toe wear zones',
      closure: 'Stay-up ribbed athletic cuff'
    },
    sizesUK: [
      { size: 'M (UK 4-7)', stock: 18 },
      { size: 'L (UK 8-11)', stock: 22 }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'trending', label: 'Trending Now' },
  { id: 'classics', label: 'Classics' },
  { id: 'sports', label: 'Sports & Training' },
  { id: 'men', label: "Men's" },
  { id: 'women', label: "Women's" },
  { id: 'accessories', label: 'Accessories' }
];
