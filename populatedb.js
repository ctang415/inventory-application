#! /usr/bin/env node
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Brand = require("./models/brand");
  const Category = require("./models/category");
  const Item = require("./models/item");
  
  const brands = [];
  const categories = [];
  const items = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createBrands();
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function brandCreate(index, name) {
    const brand = new Brand({ name: name });
    await brand.save();
    brands[index] = brand;
    console.log(`Added brand: ${name}`);
  }
  
  async function categoryCreate(index, name, description) {
    const categoryDetail = { name: name, description: description};
  
    const category = new Category(categoryDetail);
  
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name} ${description}`);
  }
  
  async function itemCreate(index, name, brand, description, ingredients, category, price, stock) {
    const itemdetail = {
      name: name,
      brand: brand,
      description: description,
      ingredients: ingredients,
      category: category,
      price: price,
      stock: stock
    };
  
    const item = new Item(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  
  async function createBrands() {
    console.log("Adding brands");
    await Promise.all([
      brandCreate(0, "ISNTREE"),
      brandCreate(1, "MISSHA"),
      brandCreate(2, "ROUNDLAB"),
      brandCreate(3, "COSRX"),
      brandCreate(4, "KAO"),
      brandCreate(5, "KOSE"),
      brandCreate(6, "ROHTO"),
      brandCreate(7, "ETUDE HOUSE"),
      brandCreate(8, "BEAUTY OF JOSEON"),
    ]);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Skin Treatment", "Breakouts can range from small whiteheads to large cystic bumps. Find the right treatment and preventative care routine to address any acne concern."),
      categoryCreate(1, "Cleanser", "To do the most thorough job of eliminating impurities, we recommend the two-step cleansing method used in Korean skincare: an oil-based cleanser followed by a water-based formula."),
      categoryCreate(2, "Make-up Remover", "Make-up remover dissolves potentially pore-clogging beauty products on your face"),
      categoryCreate(3, "Toner", "Toners are fast-penetrating liquids that deliver skin a quick hit of hydration and help remove some dead cells. The result: plump, glowy skin."),
      categoryCreate(4, "Serum", "Serums deliver high concentrations of active ingredients to the skin that target concerns, from hydration to radiance. TIP: Apply thinner, more watery treatments first."),
      categoryCreate(5, "Moisturizer", "Moisturizers designed for your skin type create a barrier that will lock in all the beneficial ingredients you\’ve just applied."),
      categoryCreate(6, "Sun protection", "Protects your skin from harmful UV rays that can cause skin damage and skin cancer."),
      categoryCreate(7, "Masks", "Masks are like mini facials. They\’re formulated with active ingredients that help target your specific needs. Use regularly or whenever skin needs a boost.")
    ]);
  }
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemCreate(0,
        "Cosrx Advanced Snail 96 Mucin Power Essence",
        brands[3],
        "Formulated with 96% Snail Secretion Filtrate (Mucin), this essence protects the skin from moisture loss while keeping the skin texture smooth and healthy. This essence is created from nutritious, low-stimulation filtered snail mucin in order to keep your skin moisturized all day while bringing back your skin's vitality. The filtered snail mucin replenishes and revitalizes nutrients with looking healthy skin. It's suitable for all skin types. For best results, use together with Advanced Snail 92 All In One Cream.",
        "Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Panthenol, Arginine, Allantoin, Ethyl Hexanediol, Sodium Polyacrylate, Carbomer, Phenoxyethanol",
        [categories[4]],
        24.99,
        22
      ),
      itemCreate(1,
        "Beauty of Joseon Glow Serum",
        brands[8],
        "A honey-like serum enriched with Hanbang(traditional Korean herbal medicine) ingredients for fighting against acne, reducing pores",
        "Propolis Extract, Dipropylene Glycol, Glycerin, Butylene Glycol, Water, Niacinamide, 1,2-Hexanediol, Melia Azadirachta Flower Extract, Melia Azadirachta Leaf Extract, Sodium Hyaluronate, Curcuma Longa (Turmeric) Root Extract, Ocimum Sanctum Leaf Extract, Theobroma Cacao (Cocoa) Seed Extract, Melaleuca Alternifolia (Tea Tree) Extract, Centella Asiatica Extract, Corallina Officinalis Extract, Lotus Corniculatus Seed Extract, Calophyllum Inophyllum Seed Oil, Betaine Salicylate, Sodium Polyacryloyldimethyl Taurate, Tromethamine, Polyglyceryl-10 Laurate, Caprylyl Glycol, Ethylhexylglycerin, Dextrin, Pentylene Glycol, Octanediol, Tocopherol, Xanthan Gum, Carbomer",
        [categories[4]],
        16.99,
        37
      ),
      itemCreate(2,
        "Rohto Melano CC Vitamin C Premium Essence",
        brands[6],
        "A brightening vitamin C essence that absorbs deep into the skin surface with a unique formula. A serum recommended for those who have hyperpigmentation. A drop of serum with a dense texture that easily fuses with skin. An active vitamin C and vitamin B6 formulation with a brightening blend, there are also 3 types of vitamin C derivatives. ",
        "Ascorbic Acid (Active Vitamin C), Pyridoxine Hydrochloride (Vitamin B6), Allantoin, Isopropylmethylphenol, 3-o-ethyl ascorbic Acid, L-ascorbic Acid 2-glucoside (Ascorbic Acid), Vitamin C Tetraisopalmitate, Vitamin E, Alpinia Cutlet Seed Extract, Lemon Extract, Grapefruit Extract, Serine, Bg, 1,3-propanediol, 3-methyl-1,3-butanediol, Pg, Peg-8, Absolute Ethanol, Poe / Pop Decyltetradecyl Ether, Na Pyrosulfate, Edetate, Fragrance",
        [ categories[0], categories[4]],
        24.99,
        5
      ),
      itemCreate(3,
        "Isntree Hylauronic Acid Natural Sun Cream",
        brands[0],
        "Introducing the Hyaluronic Acid Natural Sun Cream, one of three different Sun Protection products offered by IsNtree that is focused around two major purposes of UV Protection and Skin Moisturization with Hyaluronic Acids! Good protection from the sun, by itself, is a solid investment. But this product takes it a step further and provides even more value and benefits in a step you are probably already taking. Like the other two products in IsNtree's Sun Protection line, you'll find a strong SPF 50+ PA++++ rating here, offering ample protection from UVA and UVB for your skin the moment you step outside. Just like the other products as well, when it comes to moisturization, this Sun Block has you covered with 8 Different Types of Hyaluronic Acids that help support the water content in your skin, thoroughly at that. The added ingredients of Adenosine and Niacinamide also serve to fight against the signs of aging (which is what Sun Blocks also do) as well as to brighten skin. The difference with this one? It is a physical sun block, meaning that it works by forming a physical shield on your skin and reflecting away UV rays, while also being ideal for those with sensitive skin.",
        "Water, Zinc Oxide, Cyclohexasiloxane, Butyloctyl Salicylate, Propanediol, Propylheptyl Caprylate, Isododecane, Polyglyceryl-3 Polydimethylsiloxyethyl Dimethicone, Niacinamide, Caprylyl Methicone, Methyl Methacrylate Crosspolymer, Disteardimonium Hectorite, Magnesium Sulfate, Triethoxycaprylylsilane, 1,2-Hexanediol, Polyglyceryl-2 Dipolyhydroxystearate, Lauryl Polyglyceryl-3 Polydimethylsiloxyethyl Dimethicone, Glyceryl Caprylate, Caprylyl Glycol, Ethylhexylglycerin, Adenosine, Tocopherol, Sodium Hyaluronate, Betaine, Inositol, Panthenol",
        [categories[6]],
        26.99,
        22
      ),
      itemCreate(4,
        "Beauty of Joseon Rice + Probiotics Relief Sunscreen",
        brands[8],
        "Relief Sun: Rice + Probiotics SPF50+ PA++++ is our new chemical sunscreen that applies gently on the skin and by also including skin calming and brightening ingredients, it allows sensitive skin types to use it with ease as well",
        "Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-benzotriazolyl Tetramethylbutylphenol, Coco-caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, Butylene Glycol, Oryza Sativa (Rice) Germ Extract, Camellia Sinensis Leaf Extract, Lactobacillus/Pumpkin Ferment Extract, Bacillus/Soybean Ferment Extract, Saccharum Officinarum (Sugarcane) Extract, Macrocystis Pyrifera (Kelp) Extract, Cocos Nucifera (Coconut) Fruit Extract, Panax Ginseng Root Extract, Camellia Sinensis Leaf Extract, Monascus/Rice Ferment, Pentylene Glycol, Behenyl Alcohol, Poly C10-30 Alkyl Acrylate, Polyglyceryl-3 Methylglucose Distearate, Decyl Glucoside, Tromethamine, Carbomer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, 1,2-Hexanediol,Sodium Stearoyl Glutamate, Polyacrylate Crosspolymer-6, Ethylhexylglycerin, Adenosine, Xanthan Gum, Tocopherol, Lactobacillus/Rice Ferment, Aspergillus Ferment, Saccharomyces/Rice Ferment Filtrate",
        [categories[6]],
        17.99,
        11
      ),
      itemCreate(5,
        "Missha All Around Safe Block Essence Sun Milk EX SPF50+/PA+++ 70ml",
        brands[1],
        "Moist essence sun protector to hydrate and relieve skin irritated by the sun UV blocking cosmetics. For daily life, outdoor activities, and light exercises in all seasons. Soothing/ moisture finish / non-greasy. Lightweight and refreshing texture smoothes and comforts skin.",
        "Water, Ethylhexyl Methoxycinnamate, Acrylates Copolymer, Alcohol Denat, Butyloctyl Salicylate, Octocrylene, Ethylhexyl Salicylate, Butylene Glycol, Butyl Methoxydibenzoylmethane, Methyl Methacrylate Crosspolymer, Cetearyl Olivate, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Silica, Beeswax, Aloe Barbadensis Leaf Extract, Abronia Villosa Leaf Extract, Cinchona Succirubra Bark Extract, Psidium Guajava Leaf Extract, Rhodiola Rosea Root Extract, Adansonia Digitata Seed Extract, Equisetum Arvense Extract, Olea Europaea (Olive) Leaf Extract, Vaccinium Oxycoccos, Fructan, Glucose, Sophora Japonica Flower Extract, Pentylene Glycol, Chrysanthemum Indicum Flower Extract, Camellia Japonica Flower Extract, Nelumbo Nucifera Flower Extract, Prunus Mume Flower Extract, Glyceryl Stearate, Sorbitan Olivate, Sorbitan Stearate, Caprylyl Glycol, Sodium Isostearoyl Lactylate, Potassium Sorbate, Cetearyl Alcohol, Ethylhexylglycerin, Fragrance, Coco-Glucoside, 1,2-Hexanediol, Acrylates/​C10-30 Alkyl Acrylate Crosspolymer, Acrylamide/​Sodium Acryloyldimethyltaurate Copolymer, Tromethamine, Isohexadecane, Disodium EDTA, Polysorbate 80, Sorbitan Oleate",
        [categories[6]],
        21.99,
        10
      ),
      itemCreate(6,
        "Round Lab Birch Juice Moisturizing Sun Cream",
        brands[2],
        "Summary Voted as the best sunscreen in the popular Korean beauty app Hwahae! The Round Lab Birch Juice Moisturizing Sun Cream is a daily sunscreen for all skin types that moisturizes the skin without any heaviness. The lightweight formula contains Birch sap and Hyaluronic acid to tighten the pores, balance, and firm the skin.",
        "Water, Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Cocoa-Caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, 1,2-Hexanediol, Butylene Glycol, Birch Sap (1,425ppm), Sodium Hyaluronate, Hyaluronic Acid, Glyceryl Glucoside, Dipotassium Glycyrrhizate, Allantoin, Portulaca Oleracea Extract, Artemisia Annua Extract, Pinus Sylvestris Leaf Extract, Anthemis Nobilis (Chamomile) Flower Oil, Acrylate/C10-30 Alkyl Acrylate Crosspolymer, Sodium Stearoyl Glutamate, Polyacrylate Crosspolymer-6, Ethylhexylglycerin, Ascorbic Acid, Adenosine, Pentylene Glycol, Behenyl Alcohol, Poly C10-30 Alkyl Acrylate, Polyglyceryl-3 Methylglucose Distearate, Decyl Glucoside, Tromethamine, Xanthan Gum, t-Butyl Alcohol, Tocopherol, Carbomer",
        [categories[6]],
        24.99,
        0
      ),
      itemCreate(7,
        "Biore UV Aqua Rich Watery Essence SPF 50 PA++++",
        brands[4],
        "WORLD'S FIRST Micro Defense formula that prevents unevenness, and allows the sunscreen to be smoothly applied to your skin at a micro level. Water-soluble and oil-friendly UV protective agent that contains glyceryl behenate and sorbitan distearate. Feels light on your skin even when reapplied, with a watery-feel and transparency that blends on your skin. Formulated with water capsules that keeps your skin from drying, and hyaluronic acid, and royal jelly extract that acts as moisturizing ingredients. Super waterproof (tested with 80 mins of water resistance test). A natural finish with transparency that fits closely on your skin and won’t leave white residue. Washes off with regular soap.",
        "Crosspolymer Of Water, Ethanol, Ethylhexyl Methoxycinnamate, Ethylhexyl Triazone, Isopropyl Palmitate, (Lauryl Methacrylate / Sodium Methacrylate) Crosspolymer, Hexyl Diethylaminohydroxybenzoylbenzoate, Hydrogenated Polyisobutene, Bisethylhexyloxyphenol Methoxyphenyl Triazine, Palmitic Acid Dextrin, Bg, Xylitol, (Acrylates / Alkyl Acrylate (C10-30)) Crosspolymer, Dimethicone, Alkyl Benzoate (C12-15), Glycerin, Glyceryl Stearate, Propanediol, Glyceryl Behenate, (Vinyl Dimethicone / Methicone Silsesquioxane) Crosspolymer, Cetanol, Agar, Distearate Sorbitan, Isoceteth-20, Polyvinyl Alcohol, (Dimethicone / Vinyl Dimethicone Crosspolymer, Stearoyl Glutamic Acid, Arginine, K Hydroxide, Na Hydroxide, Royal Jelly Extract, Hyaluronic Acid Na, Phenoxyethanol, Edta-2na, Bht, Perfume",
        [categories[6]],
        14.99,
        0
      ),
      itemCreate(8,
        "Kao Biore UV Kids Pure Milk SPF 50 PA+++",
        brands[4],
        "Ultra-light, smooth and milky in texture with moisturizing ingredients that spreads evenly on the skin, leaving skin feeling smooth and comfortable with no white residue. It is also waterproof and perspiration-proof and easily removed, suitable for daily use. With a superior double UV Block of SPF 50+ and PA++++, it provides maximum protection against sunburn and UV damage. Suitable for face and body.",
        "Zinc Oxide (18.24%) Inactive Ingredients: Cyclopentasiloxane, Hydrogenated Polyisobutene, Dimethicone, Butylene Glycol, Titanium Dioxide, Water, Talc, PEG-30 Dipolyhydroxystearate, C30-45 Alkyldimethylsilyl Polypropylsilsesquioxane, Aluminum Hydroxide, Sorbitan Isostearate, Stearic Acid, Triethoxycaprylylsilane, Methicone, Butyrospermum Parkii (Shea) Butter, Tocopherol",
        [categories[6]],
        13.99,
        15
      ),
      itemCreate(9,
        "Kose Softymo Speedy Cleansing Oil",
        brands[5],
        "Kose Cosmeport Softymo Speedy Cleansing Oil can quickly remove all trace of makeup, including stubborn mascara. It is also effective with wet hands. It can also wash away sebum that blocks pores. Pores are cleared. No need to use cleansing foam afterwards. Skin is refreshed and clean. No colorant, no fragrance.",
        "Mineral Oil, Peg-8 Glyceryl Isostearate, Cethyl Ethylhexancate, Cyclomethicone, Water, Simmondsia Chinensis (Jojoba) Seed Oil, Isostearic Acid, Glycerin, Phenoxyethanol",        
        [categories[1], categories[2]],
        10.99,
        28
      ),
      itemCreate(10,
        "Cosrx Low-pH Good Morning Gel Cleanser",
        brands[3],
        "Cosrx Low pH Good Morning Gel Cleanser is your deep facial cleanser and gentle skin exfoliator in one! This contains BHA and Tea Tree Oil which is a perfect blend of ingredients beneficial to improving the skin’s texture and complexion. It gently removes dead skin cells and excessive sebum to allow the skin to effectively regenerate healthier skin cells. This results to smoother, softer and fairer skin. A pH 5.0 ~6.0 : similar to skin’s natural pH level Contain tea-tree oil : control oily skin, shrink pore size Contain natural BHA : refine skin texture Gel type : smooth and skin friendly",
        "Water, Cocamidopropyl Betaine, Sodium Lauroyl Methyl Isethionate, Polysorbate 20, Styrax Japonicus Branch/Fruit/Leaf Extract, Butylene Glycol, Saccharomyces Ferment, Cryptomeria Japonica Leaf Extract, Nelumbo Nucifera Leaf Extract, Pinus Palustris Leaf Extract, Ulmus Davidiana Root Extract, Oenothera Biennis (Evening Primrose) Flower Extract, Pueraria Lobata Root Extract, Melaleuca Alternifolia (Tea Tree) Leaf Oil, Allantoin, Caprylyl Glycol, Ethylhexylglycerin, Betaine Salicylate, Citric Acid, Ethyl Hexanediol, 1,2-Hexanediol, Trisodium Ethylenediamine Disuccinate, Sodium Benzoate, Disodium EDTA",
        [categories[1]],
        13.99,
        25
      ),
      itemCreate(11,
        "Rohto Hada Labo Gokujyun Hyaluronic Face Cleansing Foam",
        brands[6],
        "Double Hyaluronic Acid skincare series. Super Hyaluronic Acid can hold twice as much moisture as regular Hyaluronic Acid. Also Highly absorbing Hyaluronic Acid sticks to your skin even after washing your face with water. Leaves skin moist and comfortable. Cream type face cleansing foam. Elastic lather gently cleanses skin.",
        "Water, Glycerin, Cocoilglycine Na, BG, Hydroxypropildempnrin Acid, Cocamidopropyl Betaine, PEG-400, Desilglucosid, Laureuluasparagine Sodium, Cocoilglycine K, Lglutamic Glutamine Acid, Glyceryl Stearate (SE), Acetylated Acid (hyaluronic Acid), Hyaluronic Acid Hydroxypropyltrimonium Skin Adsorption Type Hyaluronic Acid, Citric Acid, Stearic Acid, Lauric Acid, PEG-32, EDTA-2Na, Polyocta Of-7, Hydroxypropyl Methylcellulose, Polyquaternium--52, Methylparaben, Propylparaben, BHT",
        [categories[1]],
        12.99,
        19
      ),
      itemCreate(12,
        "Etude House Soon Jung Lip and Eye Remover",
        brands[7],
        "A hypoallergenic makeup remover that gently and thoroughly removes makeup even around the lips and eyes.",
        "Water, Isododecane, Dipropylene Glycol, Diisostearyl Malate, Propanediol, Sodium Chloride, 1,2-hexanediol, Sodium Citrate, Caprylyl/capryl Glucoside, Ethylhexylglycerin, Disodium Edta, Citric Acid, Panthenol, Pentylene Glycol, Madecassoside",
        [categories[2]],
        10.99,
        12
      ),
      itemCreate(13,
        "Cosrx Acne Pimple Master Patch - 24ea",
        brands[3],
        "Exposed aggravated acne may cause more damage and infection when not treated immediately. COSRX’s Acne Pimple Master Patch provides immediate care for stubborn pimples with uniquely formulated Hydrocolloid Patch. This instantly covers acne to protect it from harsh elements that may cause for irritation. It also contains salicylic acid which serves a spot treatment and helps the skin heal faster.",
        "Cellulose Gum, Styrene Isoprene Styrene Block Copolymer, Polyisobutylene, Petroleum Resin, Polyurethane Film, Liquid Paraffin, Tetrakis Methane",
        [categories[0]],
        4.99,
        31
      ),
      itemCreate(14,
        "Isntree Hyaluronic Acid Water Mask",
        brands[0],
        "A gel mask that sticks to the skin to deeply moisturize and hydrate it. Formulated with 3 kinds of hyaluronic acids, trehalose, and sodium PCA, it is suitable for all skin types, ideal for dry and sensitive skin types.",
        "Water, Glycerin, Methylpropanediol, Sodium Hyaluronate, Sodium Acetylated Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium PCA, Chondrus Crispus Extract, Ceratonia Siliqua (Carob) Gum, Glucomannan, Allantoin, Panthenol, Dipotassium Glycyrrhizate, Trehalose, Xanthan Gum, Glyceryl Polyacrylate, Glyceryl Acrylate/Acrylic Acid Copolymer, PVM/MA Copolymer, Propylene Glycol, Carbomer, Tromesthamine, 1,2-Hexanediol, Hydroxyacetophenone, Disodium EDTA",
        [categories[7]],
        3.99,
        0
      ),
      itemCreate(15,
        "Etude House Collagen Eye Patch 5 Pack",
        brands[7],
        "Etude House Collagen Eye Patch formulated with collagen to revitalize and improve appearance around eyes.",
        "Ethanol, Grapefruit Extract, Hydrolyzed Collagen, Phenoxyethanol, Xanthan Gum, Phage-60 Hydrogene, Glycerin, Phage-75, Taste Castor Oil, Carbomer, Triethanolamine, Disodium Iodide, Fragrance, Sodium Hyaluronate, Tocopherol, Polysorbate 20, Retinol, Green Tea Extract",
        [categories[7]],
        11.99,
        12
      ),
      itemCreate(16,
        "Rohto Hadalabo Shirojyun Premium Lotion Light",
        brands[6],
        "This lotion toner is a perfect combination of brightening + intense hydration to provide a visibly brighter, bouncier, and more youthful glow. Tranexamic Acid Helps to fight dark spots, re-balance skin tone and restore skin radiance. Hyaluronic Acid forms a layer of moisture retention barrier on the skin’s surface to prevent moisture loss. Nano Hyaluronic Acid with fine molecule size that can penetrate deeply into the skin to provide moisture deep down into the inner skin layers. Vitamin C and E to soothe and relieve discomfort after sun exposure.",
        " Tranexamic Acid, Glycyrrhizinic Acid 2k <other Ingredients> Hydrolyzed Hyaluronic Acid * (Nano-sized Hyaluronic Acid), Hyaluronic Acid Na-2 *, Vitamin C Phosphate Mg (Vitamin C Derivative), Vitamin E, Bg, Concentrated Glycerin, Diglycerin, Pentylene Glycol, Dpg, Peg (30), Peg-8, Soybean Phospholipid Hydroxide, Citric Acid Anhydride, Edetate, Vp / Styrene Copolymer Emulsion, Poe Laurate (20) Sorbitan, Phenoxyethanol * 2 Types Of Hyaluronic Acid",
        [categories[3]],
        17.99,
        27
      ),
      itemCreate(16,
        "Isntree Green Tea Fresh Toner",
        brands[6],
        "Isntree Green Tea Fresh Toner is mainly formulated with Green Tea Extract 80%, Allantoin, Natural Extracts, Hyaluronic Acid, and Centella Asiatica Extract. From Jeju Island, the Green Tea is high in Amino Acid, Minerals, Polyphenol, and proteins to relieve skin stress, irritation and retivalize your skin. Other ingredients also contain SeboCut Complex that controls sebum and MoistMax that moisturizes skin sufficiently. Hypoallergenic, for all skin types.",
        "Camellia Sinensis Leaf Extract Water, Ginkgo Biloba Leaf Extract, Centella Asiatica Extract, Salix Alba (Willow) Bark Extract, Vaccinium Angustifolium (Blueberry) Fruit Extract, Pinus Palustris Leaf Extract, Ulmus Davidiana Root Extract, Oenothera Biennis (Evening Primrose) Flower Extract, Pueraria Lobata Root Extract, Beta-Glucan, Allantoin, Dipotassium Glycyrrhizate, Ammonium Acryloyldimethyltaurate/VP Copolymer, Disodium EDTA, Hydroxyacetophenone.",
        [categories[3]],
        19.99,
        21
      ),
      itemCreate(17,
        "Missha Time Revolution The First Treatment Essence Rx",
        brands[1],
        "The 2019 newly updated formula contains over 90% fermented yeast extract from Himalayan purple barley to plump skin, refine texture, and reduce pigmentation. Using Missha's hot & cold double fermentation process, it activates yeast for maximum benefits. ",
        "Yeast Ferment Extract, 1,2-Hexanediol, Niacinamide, Bifida Ferment Lysate, Oryza Sativa (Rice) Extract, Pearl Powder, Water, Diethoxyethyl Succinate, Propanediol, Sodium PCA,Ethylhexylglycerin, Adenosine, Polyquaternium-51, Butylene Glycol, Vinegar, Glycerin, Ceramide NP, Cholesterol, Hydrogenated Lecithin, Xanthan Gum",
        [categories[3]],
        47.99,
        0
      ),
      itemCreate(18,
        "Round Lab 1025 Dokdo Toner",
        brands[2],
        "Presenting a special toner that exfoliates dead skin cells while filling up the skin with moisture. The method is simple, but the results are special! Take care of your skin every day with comfort.",
        "Water, Butylene Glycol, Glycerin, Pentylene Glycol, Propanediol, Chondrus Crispus Extract, Saccharum Officinarum (Sugarcane) Extract, Sea Water, 1,2-Hexanediol, Protease, Betaine, Panthenol, Ethylhexylglycerin, Allantoin, Xanthan Gum, Disodium EDTA",
        [categories[3]],
        17.99,
        24
      ),
      itemCreate(19,
        "Cosrx Advanced Snail 92 All in one Cream",
        brands[3],
        "The Advanced Snail 92 All In One Cream is a very nourishing and moisturizing cream that endows energy and beauty to the skin with its 92% pure snail secretion filtrate, gathered from living Korean snail. The cream is safe for usage on the skin, consisting of excellent skin-activation components that treat irritated skin and improve uneven skin tone. It's suitable for all skin types. For best results, use with Advanced Snail 96 Mucin Power Essence.",
        "Snail Secretion Filtrate, Betaine, Caprylic/Capric Triglyceride, Cetearyl Olivate, Sorbitan Olivate, Sodium Hyaluronate, Cetearyl Alcohol, Stearic acid, Arginine, Dimethicone, Carbomer, Panthenol, Allantoin, Sodium Polyacrylate, Xanthan Gum, Ethyl Hexanediol, Adenosine, Phenoxyethanol",
        [categories[5]],
        25.99,
        38
      ),
      itemCreate(20,
        "Etude House Soon Jung Hydro Barrier Cream",
        brands[3],
        "Etude House Soon Jung Hydro Barrier Cream gently soothes stressed skin caused by external irritation and dryness. Made up of 92% hydrating and moisture-preserving ingredients, to comfort your skin.",
        "Water, Glycerin, Propanediol, Panthenol, Pentaerythrityl Tetraethylhexanoate, Hydrogenated Poly(C6-14 Olefin), 1,2-Hexanediol, Polymethylsilsesquioxane, Ammonium Acryloyldimethyltaurate/VP Copolymer, Trehalose, Glyceryl Stearate Citrate, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, C14-22 Alcohols, Arachidyl Alcohol, Glyceryl Stearate, Glyceryl Caprylate, Behenyl Alcohol, C12-20 Alkyl Glucoside, Ethylhexylglycerin, Arachidyl Glucoside, Butylene Glycol, Disodium EDTA, Sorbitan Isostearate, Allantoin, Madecassoside, Scutellaria Baicalensis Root Extract, Glucose, Camellia Sinensis Leaf Extract, Tocopherol. May contain additional ingredients.",
        [categories[5]],
        23.99,
        22
      ),
    ]);
  }