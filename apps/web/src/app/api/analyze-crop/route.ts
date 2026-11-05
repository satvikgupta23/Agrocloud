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
// 1. GEOSPATIAL INDIAN SOIL CLASSIFICATION & GPS PEDOLOGICAL ENGINE
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
    soilOrder: string;
    stateOrZone: string;
    nitrogenStatus: string;
    phosphorusStatus: string;
    potassiumStatus: string;
    salinityRisk: string;
}

/**
 * Derives comprehensive soil physical & chemical characteristics purely from
 * geographic GPS coordinates (latitude, longitude) without requiring any photo,
 * cross-referenced against India's national pedological survey & agro-ecological zones.
 * If live SoilGrids satellite telemetry is provided, it seamlessly blends empirical
 * sensor data with regional pedological orders.
 */
function deriveSoilFromCoordinates(
    lat: number,
    lon: number,
    soilData?: any
): DeducedSoilParameters {
    // Check if live SoilGrids telemetry was provided
    const measuredPh = typeof soilData?.surface?.ph === "number" ? soilData.surface.ph : null;
    const measuredClay = typeof soilData?.surface?.clayPct === "number" ? soilData.surface.clayPct : null;
    const measuredSand = typeof soilData?.surface?.sandPct === "number" ? soilData.surface.sandPct : null;
    const measuredSilt = typeof soilData?.surface?.siltPct === "number" ? soilData.surface.siltPct : null;
    const measuredSoc = typeof soilData?.surface?.soc === "number" ? soilData.surface.soc : null;
    const measuredCec = typeof soilData?.surface?.cec === "number" ? soilData.surface.cec : null;

    // ── 1. THAR DESERT & ARID BASIN (Rajasthan, North Gujarat Kutch, Haryana border)
    if (lon < 74.0 && lat >= 23.5 && lat <= 30.5) {
        const ph = measuredPh ?? 8.2;
        const clay = measuredClay ?? 8;
        const sand = measuredSand ?? 82;
        const silt = measuredSilt ?? 10;
        const soc = measuredSoc ?? 3.5;
        const cec = measuredCec ?? 6.5;

        return {
            indianSoilClassification: "Thar Desert Arid Sandy Soil (मरुस्थलीय बलुई मिट्टी)",
            detectedSoilType: "Coarse Arid Sand (Aridisol)",
            soilOrder: "Aridisols (Orthids / Argids)",
            stateOrZone: "Western Arid Desert Zone (Rajasthan / Thar Basin)",
            derivedPh: ph,
            soc,
            clayPct: clay,
            sandPct: sand,
            siltPct: silt,
            cec,
            soilColorMunsell: "Light Yellowish Brown (10YR 6/4)",
            structuralTilth: "Single Grain Loose Cohesionless Sand",
            visualOrganicMatterEst: "Very Low Humus (<0.35% SOC)",
            surfaceCrustingRisk: "Zero Crusting (Rapid Infiltration)",
            drainageAeration: "Excessive Drainage / Rapid Infiltration",
            nitrogenStatus: "Severely Deficient",
            phosphorusStatus: "Low to Moderate",
            potassiumStatus: "Moderate to Adequate",
            salinityRisk: "Moderate to High Salinity Hazard in lowlands",
            phVerdictNote: `GPS coordinates map to Thar Desert Arid Sandy Soil (pH ${ph}). Naturally alkaline with low organic carbon and rapid leaching. Highly adapted for Pearl Millet (Bajra), Mustard, Guar, Cumin, Ber, and Drip Watermelon.`,
        };
    }

    // ── 2. DECCAN BLACK VERTISOL BELT (Maharashtra, MP Malwa, Saurashtra, North Karnataka)
    if (
        (lat >= 16.5 && lat <= 24.5 && lon >= 72.5 && lon <= 80.5) ||
        (lat >= 21.0 && lat <= 23.5 && lon >= 70.0 && lon <= 73.0) // Saurashtra
    ) {
        const ph = measuredPh ?? 7.9;
        const clay = measuredClay ?? 52;
        const sand = measuredSand ?? 18;
        const silt = measuredSilt ?? 30;
        const soc = measuredSoc ?? 16.5;
        const cec = measuredCec ?? 42.0;

        return {
            indianSoilClassification: "Deccan Black Cotton Soil / Regur (काली कपासी मिट्टी)",
            detectedSoilType: "Heavy Montmorillonite Clay (Vertisol)",
            soilOrder: "Vertisols (Pellusterts / Chromusterts)",
            stateOrZone: "Deccan Trap Vertisol Belt (Maharashtra / Malwa / Vidarbha)",
            derivedPh: ph,
            soc,
            clayPct: clay,
            sandPct: sand,
            siltPct: silt,
            cec,
            soilColorMunsell: "Very Dark Brownish Black (10YR 2/2)",
            structuralTilth: "Deep-cracking Angular Blocky with Self-Mulching Churning",
            visualOrganicMatterEst: "Moderate to High Organic Matter (0.85% - 1.1% SOC)",
            surfaceCrustingRisk: "High Compaction & Crusting Risk when dried",
            drainageAeration: "Slow Subsoil Drainage / Immense Moisture Retention",
            nitrogenStatus: "Low to Medium",
            phosphorusStatus: "Low (Fixation with Calcium)",
            potassiumStatus: "High to Very High",
            salinityRisk: "Subsurface Salinity Risk in canal irrigated zones",
            phVerdictNote: `GPS coordinates pinpoint the Deccan Vertisol Basin (pH ${ph}). Characterized by high swell-shrink montmorillonite clay and exceptional moisture retention. World-class soil for Cotton, Soybean, Sugarcane, Sorghum, Chickpea, and Onion.`,
        };
    }

    // ── 3. WESTERN GHATS & COASTAL LATERITE (Kerala, Coastal Konkan, Goa, Coastal Karnataka)
    if (lat >= 8.4 && lat <= 15.5 && lon >= 74.5 && lon <= 77.2) {
        const ph = measuredPh ?? 5.1;
        const clay = measuredClay ?? 36;
        const sand = measuredSand ?? 44;
        const silt = measuredSilt ?? 20;
        const soc = measuredSoc ?? 14.0;
        const cec = measuredCec ?? 9.5;

        return {
            indianSoilClassification: "Acidic Coastal Laterite Soil (तटीय अम्लीय लैटेराइट मिट्टी)",
            detectedSoilType: "Gravelly Clay Loam (Ferric Laterite / Oxisol)",
            soilOrder: "Oxisols / Ultisols (Plinthustults / Haplorthox)",
            stateOrZone: "Western Ghats & Coastal Humid Belt (Kerala / Konkan)",
            derivedPh: ph,
            soc,
            clayPct: clay,
            sandPct: sand,
            siltPct: silt,
            cec,
            soilColorMunsell: "Brick Red Bauxitic (2.5YR 4/8)",
            structuralTilth: "Indurated Porous Cellular Honeycomb Structure",
            visualOrganicMatterEst: "Moderate Humus with High Weathering (0.75% SOC)",
            surfaceCrustingRisk: "Low Crusting / High Leaching Vulnerability",
            drainageAeration: "Rapid Leaching Drainage with Severe Base Depletion",
            nitrogenStatus: "Medium",
            phosphorusStatus: "Severely Fixed / Deficient (Locked by Fe/Al)",
            potassiumStatus: "Low (Heavy Monsoon Leaching)",
            salinityRisk: "Very Low (Acid Leached)",
            phVerdictNote: `GPS coordinates map to intensely leached Acidic Laterite Soil (pH ${ph}). Rich in iron and aluminum oxides with high phosphorus lockup. Apply Agricultural Lime (CaCO3) or Dolomite for field crops. Superb natural habitat for Spices, Rubber, Coconut, Pepper, Cashew, and Ginger.`,
        };
    }

    // ── 4. SOUTHERN PENINSULAR RED LOAM (Karnataka, Telangana, Andhra, Tamil Nadu)
    if (lat >= 10.5 && lat <= 17.5 && lon >= 75.5 && lon <= 80.5) {
        const ph = measuredPh ?? 5.8;
        const clay = measuredClay ?? 26;
        const sand = measuredSand ?? 54;
        const silt = measuredSilt ?? 20;
        const soc = measuredSoc ?? 8.5;
        const cec = measuredCec ?? 14.0;

        return {
            indianSoilClassification: "Peninsular Red Loamy Soil (लाल दोमट मिट्टी)",
            detectedSoilType: "Red Sandy Clay Loam (Alfisol)",
            soilOrder: "Alfisols / Inceptisols (Rhodustalfs / Haplustalfs)",
            stateOrZone: "Southern Peninsular Plateau (Karnataka / Rayalaseema / Telangana)",
            derivedPh: ph,
            soc,
            clayPct: clay,
            sandPct: sand,
            siltPct: silt,
            cec,
            soilColorMunsell: "Yellowish Red to Reddish Brown (5YR 4/6)",
            structuralTilth: "Porous Subangular Blocky, Friable",
            visualOrganicMatterEst: "Moderate Organic Matter (0.45% - 0.65% SOC)",
            surfaceCrustingRisk: "Low to Moderate Crusting",
            drainageAeration: "Well-Drained with Good Root Aeration",
            nitrogenStatus: "Low",
            phosphorusStatus: "Low to Medium",
            potassiumStatus: "Medium to High",
            salinityRisk: "Low",
            phVerdictNote: `GPS coordinates detect Peninsular Red Loamy Soil (pH ${ph}). Mildly acidic with good physical permeability and responsive fertility. Excellent for Groundnut, Maize, Ragi (Finger Millet), Pulses, Tomato, Pomegranate, and Guava.`,
        };
    }

    // ── 5. NORTH ALLUVIAL PLAINS (Punjab, Haryana, Delhi, Western UP)
    if (lat >= 28.0 && lat <= 32.5 && lon >= 73.8 && lon <= 78.5) {
        const ph = measuredPh ?? 7.2;
        const clay = measuredClay ?? 22;
        const sand = measuredSand ?? 44;
        const silt = measuredSilt ?? 34;
        const soc = measuredSoc ?? 12.5;
        const cec = measuredCec ?? 18.5;

        return {
            indianSoilClassification: "Indo-Gangetic Alluvial Silt Loam (उत्तर भारत जलोढ़ दोमट)",
            detectedSoilType: "Fertile Silt Loam (Inceptisol / Entisol)",
            soilOrder: "Inceptisols / Entisols (Ustochrepts / Ustifluents)",
            stateOrZone: "Indo-Gangetic Basin (Punjab / Haryana / Western UP)",
            derivedPh: ph,
            soc,
            clayPct: clay,
            sandPct: sand,
            siltPct: silt,
            cec,
            soilColorMunsell: "Greyish Brown Alluvial Tan (10YR 5/3)",
            structuralTilth: "Granular Subangular Blocky (Superb Seedbed)",
            visualOrganicMatterEst: "Adequate Organic Carbon (0.65% - 0.85% SOC)",
            surfaceCrustingRisk: "Low to Moderate Crusting after heavy flood irrigation",
            drainageAeration: "Well-Drained with Balanced Capillary Moisture",
            nitrogenStatus: "Low to Medium (Requires split urea doses)",
            phosphorusStatus: "Medium",
            potassiumStatus: "Adequate to High",
            salinityRisk: "Low (Local sodicity risk in canal seepages)",
            phVerdictNote: `GPS coordinates pinpoint prime Indo-Gangetic Alluvial Silt Loam (pH ${ph}). Neutral, friable, with high base saturation and excellent capillary dynamics. Outstanding for Wheat, Mustard, Paddy, Potato, Cauliflower, Peas, Onion, and Sugarcane.`,
        };
    }

    // ── 6. GANGETIC PLAINS & TERAI (Central/Eastern UP, Bihar)
    if (lat >= 24.5 && lat <= 28.5 && lon > 78.5 && lon <= 86.5) {
        const isTerai = lat >= 26.5 && lat <= 28.5 && lon >= 79.5;
        const ph = measuredPh ?? (isTerai ? 6.5 : 7.0);
        const clay = measuredClay ?? (isTerai ? 34 : 26);
        const sand = measuredSand ?? (isTerai ? 26 : 34);
        const silt = measuredSilt ?? 40;
        const soc = measuredSoc ?? (isTerai ? 22.0 : 14.0);
        const cec = measuredCec ?? (isTerai ? 28.0 : 20.0);

        return {
            indianSoilClassification: isTerai
                ? "Sub-Himalayan Terai Wetland Loam (तराई नम जैव दोमट)"
                : "Deep Gangetic Alluvial Loam (गंगा मैदान जलोढ़ दोमट)",
            detectedSoilType: isTerai ? "Silty Clay Loam (Mollisol)" : "Fertile Loam (Inceptisol)",
            soilOrder: isTerai ? "Mollisols (Hapludolls)" : "Inceptisols (Eutrochrepts)",
            stateOrZone: isTerai ? "Sub-Himalayan Foothills (Terai Belt)" : "Middle Gangetic Basin (UP / Bihar)",
            derivedPh: ph,
            soc,
            clayPct: clay,
            sandPct: sand,
            siltPct: silt,
            cec,
            soilColorMunsell: isTerai ? "Dark Brown Wetland Humus (10YR 3/3)" : "Dark Yellowish Brown (10YR 4/3)",
            structuralTilth: isTerai ? "Spongy Friable Crumb with High Biological Activity" : "Friable Granular Crumb",
            visualOrganicMatterEst: isTerai ? "Very High Humus (>1.25% SOC)" : "Good Organic Matter (0.75% SOC)",
            surfaceCrustingRisk: "Low Crusting Risk",
            drainageAeration: isTerai ? "High Water Table / Moist Subsoil" : "Balanced Infiltration",
            nitrogenStatus: isTerai ? "Medium to High" : "Low to Medium",
            phosphorusStatus: "Medium",
            potassiumStatus: "Adequate",
            salinityRisk: "Very Low",
            phVerdictNote: isTerai
                ? `GPS coordinates place this field in the Sub-Himalayan Terai wetland belt (pH ${ph}) with deep organic humus. Superb for Sugarcane, Paddy, Maize, and Potato.`
                : `GPS coordinates detect deep Gangetic Alluvial Loam (pH ${ph}). Fertile with high moisture holding capacity. Ideal for Rice, Wheat, Vegetables, Pulses, and Mustard.`,
        };
    }

    // ── 7. BENGAL DELTA & NORTHEAST (West Bengal, Assam, Odisha Coast)
    if (lat >= 20.5 && lat <= 27.5 && lon > 86.5 && lon <= 96.0) {
        const ph = measuredPh ?? 6.2;
        const clay = measuredClay ?? 32;
        const sand = measuredSand ?? 28;
        const silt = measuredSilt ?? 40;
        const soc = measuredSoc ?? 18.0;
        const cec = measuredCec ?? 24.0;

        return {
            indianSoilClassification: "Deltaic Alluvium & Acidic Floodplain Loam (डेल्टाई जलोढ़ मिट्टी)",
            detectedSoilType: "Clayey Silt Loam (Entisol / Inceptisol)",
            soilOrder: "Entisols / Inceptisols (Fluvaquents / Endoaquepts)",
            stateOrZone: "Lower Gangetic Delta & Brahmaputra Valley (Bengal / Assam)",
            derivedPh: ph,
            soc,
            clayPct: clay,
            sandPct: sand,
            siltPct: silt,
            cec,
            soilColorMunsell: "Dark Greyish Brown Deltaic (10YR 4/2)",
            structuralTilth: "Moist Compact Silty Loam",
            visualOrganicMatterEst: "High Organic Matter (0.95% - 1.2% SOC)",
            surfaceCrustingRisk: "Low Crusting / High Saturation Tendency",
            drainageAeration: "Slow Subsoil Drainage / High Water Table",
            nitrogenStatus: "Medium",
            phosphorusStatus: "Low to Moderate (Mild Acid Fixation)",
            potassiumStatus: "Medium",
            salinityRisk: lat < 22.5 ? "Moderate Coastal Salinity Risk" : "Low",
            phVerdictNote: `GPS coordinates map to fertile Lower Gangetic Deltaic Soil (pH ${ph}). High organic matter and fine clay-silt matrix. Excellent for Paddy / Rice, Jute, Mustard, Vegetables, Banana, and Mango.`,
        };
    }

    // ── 8. GLOBAL / NATIONAL DEFAULT (Empirical telemetry integration)
    const ph = measuredPh ?? 6.8;
    const clay = measuredClay ?? 25;
    const sand = measuredSand ?? 45;
    const silt = measuredSilt ?? 30;
    const soc = measuredSoc ?? 14.0;
    const cec = measuredCec ?? 19.0;

    return {
        indianSoilClassification: "Agricultural Loam Soil (कृषि दोमट मिट्टी)",
        detectedSoilType: "Balanced Agricultural Loam",
        soilOrder: "Inceptisols",
        stateOrZone: "Regional Agricultural Zone",
        derivedPh: ph,
        soc,
        clayPct: clay,
        sandPct: sand,
        siltPct: silt,
        cec,
        soilColorMunsell: "Brownish Tan (10YR 5/3)",
        structuralTilth: "Granular Friable Crumb",
        visualOrganicMatterEst: "Balanced Organic Matter (0.75% SOC)",
        surfaceCrustingRisk: "Low to Moderate",
        drainageAeration: "Well-Drained Aerated Root Zone",
        nitrogenStatus: "Medium",
        phosphorusStatus: "Medium",
        potassiumStatus: "Adequate",
        salinityRisk: "Low",
        phVerdictNote: `GPS coordinates derive a fertile, balanced agricultural loam (pH ${ph}). Highly versatile for diversified crop production.`,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CROP HEALTH & DISEASE DIAGNOSTIC ENGINE (USER-UPLOADED CROP PHOTO)
// ─────────────────────────────────────────────────────────────────────────────

interface DiseaseDiagnosis {
    id: string;
    name: string;
    hindiName: string;
    pathogen: string;
    pathogenType: "Fungal" | "Bacterial" | "Viral" | "Pest Infestation" | "Nutrient Deficiency" | "None (Healthy Foliage)";
    severity: "None" | "Low (10-25%)" | "Moderate (25-50%)" | "Severe (>50%)";
    confidence: number;
    symptomsObserved: string[];
    pathologyNotes: string;
    secondaryStress?: string;
    fastActingChemicals: Array<{
        activeIngredient: string;
        commercialBrand: string;
        dosagePerLiter: string;
        applicationMethod: string;
    }>;
    organicBioRemedies: Array<{
        name: string;
        type: string;
        dosagePerLiter: string;
        preparationNotes: string;
    }>;
    preventativePractices: Array<{
        title: string;
        description: string;
    }>;
}

interface CropHealthAnalysisResult {
    hasCropPhoto: boolean;
    cropName: string;
    hindiName: string;
    scientificName: string;
    overallHealthScore: number;
    healthStatus: "Healthy" | "Mild Stress" | "Moderate Disease" | "Severe Infection";
    healthStatusColor: string;
    primaryDisease: DiseaseDiagnosis;
    secondaryStress: string;
    weatherAttribution: string;
    fastActingChemicals: DiseaseDiagnosis["fastActingChemicals"];
    organicBioRemedies: DiseaseDiagnosis["organicBioRemedies"];
    preventativePractices: DiseaseDiagnosis["preventativePractices"];
    visualMetrics: {
        greenCanopyPct: number;
        chlorosisPct: number;
        necrosisPct: number;
        lesionDensity: string;
    };
}

/**
 * Plant pathology knowledge base for 12 major crop systems and general foliage
 */
const CROP_PATHOLOGY_DATABASE: Record<string, DiseaseDiagnosis[]> = {
    tomato: [
        {
            id: "tomato_early_blight",
            name: "Early Blight",
            hindiName: "अगेती झुलसा रोग",
            pathogen: "Alternaria solani",
            pathogenType: "Fungal",
            severity: "Moderate (25-50%)",
            confidence: 94,
            symptomsObserved: [
                "Concentric dark brown target rings on older mature leaves",
                "Prominent chlorotic yellow halos surrounding necrotic spots",
                "Progressive defoliation advancing from lower to upper canopy"
            ],
            pathologyNotes: "Alternaria solani conidia overwinter in soil residue and germinate when free moisture persists for >2 hours at 24-29°C. Spores splash upward from soil during rain or overhead irrigation.",
            fastActingChemicals: [
                { activeIngredient: "Mancozeb 75% WP", commercialBrand: "Dithane M-45 / Indofil M-45", dosagePerLiter: "2.5 g / Liter water", applicationMethod: "Foliar spray covering upper and lower leaf surfaces" },
                { activeIngredient: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC", commercialBrand: "Amistar Top", dosagePerLiter: "1.0 ml / Liter water", applicationMethod: "Curative systemic spray at 12-day intervals" },
                { activeIngredient: "Chlorothalonil 75% WP", commercialBrand: "Kavach", dosagePerLiter: "2.0 g / Liter water", applicationMethod: "Preventative protective barrier spray" }
            ],
            organicBioRemedies: [
                { name: "Trichoderma viride / harzianum", type: "Bio-fungicide", dosagePerLiter: "5.0 g / Liter water", preparationNotes: "Apply in evening with 2% jaggery solution to stimulate fungal colonization" },
                { name: "Neem Seed Kernel Extract (NSKE 5%) or 10,000 ppm Azadirachtin", type: "Botanical Extract", dosagePerLiter: "3.0 ml / Liter water", preparationNotes: "Disrupts spore germination and repels chewing insects" }
            ],
            preventativePractices: [
                { title: "Prune Lower Canopy Leaves", description: "Strip all leaves within 10-12 inches of the soil bed to stop splash infection." },
                { title: "Switch to Drip Fertigation", description: "Eliminate overhead furrow/sprinkler wetting that keeps foliage wet overnight." },
                { title: "Apply Organic Mulch", description: "Lay straw or silver-black plastic mulch over beds to create a physical spore barrier." }
            ]
        },
        {
            id: "tomato_leaf_curl",
            name: "Tomato Leaf Curl Virus (ToLCV)",
            hindiName: "पत्ती मरोड़ विषाणु रोग",
            pathogen: "Begomovirus (Geminiviridae)",
            pathogenType: "Viral",
            severity: "Severe (>50%)",
            confidence: 92,
            symptomsObserved: [
                "Upward curling, puckering and crinkling of leaf margins",
                "Thickened, leathery leaf lamina with prominent vein purpling",
                "Severe stunting of internodes with complete blossom drop"
            ],
            pathologyNotes: "Vectored exclusively by the Silverleaf Whitefly (Bemisia tabaci). The virus replicates systemically in the phloem and causes permanent vascular deformities.",
            fastActingChemicals: [
                { activeIngredient: "Thiamethoxam 25% WG", commercialBrand: "Actara", dosagePerLiter: "0.35 g / Liter water", applicationMethod: "Systemic foliar spray to eradicate whitefly vectors" },
                { activeIngredient: "Imidacloprid 17.8% SL", commercialBrand: "Confidor", dosagePerLiter: "0.5 ml / Liter water", applicationMethod: "Spray early morning targeting leaf undersides" },
                { activeIngredient: "Diafenthiuron 50% WP", commercialBrand: "Pegasus", dosagePerLiter: "1.2 g / Liter water", applicationMethod: "Knockdown spray for adult whitefly swarms" }
            ],
            organicBioRemedies: [
                { name: "Verticillium lecanii (Lecanicillium lecanii)", type: "Entomopathogenic Fungus", dosagePerLiter: "5.0 g / Liter water", preparationNotes: "Target whitefly nymphs in high humidity conditions" },
                { name: "Yellow Sticky Traps (25 traps/acre)", type: "Physical Vector Trapping", dosagePerLiter: "Placed at canopy height", preparationNotes: "Intercepts migrating adult whiteflies before feeding" }
            ],
            preventativePractices: [
                { title: "Install 40-Mesh Insect Netting", description: "Protect nursery beds with 40-mesh nylon nets to guarantee virus-free seedlings." },
                { title: "Border Cropping with Maize/Sorghum", description: "Plant 2-3 dense barrier rows of maize or bajra around tomato perimeter to block whiteflies." }
            ]
        },
        {
            id: "tomato_healthy",
            name: "Healthy Vibrant Tomato Foliage",
            hindiName: "स्वस्थ टमाटर की फसल",
            pathogen: "None (Healthy)",
            pathogenType: "None (Healthy Foliage)",
            severity: "None",
            confidence: 98,
            symptomsObserved: [
                "Uniform rich chlorophyll pigmentation across entire lamina",
                "Turgid erect leaf petioles with strong vascular expansion",
                "Zero fungal necrotic lesions, pustules, or virus mottling"
            ],
            pathologyNotes: "Crop shows peak photosynthetic efficiency and balanced nitrogen-to-potassium nutrition. Cellular membranes and stomatal conductance are optimal.",
            fastActingChemicals: [],
            organicBioRemedies: [
                { name: "Seaweed Extract / Humic Acid", type: "Bio-stimulant", dosagePerLiter: "2.0 ml / Liter water", preparationNotes: "Maintain robust root cation exchange" }
            ],
            preventativePractices: [
                { title: "Maintain Balanced NPK Fertigation", description: "Feed NPK 19:19:19 alternating with Calcium Nitrate and Boron." },
                { title: "Weekly Preventive Scouting", description: "Inspect lower foliage weekly for first signs of fungal spots." }
            ]
        }
    ],
    wheat: [
        {
            id: "wheat_stripe_rust",
            name: "Yellow / Stripe Rust",
            hindiName: "पीला रतुआ रोग",
            pathogen: "Puccinia striiformis f. sp. tritici",
            pathogenType: "Fungal",
            severity: "Severe (>50%)",
            confidence: 96,
            symptomsObserved: [
                "Bright lemon-yellow powdery urediniospores arranged in long linear stripes",
                "Parallel necrotic lesions between leaf veins on flag and upper leaves",
                "Severe reduction in photosynthetic leaf area leading to shriveled grain"
            ],
            pathologyNotes: "Puccinia striiformis thrives in cool, humid winter climates (10-15°C with night dew). Spores travel hundreds of kilometers on northwest winds from the Himalayan foothills.",
            fastActingChemicals: [
                { activeIngredient: "Propiconazole 25% EC", commercialBrand: "Tilt / Banner", dosagePerLiter: "1.0 ml / Liter water", applicationMethod: "Apply immediately upon first appearance of yellow stripes; repeat in 14 days" },
                { activeIngredient: "Tebuconazole 25.9% EC", commercialBrand: "Folicur", dosagePerLiter: "1.25 ml / Liter water", applicationMethod: "High-efficacy systemic triazole spray covering flag leaf" }
            ],
            organicBioRemedies: [
                { name: "Pseudomonas fluorescens (1% WP)", type: "Bio-control Agent", dosagePerLiter: "5.0 g / Liter water", preparationNotes: "Foliar spray to induce systemic resistance (SAR)" }
            ],
            preventativePractices: [
                { title: "Cultivate Resistant Cultivars", description: "Sow certified rust-resistant wheat varieties such as DBW 187, DBW 222, or HD 3226." },
                { title: "Avoid Excess Nitrogen", description: "Over-application of urea produces succulent foliage highly prone to rust colonization." }
            ]
        },
        {
            id: "wheat_healthy",
            name: "Healthy Vibrant Wheat Tillers",
            hindiName: "स्वस्थ गेहूं की फसल",
            pathogen: "None (Healthy)",
            pathogenType: "None (Healthy Foliage)",
            severity: "None",
            confidence: 97,
            symptomsObserved: [
                "Deep emerald green erect leaves with unblemished flag leaf",
                "Vigorous tillering with strong crown root development",
                "Zero pustules, leaf blotches, or nutrient chlorosis"
            ],
            pathologyNotes: "Tillers exhibit optimal chlorophyll content and cell wall lignification. Excellent GDD accumulation and water balance.",
            fastActingChemicals: [],
            organicBioRemedies: [],
            preventativePractices: [
                { title: "Timely Irrigation at Crown Root Initiation", description: "Provide CRI stage irrigation at 21 days after sowing." }
            ]
        }
    ],
    rice: [
        {
            id: "rice_blast",
            name: "Rice Blast (Leaf & Neck Blast)",
            hindiName: "धान का झोंका रोग (ब्लास्ट)",
            pathogen: "Magnaporthe oryzae (Pyricularia oryzae)",
            pathogenType: "Fungal",
            severity: "Severe (>50%)",
            confidence: 95,
            symptomsObserved: [
                "Eye-shaped or spindle-shaped elliptical lesions with grey/whitish centers",
                "Dark reddish-brown to purplish necrotic margins around lesions",
                "Coalescing spots causing entire leaf blades to wither and dry"
            ],
            pathologyNotes: "Magnaporthe oryzae appressoria penetrate host cuticles when leaf surfaces remain wet for >8 hours at 20-25°C. Excessive chemical nitrogen fertilizers dramatically increase vulnerability.",
            fastActingChemicals: [
                { activeIngredient: "Tricyclazole 75% WP", commercialBrand: "Beam / Baan", dosagePerLiter: "0.6 g / Liter water", applicationMethod: "Highly specific systemic blast fungicide applied at early tillering or panicle emergence" },
                { activeIngredient: "Isoprothiolane 40% EC", commercialBrand: "Fuji-one", dosagePerLiter: "1.5 ml / Liter water", applicationMethod: "Curative and protective foliar spray" },
                { activeIngredient: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC", commercialBrand: "Amistar Top", dosagePerLiter: "1.0 ml / Liter water", applicationMethod: "Broad-spectrum blast and sheath blight control" }
            ],
            organicBioRemedies: [
                { name: "Pseudomonas fluorescens (Pf-1 strain)", type: "Antagonistic Rhizobacteria", dosagePerLiter: "5.0 g / Liter water", preparationNotes: "Seed treatment + nursery spray + main field foliar application" },
                { name: "Neem Oil 10,000 ppm", type: "Botanical", dosagePerLiter: "3.0 ml / Liter water", preparationNotes: "Suppresses conidial sporulation" }
            ],
            preventativePractices: [
                { title: "Split Nitrogen Applications", description: "Divide urea into 3-4 split applications rather than large basal doses." },
                { title: "Drain Stagnant Water", description: "Perform alternate wetting and drying (AWD) rather than continuous deep flooding." }
            ]
        },
        {
            id: "rice_bacterial_blight",
            name: "Bacterial Leaf Blight (BLB)",
            hindiName: "जीवाणु पत्ती झुलसा",
            pathogen: "Xanthomonas oryzae pv. oryzae",
            pathogenType: "Bacterial",
            severity: "Moderate (25-50%)",
            confidence: 93,
            symptomsObserved: [
                "Water-soaked translucent stripes starting from leaf margins near the tip",
                "Wavy, undulating margins turning straw-yellow and bleaching white",
                "Bacterial milky exudate beads visible on young lesions in morning dew"
            ],
            pathologyNotes: "Xanthomonas enters through hydathodes or wounds caused by wind friction during monsoon storms. Spread rapidly in flooded paddies with temperatures >28°C.",
            fastActingChemicals: [
                { activeIngredient: "Copper Oxychloride 50% WP + Streptocycline", commercialBrand: "Blitox 50 + Streptocycline", dosagePerLiter: "2.5 g + 0.1 g (100 ppm) / Liter water", applicationMethod: "Bactericidal foliar spray; repeat after 10 days if rainy conditions persist" }
            ],
            organicBioRemedies: [
                { name: "Cow Urine (Gomutra) + Asafoetida (Hing) Spray", type: "Traditional Bio-formulation", dosagePerLiter: "100 ml gomutra + 1 g hing / Liter water", preparationNotes: "Ferment for 48 hours and strain before spraying" }
            ],
            preventativePractices: [
                { title: "Avoid Excess Nitrogen", description: "Withhold urea top-dressing as soon as bacterial lesions appear." },
                { title: "Ensure Field Drainage", description: "Drain excess floodwater to halt horizontal bacterial swimming." }
            ]
        },
        {
            id: "rice_healthy",
            name: "Healthy Vibrant Paddy Crop",
            hindiName: "स्वस्थ धान की फसल",
            pathogen: "None (Healthy)",
            pathogenType: "None (Healthy Foliage)",
            severity: "None",
            confidence: 98,
            symptomsObserved: [
                "Lush uniform green canopy with vigorous tillering",
                "Clean erect leaf sheaths without water-soaked lesions",
                "Strong root system with healthy white feeding rootlets"
            ],
            pathologyNotes: "Photosynthetic machinery and root nutrient uptake are functioning with peak efficiency.",
            fastActingChemicals: [],
            organicBioRemedies: [],
            preventativePractices: [
                { title: "Maintain Alternate Wetting & Drying (AWD)", description: "Allow water to drop 15cm below soil surface before re-flooding." }
            ]
        }
    ],
    cotton: [
        {
            id: "cotton_leaf_curl",
            name: "Cotton Leaf Curl Virus (CLCuV)",
            hindiName: "कपास पत्ती मरोड़ रोग",
            pathogen: "Cotton Leaf Curl Virus (Begomovirus)",
            pathogenType: "Viral",
            severity: "Severe (>50%)",
            confidence: 94,
            symptomsObserved: [
                "Upward or downward cup-shaped curling of leaf lamina",
                "Thickening and swelling of main and secondary leaf veins",
                "Cup-shaped leaf-like enation outgrowths on the underside of leaves"
            ],
            pathologyNotes: "Vectored by Bemisia tabaci whiteflies. Replicates systemically causing enations and severe square/boll shedding.",
            fastActingChemicals: [
                { activeIngredient: "Spiromesifen 22.9% SC", commercialBrand: "Oberon", dosagePerLiter: "1.0 ml / Liter water", applicationMethod: "Controls whitefly nymphs and prevents vector multiplication" },
                { activeIngredient: "Flonicamid 50% WG", commercialBrand: "Ulala", dosagePerLiter: "0.4 g / Liter water", applicationMethod: "Selective systemic insecticide causing immediate cessation of whitefly sap-sucking" }
            ],
            organicBioRemedies: [
                { name: "Neem Oil 10,000 ppm", type: "Botanical", dosagePerLiter: "3.5 ml / Liter water", preparationNotes: "Repels whiteflies and disrupts oviposition" }
            ],
            preventativePractices: [
                { title: "Eradicate Weed Hosts", description: "Destroy Kanghi Buti (Abutilon indicum) and Peeli Buti around field bunds." }
            ]
        },
        {
            id: "cotton_healthy",
            name: "Healthy Vibrant Cotton Canopy",
            hindiName: "स्वस्थ कपास की फसल",
            pathogen: "None (Healthy)",
            pathogenType: "None (Healthy Foliage)",
            severity: "None",
            confidence: 97,
            symptomsObserved: [
                "Broad dark green lobed leaves with strong vigor",
                "Zero vein swelling or enations",
                "Active sympodial branch development with healthy squares"
            ],
            pathologyNotes: "Vascular transport and transpiration are optimal.",
            fastActingChemicals: [],
            organicBioRemedies: [],
            preventativePractices: []
        }
    ],
    mustard: [
        {
            id: "mustard_white_rust",
            name: "White Rust / Blister & Staghead",
            hindiName: "सरसों का सफेद रतुआ रोग",
            pathogen: "Albugo candida",
            pathogenType: "Fungal",
            severity: "Severe (>50%)",
            confidence: 96,
            symptomsObserved: [
                "Chalky white or cream-colored raised blister-like pustules on leaf undersides",
                "Chlorotic yellow patches corresponding to pustules on upper surface",
                "Floral malformation, swelling and green hypertrophied 'staghead' inflorescence"
            ],
            pathologyNotes: "Oospores survive in soil and crop debris. Disease explodes when night temperatures fall to 12-15°C with heavy winter fog and relative humidity >85%.",
            fastActingChemicals: [
                { activeIngredient: "Metalaxyl 8% + Mancozeb 64% WP", commercialBrand: "Ridomil Gold MZ", dosagePerLiter: "2.0 g / Liter water", applicationMethod: "Systemic translaminar spray applied at 15-day intervals" }
            ],
            organicBioRemedies: [
                { name: "Trichoderma viride + Wood Ash Dusting", type: "Bio-fungicide + Mineral", dosagePerLiter: "5.0 g / Liter water", preparationNotes: "Dust dry cow dung ash on damp foliage in early morning" }
            ],
            preventativePractices: [
                { title: "Early Sowing in October", description: "Complete mustard sowing between Oct 1-20 to escape peak December white rust." }
            ]
        },
        {
            id: "mustard_healthy",
            name: "Healthy Vibrant Mustard Crop",
            hindiName: "स्वस्थ सरसों की फसल",
            pathogen: "None (Healthy)",
            pathogenType: "None (Healthy Foliage)",
            severity: "None",
            confidence: 98,
            symptomsObserved: [
                "Smooth deep green leaves with strong silique formation",
                "Zero white blister pustules or staghead floral distortions"
            ],
            pathologyNotes: "Optimal plant nutrition and glucosinolate balance.",
            fastActingChemicals: [],
            organicBioRemedies: [],
            preventativePractices: []
        }
    ]
};

/**
 * Universal plant pathology diagnosis engine for ANY uploaded crop photo
 */
function diagnoseCropHealthAndDisease(
    cropHint: string,
    imageAnalysis: ImageAnalysisInput | null | undefined,
    photoName: string,
    weatherData: any,
    soilParameters: DeducedSoilParameters
): CropHealthAnalysisResult {
    const normCrop = cropHint.toLowerCase().trim();
    const photoLower = (photoName || "").toLowerCase();

    // 1. EXTRACT COMPUTER VISION CANOPY METRICS
    let greenCanopyPct = 78;
    let chlorosisPct = 12;
    let necrosisPct = 8;
    let lesionDensity = "Sparse";

    if (imageAnalysis && typeof imageAnalysis.hue === "number") {
        const { hue, saturation, brightness, avgG, avgR, avgB } = imageAnalysis;

        // In leaf images:
        // Hue 75°-150° = Green healthy chlorophyll
        // Hue 38°-74° = Yellow chlorosis (stress/virus/deficiency)
        // Hue 10°-37° = Brown necrosis / blight / rust pustules
        // Low brightness (<0.25) or high variance = dark necrotic spots

        const greenDominance = Math.max(0, avgG - Math.max(avgR, avgB)) / 255;
        const yellowDominance = Math.max(0, (avgR + avgG) / 2 - avgB) / 255;
        const brownDominance = Math.max(0, avgR - avgG) / 255;

        greenCanopyPct = Math.round(Math.max(15, Math.min(96, (greenDominance * 120 + (hue >= 75 && hue <= 150 ? 55 : 20)))));
        chlorosisPct = Math.round(Math.max(4, Math.min(65, (yellowDominance * 80 + (hue >= 40 && hue <= 74 ? 40 : 10)))));
        necrosisPct = Math.round(Math.max(2, Math.min(75, (brownDominance * 90 + (brightness < 0.35 ? 35 : 5)))));

        if (necrosisPct > 35) lesionDensity = "Severe Foliar Necrosis / Blight Coalescence";
        else if (necrosisPct > 18) lesionDensity = "Coalescing Necrotic Spots";
        else if (chlorosisPct > 28) lesionDensity = "Diffuse Chlorotic Mottling / Yellowing";
        else lesionDensity = "Sparse / Micro-lesions Only";
    }

    // 2. CORRELATE LIVE WEATHER & SOIL MICROCLIMATE TELEMETRY
    const tempC = weatherData?.current?.temperature ?? 24.0;
    const humidity = weatherData?.current?.humidity ?? 65;
    const precip7d = weatherData?.agronomy?.totalPrecip7Days ?? 0.0;
    const soilMoisture = weatherData?.current?.soilMoisture0_1cm ?? 0.28;

    let weatherAttribution = `Ambient temperature (${tempC}°C) and relative humidity (${humidity}%) with surface soil moisture at ${Math.round(soilMoisture * 100)}% vol.`;
    if (humidity >= 75 && tempC >= 20 && tempC <= 30) {
        weatherAttribution += ` High humidity (>75%) coupled with warm temperatures (${tempC}°C) creates ideal micro-climatic incubation conditions for fungal spore germination (conidia formation within 4-8 hours).`;
    } else if (humidity < 45 && tempC > 32) {
        weatherAttribution += ` Low atmospheric humidity and intense solar radiation create acute transpiration stress, worsening marginal leaf scorch and insect mite proliferation.`;
    } else {
        weatherAttribution += ` Moderate environmental conditions currently provide a balanced incubation window.`;
    }

    // 3. LOOKUP DISEASE FROM CROPS KNOWLEDGE BASE
    const cropKey = Object.keys(CROP_PATHOLOGY_DATABASE).includes(normCrop)
        ? normCrop
        : photoLower.includes("tomato")
        ? "tomato"
        : photoLower.includes("wheat")
        ? "wheat"
        : photoLower.includes("paddy") || photoLower.includes("rice")
        ? "rice"
        : photoLower.includes("cotton")
        ? "cotton"
        : photoLower.includes("mustard")
        ? "mustard"
        : "universal";

    let selectedDisease: DiseaseDiagnosis | null = null;

    if (cropKey !== "universal" && CROP_PATHOLOGY_DATABASE[cropKey]) {
        const diseases = CROP_PATHOLOGY_DATABASE[cropKey];
        // Match by filename hints or visual indicators
        if (photoLower.includes("blight") || photoLower.includes("early")) {
            selectedDisease = diseases.find(d => d.id.includes("early") || d.id.includes("blight")) || diseases[0];
        } else if (photoLower.includes("curl") || photoLower.includes("virus")) {
            selectedDisease = diseases.find(d => d.id.includes("curl") || d.id.includes("virus")) || diseases[0];
        } else if (photoLower.includes("rust")) {
            selectedDisease = diseases.find(d => d.id.includes("rust")) || diseases[0];
        } else if (photoLower.includes("healthy") || greenCanopyPct > 80 && necrosisPct < 8) {
            selectedDisease = diseases.find(d => d.id.includes("healthy")) || diseases[diseases.length - 1];
        } else {
            // Default to most common economic disease for this crop if visual stress detected
            selectedDisease = necrosisPct > 15 || chlorosisPct > 20 ? diseases[0] : diseases[diseases.length - 1];
        }
    }

    // 4. UNIVERSAL FALLBACK FOR ANY UPLOADED CROP PHOTO
    if (!selectedDisease) {
        if (necrosisPct > 25 || photoLower.includes("blight") || photoLower.includes("spot")) {
            selectedDisease = {
                id: "universal_foliar_blight",
                name: "Foliar Leaf Spot & Blight Complex",
                hindiName: "पत्ती धब्बा व झुलसा रोग",
                pathogen: "Alternaria / Cercospora / Colletotrichum spp.",
                pathogenType: "Fungal",
                severity: necrosisPct > 40 ? "Severe (>50%)" : "Moderate (25-50%)",
                confidence: 89,
                symptomsObserved: [
                    `Multiple brownish-black necrotic lesions covering ~${necrosisPct}% of leaf surface`,
                    "Chlorotic yellow margin halos surrounding dying plant tissue",
                    "Premature foliar desiccation and compromised photosynthetic capacity"
                ],
                pathologyNotes: "Necrotrophic fungal pathogen complex that secretes phytotoxins to collapse plant cell walls. Spreads through water splashing and humid air currents.",
                fastActingChemicals: [
                    { activeIngredient: "Mancozeb 75% WP", commercialBrand: "Dithane M-45", dosagePerLiter: "2.5 g / Liter water", applicationMethod: "Broad-spectrum foliar protective spray" },
                    { activeIngredient: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC", commercialBrand: "Amistar Top", dosagePerLiter: "1.0 ml / Liter water", applicationMethod: "Curative systemic dual-action spray" }
                ],
                organicBioRemedies: [
                    { name: "Trichoderma viride (1% WP)", type: "Bio-fungicide", dosagePerLiter: "5.0 g / Liter water", preparationNotes: "Apply in cool evening hours" },
                    { name: "Neem Oil 10,000 ppm", type: "Botanical", dosagePerLiter: "3.0 ml / Liter water", preparationNotes: "Inhibits fungal hyphal expansion" }
                ],
                preventativePractices: [
                    { title: "Improve Air Circulation", description: "Thin dense foliage and widen plant spacing to accelerate canopy drying." },
                    { title: "Sanitize Tools & Pruning Shears", description: "Sterilize shears with 70% alcohol between cuts to prevent mechanical spread." }
                ]
            };
        } else if (chlorosisPct > 25 || photoLower.includes("curl") || photoLower.includes("yellow")) {
            selectedDisease = {
                id: "universal_chlorosis_virus",
                name: "Viral Chlorosis & Leaf Curl Syndrome",
                hindiName: "विषाणु पत्ती मरोड़ व पीलापन",
                pathogen: "Plant Geminivirus / Phytoplasma vectored by Sap-Sucking Insects",
                pathogenType: "Viral",
                severity: "Moderate (25-50%)",
                confidence: 88,
                symptomsObserved: [
                    `Prominent foliar yellowing / chlorosis affecting ~${chlorosisPct}% of lamina`,
                    "Upward curling, leaf puckering and distorted venation",
                    "Stunted shoot elongation and flower abortion"
                ],
                pathologyNotes: "Systemic viral infection vectored by whiteflies, aphids, or thrips during sap feeding. Disrupts chloroplast chlorophyll synthesis.",
                fastActingChemicals: [
                    { activeIngredient: "Thiamethoxam 25% WG", commercialBrand: "Actara", dosagePerLiter: "0.35 g / Liter water", applicationMethod: "Systemic vector control" },
                    { activeIngredient: "Flonicamid 50% WG", commercialBrand: "Ulala", dosagePerLiter: "0.4 g / Liter water", applicationMethod: "Targets sap-sucking insects" }
                ],
                organicBioRemedies: [
                    { name: "Verticillium lecanii (Bio-agent)", type: "Entomopathogenic Bio-agent", dosagePerLiter: "5.0 g / Liter water", preparationNotes: "Spray undersides of leaves" },
                    { name: "Yellow & Blue Sticky Traps", type: "Physical Vector Trap", dosagePerLiter: "20 traps / acre", preparationNotes: "Trap whiteflies, thrips, and aphids" }
                ],
                preventativePractices: [
                    { title: "Rogue Out Infected Plants", description: "Immediately uproot and burn heavily curled plants to eliminate virus reservoirs." }
                ]
            };
        } else {
            selectedDisease = {
                id: "universal_healthy",
                name: "Healthy Vibrant Crop Foliage",
                hindiName: "स्वस्थ फसल (रोगमुक्त)",
                pathogen: "None (Healthy)",
                pathogenType: "None (Healthy Foliage)",
                severity: "None",
                confidence: 96,
                symptomsObserved: [
                    `Vibrant chlorophyll canopy covering ~${greenCanopyPct}% of surface`,
                    "Firm, erect leaf architecture without necrotic spotting",
                    "Optimal turgor pressure and balanced nutrient coloration"
                ],
                pathologyNotes: "Photosynthetic cellular health is excellent with high chlorophyll index and healthy leaf transpiration.",
                fastActingChemicals: [],
                organicBioRemedies: [
                    { name: "Seaweed Extract / Bio-stimulant", type: "Organic Tonic", dosagePerLiter: "2.0 ml / Liter water", preparationNotes: "Enhances stress resilience" }
                ],
                preventativePractices: [
                    { title: "Maintain Balanced Irrigation", description: "Follow crop-specific critical stage irrigation scheduling." }
                ]
            };
        }
    }

    // Determine overall health score (0-100)
    let healthScore = 95;
    if (selectedDisease.severity === "Severe (>50%)") {
        healthScore = Math.max(28, 48 - Math.round(necrosisPct * 0.4));
    } else if (selectedDisease.severity === "Moderate (25-50%)") {
        healthScore = Math.max(52, 74 - Math.round((necrosisPct + chlorosisPct) * 0.3));
    } else if (selectedDisease.severity === "Low (10-25%)") {
        healthScore = 82;
    } else {
        healthScore = Math.min(99, 90 + Math.round(greenCanopyPct * 0.1));
    }

    const healthStatus: "Healthy" | "Mild Stress" | "Moderate Disease" | "Severe Infection" =
        healthScore >= 88 ? "Healthy"
        : healthScore >= 72 ? "Mild Stress"
        : healthScore >= 50 ? "Moderate Disease"
        : "Severe Infection";

    const healthStatusColor =
        healthStatus === "Healthy" ? "emerald"
        : healthStatus === "Mild Stress" ? "amber"
        : healthStatus === "Moderate Disease" ? "rose"
        : "purple";

    const cropDisplayName = CROP_DATABASE[normCrop]
        ? CROP_DATABASE[normCrop].commonName
        : normCrop.charAt(0).toUpperCase() + normCrop.slice(1);

    const cropHindiName = CROP_DATABASE[normCrop]
        ? CROP_DATABASE[normCrop].hindiName
        : "फसल";

    const cropSciName = CROP_DATABASE[normCrop]
        ? CROP_DATABASE[normCrop].scientificName
        : "Plantae";

    return {
        hasCropPhoto: true,
        cropName: cropDisplayName,
        hindiName: cropHindiName,
        scientificName: cropSciName,
        overallHealthScore: healthScore,
        healthStatus,
        healthStatusColor,
        primaryDisease: selectedDisease,
        secondaryStress: necrosisPct > 12 && chlorosisPct > 20
            ? "Secondary Nitrogen/Zinc deficiency chlorosis accompanying primary pathogen stress"
            : "No significant secondary abiotic stress detected",
        weatherAttribution,
        fastActingChemicals: selectedDisease.fastActingChemicals,
        organicBioRemedies: selectedDisease.organicBioRemedies,
        preventativePractices: selectedDisease.preventativePractices,
        visualMetrics: {
            greenCanopyPct,
            chlorosisPct,
            necrosisPct,
            lesionDensity,
        },
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. POST HANDLER: DUAL GPS-SOIL & CROP HEALTH DIAGNOSTIC ENGINE
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            cropHint = "wheat",
            photoName = "",
            photoType = "crop", // "soil" or "crop"
            lat = 30.9,
            lon = 75.8,
            weatherData,
            soilData,
            imageAnalysis,
        } = body;

        // ── STEP 1: DERIVE COMPREHENSIVE SOIL DATA FROM GPS COORDINATES (NO PHOTO NEEDED)
        const deducedSoil = deriveSoilFromCoordinates(lat, lon, soilData);
        const actualSoilPh = deducedSoil.derivedPh;
        const actualSoc = deducedSoil.soc;
        const actualClay = deducedSoil.clayPct;
        const actualSand = deducedSoil.sandPct;
        const actualCec = deducedSoil.cec;
        const actualTexture = deducedSoil.detectedSoilType;

        // ── STEP 2: CLIMATE & ESTIMATED RAINFALL FROM GPS
        const tempC = weatherData?.current?.temperature ?? 22.0;
        const precip7d = weatherData?.agronomy?.totalPrecip7Days ?? 0.0;
        const soilMoisture = weatherData?.current?.soilMoisture0_1cm ?? 0.28;

        let estimatedAnnualRainfallMm = 650;
        let regionName = deducedSoil.stateOrZone;
        if (lon < 74.0) {
            estimatedAnnualRainfallMm = 380;
        } else if (lat > 28.0 && lon > 74.0 && lon < 80.0) {
            estimatedAnnualRainfallMm = 620;
        } else if (lat > 24.0 && lon >= 80.0) {
            estimatedAnnualRainfallMm = 1250;
        } else if (lat < 16.0 && lon < 77.0) {
            estimatedAnnualRainfallMm = 2400;
        } else if (lat < 21.0 && lon >= 75.0 && lon <= 80.0) {
            estimatedAnnualRainfallMm = 850;
        }

        // ── STEP 3: ACTIVE INDIAN AGRICULTURAL SEASON (RABI / KHARIF / ZAID)
        const currentMonth = new Date().getMonth() + 1; // 1 to 12
        let currentIndianSeason: "Rabi (रबी)" | "Kharif (खरीफ)" | "Zaid (जायद)" = "Rabi (रबी)";
        let seasonDescription = "Rabi Season (रबी - Winter Sowing Window)";

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

        // ── STEP 4: SCORE & RANK ALL CROPS, VEGETABLES & FRUITS AGAINST GPS SOIL
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
                reasons.push(`In active ${currentIndianSeason} calendar`);
            } else {
                score -= 18;
            }

            // B. GPS-Derived Soil pH Fit (Weight 35%)
            const [minPh, maxPh] = profile.optimalPh;
            if (actualSoilPh < minPh) {
                const diff = minPh - actualSoilPh;
                score -= Math.min(38, diff * 26);
            } else if (actualSoilPh > maxPh) {
                const diff = actualSoilPh - maxPh;
                score -= Math.min(38, diff * 24);
            } else {
                score += 4;
                reasons.push(`Soil pH ${actualSoilPh} optimal (${minPh}-${maxPh})`);
            }

            // C. Texture & Clay Compaction Match (Weight 20%)
            if (actualClay > profile.maxClayPct) {
                score -= Math.min(25, (actualClay - profile.maxClayPct) * 1.6);
            } else {
                reasons.push(`Adapted to ${deducedSoil.indianSoilClassification.split(" ")[0]}`);
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
                whyExcels: reasons.length > 0 ? reasons.join(" · ") : `Suitable for regional climate`,
                waterDemandMm: profile.typicalWaterDemandMm,
                isInSeason,
            });
        }

        rankedCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

        const topVegetables = rankedCrops.filter((c) => c.category === "vegetables").slice(0, 6);
        const topFruits = rankedCrops.filter((c) => c.category === "fruits").slice(0, 6);
        const topStaples = rankedCrops.filter((c) => c.category === "cereals" || c.category === "pulses" || c.category === "cash" || c.category === "oilseeds").slice(0, 6);
        const topRecommendedCrops = rankedCrops.slice(0, 6);

        // ── STEP 5: TARGET CROP VIABILITY AGAINST GPS SOIL PROPERTIES
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
                `Soil pH is ${actualSoilPh} (Too Acidic for ${targetCrop.commonName}, requires ${optMinPh} - ${optMaxPh} pH). In acidic soils, aluminum toxicity suppresses root division and fixes phosphorus into insoluble precipitates.`
            );
            whatToChangeList.push(
                `Apply Agricultural Lime (चूना / CaCO3) or Dolomite at ${Math.max(1.5, Math.round(Number(diff) * 2.2 * 10) / 10)} - 3.0 t/ha 4 weeks before sowing, followed by deep rotavator tillage.`
            );
        } else if (actualSoilPh > optMaxPh) {
            phViable = false;
            whyNoList.push(
                `Soil pH is ${actualSoilPh} (Alkaline / Calcareous for ${targetCrop.commonName}, optimal is ${optMinPh} - ${optMaxPh} pH). High carbonates lock micronutrients (Zinc, Iron, Manganese) causing yellow chlorosis.`
            );
            whatToChangeList.push(
                `Apply Agricultural Gypsum (कृषि जिप्सम) at 1.5 - 2.5 t/ha or Elemental Sulfur (300 kg/ha) with canal flushing. Sow Dhaincha (ढैंचा / Sesbania) as green manure.`
            );
        }

        // Check B: Season Alignment
        const targetInSeason = targetCrop.indianSeason.includes(currentIndianSeason) || targetCrop.indianSeason.includes("Perennial");
        if (!targetInSeason) {
            whyNoList.push(
                `Seasonal Timing: Currently in ${currentIndianSeason}, whereas ${targetCrop.commonName} is recommended for ${targetCrop.bestSeason}. Off-season sowing risks heat/cold flower abortion.`
            );
            whatToChangeList.push(
                `Schedule sowing during the optimal window: ${targetCrop.bestSeason}. If cultivating off-season, use shade netting or heat-tolerant hybrid seed.`
            );
        }

        // Check C: Water Deficit
        let waterViable = true;
        const waterDeficit = targetCrop.minAnnualRainfallMm - estimatedAnnualRainfallMm;
        if (waterDeficit > 50) {
            waterViable = false;
            whyNoList.push(
                `Water Deficit: Regional rainfall is ~${estimatedAnnualRainfallMm} mm, whereas ${targetCrop.commonName} requires a minimum of ${targetCrop.minAnnualRainfallMm} mm (net deficit: ~${waterDeficit} mm).`
            );
            whatToChangeList.push(
                `Install Drip Irrigation (टपक सिंचाई) or scheduled canal rounds to bridge the ${waterDeficit} mm deficit.`
            );
        }

        // Check D: Soil Texture & Clay Compaction
        if (actualClay > targetCrop.maxClayPct) {
            whyNoList.push(
                `Texture Compaction: Soil clay content is ${actualClay}% (${actualTexture}), exceeding ${targetCrop.commonName}'s limit of ${targetCrop.maxClayPct}%. Heavy clay impedes root aeration.`
            );
            whatToChangeList.push(
                `Incorporate 15 - 20 t/ha of well-decomposed Farmyard Manure (FYM / गोबर खाद) or Vermicompost to loosen clay structure.`
            );
        }

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

        // ── STEP 6: WATER BALANCE TELEMETRY
        const rainfallFactor = {
            cropDemandMm: targetCrop.typicalWaterDemandMm,
            cropMinMm: targetCrop.minAnnualRainfallMm,
            cropMaxMm: targetCrop.maxAnnualRainfallMm,
            localAnnualMm: estimatedAnnualRainfallMm,
            local7DayForecastMm: precip7d,
            netWaterBalanceMm: estimatedAnnualRainfallMm - targetCrop.typicalWaterDemandMm,
            waterStatus: estimatedAnnualRainfallMm >= targetCrop.typicalWaterDemandMm
                ? "Optimal / Rainfed Sufficient (पर्याप्त वर्षा)"
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

        // ── STEP 7: CROP HEALTH & DISEASE DIAGNOSTICS (IF USER UPLOADED CROP PHOTO)
        const hasPhotoProvided = Boolean(imageAnalysis || (photoName && photoName.trim() !== ""));
        const cropHealthAnalysis = hasPhotoProvided
            ? diagnoseCropHealthAndDisease(cropHint, imageAnalysis, photoName, weatherData, deducedSoil)
            : null;

        // ── STEP 8: PRECISION ACTION PLAN
        const precisionActionPlan = [
            {
                title: "GPS Soil Health & Amendment (मृदा सुधार)",
                category: "Soil Science",
                detail: whatToChangeList.find(c => c.toLowerCase().includes("lime") || c.toLowerCase().includes("gypsum") || c.toLowerCase().includes("chuna")) ||
                    `GPS soil pH (${actualSoilPh}) is in the optimal range (${optMinPh} - ${optMaxPh}) for ${targetCrop.commonName}. Continue applying balanced N-P-K (4:2:1) with Neem-coated Urea.`,
            },
            {
                title: "Crop Health & Pathology Protocol (रोग नियंत्रण)",
                category: "Plant Pathology",
                detail: cropHealthAnalysis
                    ? (cropHealthAnalysis.fastActingChemicals.length > 0
                        ? `Diagnosed: ${cropHealthAnalysis.primaryDisease.name} (${cropHealthAnalysis.primaryDisease.hindiName}). Apply ${cropHealthAnalysis.fastActingChemicals[0].activeIngredient} @ ${cropHealthAnalysis.fastActingChemicals[0].dosagePerLiter}.`
                        : `Foliage is ${cropHealthAnalysis.healthStatus} (${cropHealthAnalysis.overallHealthScore}% vitality). Maintain routine preventive bio-stimulants.`)
                    : "Upload a crop photo or leaf snapshot to receive automated computer-vision disease diagnosis and fungicide prescriptions.",
            },
            {
                title: "Water & Seedbed Optimization (जल व वतर प्रबंधन)",
                category: "Hydrology",
                detail: rainfallFactor.waterStatus.includes("Deficit")
                    ? `Bridge the ${Math.abs(rainfallFactor.netWaterBalanceMm)} mm deficit with ${rainfallFactor.irrigationCyclesNeeded} irrigation rounds. Seedbed status: ${rainfallFactor.seedbedMoistureVerdict}.`
                    : `Annual rainfall (${estimatedAnnualRainfallMm} mm) satisfies water needs. Ensure perimeter drainage.`,
            },
        ];

        return NextResponse.json({
            success: true,
            analyzedAt: new Date().toISOString(),
            photoType,
            photoName,
            gpsCoordinates: { lat, lon },
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
                indianSoilClassification: deducedSoil.indianSoilClassification,
                detectedSoilType: deducedSoil.detectedSoilType,
                soilOrder: deducedSoil.soilOrder,
                soilColorMunsell: deducedSoil.soilColorMunsell,
                structuralTilth: deducedSoil.structuralTilth,
                visualOrganicMatterEst: deducedSoil.visualOrganicMatterEst,
                surfaceCrustingRisk: deducedSoil.surfaceCrustingRisk,
                drainageAeration: deducedSoil.drainageAeration,
                phVerdictNote: deducedSoil.phVerdictNote,
                nitrogenStatus: deducedSoil.nitrogenStatus,
                phosphorusStatus: deducedSoil.phosphorusStatus,
                potassiumStatus: deducedSoil.potassiumStatus,
                salinityRisk: deducedSoil.salinityRisk,
            },
            cropHealthAnalysis,
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
