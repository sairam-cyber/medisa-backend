const medicines = [
    // Pain Relief
    { name: 'Crocin Pain Relief Tablet', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcx2Y4n5QjBZOybGfjePpueGi235iQ3D0boA&s', description: 'Provides relief from headache, migraine, and body pain.', category: 'Pain Relief', price: 45.50, countInStock: 200 },
    { name: 'Moov Pain Relief Cream', image: 'https://rukminim2.flixcart.com/image/704/844/xif0q/body-pain-relief/7/z/m/100-imported-rapid-pain-relief-cream-100g-1-tube-moov-original-imah4f6p2yh38wkh.jpeg?q=90&crop=false', description: 'Topical analgesic for backaches, muscular pains, and sprains.', category: 'Pain Relief', price: 130.00, countInStock: 150 },
    { name: 'Volini Pain Relief Gel', image: 'https://rukminim2.flixcart.com/image/704/844/xif0q/allopathy/7/n/o/-original-imagtud3gry8c3sv.jpeg?q=90&crop=false', description: 'Effective gel for joint pain, inflammation, and sports injuries.', category: 'Pain Relief', price: 155.25, countInStock: 180 },
    { name: 'Combiflam Tablet', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi4ODou2-8eefDyPdw85UPuy-beU-atFtdpg&s', description: 'Combination of Ibuprofen and Paracetamol for moderate pain and fever.', category: 'Pain Relief', price: 35.00, countInStock: 250 },
    { name: 'Iodex Balm', image: 'https://rukminim2.flixcart.com/image/704/844/jfsknm80/body-pain-relief/b/g/x/8-multipurpose-pain-balm-8-gm-iodex-original-imaf46d7w6yhxdjn.jpeg?q=90&crop=false', description: 'Multi-purpose pain balm for head, neck, and joint pains.', category: 'Pain Relief', price: 70.00, countInStock: 300 },

    // Allergy & Cold
    { name: 'Allegra 120mg Tablet', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhX0RCGNAFoOaCaR-caf7xZsqLQgOLL7-21g&s', description: 'Non-drowsy antihistamine for seasonal allergies and hay fever.', category: 'Allergy', price: 98.00, countInStock: 120 },
    { name: 'Vicks Vaporub 50ml', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQrQxi-inROcmY_O4pxrjJEhGnTjPHbBy8g&s', description: 'Provides relief from blocked nose, cough, and cold symptoms.', category: 'Cold & Cough', price: 140.00, countInStock: 220 },
    { name: 'Honitus Cough Syrup', image: 'https://m.media-amazon.com/images/I/41aQSoVhGsL._UF1000,1000_QL80_.jpg', description: 'Ayurvedic cough syrup for effective relief from all types of cough.', category: 'Cold & Cough', price: 95.00, countInStock: 160 },
    { name: 'Otrivin Nasal Spray', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeydQ8pUhNNtSxZWHZcB2WvQlHIVT_HudPfg&s', description: 'Quickly relieves nasal congestion due to colds and allergies.', category: 'Cold & Cough', price: 88.50, countInStock: 190 },
    { name: 'Strepsils Lozenges (8s)', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVSX54mOhouTEOeYOU7VmpskTs4RVzxVX6Fg&s', description: 'Soothes sore throats and provides relief from throat infections.', category: 'Cold & Cough', price: 40.00, countInStock: 400 },

    // Stomach Care
    { name: 'Eno Fruit Salt Sachet', image: '/image/medicines/eno.jpg', description: 'Provides fast relief from acidity and heartburn in just 6 seconds.', category: 'Stomach Care', price: 10.00, countInStock: 500 },
    { name: 'Pudin Hara Pearls (10s)', image: '/image/medicines/pudin-hara.jpg', description: 'Ayurvedic remedy for gas, indigestion, and stomach ache.', category: 'Stomach Care', price: 25.00, countInStock: 350 },
    { name: 'Gelusil MPS Antacid Gel', image: '/image/medicines/gelusil.jpg', description: 'Antacid and antiflatulent for relief from acidity and bloating.', category: 'Stomach Care', price: 115.00, countInStock: 130 },
    { name: 'Darolac Prebiotic & Probiotic Sachet', image: '/image/medicines/darolac.jpg', description: 'Restores healthy gut flora, useful in diarrhea and indigestion.', category: 'Stomach Care', price: 22.00, countInStock: 180 },

    // First Aid
    { name: 'Dettol Antiseptic Liquid 250ml', image: '/image/medicines/dettol.jpg', description: 'Protects from 100 illness-causing germs. For first aid and personal hygiene.', category: 'First Aid', price: 150.00, countInStock: 200 },
    { name: 'Savlon Antiseptic Liquid 100ml', image: '/image/medicines/savlon.jpg', description: 'Gentle antiseptic liquid for cleaning wounds and preventing infection.', category: 'First Aid', price: 75.00, countInStock: 250 },
    { name: 'Soframycin Skin Cream', image: '/image/medicines/soframycin.jpg', description: 'Antibiotic cream for treating bacterial skin infections, cuts, and wounds.', category: 'First Aid', price: 52.50, countInStock: 140 },
    { name: 'Hansaplast Washproof Bandages (20s)', image: '/image/medicines/hansaplast.jpg', description: 'Waterproof and breathable bandages for everyday cuts and scrapes.', category: 'First Aid', price: 60.00, countInStock: 300 },

    // Vitamins & Supplements
    { name: 'Revital H Multivitamin Capsules (30s)', image: '/image/medicines/revital-h.jpg', description: 'A balanced combination of vitamins and minerals for energy and health.', category: 'Vitamins', price: 310.00, countInStock: 100 },
    { name: 'Shelcal 500mg Calcium Tablet (15s)', image: '/image/medicines/shelcal.jpg', description: 'Calcium and Vitamin D3 tablets for strong bones and teeth.', category: 'Vitamins', price: 112.00, countInStock: 180 },
    { name: 'Limcee Vitamin C Chewable Tablet (15s)', image: '/image/medicines/limcee.jpg', description: 'Boosts immunity and helps fight against infections. Orange flavor.', category: 'Vitamins', price: 23.50, countInStock: 400 },
    { name: 'Neurobion Forte Tablet (30s)', image: '/image/medicines/neurobion.jpg', description: 'Vitamin B complex for nerve health and overall well-being.', category: 'Vitamins', price: 34.00, countInStock: 250 },
    { name: 'Seven Seas Cod Liver Oil Capsules (100s)', image: '/image/medicines/sevenseas.jpg', description: 'Rich in Omega-3, Vitamin A & D for a healthy heart, brain, and vision.', category: 'Health Supplements', price: 350.00, countInStock: 90 },

    // Skincare
    { name: 'Boroline Antiseptic Ayurvedic Cream', image: '/image/medicines/boroline.jpg', description: 'An all-purpose cream for dry skin, cuts, and cracked heels.', category: 'Skincare', price: 40.00, countInStock: 300 },
    { name: 'Himalaya Neem Face Wash 100ml', image: '/image/medicines/himalaya-neem.jpg', description: 'Purifying face wash for pimple-free, clear skin.', category: 'Skincare', price: 125.00, countInStock: 180 },
    { name: 'Cetaphil Gentle Skin Cleanser 125ml', image: '/image/medicines/cetaphil.jpg', description: 'Mild, non-irritating cleanser for sensitive and dry skin.', category: 'Skincare', price: 285.00, countInStock: 110 },
    { name: 'B-Tex Super Ointment', image: '/image/medicines/btex.jpg', description: 'Effective for eczema, ringworm, and other fungal skin infections.', category: 'Skincare', price: 30.00, countInStock: 200 },
    
    // More medicines to reach the target count
    ...Array.from({ length: 120 }, (_, i) => {
        const categories = ['Pain Relief', 'Allergy', 'Stomach Care', 'Cold & Cough', 'First Aid', 'Vitamins', 'Skincare', 'Diabetes Care', 'Cardiac Care'];
        const prefixes = ['Medi', 'Geno', 'Cure', 'Well', 'Health', 'Pharma', 'Bio', 'Neuro', 'Cardio', 'Dermo'];
        const suffixes = ['dol', 'zine', 'prazole', 'fenac', 'cilin', 'vir', 'statin', 'lol', 'sone', 'gel'];
        const category = categories[i % categories.length];
        const name = `${prefixes[i % prefixes.length]}${suffixes[i % suffixes.length]} ${100 + i}mg`;
        
        return {
            name: name,
            image: `https://i.imgur.com/placeholder.jpg`, // A generic placeholder image
            description: `A standard medication for ${category.toLowerCase()}. Please consult a doctor before use.`,
            category: category,
            price: parseFloat((Math.random() * 400 + 50).toFixed(2)), // Price between 50 and 450
            countInStock: Math.floor(Math.random() * 200) + 50, // Stock between 50 and 250
        };
    })
];

module.exports = medicines;