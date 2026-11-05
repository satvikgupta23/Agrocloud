import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface CropMasterProfile {
    key: string;
    commonName: string;
    hindiName: string;
    scientificName: string;
    category: "vegetables" | "fruits" | "cereals" | "pulses" | "oilseeds" | "cash" | "spices";
    family: string;
    optimalPh: [number, number];
    minAnnualRainfallMm: number;
    maxAnnualRainfallMm: number;
    typicalWaterDemandMm: number;
    minTempC: number;
    maxTempC: number;
    preferredTextures: string[];
    maxClayPct: number;
    minClayPct?: number;
    minSocGKg: number;
    minCecCmolKg: number;
    droughtTolerance: number;
    floodTolerance: number;
    indianSeason: "Rabi (रबी)" | "Kharif (खरीफ)" | "Zaid (जायद)" | "Perennial / Annual (बारहमासी)";
    bestSeason: string;
    seasonDetails: string;
    maturityDays: number;
    growthStages: {
        stage: string;
        name: string;
        gddThreshold: number;
        ageDaysMin: number;
        ageDaysMax: number;
        description: string;
        fertilizerPriority: string;
    }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE INDIAN CROP, VEGETABLE & FRUIT DATABASE (40+ PROFILES)
// ─────────────────────────────────────────────────────────────────────────────
const CROP_DATABASE: Record<string, CropMasterProfile> = {
    // ── VEGETABLES (सब्जियां) ────────────────────────────────────────────────
    tomato: {
        key: "tomato",
        commonName: "Tomato (Tamatar / टमाटर)",
        hindiName: "टमाटर",
        scientificName: "Solanum lycopersicum",
        category: "vegetables",
        family: "Solanaceae",
        optimalPh: [6.0, 7.0],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1200,
        typicalWaterDemandMm: 550,
        minTempC: 15.0,
        maxTempC: 32.0,
        preferredTextures: ["loam", "sandy loam", "silt loam"],
        maxClayPct: 30,
        minSocGKg: 8.0,
        minCecCmolKg: 12.0,
        droughtTolerance: 0.3,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi & Post-Monsoon (रबी / शरद: Oct-Nov Transplanting, Feb-Apr Harvest)",
        seasonDetails: "Requires warm days and cool night temperatures (15-20°C). Friable fertile loam with good drainage prevents damping off and blossom end rot.",
        maturityDays: 105,
        growthStages: [
            { stage: "Branching", name: "Canopy Branching", gddThreshold: 350, ageDaysMin: 20, ageDaysMax: 40, description: "Side shoots develop canopy.", fertilizerPriority: "NPK 19:19:19 fertigation." },
            { stage: "Flowering & Fruit Set", name: "Cluster Bloom", gddThreshold: 600, ageDaysMin: 42, ageDaysMax: 60, description: "Yellow blossom clusters open.", fertilizerPriority: "Calcium Nitrate to prevent Blossom End Rot." },
            { stage: "Harvest", name: "Red Ripe Picking", gddThreshold: 1100, ageDaysMin: 86, ageDaysMax: 110, description: "Lycopene color development.", fertilizerPriority: "High Potash (0:0:50)." }
        ]
    },
    potato: {
        key: "potato",
        commonName: "Potato (Aloo / आलू)",
        hindiName: "आलू",
        scientificName: "Solanum tuberosum",
        category: "vegetables",
        family: "Solanaceae",
        optimalPh: [5.2, 6.5],
        minAnnualRainfallMm: 450,
        maxAnnualRainfallMm: 1000,
        typicalWaterDemandMm: 480,
        minTempC: 10.0,
        maxTempC: 24.0,
        preferredTextures: ["sandy loam", "loam", "silt loam", "alluvial"],
        maxClayPct: 25,
        minSocGKg: 8.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.25,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Winter (रबी: Oct-Nov Sowing, Jan-Feb Harvest)",
        seasonDetails: "Excels in mildly acidic to neutral sandy loams (pH 5.2-6.5 prevents common scab). Cool winter nights (<18°C) are mandatory for rapid tuber bulking.",
        maturityDays: 95,
        growthStages: [
            { stage: "Stolon Formation", name: "Stolon Hooking", gddThreshold: 280, ageDaysMin: 20, ageDaysMax: 35, description: "Underground stolons initiate.", fertilizerPriority: "Earthing up with Potassium Sulfate (SOP)." },
            { stage: "Tuber Bulking", name: "Rapid Bulking", gddThreshold: 650, ageDaysMin: 40, ageDaysMax: 70, description: "Tubers swell in cool loose soil.", fertilizerPriority: "High Potassium and Phosphorus." },
            { stage: "Harvest", name: "Digging", gddThreshold: 950, ageDaysMin: 80, ageDaysMax: 95, description: "Cut haulms 10 days before digging to cure skin.", fertilizerPriority: "Stop irrigation." }
        ]
    },
    onion: {
        key: "onion",
        commonName: "Onion (Pyaz / प्याज)",
        hindiName: "प्याज",
        scientificName: "Allium cepa",
        category: "vegetables",
        family: "Amaryllidaceae",
        optimalPh: [6.0, 7.5],
        minAnnualRainfallMm: 450,
        maxAnnualRainfallMm: 1000,
        typicalWaterDemandMm: 450,
        minTempC: 12.0,
        maxTempC: 30.0,
        preferredTextures: ["loam", "silt loam", "sandy loam", "alluvial"],
        maxClayPct: 25,
        minSocGKg: 8.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.3,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi or Late Kharif (रबी/शरद: Nov-Dec Transplanting, Mar-May Harvest)",
        seasonDetails: "Requires friable fertile loam with ample sulfur for pungency and firm bulb storage quality. Cannot tolerate heavy cracking clay.",
        maturityDays: 120,
        growthStages: [
            { stage: "Foliage", name: "Vegetative Growth", gddThreshold: 400, ageDaysMin: 25, ageDaysMax: 55, description: "Tubular hollow leaves multiply.", fertilizerPriority: "Neem-coated Urea + Sulfur for pungency." },
            { stage: "Bulbing", name: "Bulb Swelling", gddThreshold: 800, ageDaysMin: 60, ageDaysMax: 95, description: "Basal stem swells into layered bulb.", fertilizerPriority: "Potash (SOP) to firm outer skin." },
            { stage: "Neck Fall", name: "Harvest", gddThreshold: 1100, ageDaysMin: 105, ageDaysMax: 120, description: "50% neck fall indicates harvest time.", fertilizerPriority: "Field curing under shade." }
        ]
    },
    chili: {
        key: "chili",
        commonName: "Chili Pepper (Mirch / मिर्च)",
        hindiName: "मिर्च",
        scientificName: "Capsicum annuum",
        category: "vegetables",
        family: "Solanaceae",
        optimalPh: [6.0, 7.4],
        minAnnualRainfallMm: 550,
        maxAnnualRainfallMm: 1400,
        typicalWaterDemandMm: 550,
        minTempC: 18.0,
        maxTempC: 36.0,
        preferredTextures: ["loam", "sandy loam", "clay loam", "black cotton"],
        maxClayPct: 35,
        minSocGKg: 8.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.35,
        floodTolerance: 0.1,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif or Spring (खरीफ/वसंत: June-July or Jan-Feb Transplanting)",
        seasonDetails: "Grows vigorously in well-drained loams and red/black soils. Warm sunshine increases pungency and pod coloration.",
        maturityDays: 130,
        growthStages: [
            { stage: "Branching", name: "Forking Branching", gddThreshold: 400, ageDaysMin: 25, ageDaysMax: 50, description: "Multiple flowering forks establish.", fertilizerPriority: "NPK 19:19:19 + Micronutrients." },
            { stage: "Fruit Set", name: "Pod Sizing", gddThreshold: 800, ageDaysMin: 55, ageDaysMax: 85, description: "White pendulous blooms set fruit.", fertilizerPriority: "Potassium and Calcium." },
            { stage: "Harvest", name: "Green / Red Picking", gddThreshold: 1250, ageDaysMin: 90, ageDaysMax: 130, description: "Multiple pickings.", fertilizerPriority: "Topdress nitrogen." }
        ]
    },
    brinjal: {
        key: "brinjal",
        commonName: "Brinjal / Eggplant (Baingan / बैंगन)",
        hindiName: "बैंगन",
        scientificName: "Solanum melongena",
        category: "vegetables",
        family: "Solanaceae",
        optimalPh: [5.8, 7.2],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1200,
        typicalWaterDemandMm: 500,
        minTempC: 18.0,
        maxTempC: 35.0,
        preferredTextures: ["silt loam", "clay loam", "loam", "alluvial"],
        maxClayPct: 38,
        minSocGKg: 7.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.4,
        floodTolerance: 0.15,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif / Spring (खरीफ / वसंत: June-July & Feb-Mar)",
        seasonDetails: "Hardy, heavy yielding vegetable adapted to rich loamy soils with organic manure. Tolerates wide temperature ranges.",
        maturityDays: 120,
        growthStages: [
            { stage: "Transplanting", name: "Establishment", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 35, description: "Roots anchor into moist beds.", fertilizerPriority: "Basal DAP and FYM." },
            { stage: "Flowering", name: "Purple Bloom", gddThreshold: 650, ageDaysMin: 45, ageDaysMax: 70, description: "Purple solitary flowers emerge.", fertilizerPriority: "Foliar micronutrient spray." },
            { stage: "Fruiting", name: "Glossy Fruit Picking", gddThreshold: 1050, ageDaysMin: 75, ageDaysMax: 120, description: "Harvest while calyx is green and glossy.", fertilizerPriority: "Regular split Urea." }
        ]
    },
    cauliflower: {
        key: "cauliflower",
        commonName: "Cauliflower (Phoolgobhi / फूलगोभी)",
        hindiName: "फूलगोभी",
        scientificName: "Brassica oleracea var. botrytis",
        category: "vegetables",
        family: "Brassicaceae",
        optimalPh: [6.0, 7.2],
        minAnnualRainfallMm: 450,
        maxAnnualRainfallMm: 950,
        typicalWaterDemandMm: 420,
        minTempC: 12.0,
        maxTempC: 25.0,
        preferredTextures: ["loam", "silt loam", "clay loam", "alluvial"],
        maxClayPct: 30,
        minSocGKg: 10.0,
        minCecCmolKg: 12.0,
        droughtTolerance: 0.2,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Winter (रबी: Sep-Oct Sowing, Nov-Jan Curd Harvest)",
        seasonDetails: "Classic Indian winter vegetable. Demands fertile loam, high organic matter, and cool temperatures (15-20°C) for compact white curds.",
        maturityDays: 85,
        growthStages: [
            { stage: "Vegetative", name: "Foliage Frame", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 40, description: "Broad waxy leaves create outer protective frame.", fertilizerPriority: "Apply Borax (10 kg/ha) to prevent hollow stem (ब्राउनिंग)." },
            { stage: "Curd Initiation", name: "Button Curd", gddThreshold: 600, ageDaysMin: 45, ageDaysMax: 65, description: "White curd button initiates in center.", fertilizerPriority: "Ammonium Molybdate spray for whiptail prevention." },
            { stage: "Harvest", name: "Tight White Curd", gddThreshold: 850, ageDaysMin: 70, ageDaysMax: 85, description: "Harvest compact curds before flower buds loosen.", fertilizerPriority: "Stop fertilization." }
        ]
    },
    cabbage: {
        key: "cabbage",
        commonName: "Cabbage (Pattagobhi / पत्तागोभी)",
        hindiName: "पत्तागोभी",
        scientificName: "Brassica oleracea var. capitata",
        category: "vegetables",
        family: "Brassicaceae",
        optimalPh: [6.0, 7.5],
        minAnnualRainfallMm: 450,
        maxAnnualRainfallMm: 1000,
        typicalWaterDemandMm: 450,
        minTempC: 12.0,
        maxTempC: 26.0,
        preferredTextures: ["loam", "silt loam", "clay loam", "alluvial"],
        maxClayPct: 32,
        minSocGKg: 9.0,
        minCecCmolKg: 12.0,
        droughtTolerance: 0.25,
        floodTolerance: 0.15,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Winter (रबी: Oct-Nov Transplanting, Jan-Mar Harvest)",
        seasonDetails: "Shallow rooted winter crop that thrives in rich, moisture-retentive loamy soils. Forms dense solid green heads under cool sunny weather.",
        maturityDays: 90,
        growthStages: [
            { stage: "Foliage", name: "Rosette Stage", gddThreshold: 350, ageDaysMin: 20, ageDaysMax: 45, description: "Outer spreading leaves grow.", fertilizerPriority: "Neem-coated Urea topdress." },
            { stage: "Cupping", name: "Head Folding", gddThreshold: 650, ageDaysMin: 50, ageDaysMax: 70, description: "Inner leaves cup inwards tightly.", fertilizerPriority: "Potash (SOP) for dense head firmness." },
            { stage: "Harvest", name: "Firm Head", gddThreshold: 900, ageDaysMin: 75, ageDaysMax: 90, description: "Harvest when heads are rock-solid to touch.", fertilizerPriority: "Harvest." }
        ]
    },
    peas: {
        key: "peas",
        commonName: "Green Peas (Matar / हरी मटर)",
        hindiName: "हरी मटर",
        scientificName: "Pisum sativum",
        category: "vegetables",
        family: "Fabaceae",
        optimalPh: [6.0, 7.5],
        minAnnualRainfallMm: 400,
        maxAnnualRainfallMm: 800,
        typicalWaterDemandMm: 350,
        minTempC: 10.0,
        maxTempC: 22.0,
        preferredTextures: ["loam", "sandy loam", "silt loam"],
        maxClayPct: 28,
        minSocGKg: 7.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.35,
        floodTolerance: 0.05,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Winter (रबी: Oct-Nov Sowing, Dec-Feb Pod Picking)",
        seasonDetails: "Leguminous winter vegetable that enriches soil through atmospheric nitrogen fixation. High sensitive to waterlogging and soil acidity.",
        maturityDays: 75,
        growthStages: [
            { stage: "Vegetative", name: "Tendril Clambering", gddThreshold: 250, ageDaysMin: 15, ageDaysMax: 30, description: "Slender vine with gripping tendrils.", fertilizerPriority: "Rhizobium leguminosarum inoculation + Phosphorus (SSP)." },
            { stage: "White Bloom", name: "Podding", gddThreshold: 500, ageDaysMin: 35, ageDaysMax: 55, description: "Self-pollinated flowers set into green pods.", fertilizerPriority: "Light irrigation at pod filling." },
            { stage: "Pod Picking", name: "Sweet Green Pods", gddThreshold: 750, ageDaysMin: 60, ageDaysMax: 75, description: "Pick when pods are plump and sweet.", fertilizerPriority: "Multiple morning pickings." }
        ]
    },
    okra: {
        key: "okra",
        commonName: "Ladyfinger / Okra (Bhindi / भिंडी)",
        hindiName: "भिंडी",
        scientificName: "Abelmoschus esculentus",
        category: "vegetables",
        family: "Malvaceae",
        optimalPh: [6.0, 7.8],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1200,
        typicalWaterDemandMm: 450,
        minTempC: 20.0,
        maxTempC: 38.0,
        preferredTextures: ["sandy loam", "loam", "clay loam"],
        maxClayPct: 35,
        minSocGKg: 6.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.5,
        floodTolerance: 0.1,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif or Summer Zaid (खरीफ / जायद: Feb-Mar & June-July)",
        seasonDetails: "Warm weather crop adapted to sunny Indian plains. Grows rapidly in well-drained loams and red/alluvial soils.",
        maturityDays: 60,
        growthStages: [
            { stage: "Seedling", name: "Initial Growth", gddThreshold: 200, ageDaysMin: 10, ageDaysMax: 20, description: "Heart shaped true leaves unfurl.", fertilizerPriority: "Basal NPK 20:20:0." },
            { stage: "Yellow Bloom", name: "Flowering & Podding", gddThreshold: 450, ageDaysMin: 25, ageDaysMax: 40, description: "Yellow flowers with crimson center open.", fertilizerPriority: "Frequent light irrigations." },
            { stage: "Picking", name: "Tender Pod Picking", gddThreshold: 650, ageDaysMin: 45, ageDaysMax: 65, description: "Pick every alternate day before pods get fibrous.", fertilizerPriority: "Neem oil spray for whiteflies." }
        ]
    },
    carrot: {
        key: "carrot",
        commonName: "Carrot (Gajar / गाजर)",
        hindiName: "गाजर",
        scientificName: "Daucus carota",
        category: "vegetables",
        family: "Apiaceae",
        optimalPh: [6.0, 6.8],
        minAnnualRainfallMm: 400,
        maxAnnualRainfallMm: 800,
        typicalWaterDemandMm: 380,
        minTempC: 10.0,
        maxTempC: 24.0,
        preferredTextures: ["sandy loam", "loamy sand", "light alluvial"],
        maxClayPct: 20,
        minSocGKg: 7.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.35,
        floodTolerance: 0.05,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Winter (रबी: Sep-Oct Sowing, Dec-Feb Harvest)",
        seasonDetails: "Strictly requires deep, stone-free loose sandy loam for straight, uniform, deep-red taproots (Indian red Gajar). Heavy clay causes root forking.",
        maturityDays: 85,
        growthStages: [
            { stage: "Germination", name: "Feathery Foliage", gddThreshold: 200, ageDaysMin: 15, ageDaysMax: 30, description: "Finely divided leaves develop.", fertilizerPriority: "Avoid fresh manure to prevent root splitting." },
            { stage: "Root Elongation", name: "Taproot Thickening", gddThreshold: 550, ageDaysMin: 35, ageDaysMax: 65, description: "Red core accumulates beta-carotene and lycopene.", fertilizerPriority: "Potash (SOP) application for root sweetness." },
            { stage: "Harvest", name: "Plump Sweet Roots", gddThreshold: 800, ageDaysMin: 70, ageDaysMax: 85, description: "Irrigate lightly 1 day prior to lifting.", fertilizerPriority: "Harvest." }
        ]
    },
    garlic: {
        key: "garlic",
        commonName: "Garlic (Lahsun / लहसुन)",
        hindiName: "लहसुन",
        scientificName: "Allium sativum",
        category: "vegetables",
        family: "Amaryllidaceae",
        optimalPh: [6.0, 7.5],
        minAnnualRainfallMm: 400,
        maxAnnualRainfallMm: 800,
        typicalWaterDemandMm: 400,
        minTempC: 12.0,
        maxTempC: 28.0,
        preferredTextures: ["loam", "silt loam", "sandy loam", "clay loam"],
        maxClayPct: 30,
        minSocGKg: 8.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.4,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Season (रबी: Oct-Nov Sowing, Mar-Apr Harvest)",
        seasonDetails: "Winter bulb crop (MP, Gujarat, Rajasthan leader). Rich fertile loams with sulfur fertilizer produce large, pungent cloves.",
        maturityDays: 135,
        growthStages: [
            { stage: "Clove Sprout", name: "Shoot Emergence", gddThreshold: 300, ageDaysMin: 15, ageDaysMax: 35, description: "Flat straplike leaves emerge.", fertilizerPriority: "Basal DAP + Sulfur." },
            { stage: "Bulb Differentiation", name: "Clove Partitioning", gddThreshold: 850, ageDaysMin: 60, ageDaysMax: 100, description: "Multi-clove bulb differentiates underground.", fertilizerPriority: "Potassium spray." },
            { stage: "Maturity", name: "Leaf Yellowing", gddThreshold: 1200, ageDaysMin: 110, ageDaysMax: 135, description: "Top leaves turn brown and bend.", fertilizerPriority: "Curing under shade." }
        ]
    },
    spinach: {
        key: "spinach",
        commonName: "Spinach / Palak (पालक)",
        hindiName: "पालक",
        scientificName: "Spinacia oleracea",
        category: "vegetables",
        family: "Amaranthaceae",
        optimalPh: [6.5, 7.5],
        minAnnualRainfallMm: 350,
        maxAnnualRainfallMm: 800,
        typicalWaterDemandMm: 300,
        minTempC: 10.0,
        maxTempC: 25.0,
        preferredTextures: ["loam", "silt loam", "clay loam", "alluvial"],
        maxClayPct: 35,
        minSocGKg: 9.0,
        minCecCmolKg: 12.0,
        droughtTolerance: 0.2,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi or Winter (रबी / शीत: Sep-Nov Sowing, multiple cuttings)",
        seasonDetails: "Fast-growing iron-rich leafy vegetable. Thrives in fertile neutral loams with ample nitrogen for tender succulent dark green leaves.",
        maturityDays: 45,
        growthStages: [
            { stage: "Rosette", name: "First Flush", gddThreshold: 200, ageDaysMin: 15, ageDaysMax: 25, description: "Succulent broad green leaves.", fertilizerPriority: "Neem-coated Urea after each cutting." },
            { stage: "Regrowth", name: "Successive Cuts", gddThreshold: 450, ageDaysMin: 28, ageDaysMax: 45, description: "3-4 cuttings every 12-15 days.", fertilizerPriority: "Light frequent irrigation." }
        ]
    },
    cucumber: {
        key: "cucumber",
        commonName: "Cucumber (Kheera / खीरा)",
        hindiName: "खीरा",
        scientificName: "Cucumis sativus",
        category: "vegetables",
        family: "Cucurbitaceae",
        optimalPh: [6.0, 7.2],
        minAnnualRainfallMm: 450,
        maxAnnualRainfallMm: 1000,
        typicalWaterDemandMm: 420,
        minTempC: 20.0,
        maxTempC: 36.0,
        preferredTextures: ["sandy loam", "loam", "alluvial riverbed"],
        maxClayPct: 25,
        minSocGKg: 7.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.3,
        floodTolerance: 0.05,
        indianSeason: "Zaid (जायद)",
        bestSeason: "Zaid Summer or Kharif (जायद / खरीफ: Feb-Mar & June-July)",
        seasonDetails: "Warm summer vine adapted to riverbed sandy loams and garden loams. High water content requires regular light moisture.",
        maturityDays: 55,
        growthStages: [
            { stage: "Vine Spreading", name: "Vegetative Runner", gddThreshold: 250, ageDaysMin: 15, ageDaysMax: 25, description: "Runners branch with tendrils.", fertilizerPriority: "Drip fertigation NPK 19:19:19." },
            { stage: "Flowering & Fruit", name: "Yellow Bloom", gddThreshold: 500, ageDaysMin: 30, ageDaysMax: 45, description: "Female flowers with baby fruit ovary.", fertilizerPriority: "Calcium and Boron." },
            { stage: "Harvest", name: "Crisp Green Picking", gddThreshold: 650, ageDaysMin: 45, ageDaysMax: 55, description: "Pick before seeds get hard.", fertilizerPriority: "Harvest." }
        ]
    },
    bitter_gourd: {
        key: "bitter_gourd",
        commonName: "Bitter Gourd (Karela / करेला)",
        hindiName: "करेला",
        scientificName: "Momordica charantia",
        category: "vegetables",
        family: "Cucurbitaceae",
        optimalPh: [6.0, 7.2],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1200,
        typicalWaterDemandMm: 450,
        minTempC: 22.0,
        maxTempC: 38.0,
        preferredTextures: ["sandy loam", "loam", "silt loam"],
        maxClayPct: 28,
        minSocGKg: 7.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.45,
        floodTolerance: 0.1,
        indianSeason: "Zaid (जायद)",
        bestSeason: "Summer Zaid or Kharif (जायद / खरीफ: Feb-Mar & June-July)",
        seasonDetails: "Trellised climbing gourd. Warm sunny weather and well-drained fertile loam produce high yields of ridged, bitter therapeutic fruits.",
        maturityDays: 65,
        growthStages: [
            { stage: "Trellis Climb", name: "Bower Climbing", gddThreshold: 300, ageDaysMin: 18, ageDaysMax: 35, description: "Vines trained on bamboo mandap.", fertilizerPriority: "FYM + NPK balanced." },
            { stage: "Bloom & Fruit", name: "Warty Fruit Set", gddThreshold: 600, ageDaysMin: 40, ageDaysMax: 55, description: "Tender dark green prickly fruits swell.", fertilizerPriority: "Foliar Potash." },
            { stage: "Harvest", name: "Harvest", gddThreshold: 750, ageDaysMin: 55, ageDaysMax: 65, description: "Pick green before turning yellow.", fertilizerPriority: "Frequent pickings." }
        ]
    },

    // ── FRUITS & HORTICULTURE (फल एवं बागवानी) ───────────────────────────────
    mango: {
        key: "mango",
        commonName: "Mango (Aam / आम)",
        hindiName: "आम",
        scientificName: "Mangifera indica",
        category: "fruits",
        family: "Anacardiaceae",
        optimalPh: [5.5, 7.5],
        minAnnualRainfallMm: 650,
        maxAnnualRainfallMm: 2000,
        typicalWaterDemandMm: 800,
        minTempC: 15.0,
        maxTempC: 40.0,
        preferredTextures: ["alluvial", "loam", "sandy loam", "red loamy"],
        maxClayPct: 30,
        minSocGKg: 6.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.7,
        floodTolerance: 0.1,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Flowering in Jan-Feb (Rabi), Harvest in May-July (Summer)",
        seasonDetails: "King of Fruits. Thrives in deep well-drained alluvial and red loams. A dry spell in winter promotes prolific flower panicle differentiation.",
        maturityDays: 130,
        growthStages: [
            { stage: "Panicle Bloom", name: "Flowering (Jan-Feb)", gddThreshold: 400, ageDaysMin: 20, ageDaysMax: 45, description: "Golden panicles flower. Never irrigate during bloom.", fertilizerPriority: "Withhold irrigation during bloom." },
            { stage: "Fruit Setting", name: "Pea to Marble Sizing", gddThreshold: 900, ageDaysMin: 50, ageDaysMax: 95, description: "Fruitlets set and expand rapidly.", fertilizerPriority: "Resume irrigation + 0:0:50 Potash spray." },
            { stage: "Maturity", name: "Tapka Ripening", gddThreshold: 1350, ageDaysMin: 100, ageDaysMax: 130, description: "Shoulders fill, skin color breaks.", fertilizerPriority: "Harvest." }
        ]
    },
    guava: {
        key: "guava",
        commonName: "Guava (Amrood / अमरूद)",
        hindiName: "अमरूद",
        scientificName: "Psidium guajava",
        category: "fruits",
        family: "Myrtaceae",
        optimalPh: [5.5, 8.2],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1800,
        typicalWaterDemandMm: 650,
        minTempC: 10.0,
        maxTempC: 40.0,
        preferredTextures: ["alluvial", "loam", "clay loam", "red loamy", "sandy loam"],
        maxClayPct: 40,
        minSocGKg: 5.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.75,
        floodTolerance: 0.3,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Mrig Bahar (Winter Harvest: Nov-Jan - Highest Quality)",
        seasonDetails: "Extremely hardy Indian fruit tree. Highly tolerant of varying soil pH (5.5 up to 8.2), slight salinity, and drought. Allahabad Safeda and L-49 leaders.",
        maturityDays: 120,
        growthStages: [
            { stage: "Bahar Treatment", name: "Root Withholding", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 40, description: "Water withholding for flower induction.", fertilizerPriority: "Manure + DAP + Potash." },
            { stage: "Fruit Sizing", name: "Fruit Growth", gddThreshold: 750, ageDaysMin: 50, ageDaysMax: 90, description: "Green fruitlets expand.", fertilizerPriority: "Irrigation + Zinc spray." },
            { stage: "Maturity", name: "Pale Yellow Harvest", gddThreshold: 1100, ageDaysMin: 100, ageDaysMax: 120, description: "Skin color breaks from dark to light green.", fertilizerPriority: "Harvest." }
        ]
    },
    pomegranate: {
        key: "pomegranate",
        commonName: "Pomegranate (Anar / अनार)",
        hindiName: "अनार",
        scientificName: "Punica granatum",
        category: "fruits",
        family: "Lythraceae",
        optimalPh: [6.5, 8.2],
        minAnnualRainfallMm: 350,
        maxAnnualRainfallMm: 900,
        typicalWaterDemandMm: 500,
        minTempC: 12.0,
        maxTempC: 42.0,
        preferredTextures: ["loam", "sandy loam", "black cotton", "clay loam"],
        maxClayPct: 40,
        minSocGKg: 5.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.85,
        floodTolerance: 0.1,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Ambe or Hasta Bahar (Maharashtra / Gujarat / Rajasthan tracts)",
        seasonDetails: "Thrives in semi-arid tracts and calcareous alkaline soils (pH 6.5-8.2). Bhagwa variety produces deep ruby red arils under hot sunny days.",
        maturityDays: 140,
        growthStages: [
            { stage: "Bloom", name: "Scarlet Flowering", gddThreshold: 350, ageDaysMin: 20, ageDaysMax: 45, description: "Bright red bell-shaped blossoms.", fertilizerPriority: "Boron and Calcium for fruit rind elasticity." },
            { stage: "Aril Development", name: "Fruit Swelling", gddThreshold: 850, ageDaysMin: 50, ageDaysMax: 105, description: "Arils sweeten and turn deep red.", fertilizerPriority: "Consistent drip irrigation to avoid cracking." },
            { stage: "Harvest", name: "Metallic Clink Maturity", gddThreshold: 1250, ageDaysMin: 115, ageDaysMax: 140, description: "Rind turns reddish-yellow; metallic clink sound.", fertilizerPriority: "Harvest." }
        ]
    },
    papaya: {
        key: "papaya",
        commonName: "Papaya (Papita / पपीता)",
        hindiName: "पपीता",
        scientificName: "Carica papaya",
        category: "fruits",
        family: "Caricaceae",
        optimalPh: [6.0, 7.2],
        minAnnualRainfallMm: 800,
        maxAnnualRainfallMm: 2000,
        typicalWaterDemandMm: 900,
        minTempC: 18.0,
        maxTempC: 38.0,
        preferredTextures: ["sandy loam", "loam", "alluvial"],
        maxClayPct: 25,
        minSocGKg: 8.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.35,
        floodTolerance: 0.0,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Year-round in tropical India (Red Lady 786 leader)",
        seasonDetails: "Fast-growing herbaceous fruit tree. Strictly requires porous, well-drained loam. Cannot tolerate even 24 hours of standing water (causes collar rot).",
        maturityDays: 270,
        growthStages: [
            { stage: "Establishment", name: "Stem Thickening", gddThreshold: 600, ageDaysMin: 30, ageDaysMax: 90, description: "Hollow unbranched trunk grows rapidly.", fertilizerPriority: "Monthly split N-P-K (50:50:50 g/plant)." },
            { stage: "Axillary Flowering", name: "Flower Bud Set", gddThreshold: 1400, ageDaysMin: 100, ageDaysMax: 180, description: "Blooms develop directly on trunk.", fertilizerPriority: "Potash (SOP) for sweet brix." },
            { stage: "Harvest", name: "Color Break", gddThreshold: 2200, ageDaysMin: 220, ageDaysMax: 270, description: "Yellow streaks appear at apex.", fertilizerPriority: "Harvest." }
        ]
    },
    banana: {
        key: "banana",
        commonName: "Banana (Kela / केला)",
        hindiName: "केला",
        scientificName: "Musa acuminata",
        category: "fruits",
        family: "Musaceae",
        optimalPh: [6.0, 7.5],
        minAnnualRainfallMm: 1200,
        maxAnnualRainfallMm: 2500,
        typicalWaterDemandMm: 1600,
        minTempC: 18.0,
        maxTempC: 38.0,
        preferredTextures: ["clay loam", "alluvial", "loam", "silt loam"],
        maxClayPct: 40,
        minSocGKg: 10.0,
        minCecCmolKg: 15.0,
        droughtTolerance: 0.2,
        floodTolerance: 0.3,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Planting in June-July or Sep-Oct (Grand Naine / Robusta)",
        seasonDetails: "Heavy water and nutrient consumer dominating Maharashtra (Jalgaon), Gujarat, Tamil Nadu, and UP. Requires rich fertile organic soil.",
        maturityDays: 330,
        growthStages: [
            { stage: "Vegetative", name: "Shooting Pseudostem", gddThreshold: 1200, ageDaysMin: 40, ageDaysMax: 180, description: "Broad glossy paddle leaves emerge.", fertilizerPriority: "Heavy monthly Urea + Potash splits." },
            { stage: "Inflorescence", name: "Bunch Emergence (Kamal)", gddThreshold: 2200, ageDaysMin: 200, ageDaysMax: 250, description: "Large purple heart pendant bunch flowers.", fertilizerPriority: "Bunch spraying with Potassium Sulfate." },
            { stage: "Harvest", name: "3/4 Round Fingers", gddThreshold: 3100, ageDaysMin: 280, ageDaysMax: 330, description: "Fingers lose sharp angles and round out.", fertilizerPriority: "Harvest bunch." }
        ]
    },
    lemon: {
        key: "lemon",
        commonName: "Lemon / Acid Lime (Nimbu / नींबू)",
        hindiName: "नींबू / कागजी नींबू",
        scientificName: "Citrus aurantiifolia",
        category: "fruits",
        family: "Rutaceae",
        optimalPh: [5.8, 7.8],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1200,
        typicalWaterDemandMm: 650,
        minTempC: 15.0,
        maxTempC: 40.0,
        preferredTextures: ["sandy loam", "loam", "light alluvial", "red loamy"],
        maxClayPct: 28,
        minSocGKg: 6.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.65,
        floodTolerance: 0.1,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Year-round fruiting (peak summer harvest in Mar-July)",
        seasonDetails: "High commercial demand across India. Requires deep porous well-drained sandy loam. Highly sensitive to stagnant moisture and root rot.",
        maturityDays: 150,
        growthStages: [
            { stage: "Flowering", name: "White Citrus Bloom", gddThreshold: 400, ageDaysMin: 25, ageDaysMax: 50, description: "Fragrant star-shaped white flowers.", fertilizerPriority: "Zinc and Iron micronutrient foliar spray." },
            { stage: "Fruit Fill", name: "Green Lime Sizing", gddThreshold: 900, ageDaysMin: 60, ageDaysMax: 120, description: "Juice vesicles swell with citric acid.", fertilizerPriority: "Consistent drip irrigation." },
            { stage: "Harvest", name: "Juicy Yellow-Green", gddThreshold: 1350, ageDaysMin: 130, ageDaysMax: 150, description: "Thin-skinned aromatic round fruit.", fertilizerPriority: "Harvest." }
        ]
    },
    watermelon: {
        key: "watermelon",
        commonName: "Watermelon (Tarbooj / तरबूज)",
        hindiName: "तरबूज",
        scientificName: "Citrullus lanatus",
        category: "fruits",
        family: "Cucurbitaceae",
        optimalPh: [6.0, 7.2],
        minAnnualRainfallMm: 350,
        maxAnnualRainfallMm: 750,
        typicalWaterDemandMm: 400,
        minTempC: 22.0,
        maxTempC: 40.0,
        preferredTextures: ["sandy loam", "loamy sand", "riverbed sand"],
        maxClayPct: 20,
        minSocGKg: 5.0,
        minCecCmolKg: 6.0,
        droughtTolerance: 0.5,
        floodTolerance: 0.0,
        indianSeason: "Zaid (जायद)",
        bestSeason: "Zaid Summer (जायद: Jan-Feb Sowing, Apr-June Harvest)",
        seasonDetails: "Quintessential summer fruit. Deep warm sandy loams (like Gangetic river diara tracts) enable fast root expansion and high sugar (Brix > 11%).",
        maturityDays: 80,
        growthStages: [
            { stage: "Vine Run", name: "Runner Stage", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 35, description: "Vines crawl across sandy bed.", fertilizerPriority: "Drip NPK fertigation." },
            { stage: "Fruit Sizing", name: "Melon Expansion", gddThreshold: 650, ageDaysMin: 40, ageDaysMax: 65, description: "Fruit swells to 4-10 kg.", fertilizerPriority: "Potash for rind strength and red flesh brix." },
            { stage: "Harvest", name: "Dull Thud Maturity", gddThreshold: 900, ageDaysMin: 70, ageDaysMax: 80, description: "Tendril dries, ground spot turns buttery yellow.", fertilizerPriority: "Harvest." }
        ]
    },
    grapes: {
        key: "grapes",
        commonName: "Grapes (Angoor / अंगूर)",
        hindiName: "अंगूर",
        scientificName: "Vitis vinifera",
        category: "fruits",
        family: "Vitaceae",
        optimalPh: [6.5, 8.0],
        minAnnualRainfallMm: 450,
        maxAnnualRainfallMm: 900,
        typicalWaterDemandMm: 550,
        minTempC: 12.0,
        maxTempC: 38.0,
        preferredTextures: ["loam", "sandy loam", "black cotton", "clay loam"],
        maxClayPct: 35,
        minSocGKg: 7.0,
        minCecCmolKg: 12.0,
        droughtTolerance: 0.6,
        floodTolerance: 0.1,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Maharashtra Nashik/Sangli Belt (Oct Pruning, Feb-Apr Harvest)",
        seasonDetails: "Commercial export fruit. Thrives in semi-arid sunny climates in deep well-drained loams and black soils with bower training systems.",
        maturityDays: 135,
        growthStages: [
            { stage: "Sprouting", name: "Bud Burst", gddThreshold: 350, ageDaysMin: 15, ageDaysMax: 30, description: "New shoots push from pruned cane.", fertilizerPriority: "Gibberellic Acid (GA3) for berry elongation." },
            { stage: "Berry Set", name: "Cluster Sizing", gddThreshold: 800, ageDaysMin: 45, ageDaysMax: 85, description: "Green berries expand in clusters.", fertilizerPriority: "Potash and Calcium." },
            { stage: "Veraison & Harvest", name: "Sugar Accumulation", gddThreshold: 1250, ageDaysMin: 105, ageDaysMax: 135, description: "Berries soften, Brix reaches 18-20°.", fertilizerPriority: "Harvest dry." }
        ]
    },
    ber: {
        key: "ber",
        commonName: "Indian Jujube / Ber (बेर)",
        hindiName: "बेर",
        scientificName: "Ziziphus mauritiana",
        category: "fruits",
        family: "Rhamnaceae",
        optimalPh: [7.2, 8.8],
        minAnnualRainfallMm: 250,
        maxAnnualRainfallMm: 700,
        typicalWaterDemandMm: 350,
        minTempC: 8.0,
        maxTempC: 45.0,
        preferredTextures: ["sandy loam", "loamy sand", "desert sand", "alkaline clay"],
        maxClayPct: 35,
        minSocGKg: 3.0,
        minCecCmolKg: 6.0,
        droughtTolerance: 0.95,
        floodTolerance: 0.1,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Arid & Semi-Arid Zone (Rajasthan / Haryana / Gujarat / Deccan)",
        seasonDetails: "Extremely resilient desert/arid fruit tree ('Poor man's apple'). Thrives in high alkaline sandy soils (pH up to 8.8) where few other fruits survive.",
        maturityDays: 150,
        growthStages: [
            { stage: "Pruning Flush", name: "Summer Flush", gddThreshold: 450, ageDaysMin: 30, ageDaysMax: 60, description: "Spiny drooping branches emerge.", fertilizerPriority: "Farmyard manure + SSP." },
            { stage: "Flowering", name: "Greenish Blossoms", gddThreshold: 850, ageDaysMin: 70, ageDaysMax: 100, description: "Clusters in leaf axils.", fertilizerPriority: "Light irrigation." },
            { stage: "Maturity", name: "Crisp Sweet Berries", gddThreshold: 1400, ageDaysMin: 120, ageDaysMax: 150, description: "Skin turns golden-yellow with crisp sweet pulp.", fertilizerPriority: "Harvest." }
        ]
    },
    cashew: {
        key: "cashew",
        commonName: "Cashew Nut (Kaju / काजू)",
        hindiName: "काजू",
        scientificName: "Anacardium occidentale",
        category: "fruits",
        family: "Anacardiaceae",
        optimalPh: [4.8, 6.5],
        minAnnualRainfallMm: 900,
        maxAnnualRainfallMm: 3000,
        typicalWaterDemandMm: 750,
        minTempC: 18.0,
        maxTempC: 38.0,
        preferredTextures: ["red loamy", "laterite", "sandy loam", "gravelly"],
        maxClayPct: 25,
        minSocGKg: 4.0,
        minCecCmolKg: 6.0,
        droughtTolerance: 0.8,
        floodTolerance: 0.05,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Coastal & Laterite Belt (Goa, Konkan, Kerala, Odisha)",
        seasonDetails: "Specifically excels in acidic red and laterite coastal soils (pH 4.8-6.3). Highly drought hardy with deep lateral root anchor.",
        maturityDays: 140,
        growthStages: [
            { stage: "Panicle Flush", name: "Floral Panicles", gddThreshold: 400, ageDaysMin: 20, ageDaysMax: 45, description: "Pink tinged panicles.", fertilizerPriority: "NPK 70:30:30 g/tree." },
            { stage: "Nut & Apple", name: "Nut Development", gddThreshold: 850, ageDaysMin: 50, ageDaysMax: 90, description: "Kidney-shaped grey nut hangs below succulent apple.", fertilizerPriority: "Foliar micronutrients." },
            { stage: "Harvest", name: "Fallen Cashew Apple", gddThreshold: 1300, ageDaysMin: 100, ageDaysMax: 140, description: "Gather fallen mature nuts from ground.", fertilizerPriority: "Drying nuts in sun." }
        ]
    },

    // ── STAPLE CEREALS & GRAINS (अनाज) ───────────────────────────────────────
    wheat: {
        key: "wheat",
        commonName: "Wheat (Gehun / गेहूं)",
        hindiName: "गेहूं",
        scientificName: "Triticum aestivum",
        category: "cereals",
        family: "Poaceae",
        optimalPh: [6.0, 7.5],
        minAnnualRainfallMm: 450,
        maxAnnualRainfallMm: 1100,
        typicalWaterDemandMm: 500,
        minTempC: 8.0,
        maxTempC: 30.0,
        preferredTextures: ["loam", "silt loam", "clay loam", "silty clay loam"],
        maxClayPct: 45,
        minSocGKg: 7.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.4,
        floodTolerance: 0.2,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Season (रबी: Oct-Nov Sowing, Mar-Apr Harvest)",
        seasonDetails: "Cool winter vegetative period (12-18°C) promotes tillering; warm dry sunshine in March-April ensures golden grain fill.",
        maturityDays: 125,
        growthStages: [
            { stage: "CRI", name: "Crown Root Initiation", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 30, description: "Crown roots establish. Critical single irrigation.", fertilizerPriority: "1st topdress Neem-coated Urea (60 kg N/ha)." },
            { stage: "Tillering", name: "Tillering & Jointing", gddThreshold: 600, ageDaysMin: 35, ageDaysMax: 60, description: "Spikes per m2 determined.", fertilizerPriority: "2nd split Urea + Zinc." },
            { stage: "Grain Fill", name: "Milking to Dough", gddThreshold: 1100, ageDaysMin: 86, ageDaysMax: 105, description: "Starch fills golden grains.", fertilizerPriority: "Avoid water during windy days." },
            { stage: "Harvest", name: "Maturity", gddThreshold: 1250, ageDaysMin: 106, ageDaysMax: 125, description: "Grain moisture < 14%.", fertilizerPriority: "Combine harvest." }
        ]
    },
    rice: {
        key: "rice",
        commonName: "Paddy / Rice (Dhan / धान)",
        hindiName: "धान",
        scientificName: "Oryza sativa",
        category: "cereals",
        family: "Poaceae",
        optimalPh: [5.0, 6.8],
        minAnnualRainfallMm: 1100,
        maxAnnualRainfallMm: 3000,
        typicalWaterDemandMm: 1350,
        minTempC: 20.0,
        maxTempC: 36.0,
        preferredTextures: ["clay", "silty clay", "clay loam", "silty clay loam"],
        maxClayPct: 75,
        minClayPct: 20,
        minSocGKg: 8.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.1,
        floodTolerance: 0.95,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif Monsoon (खरीफ: June-July Nursery & Transplanting, Oct-Nov Harvest)",
        seasonDetails: "Requires puddled clay soil with standing water (2-5 cm) and high monsoon humidity. Tolerates acidic conditions well.",
        maturityDays: 130,
        growthStages: [
            { stage: "Nursery", name: "Seedling Nursery", gddThreshold: 250, ageDaysMin: 15, ageDaysMax: 25, description: "3-4 leaf seedlings transplanted into puddled field.", fertilizerPriority: "Basal DAP + MOP + Zinc Sulfate." },
            { stage: "Tillering", name: "Active Tillering", gddThreshold: 550, ageDaysMin: 26, ageDaysMax: 50, description: "Tillers multiply with standing water.", fertilizerPriority: "1st topdress Neem-coated Urea." },
            { stage: "Heading", name: "Panicle Emergence", gddThreshold: 900, ageDaysMin: 65, ageDaysMax: 85, description: "Panicles push out of boot leaf.", fertilizerPriority: "Foliar Potash." },
            { stage: "Harvest", name: "Golden Grain Maturity", gddThreshold: 1300, ageDaysMin: 110, ageDaysMax: 130, description: "Drain field 10 days before harvest.", fertilizerPriority: "Harvest." }
        ]
    },
    maize: {
        key: "maize",
        commonName: "Maize / Corn (Makka / मक्का)",
        hindiName: "मक्का",
        scientificName: "Zea mays",
        category: "cereals",
        family: "Poaceae",
        optimalPh: [6.0, 7.5],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1200,
        typicalWaterDemandMm: 550,
        minTempC: 18.0,
        maxTempC: 35.0,
        preferredTextures: ["loam", "sandy loam", "silt loam", "clay loam"],
        maxClayPct: 35,
        minSocGKg: 7.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.45,
        floodTolerance: 0.1,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif or Rabi (खरीफ / रबी: June Sowing or Oct Sowing in Bihar/AP)",
        seasonDetails: "High photosynthetic C4 cereal. Demands fertile well-drained loam. Cannot tolerate stagnant waterlogging at seedling stage.",
        maturityDays: 105,
        growthStages: [
            { stage: "Knee High", name: "V6 Vegetative", gddThreshold: 350, ageDaysMin: 25, ageDaysMax: 40, description: "Rapid stalk elongation.", fertilizerPriority: "Topdress Urea (50 kg N/ha)." },
            { stage: "Silking & Tasseling", name: "Pollination", gddThreshold: 750, ageDaysMin: 50, ageDaysMax: 65, description: "Pollen drops onto moist silks.", fertilizerPriority: "Most critical water window." },
            { stage: "Maturity", name: "Cob Desiccation", gddThreshold: 1100, ageDaysMin: 90, ageDaysMax: 105, description: "Black layer forms at kernel base.", fertilizerPriority: "Harvest cobs." }
        ]
    },
    bajra: {
        key: "bajra",
        commonName: "Pearl Millet (Bajra / बाजरा)",
        hindiName: "बाजरा",
        scientificName: "Pennisetum glaucum",
        category: "cereals",
        family: "Poaceae",
        optimalPh: [6.5, 8.5],
        minAnnualRainfallMm: 300,
        maxAnnualRainfallMm: 700,
        typicalWaterDemandMm: 320,
        minTempC: 20.0,
        maxTempC: 42.0,
        preferredTextures: ["sandy loam", "loamy sand", "desert sand", "light loam"],
        maxClayPct: 25,
        minSocGKg: 3.0,
        minCecCmolKg: 6.0,
        droughtTolerance: 0.9,
        floodTolerance: 0.05,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif Monsoon (खरीफ: June-July Sowing in Arid Belts)",
        seasonDetails: "Nutri-cereal miracle crop for arid Rajasthan, Gujarat, and Haryana. Unmatched heat and drought tolerance in sandy/alkaline soils.",
        maturityDays: 85,
        growthStages: [
            { stage: "Tillering", name: "Basal Tillering", gddThreshold: 250, ageDaysMin: 15, ageDaysMax: 30, description: "Sturdy drought-adapted tillers.", fertilizerPriority: "Basal NPK 40:20:0." },
            { stage: "Flowering", name: "Cylindrical Head Emergence", gddThreshold: 550, ageDaysMin: 40, ageDaysMax: 60, description: "Compact grey-bristle panicle bloom.", fertilizerPriority: "Light rainfed moisture." },
            { stage: "Harvest", name: "Head Harvest", gddThreshold: 850, ageDaysMin: 70, ageDaysMax: 85, description: "Grain hardens.", fertilizerPriority: "Harvest." }
        ]
    },

    // ── PULSES & OILSEEDS (दालें एवं तिलहन) ───────────────────────────────────
    chickpea: {
        key: "chickpea",
        commonName: "Chickpea / Bengal Gram (Chana / चना)",
        hindiName: "चना",
        scientificName: "Cicer arietinum",
        category: "pulses",
        family: "Fabaceae",
        optimalPh: [6.0, 8.2],
        minAnnualRainfallMm: 350,
        maxAnnualRainfallMm: 800,
        typicalWaterDemandMm: 350,
        minTempC: 10.0,
        maxTempC: 30.0,
        preferredTextures: ["loam", "silt loam", "clay loam", "sandy clay loam"],
        maxClayPct: 45,
        minSocGKg: 5.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.75,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Season (रबी: Mid Oct - Nov Sowing, Feb - Mar Harvest)",
        seasonDetails: "Premier pulse of India (MP, Maharashtra, Rajasthan). Thrives in dry cool winter in medium-to-heavy soils without standing water.",
        maturityDays: 105,
        growthStages: [
            { stage: "Branching", name: "Acidic Leaves", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 35, description: "Malic acid exuded by leaves.", fertilizerPriority: "Rhizobium + Basal DAP." },
            { stage: "Podding", name: "Green Pod Set", gddThreshold: 650, ageDaysMin: 45, ageDaysMax: 70, description: "Pink flowers set into green pods.", fertilizerPriority: "Foliar 2% DAP at 50% bloom." },
            { stage: "Harvest", name: "Golden Desiccation", gddThreshold: 1000, ageDaysMin: 90, ageDaysMax: 105, description: "Pods rattle dry.", fertilizerPriority: "Harvest." }
        ]
    },
    mustard: {
        key: "mustard",
        commonName: "Mustard / Rapeseed (Sarson / सरसों)",
        hindiName: "सरसों / राई",
        scientificName: "Brassica juncea",
        category: "oilseeds",
        family: "Brassicaceae",
        optimalPh: [6.0, 7.8],
        minAnnualRainfallMm: 350,
        maxAnnualRainfallMm: 850,
        typicalWaterDemandMm: 360,
        minTempC: 8.0,
        maxTempC: 28.0,
        preferredTextures: ["loam", "sandy loam", "clay loam", "alluvial"],
        maxClayPct: 40,
        minSocGKg: 6.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.65,
        floodTolerance: 0.15,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Season (रबी: October Sowing, February Harvest)",
        seasonDetails: "Premier winter edible oilseed. Cool dry weather and balanced neutral-alkaline soil promote high oil content (38-42%).",
        maturityDays: 110,
        growthStages: [
            { stage: "Rosette", name: "Basal Rosette", gddThreshold: 280, ageDaysMin: 20, ageDaysMax: 35, description: "Broad green leaves expand.", fertilizerPriority: "Apply 40 kg Sulfur/ha." },
            { stage: "Yellow Bloom", name: "Golden Field", gddThreshold: 600, ageDaysMin: 45, ageDaysMax: 65, description: "Yellow blossom blanket.", fertilizerPriority: "Irrigation at 50% bloom." },
            { stage: "Silique Fill", name: "Seed Maturation", gddThreshold: 1000, ageDaysMin: 80, ageDaysMax: 110, description: "Seeds darken inside pods.", fertilizerPriority: "Harvest." }
        ]
    },
    soybean: {
        key: "soybean",
        commonName: "Soybean (सोयाबीन)",
        hindiName: "सोयाबीन",
        scientificName: "Glycine max",
        category: "oilseeds",
        family: "Fabaceae",
        optimalPh: [6.0, 7.2],
        minAnnualRainfallMm: 550,
        maxAnnualRainfallMm: 1300,
        typicalWaterDemandMm: 550,
        minTempC: 16.0,
        maxTempC: 34.0,
        preferredTextures: ["clay loam", "black cotton", "loam", "silt loam"],
        maxClayPct: 45,
        minSocGKg: 7.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.35,
        floodTolerance: 0.2,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif Season (खरीफ: June-July Sowing with Monsoon Onset)",
        seasonDetails: "Dominates central India vertisols (MP, Maharashtra Malwa/Vidarbha). Thrives in fertile clay loams with monsoon showers.",
        maturityDays: 105,
        growthStages: [
            { stage: "Nodulation", name: "Rhizobium Nodulation", gddThreshold: 300, ageDaysMin: 18, ageDaysMax: 30, description: "Root nodules fix nitrogen.", fertilizerPriority: "Basal SSP + Potash." },
            { stage: "Podding", name: "Hairy Pod Expansion", gddThreshold: 700, ageDaysMin: 45, ageDaysMax: 70, description: "Small purple flowers form 2-3 seeded pods.", fertilizerPriority: "Foliar 19:19:19." },
            { stage: "Maturity", name: "Leaf Drop", gddThreshold: 1150, ageDaysMin: 80, ageDaysMax: 105, description: "Leaves drop, pods rattle.", fertilizerPriority: "Harvest at 13% moisture." }
        ]
    },
    groundnut: {
        key: "groundnut",
        commonName: "Groundnut / Peanut (Mungfali / मूंगफली)",
        hindiName: "मूंगफली",
        scientificName: "Arachis hypogaea",
        category: "oilseeds",
        family: "Fabaceae",
        optimalPh: [5.8, 7.2],
        minAnnualRainfallMm: 450,
        maxAnnualRainfallMm: 1100,
        typicalWaterDemandMm: 480,
        minTempC: 20.0,
        maxTempC: 36.0,
        preferredTextures: ["sandy loam", "loamy sand", "light alluvial loam", "red loamy"],
        maxClayPct: 24,
        minSocGKg: 5.0,
        minCecCmolKg: 6.0,
        droughtTolerance: 0.6,
        floodTolerance: 0.1,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif or Summer Zaid (खरीफ / जायद: Gujarat, AP, Karnataka, Rajasthan)",
        seasonDetails: "Porous friable sandy loam is essential so pegs can push easily underground. Gypsum calcium is critical for healthy pod filling.",
        maturityDays: 115,
        growthStages: [
            { stage: "Pegging", name: "Peg Penetration", gddThreshold: 450, ageDaysMin: 30, ageDaysMax: 50, description: "Pegs push 3-5 cm into friable soil.", fertilizerPriority: "Apply Gypsum (250 kg/ha) at pegging." },
            { stage: "Pod Fill", name: "Kernel Bulking", gddThreshold: 850, ageDaysMin: 55, ageDaysMax: 85, description: "Underground kernels swell.", fertilizerPriority: "Prevent crusting." },
            { stage: "Harvest", name: "Digger Lifting", gddThreshold: 1200, ageDaysMin: 95, ageDaysMax: 115, description: "Inner pod lining turns dark brown.", fertilizerPriority: "Harvest." }
        ]
    },

    // ── CASH CROPS (नकदी फसलें) ──────────────────────────────────────────────
    cotton: {
        key: "cotton",
        commonName: "Cotton (Kapas / कपास)",
        hindiName: "कपास",
        scientificName: "Gossypium hirsutum",
        category: "cash",
        family: "Malvaceae",
        optimalPh: [6.0, 8.0],
        minAnnualRainfallMm: 650,
        maxAnnualRainfallMm: 1200,
        typicalWaterDemandMm: 750,
        minTempC: 18.0,
        maxTempC: 38.0,
        preferredTextures: ["black cotton", "clay loam", "clay", "silty clay loam"],
        maxClayPct: 55,
        minClayPct: 15,
        minSocGKg: 6.0,
        minCecCmolKg: 12.0,
        droughtTolerance: 0.6,
        floodTolerance: 0.15,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif Season (खरीफ: May-June Sowing, Oct-Jan Picking)",
        seasonDetails: "White Gold of India. Perfectly suited to deep moisture-retentive black vertisols of Maharashtra, Gujarat, and Telangana.",
        maturityDays: 155,
        growthStages: [
            { stage: "Squaring", name: "Square Formation", gddThreshold: 450, ageDaysMin: 30, ageDaysMax: 50, description: "Flower buds (squares) develop.", fertilizerPriority: "Urea + Potash splits." },
            { stage: "Boll Formation", name: "Peak Boll Setting", gddThreshold: 850, ageDaysMin: 55, ageDaysMax: 90, description: "Flowers set into heavy green bolls.", fertilizerPriority: "Potassium Nitrate foliar spray." },
            { stage: "Boll Burst", name: "Picking", gddThreshold: 1450, ageDaysMin: 125, ageDaysMax: 155, description: "Bolls burst with clean white lint.", fertilizerPriority: "1st picking." }
        ]
    },
    sugarcane: {
        key: "sugarcane",
        commonName: "Sugarcane (Ganna / गन्ना)",
        hindiName: "गन्ना",
        scientificName: "Saccharum officinarum",
        category: "cash",
        family: "Poaceae",
        optimalPh: [6.2, 7.8],
        minAnnualRainfallMm: 1200,
        maxAnnualRainfallMm: 2500,
        typicalWaterDemandMm: 1750,
        minTempC: 20.0,
        maxTempC: 38.0,
        preferredTextures: ["clay loam", "loam", "silty clay loam", "alluvial"],
        maxClayPct: 45,
        minSocGKg: 8.0,
        minCecCmolKg: 12.0,
        droughtTolerance: 0.25,
        floodTolerance: 0.35,
        indianSeason: "Perennial / Annual (बारहमासी)",
        bestSeason: "Autumn or Spring (शरद / वसंत: Oct-Nov or Feb-Mar Planting)",
        seasonDetails: "Heavy water and fertilizer consumer dominating UP, Maharashtra, Karnataka. Deep fertile loams with high sunlight produce high sucrose Brix (>18%).",
        maturityDays: 330,
        growthStages: [
            { stage: "Tillering", name: "Sprouting Stools", gddThreshold: 800, ageDaysMin: 30, ageDaysMax: 100, description: "Eye buds sprout into multi-stalk stools.", fertilizerPriority: "DAP + Potash + Urea splits." },
            { stage: "Grand Growth", name: "Cane Elongation", gddThreshold: 2200, ageDaysMin: 110, ageDaysMax: 240, description: "Stalks lengthen with monsoon rains.", fertilizerPriority: "Earthing up to prevent lodging." },
            { stage: "Ripening", name: "Sucrose Maturation", gddThreshold: 3200, ageDaysMin: 250, ageDaysMax: 330, description: "Brix reaches peak.", fertilizerPriority: "Withhold irrigation 3 weeks before cut." }
        ]
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// CALIBRATED COMPUTER-VISION SOIL DIAGNOSTIC CLASSIFIER
// ─────────────────────────────────────────────────────────────────────────────
interface ImageAnalysisInput {
    avgR: number;
    avgG: number;
    avgB: number;
    hue: number;
    saturation: number;
    brightness: number;
    luminance: number;
    variance?: number;
}

interface DeducedSoilParameters {
    indianSoilClassification: string;
    detectedSoilType: string;
    derivedPh: number;
    soc: number;
    clayPct: number;
    sandPct: number;
    siltPct: number;
    cec: number;
    soilColorMunsell: string;
    structuralTilth: string;
    visualOrganicMatterEst: string;
    surfaceCrustingRisk: string;
    drainageAeration: string;
    phVerdictNote: string;
}

function deduceSoilParametersFromImage(
    img: ImageAnalysisInput | null | undefined,
    photoName: string,
    lat: number,
    lon: number
): DeducedSoilParameters {
    // 1. If explicit pixel metrics were extracted by canvas
    if (img && typeof img.avgR === "number" && typeof img.avgG === "number" && typeof img.avgB === "number") {
        const { avgR, avgG, avgB, hue, saturation, brightness, luminance } = img;
        const rRatio = avgR / (avgG + avgB + 1);

        // A. RED SOIL OR LATERITE SOIL (High Red Ratio / Iron Sesquioxides)
        if (
            (rRatio > 0.52 && avgR > 110 && avgR > avgG * 1.15) ||
            (hue >= 5 && hue <= 35 && saturation > 0.22 && luminance < 170) ||
            photoName.includes("red") ||
            photoName.includes("laterite")
        ) {
            const isLaterite = saturation > 0.35 || avgR > 135 || photoName.includes("laterite");
            if (isLaterite) {
                // Strongly acidic laterite soil: pH 4.7 - 5.4
                const calculatedPh = Math.round((4.8 + (hue / 35) * 0.4 - (avgR / 255) * 0.25 + (avgB / 255) * 0.3) * 10) / 10;
                return {
                    indianSoilClassification: "Laterite Soil (लैटेराइट मिट्टी)",
                    detectedSoilType: "Gravelly Clay Loam (Ferric Laterite)",
                    derivedPh: Math.max(4.6, Math.min(5.4, calculatedPh)),
                    soc: Math.round((4.5 + saturation * 4) * 10) / 10,
                    clayPct: 32,
                    sandPct: 48,
                    siltPct: 20,
                    cec: 9.5,
                    soilColorMunsell: "Brick Red / Deep Ochre (2.5YR 4/6)",
                    structuralTilth: "Cellular / Indurated Pores (Quick Drying)",
                    visualOrganicMatterEst: "Low Organic Carbon (<0.45% SOC) - Leached Bases",
                    surfaceCrustingRisk: "Moderate to Low Crusting",
                    drainageAeration: "Rapid Internal Drainage / Low Water Retention",
                    phVerdictNote: `Photo shows intense iron-rich lateritic pigment indicating strongly acidic soil (pH ~${calculatedPh}). Lime / CaCO3 application is essential for acid-sensitive crops.`
                };
            } else {
                // Mildly acidic to sub-neutral red loamy soil: pH 5.6 - 6.5
                const calculatedPh = Math.round((5.6 + (avgG / (avgR + 1)) * 0.9 + (1 - saturation) * 0.4) * 10) / 10;
                return {
                    indianSoilClassification: "Red Loamy Soil (लाल दोमट मिट्टी)",
                    detectedSoilType: "Red Sandy Clay Loam",
                    derivedPh: Math.max(5.5, Math.min(6.5, calculatedPh)),
                    soc: Math.round((8.5 + (1 - brightness) * 6) * 10) / 10,
                    clayPct: 26,
                    sandPct: 56,
                    siltPct: 18,
                    cec: 14.5,
                    soilColorMunsell: "Reddish Brown (5YR 4/4)",
                    structuralTilth: "Porous Subangular Blocky (Good Aeration)",
                    visualOrganicMatterEst: "Moderate Organic Matter (0.50% - 0.70% SOC)",
                    surfaceCrustingRisk: "Low Crusting Risk",
                    drainageAeration: "Well-Drained & Highly Aerated Rootzone",
                    phVerdictNote: `Photo shows ferric red coloration indicating mildly acidic soil (pH ~${calculatedPh}). Excellent for Groundnut, Millets, Vegetables, Tomato, and Potato.`
                };
            }
        }

        // B. BLACK COTTON SOIL / VERTISOL (Very Dark Luminance, High Humus & Montmorillonite)
        if (
            (luminance < 105 || brightness < 0.42 || (avgR < 80 && avgG < 80 && avgB < 80)) &&
            saturation < 0.35 &&
            !photoName.includes("red") &&
            !photoName.includes("laterite")
        ) {
            // Calcareous / Alkaline vertisol: pH 7.7 - 8.4
            const calculatedPh = Math.round((7.7 + (1 - brightness) * 0.7 + (avgB / (avgR + 1)) * 0.3) * 10) / 10;
            return {
                indianSoilClassification: "Black Cotton Soil / Regur (काली मिट्टी)",
                detectedSoilType: "Heavy Clay (Vertisol)",
                derivedPh: Math.max(7.6, Math.min(8.4, calculatedPh)),
                soc: Math.round((16.0 + (1 - brightness) * 8) * 10) / 10,
                clayPct: 52,
                sandPct: 18,
                siltPct: 30,
                cec: 42.0,
                soilColorMunsell: "Very Dark Greyish Black (10YR 2/1)",
                structuralTilth: "Cracking Angular Blocky (High Swell-Shrink)",
                visualOrganicMatterEst: "High Organic Matter & Humus Complex (>0.90% SOC)",
                surfaceCrustingRisk: "High Crusting & Compaction Risk after heavy rainfall",
                drainageAeration: "Slow Internal Drainage / Superior Moisture Retention",
                phVerdictNote: `Photo shows rich deep dark humus and montmorillonite clay indicating calcareous vertisol (pH ~${calculatedPh}). Ideal for Cotton, Soybean, Chickpea, Pomegranate, and Wheat.`
            };
        }

        // C. DESERT / ARID SANDY SOIL (High Brightness, Pale Yellow-Tan Sand)
        if (
            (luminance > 165 || brightness > 0.65 || (avgR > 160 && avgG > 150 && avgB > 115)) &&
            !photoName.includes("black") &&
            !photoName.includes("tarai")
        ) {
            // Alkaline desert soil: pH 8.0 - 8.7
            const calculatedPh = Math.round((7.9 + ((luminance - 165) / 90) * 0.8) * 10) / 10;
            return {
                indianSoilClassification: "Desert / Sandy Arid Soil (बलुई / मरुस्थलीय मिट्टी)",
                detectedSoilType: "Coarse Loamy Sand",
                derivedPh: Math.max(7.9, Math.min(8.7, calculatedPh)),
                soc: Math.round((3.0 + (1 - brightness) * 3) * 10) / 10,
                clayPct: 7,
                sandPct: 82,
                siltPct: 11,
                cec: 6.5,
                soilColorMunsell: "Pale Yellowish Tan / Sand (10YR 6/4)",
                structuralTilth: "Loose Single Grain Sand (Non-Cohesive)",
                visualOrganicMatterEst: "Very Low Organic Carbon (<0.30% SOC)",
                surfaceCrustingRisk: "Zero Crusting / Wind Erosion Prone",
                drainageAeration: "Excessive Drainage / Rapid Moisture Loss",
                phVerdictNote: `Photo shows high sand reflectance and pale yellowish tint indicating dry alkaline sandy soil (pH ~${calculatedPh}). High suitability for Bajra, Mustard, Ber, Watermelon, and Guava with drip irrigation.`
            };
        }

        // D. TERAI WETLAND / FOREST LOAM (Dark Brown, Moist Organic Sheen)
        if (
            (luminance >= 95 && luminance <= 130 && avgR > 80 && avgG > 70 && saturation > 0.22 && hue >= 25 && hue <= 45) ||
            photoName.includes("tarai")
        ) {
            // Slightly acidic to neutral rich loam: pH 6.2 - 6.8
            const calculatedPh = Math.round((6.2 + (avgG / (avgR + 1)) * 0.6) * 10) / 10;
            return {
                indianSoilClassification: "Terai Wetland Loam (तराई नम दोमट)",
                detectedSoilType: "Silty Clay Loam (Humus Rich)",
                derivedPh: Math.max(6.1, Math.min(6.8, calculatedPh)),
                soc: 22.5,
                clayPct: 34,
                sandPct: 26,
                siltPct: 40,
                cec: 28.0,
                soilColorMunsell: "Dark Brown / Wetland Loam (10YR 3/3)",
                structuralTilth: "Friable Spongy Crumb (Optimal Tilth)",
                visualOrganicMatterEst: "Very High Humus & Organic Matter (>1.25% SOC)",
                surfaceCrustingRisk: "Low Crusting Risk",
                drainageAeration: "Moist High Water Retention / Balanced Aeration",
                phVerdictNote: `Photo shows dark organic brown coloration indicating fertile wetland Terai loam (pH ~${calculatedPh}). Superb for Sugarcane, Rice, Maize, Vegetables, and Banana.`
            };
        }

        // E. ALLUVIAL LOAM (Balanced Gangetic / Indo-Gangetic Alluvium)
        // Default continuous calculation for medium brown / tan soils
        const calculatedPh = Math.round((6.6 + ((avgR - avgB) / 255) * 1.1 + (luminance / 255) * 0.4) * 10) / 10;
        return {
            indianSoilClassification: "Indo-Gangetic Alluvial Soil (जलोढ़ मिट्टी)",
            detectedSoilType: "Fertile Silt Loam",
            derivedPh: Math.max(6.5, Math.min(7.6, calculatedPh)),
            soc: 12.0,
            clayPct: 22,
            sandPct: 42,
            siltPct: 36,
            cec: 18.0,
            soilColorMunsell: "Greyish Brown / Alluvial Tan (10YR 5/3)",
            structuralTilth: "Granular Subangular Blocky (Excellent Seedbed)",
            visualOrganicMatterEst: "Balanced Organic Carbon (0.65% - 0.85% SOC)",
            surfaceCrustingRisk: "Low to Moderate Crusting after rainfall",
            drainageAeration: "Ideal Aeration & Capillary Moisture Retention",
            phVerdictNote: `Photo reveals balanced brownish-yellow alluvium indicating neutral fertile loam (pH ~${calculatedPh}). Universal viability for Wheat, Potato, Cauliflower, Peas, Onion, Tomato, and Mustard.`
        };
    }

    // 2. Preset / Filename Fallbacks if pixel data was not passed
    const lowerName = photoName.toLowerCase();
    if (lowerName.includes("black")) {
        return {
            indianSoilClassification: "Black Cotton Soil / Regur (काली मिट्टी)",
            detectedSoilType: "Heavy Clay (Vertisol)",
            derivedPh: 7.9,
            soc: 16.5,
            clayPct: 50,
            sandPct: 20,
            siltPct: 30,
            cec: 40.0,
            soilColorMunsell: "Black (10YR 2/1)",
            structuralTilth: "Angular Blocky Cracking",
            visualOrganicMatterEst: "High Organic Matter",
            surfaceCrustingRisk: "High Crusting Risk",
            drainageAeration: "Slow Drainage / High Moisture",
            phVerdictNote: "Black Vertisol soil with alkaline pH 7.9 and high clay holding capacity."
        };
    } else if (lowerName.includes("laterite")) {
        return {
            indianSoilClassification: "Laterite Soil (लैटेराइट मिट्टी)",
            detectedSoilType: "Gravelly Clay Loam",
            derivedPh: 5.2,
            soc: 5.0,
            clayPct: 34,
            sandPct: 46,
            siltPct: 20,
            cec: 9.0,
            soilColorMunsell: "Brick Red (2.5YR 4/6)",
            structuralTilth: "Indurated Porous",
            visualOrganicMatterEst: "Low Organic Carbon",
            surfaceCrustingRisk: "Low Crusting",
            drainageAeration: "Rapid Drainage / Acidic",
            phVerdictNote: "Laterite soil with strongly acidic pH 5.2. Apply Agricultural Lime for sensitive crops."
        };
    } else if (lowerName.includes("red")) {
        return {
            indianSoilClassification: "Red Loamy Soil (लाल दोमट मिट्टी)",
            detectedSoilType: "Red Sandy Clay Loam",
            derivedPh: 5.8,
            soc: 9.0,
            clayPct: 26,
            sandPct: 56,
            siltPct: 18,
            cec: 14.0,
            soilColorMunsell: "Reddish Brown (5YR 4/4)",
            structuralTilth: "Porous Blocky",
            visualOrganicMatterEst: "Moderate Organic Matter",
            surfaceCrustingRisk: "Low Crusting",
            drainageAeration: "Well-Drained",
            phVerdictNote: "Red loamy soil with mildly acidic pH 5.8. High suitability for groundnut and pulses."
        };
    } else if (lowerName.includes("desert")) {
        return {
            indianSoilClassification: "Desert / Sandy Arid Soil (बलुई / मरुस्थलीय मिट्टी)",
            detectedSoilType: "Coarse Sand",
            derivedPh: 8.2,
            soc: 3.5,
            clayPct: 8,
            sandPct: 82,
            siltPct: 10,
            cec: 6.0,
            soilColorMunsell: "Light Yellowish Tan (10YR 6/4)",
            structuralTilth: "Loose Single Grain",
            visualOrganicMatterEst: "Very Low Organic Carbon",
            surfaceCrustingRisk: "Zero Crusting",
            drainageAeration: "Excessive Drainage",
            phVerdictNote: "Arid sandy soil with alkaline pH 8.2. Excels for Bajra, Mustard, Ber, and Drip Watermelon."
        };
    } else if (lowerName.includes("tarai")) {
        return {
            indianSoilClassification: "Terai Wetland Loam (तराई नम दोमट)",
            detectedSoilType: "Silty Clay Loam",
            derivedPh: 6.4,
            soc: 22.0,
            clayPct: 35,
            sandPct: 25,
            siltPct: 40,
            cec: 28.0,
            soilColorMunsell: "Dark Brown (10YR 3/3)",
            structuralTilth: "Spongy Friable Crumb",
            visualOrganicMatterEst: "Very High Humus",
            surfaceCrustingRisk: "Low Crusting",
            drainageAeration: "High Water Holding",
            phVerdictNote: "Rich organic Terai loam with optimal pH 6.4. Superb for Sugarcane and Rice."
        };
    }

    // Default regional geographic fallback based on GPS
    const defaultPh = lat > 28.0 && lon > 74.0 && lon < 80.0 ? 7.2 : lon < 74.0 ? 8.2 : 6.8;
    return {
        indianSoilClassification: "Indo-Gangetic Alluvial Soil (जलोढ़ मिट्टी)",
        detectedSoilType: "Fertile Silt Loam",
        derivedPh: defaultPh,
        soc: 14.0,
        clayPct: 24,
        sandPct: 42,
        siltPct: 34,
        cec: 18.0,
        soilColorMunsell: "Greyish Brown (10YR 5/3)",
        structuralTilth: "Granular Subangular Blocky",
        visualOrganicMatterEst: "Adequate Organic Matter",
        surfaceCrustingRisk: "Low Crusting",
        drainageAeration: "Balanced Drainage",
        phVerdictNote: `Alluvial fertile loam with balanced pH ${defaultPh}.`
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// POST HANDLER: DYNAMIC PHOTO-BASED AGRONOMIC DIAGNOSIS
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            cropHint = "wheat",
            photoName = "field_sample.jpg",
            photoType = "soil", // "soil" or "crop"
            lat = 30.9,
            lon = 75.8,
            weatherData,
            imageAnalysis,
        } = body;

        // 1. DEDUCE SOIL PARAMETERS & PH FROM PHOTO
        const photoSoil = deduceSoilParametersFromImage(imageAnalysis, photoName, lat, lon);
        const actualSoilPh = photoSoil.derivedPh;
        const actualSoc = photoSoil.soc;
        const actualClay = photoSoil.clayPct;
        const actualSand = photoSoil.sandPct;
        const actualCec = photoSoil.cec;
        const actualTexture = photoSoil.detectedSoilType;

        // 2. GEOGRAPHIC CLIMATE & ESTIMATED RAINFALL FROM GPS
        const tempC = weatherData?.current?.temperature ?? 22.0;
        const precip7d = weatherData?.agronomy?.totalPrecip7Days ?? 0.0;
        const soilMoisture = weatherData?.current?.soilMoisture0_1cm ?? 0.28;

        let estimatedAnnualRainfallMm = 650;
        let regionName = "North Alluvial Plains";
        if (lon < 74.0) {
            estimatedAnnualRainfallMm = 380;
            regionName = "Western Arid Desert Zone (Rajasthan/Gujarat)";
        } else if (lat > 28.0 && lon > 74.0 && lon < 80.0) {
            estimatedAnnualRainfallMm = 620;
            regionName = "Indo-Gangetic Basin (Punjab/Haryana/Western UP)";
        } else if (lat > 24.0 && lon >= 80.0) {
            estimatedAnnualRainfallMm = 1250;
            regionName = "Eastern Gangetic & Terai Belt (Bihar/Bengal)";
        } else if (lat < 16.0 && lon < 77.0) {
            estimatedAnnualRainfallMm = 2400;
            regionName = "Western Ghats & Coastal Belt (Kerala/Konkan)";
        } else if (lat < 21.0 && lon >= 75.0 && lon <= 80.0) {
            estimatedAnnualRainfallMm = 850;
            regionName = "Deccan Plateau Vertisol Belt (Maharashtra/Vidarbha)";
        }

        // 3. DETERMINE CURRENT ACTIVE INDIAN AGRICULTURAL SEASON
        const currentMonth = new Date().getMonth() + 1; // 1 to 12
        let currentIndianSeason: "Rabi (रबी)" | "Kharif (खरीफ)" | "Zaid (जायद)" = "Rabi (रबी)";
        let seasonDescription = "Rabi Season (रबी - Winter Sowing & Growth Window)";

        if (currentMonth >= 6 && currentMonth <= 10) {
            currentIndianSeason = "Kharif (खरीफ)";
            seasonDescription = "Kharif Season (खरीफ - Monsoon Season)";
        } else if (currentMonth >= 11 || currentMonth <= 3) {
            currentIndianSeason = "Rabi (रबी)";
            seasonDescription = "Rabi Season (रबी - Winter Sowing Window)";
        } else {
            currentIndianSeason = "Zaid (जायद)";
            seasonDescription = "Zaid Season (जायद - Summer Short-Duration Window)";
        }

        // 4. SCORE & RANK ALL CROPS, VEGETABLES & FRUITS
        const rankedCrops: Array<{
            cropKey: string;
            commonName: string;
            hindiName: string;
            category: "vegetables" | "fruits" | "cereals" | "pulses" | "oilseeds" | "cash" | "spices";
            suitabilityScore: number;
            indianSeason: string;
            bestSeason: string;
            rainfallMatchText: string;
            soilMatchText: string;
            whyExcels: string;
            waterDemandMm: number;
            isInSeason: boolean;
        }> = [];

        for (const [key, profile] of Object.entries(CROP_DATABASE)) {
            let score = 100;
            const reasons: string[] = [];

            // A. Season Match (Weight 30%)
            const isInSeason = profile.indianSeason.includes(currentIndianSeason) || profile.indianSeason.includes("Perennial");
            if (isInSeason) {
                score += 5;
                reasons.push(`In active ${currentIndianSeason} sowing calendar`);
            } else {
                score -= 18; // Substantial penalty for out of season sowing
            }

            // B. Photo-Derived Soil pH Fit (Weight 35%)
            const [minPh, maxPh] = profile.optimalPh;
            if (actualSoilPh < minPh) {
                const diff = minPh - actualSoilPh;
                score -= Math.min(38, diff * 26);
            } else if (actualSoilPh > maxPh) {
                const diff = actualSoilPh - maxPh;
                score -= Math.min(38, diff * 24);
            } else {
                score += 4;
                reasons.push(`Photo pH ${actualSoilPh} optimal (${minPh}-${maxPh})`);
            }

            // C. Texture & Clay Compaction Match (Weight 20%)
            if (actualClay > profile.maxClayPct) {
                score -= Math.min(25, (actualClay - profile.maxClayPct) * 1.6);
            } else {
                reasons.push(`Adapted to ${photoSoil.indianSoilClassification.split(" ")[0]}`);
            }
            if (profile.minClayPct && actualClay < profile.minClayPct) {
                score -= Math.min(25, (profile.minClayPct - actualClay) * 1.5);
            }

            // D. Rainfall Demand & Irrigation Match (Weight 15%)
            if (estimatedAnnualRainfallMm < profile.minAnnualRainfallMm) {
                const deficit = profile.minAnnualRainfallMm - estimatedAnnualRainfallMm;
                score -= Math.min(25, (deficit / profile.minAnnualRainfallMm) * 28 * (1.1 - profile.droughtTolerance * 0.4));
            }

            score = Math.max(12, Math.min(99, Math.round(score)));

            const rainfallMatch = estimatedAnnualRainfallMm >= profile.minAnnualRainfallMm && estimatedAnnualRainfallMm <= profile.maxAnnualRainfallMm
                ? `Optimal (${estimatedAnnualRainfallMm}mm/yr)`
                : estimatedAnnualRainfallMm < profile.minAnnualRainfallMm
                ? `Needs Irrigation (-${profile.minAnnualRainfallMm - estimatedAnnualRainfallMm}mm)`
                : `High Rainfall (${estimatedAnnualRainfallMm}mm)`;

            rankedCrops.push({
                cropKey: key,
                commonName: profile.commonName,
                hindiName: profile.hindiName,
                category: profile.category,
                suitabilityScore: score,
                indianSeason: profile.indianSeason,
                bestSeason: profile.bestSeason,
                rainfallMatchText: rainfallMatch,
                soilMatchText: `${actualTexture} (pH ${actualSoilPh})`,
                whyExcels: reasons.length > 0 ? reasons.join(" · ") : `Suitable for local climate`,
                waterDemandMm: profile.typicalWaterDemandMm,
                isInSeason,
            });
        }

        // Sort descending by suitability score
        rankedCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

        // Break down into dedicated categories requested by the user
        const topVegetables = rankedCrops.filter((c) => c.category === "vegetables").slice(0, 6);
        const topFruits = rankedCrops.filter((c) => c.category === "fruits").slice(0, 6);
        const topStaples = rankedCrops.filter((c) => c.category === "cereals" || c.category === "pulses" || c.category === "cash" || c.category === "oilseeds").slice(0, 6);
        const topRecommendedCrops = rankedCrops.slice(0, 6);

        // 5. EVALUATE TARGET CROP VIABILITY AGAINST PHOTO'S DERIVED PROPERTIES
        const normalizedHint = Object.keys(CROP_DATABASE).includes(cropHint.toLowerCase())
            ? cropHint.toLowerCase()
            : "wheat";
        const targetCrop = CROP_DATABASE[normalizedHint];
        const [optMinPh, optMaxPh] = targetCrop.optimalPh;

        const whyNoList: string[] = [];
        const whatToChangeList: string[] = [];

        // Check A: Soil pH Bottleneck
        let phViable = true;
        if (actualSoilPh < optMinPh) {
            phViable = false;
            const diff = (optMinPh - actualSoilPh).toFixed(1);
            whyNoList.push(
                `Soil pH is ${actualSoilPh} (Too Acidic for ${targetCrop.commonName}, which requires ${optMinPh} - ${optMaxPh} pH). In acidic soils, Aluminum and Iron toxicity stunts root development and locks up phosphorus into insoluble forms.`
            );
            whatToChangeList.push(
                `Apply Agricultural Lime (चूना / CaCO3) or Dolomite at ${Math.max(1.5, Math.round(Number(diff) * 2.2 * 10) / 10)} - 3.0 tonnes/hectare 4 weeks prior to planting, followed by deep rotavator tillage to neutralize soil acidity.`
            );
        } else if (actualSoilPh > optMaxPh) {
            phViable = false;
            whyNoList.push(
                `Soil pH is ${actualSoilPh} (Alkaline / Calcareous for ${targetCrop.commonName}, optimal is ${optMinPh} - ${optMaxPh} pH). High sodium and calcium carbonate causes lime-induced iron chlorosis (पीलापन) and renders zinc and micronutrients unavailable.`
            );
            whatToChangeList.push(
                `Apply Agricultural Gypsum (कृषि जिप्सम) at 1.5 - 2.5 tonnes/hectare or Elemental Sulfur (300 kg/ha) with abundant canal water flushing. Cultivate Dhaincha (ढैंचा - Sesbania) as green manure before crop sowing.`
            );
        }

        // Check B: Season Alignment
        const targetInSeason = targetCrop.indianSeason.includes(currentIndianSeason) || targetCrop.indianSeason.includes("Perennial");
        if (!targetInSeason) {
            whyNoList.push(
                `Seasonal Timing: Currently in ${currentIndianSeason}, whereas ${targetCrop.commonName} is recommended for ${targetCrop.bestSeason}. Off-season sowing risks high vegetative heat stress, poor flowering, or unseasonal rain damage.`
            );
            whatToChangeList.push(
                `Plan sowing during the optimal window: ${targetCrop.bestSeason}. If planting now, utilize protected cultivation, shade nets, or heat-tolerant certified hybrid varieties.`
            );
        }

        // Check C: Water Deficit
        let waterViable = true;
        const waterDeficit = targetCrop.minAnnualRainfallMm - estimatedAnnualRainfallMm;
        if (waterDeficit > 50) {
            waterViable = false;
            whyNoList.push(
                `Water Deficit: Local regional rainfall is ~${estimatedAnnualRainfallMm} mm, whereas ${targetCrop.commonName} requires a minimum of ${targetCrop.minAnnualRainfallMm} mm. Net water deficit: ~${waterDeficit} mm.`
            );
            whatToChangeList.push(
                `Deploy Drip Irrigation (टपक सिंचाई) or Tube-well / Canal irrigation to bridge the ${waterDeficit} mm deficit. Follow the critical stage irrigation schedule.`
            );
        }

        // Check D: Soil Texture & Clay Compaction
        if (actualClay > targetCrop.maxClayPct) {
            whyNoList.push(
                `Texture Compaction: Soil clay content is ${actualClay}% (${actualTexture}), exceeding ${targetCrop.commonName}'s limit of ${targetCrop.maxClayPct}%. Heavy clay impedes root aeration and water drainage.`
            );
            whatToChangeList.push(
                `Incorporate 15 - 20 tonnes/hectare of well-decomposed Farmyard Manure (FYM / गोबर खाद) or vermicompost to loosen clay matrix and improve aeration.`
            );
        }

        // Determine Viability Verdict
        let verdict: "VIABLE (YES)" | "CONDITIONALLY VIABLE" | "NOT VIABLE (NO)" = "VIABLE (YES)";
        let verdictColor = "emerald";
        let viabilityScore = 95;

        if (whyNoList.length === 0) {
            verdict = "VIABLE (YES)";
            verdictColor = "emerald";
            viabilityScore = 96;
        } else if (whyNoList.length === 1 && (phViable || targetInSeason)) {
            verdict = "CONDITIONALLY VIABLE";
            verdictColor = "amber";
            viabilityScore = 74;
        } else {
            verdict = "NOT VIABLE (NO)";
            verdictColor = "rose";
            viabilityScore = Math.max(25, 68 - whyNoList.length * 15);
        }

        // 6. RAINFALL FACTOR & WATER BALANCE TELEMETRY
        const rainfallFactor = {
            cropDemandMm: targetCrop.typicalWaterDemandMm,
            cropMinMm: targetCrop.minAnnualRainfallMm,
            cropMaxMm: targetCrop.maxAnnualRainfallMm,
            localAnnualMm: estimatedAnnualRainfallMm,
            local7DayForecastMm: precip7d,
            netWaterBalanceMm: estimatedAnnualRainfallMm - targetCrop.typicalWaterDemandMm,
            waterStatus: estimatedAnnualRainfallMm >= targetCrop.typicalWaterDemandMm
                ? "Optimal / Rainfed Sufficient (वर्षा आधारित पर्याप्त)"
                : estimatedAnnualRainfallMm >= targetCrop.minAnnualRainfallMm
                ? "Moderate Deficit (सिंचाई की आवश्यकता)"
                : "Severe Arid Deficit (नहर/ट्यूबवेल सिंचाई अनिवार्य)",
            topsoilMoistureVolPct: Math.round(soilMoisture * 100),
            seedbedMoistureVerdict: soilMoisture >= 0.22 && soilMoisture <= 0.38
                ? "Optimal Vapsa Moisture (ओत / वतर अनुकूल - बुवाई हेतु तैयार)"
                : soilMoisture < 0.22
                ? "Dry Seedbed (पलेवा / पूर्व-बुवाई सिंचाई आवश्यक)"
                : "Excess Wet / Saturated (2-3 दिन सूखने दें)",
            irrigationCyclesNeeded: waterDeficit > 0 ? Math.ceil(waterDeficit / 60) : 0,
        };

        // 7. PRECISION ACTION PLAN
        const precisionActionPlan = [
            {
                title: "Soil pH & Salinity Correction (मृदा सुधार)",
                category: "Chemical Remediation",
                detail: whatToChangeList.find(c => c.toLowerCase().includes("lime") || c.toLowerCase().includes("chuna") || c.toLowerCase().includes("gypsum") || c.toLowerCase().includes("sulfur")) ||
                    `Photo-derived soil pH (${actualSoilPh}) is in the optimal range (${optMinPh} - ${optMaxPh}) for ${targetCrop.commonName}. Continue applying balanced N-P-K (4:2:1) with Neem-coated Urea.`,
            },
            {
                title: "Monsoon & Irrigation Water Strategy (जल प्रबंधन)",
                category: "Water Strategy",
                detail: rainfallFactor.waterStatus.includes("Deficit")
                    ? `Bridge the ${Math.abs(rainfallFactor.netWaterBalanceMm)} mm deficit with ${rainfallFactor.irrigationCyclesNeeded} irrigation rounds at critical growth stages.`
                    : `Annual rainfall (${estimatedAnnualRainfallMm} mm) satisfies water needs. Construct perimeter drainage channels to evacuate excess storm water.`,
            },
            {
                title: "Organic Matter & Soil Tilth (जैविक पोषण)",
                category: "Agronomic Practice",
                detail: whatToChangeList.find(c => c.toLowerCase().includes("gobar") || c.toLowerCase().includes("fym")) ||
                    `Apply 10-15 tonnes/ha of well-rotted Farmyard Manure (FYM / गोबर खाद) or Vermicompost. Treat seeds with Trichoderma viride before sowing.`,
            },
        ];

        return NextResponse.json({
            success: true,
            analyzedAt: new Date().toISOString(),
            photoType,
            photoName,
            currentIndianSeason: seasonDescription,
            activeIndianSeasonName: currentIndianSeason,
            regionName,
            targetCrop: {
                key: targetCrop.key,
                commonName: targetCrop.commonName,
                hindiName: targetCrop.hindiName,
                scientificName: targetCrop.scientificName,
                category: targetCrop.category,
                family: targetCrop.family,
                indianSeason: targetCrop.indianSeason,
                maturityDays: targetCrop.maturityDays,
            },
            viabilityVerdict: {
                verdict,
                viabilityScore,
                verdictColor,
                bestSeason: targetCrop.bestSeason,
                seasonDetails: targetCrop.seasonDetails,
                currentSeasonMatch: targetInSeason
                    ? `Currently in Optimal ${currentIndianSeason} Sowing Window`
                    : `Next Best Sowing Window: ${targetCrop.bestSeason}`,
                whyNo: whyNoList,
                whatShouldBeChanged: whatToChangeList,
            },
            rainfallFactor,
            soilVisualDiagnosis: {
                indianSoilClassification: photoSoil.indianSoilClassification,
                detectedSoilType: photoSoil.detectedSoilType,
                soilColorMunsell: photoSoil.soilColorMunsell,
                structuralTilth: photoSoil.structuralTilth,
                visualOrganicMatterEst: photoSoil.visualOrganicMatterEst,
                surfaceCrustingRisk: photoSoil.surfaceCrustingRisk,
                drainageAeration: photoSoil.drainageAeration,
                phVerdictNote: photoSoil.phVerdictNote,
            },
            topRecommendedCrops,
            topVegetables,
            topFruits,
            topStaples,
            soilProfileSummary: {
                ph: actualSoilPh,
                textureClass: actualTexture,
                soc: actualSoc,
                clayPct: actualClay,
                sandPct: actualSand,
                cec: actualCec,
                optimalForTarget: actualSoilPh >= optMinPh && actualSoilPh <= optMaxPh,
            },
            precisionActionPlan,
        });
    } catch (err: unknown) {
        console.error("Analyze crop/soil error:", err);
        const error = err as Error;
        return NextResponse.json(
            { success: false, error: error.message || "Failed to execute AgroCloud agronomic intelligence engine." },
            { status: 500 }
        );
    }
}
