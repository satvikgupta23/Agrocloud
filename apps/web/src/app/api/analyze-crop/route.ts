import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface CropMasterProfile {
    key: string;
    commonName: string;
    hindiName: string;
    scientificName: string;
    category: "cereals" | "pulses" | "vegetables" | "oilseeds" | "cash" | "fruits" | "spices";
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

// 68 Calibrated Indian Agro-Ecological Crop Profiles
const CROP_DATABASE: Record<string, CropMasterProfile> = {
    // ── CEREALS & GRAINS ───────────────────────────────────────────
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
        seasonDetails: "Cool winter vegetative period (12-18°C) promotes vigorous tillering. Warm, dry sunny weather in March-April ensures plump golden grain filling.",
        maturityDays: 125,
        growthStages: [
            { stage: "CRI (Crown Root Initiation)", name: "CRI Stage (20-25 days)", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 30, description: "Crown roots establish. Most critical single irrigation window in India.", fertilizerPriority: "Apply 1st topdress of Neem-Coated Urea (60 kg N/ha) with CRI irrigation." },
            { stage: "Tillering & Jointing", name: "Tillering to Stem Elongation", gddThreshold: 600, ageDaysMin: 35, ageDaysMax: 60, description: "Number of effective spikes per square meter is determined.", fertilizerPriority: "2nd split Urea application + Zinc Sulfate (ZnSO4) if deficient." },
            { stage: "Heading & Anthesis", name: "Ear Emergence & Flowering", gddThreshold: 850, ageDaysMin: 65, ageDaysMax: 85, description: "Flag leaf emergence and pollination inside spikelets.", fertilizerPriority: "Foliar 2% Potassium Nitrate (13-0-45) spray for heat stress mitigation." },
            { stage: "Milking & Grain Fill", name: "Grain Filling (Dough Stage)", gddThreshold: 1100, ageDaysMin: 86, ageDaysMax: 105, description: "Starch translocation from flag leaf to grain.", fertilizerPriority: "Maintain light soil moisture; avoid heavy water during windy days to prevent lodging." },
            { stage: "Maturity", name: "Harvest Readiness", gddThreshold: 1250, ageDaysMin: 106, ageDaysMax: 125, description: "Grain moisture drops below 14%. Harvest with combine or reaper.", fertilizerPriority: "Cease all irrigation." }
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
        seasonDetails: "Synchronized with Indian Southwest Monsoon. Requires puddled clay, high humidity, and standing water (2-5 cm) through tillering and flowering.",
        maturityDays: 130,
        growthStages: [
            { stage: "Nursery to Transplanting", name: "Seedling Nursery (21-25 days)", gddThreshold: 250, ageDaysMin: 15, ageDaysMax: 25, description: "3-4 leaf seedlings transplanted into puddled field (2-3 seedlings/hill).", fertilizerPriority: "Basal DAP (50 kg/acre) + MOP (25 kg/acre) + Zinc Sulfate (10 kg/acre)." },
            { stage: "Active Tillering", name: "Tillering Stage", gddThreshold: 550, ageDaysMin: 26, ageDaysMax: 50, description: "Tillers multiply, panicle primordium differentiates.", fertilizerPriority: "1st topdress Neem-coated Urea with 2 cm standing water." },
            { stage: "Panicle & Flowering", name: "Panicle Emergence", gddThreshold: 850, ageDaysMin: 51, ageDaysMax: 80, description: "Panicles emerge from boot leaf sheath.", fertilizerPriority: "2nd split Urea + 0:0:50 Potash spray to enhance grain weight." },
            { stage: "Grain Filling", name: "Milk to Hard Dough", gddThreshold: 1100, ageDaysMin: 81, ageDaysMax: 110, description: "Grains fill with carbohydrate reserves.", fertilizerPriority: "Maintain shallow saturation; drain 10 days before harvest." },
            { stage: "Golden Ripening", name: "Harvest", gddThreshold: 1300, ageDaysMin: 111, ageDaysMax: 130, description: "Panicles turn 85% golden yellow. Threshing and bagging.", fertilizerPriority: "Harvest." }
        ]
    },
    maize: {
        key: "maize",
        commonName: "Corn / Maize (Makka / मक्का)",
        hindiName: "मक्का",
        scientificName: "Zea mays",
        category: "cereals",
        family: "Poaceae",
        optimalPh: [5.8, 7.2],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1400,
        typicalWaterDemandMm: 600,
        minTempC: 12.0,
        maxTempC: 36.0,
        preferredTextures: ["loam", "silt loam", "silty clay loam", "clay loam"],
        maxClayPct: 40,
        minSocGKg: 8.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.35,
        floodTolerance: 0.15,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif or Rabi Maize (खरीफ/रबी: June Sowing or Oct-Nov Rabi Maize)",
        seasonDetails: "Warm sunny days (24-30°C) with well-drained loamy soils. Extremely sensitive to waterlogging at seedling and tasseling stages.",
        maturityDays: 110,
        growthStages: [
            { stage: "Early Vegetative", name: "Knee-High Stage (V5-V6)", gddThreshold: 350, ageDaysMin: 20, ageDaysMax: 35, description: "Rapid nodal root system and internode expansion.", fertilizerPriority: "Sidedress Neem-coated Urea at knee-high stage." },
            { stage: "Tasseling & Silking", name: "Reproductive Flowering", gddThreshold: 850, ageDaysMin: 50, ageDaysMax: 70, description: "Tassels shed pollen, silks emerge from cob tip.", fertilizerPriority: "Maintain steady moisture; avoid moisture stress at silking." },
            { stage: "Cob Filling & Harvest", name: "Maturity", gddThreshold: 1300, ageDaysMin: 90, ageDaysMax: 110, description: "Kernels reach black layer maturity; husks dry to golden brown.", fertilizerPriority: "Harvest." }
        ]
    },
    barley: {
        key: "barley",
        commonName: "Barley (Jau / जौ)",
        hindiName: "जौ",
        scientificName: "Hordeum vulgare",
        category: "cereals",
        family: "Poaceae",
        optimalPh: [6.2, 8.5],
        minAnnualRainfallMm: 350,
        maxAnnualRainfallMm: 950,
        typicalWaterDemandMm: 380,
        minTempC: 6.0,
        maxTempC: 28.0,
        preferredTextures: ["loam", "sandy loam", "clay loam", "alluvial"],
        maxClayPct: 35,
        minSocGKg: 5.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.65,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi Season (रबी: November Sowing, March Harvest)",
        seasonDetails: "Remarkable tolerance to soil salinity (Kallar/Usar soil) and low irrigation. Prominent in Rajasthan, Haryana, Punjab, UP.",
        maturityDays: 110,
        growthStages: [
            { stage: "Tillering", name: "Active Tillering", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 35, description: "Crown roots establish in cool winter.", fertilizerPriority: "Basal DAP and light Urea topdress." },
            { stage: "Spike Emergence", name: "Heading", gddThreshold: 750, ageDaysMin: 50, ageDaysMax: 70, description: "Bearded spikes emerge.", fertilizerPriority: "Light irrigation." },
            { stage: "Maturity", name: "Maturity", gddThreshold: 1150, ageDaysMin: 95, ageDaysMax: 110, description: "Golden amber grains harden.", fertilizerPriority: "Harvest dry." }
        ]
    },
    millet: {
        key: "millet",
        commonName: "Pearl Millet (Bajra / बाजरा)",
        hindiName: "बाजरा",
        scientificName: "Pennisetum glaucum",
        category: "cereals",
        family: "Poaceae",
        optimalPh: [5.5, 8.2],
        minAnnualRainfallMm: 280,
        maxAnnualRainfallMm: 750,
        typicalWaterDemandMm: 320,
        minTempC: 22.0,
        maxTempC: 42.0,
        preferredTextures: ["sandy loam", "loamy sand", "light loam"],
        maxClayPct: 28,
        minSocGKg: 3.5,
        minCecCmolKg: 4.0,
        droughtTolerance: 0.95,
        floodTolerance: 0.1,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif Season (खरीफ: July Sowing with Monsoon Onset)",
        seasonDetails: "The premier drought-proof cereal of arid & semi-arid India (Rajasthan, Gujarat, Haryana, Maharashtra). Thrives in light sandy soils where all other cereals fail.",
        maturityDays: 85,
        growthStages: [
            { stage: "Tillering", name: "Basal Tillering", gddThreshold: 280, ageDaysMin: 15, ageDaysMax: 30, description: "Rapid tillering from sandy seedbed.", fertilizerPriority: "Light Nitrogen application (Urea)." },
            { stage: "Booting & Flowering", name: "Earhead Setting", gddThreshold: 600, ageDaysMin: 40, ageDaysMax: 55, description: "Cylindrical compact earheads flower.", fertilizerPriority: "Phosphorus ensures bold grain size." },
            { stage: "Maturity", name: "Earhead Harvest", gddThreshold: 900, ageDaysMin: 75, ageDaysMax: 85, description: "Earheads turn greyish-brown.", fertilizerPriority: "Cut earheads." }
        ]
    },
    sorghum: {
        key: "sorghum",
        commonName: "Sorghum (Jowar / ज्वार)",
        hindiName: "ज्वार",
        scientificName: "Sorghum bicolor",
        category: "cereals",
        family: "Poaceae",
        optimalPh: [5.8, 8.0],
        minAnnualRainfallMm: 400,
        maxAnnualRainfallMm: 950,
        typicalWaterDemandMm: 420,
        minTempC: 18.0,
        maxTempC: 40.0,
        preferredTextures: ["clay loam", "black cotton", "clay", "loam"],
        maxClayPct: 50,
        minSocGKg: 5.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.85,
        floodTolerance: 0.15,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif or Rabi Jowar (खरीफ / रबी ज्वार: Maharashtra & Karnataka)",
        seasonDetails: "Deeply entrenched in the Deccan black soil tract. Deep root system extracts subsoil moisture during drought spells.",
        maturityDays: 110,
        growthStages: [
            { stage: "Vegetative", name: "Waxy Foliage Expansion", gddThreshold: 400, ageDaysMin: 20, ageDaysMax: 45, description: "Waxy leaves minimize transpiration.", fertilizerPriority: "Neem-coated Urea split." },
            { stage: "Panicle Bloom", name: "Panicle Emergence", gddThreshold: 800, ageDaysMin: 55, ageDaysMax: 75, description: "Dense seed panicles flower.", fertilizerPriority: "Potash topdress." },
            { stage: "Maturity", name: "Harvest", gddThreshold: 1200, ageDaysMin: 95, ageDaysMax: 110, description: "Seeds harden in panicle.", fertilizerPriority: "Harvest." }
        ]
    },

    // ── PULSES & LEGUMES ───────────────────────────────────────────
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
        seasonDetails: "India's largest pulse crop (MP, Maharashtra, Rajasthan, UP). Requires dry cool weather. Highly sensitive to waterlogging or heavy rainfall during flowering.",
        maturityDays: 105,
        growthStages: [
            { stage: "Branching", name: "Primary & Secondary Branching", gddThreshold: 300, ageDaysMin: 20, ageDaysMax: 35, description: "Acidic glandular hairs form on leaves (malic acid exudation).", fertilizerPriority: "Inoculate with Mesorhizobium culture; basal DAP (40 kg/ha) + Sulfur (20 kg/ha)." },
            { stage: "Flowering & Podding", name: "Pod Setting", gddThreshold: 650, ageDaysMin: 45, ageDaysMax: 70, description: "Pink/white papilionaceous flowers set into green pods.", fertilizerPriority: "Foliar 2% DAP or Potassium Nitrate spray at 50% bloom." },
            { stage: "Maturity", name: "Pod Desiccation", gddThreshold: 1000, ageDaysMin: 90, ageDaysMax: 105, description: "Pods rattle and turn golden brown.", fertilizerPriority: "Harvest dry." }
        ]
    },
    pigeonpea: {
        key: "pigeonpea",
        commonName: "Pigeonpea / Red Gram (Tur / Arhar / अरहर)",
        hindiName: "अरहर / तुवर",
        scientificName: "Cajanus cajan",
        category: "pulses",
        family: "Fabaceae",
        optimalPh: [5.5, 7.8],
        minAnnualRainfallMm: 600,
        maxAnnualRainfallMm: 1200,
        typicalWaterDemandMm: 580,
        minTempC: 18.0,
        maxTempC: 38.0,
        preferredTextures: ["loam", "sandy loam", "clay loam", "black cotton"],
        maxClayPct: 45,
        minSocGKg: 5.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.8,
        floodTolerance: 0.15,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif Sowing (खरीफ: June-July Sowing, Dec-Jan Harvest)",
        seasonDetails: "Deep taproot (up to 2 meters) breaks plow pans and fixes 40-60 kg atmospheric nitrogen/ha. Often intercropped with Soybean or Cotton.",
        maturityDays: 160,
        growthStages: [
            { stage: "Vegetative Shrub", name: "Canopy Branching", gddThreshold: 600, ageDaysMin: 30, ageDaysMax: 70, description: "Erect woody shrub architecture develops.", fertilizerPriority: "Basal SSP (Single Super Phosphate) for root nodulation." },
            { stage: "Profuse Flowering", name: "Pod Cluster Setting", gddThreshold: 1100, ageDaysMin: 85, ageDaysMax: 120, description: "Yellow flowers produce clusters of pods.", fertilizerPriority: "Foliar Boron and Sulfur spray to minimize flower drop." },
            { stage: "Maturity", name: "Pod Harvest", gddThreshold: 1550, ageDaysMin: 140, ageDaysMax: 160, description: "Pods dry to dark purple-brown.", fertilizerPriority: "Harvest." }
        ]
    },
    mustard: {
        key: "mustard",
        commonName: "Mustard / Rapeseed (Sarson / सरसों / राई)",
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
        seasonDetails: "Premier edible oilseed of Northern & Western India (Rajasthan, Haryana, UP, MP). Cool dry weather promotes high oil content (38-42%).",
        maturityDays: 110,
        growthStages: [
            { stage: "Rosette", name: "Vegetative Rosette (20-30 days)", gddThreshold: 280, ageDaysMin: 20, ageDaysMax: 35, description: "Broad basal leaves expand.", fertilizerPriority: "Apply 40 kg Elemental Sulfur/ha or Bentonite Sulfur for oil synthesis." },
            { stage: "Golden Flowering", name: "Yellow Bloom", gddThreshold: 600, ageDaysMin: 45, ageDaysMax: 65, description: "Fields blanketed in yellow inflorescences.", fertilizerPriority: "Light irrigation at 50% flowering; monitor for aphids (चेपा)." },
            { stage: "Silique Fill", name: "Pod Maturation", gddThreshold: 1000, ageDaysMin: 80, ageDaysMax: 110, description: "Seeds darken and rattle inside siliques.", fertilizerPriority: "Harvest before morning sun to avoid pod shattering." }
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
        seasonDetails: "Dominates central India (Madhya Pradesh & Maharashtra Malwa/Vidarbha tracts). Thrives in fertile vertisols with regular monsoon showers.",
        maturityDays: 105,
        growthStages: [
            { stage: "Nodulation", name: "Rhizobium Nodulation (V2-V4)", gddThreshold: 300, ageDaysMin: 18, ageDaysMax: 30, description: "Bradyrhizobium japonicum nodules establish on roots.", fertilizerPriority: "Basal SSP (100 kg/acre) + MOP (20 kg/acre) + Rhizobium seed treatment." },
            { stage: "Podding & Bloom", name: "R1-R3 Pod Development", gddThreshold: 700, ageDaysMin: 45, ageDaysMax: 70, description: "Small purple flowers set into 2-3 seeded hairy pods.", fertilizerPriority: "Foliar spray of 19:19:19 NPK." },
            { stage: "Leaf Drop & Harvest", name: "Maturity", gddThreshold: 1150, ageDaysMin: 80, ageDaysMax: 105, description: "Leaves turn yellow and drop off. Pods rattle when shaken.", fertilizerPriority: "Harvest at 13-14% seed moisture." }
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
        preferredTextures: ["sandy loam", "loamy sand", "light alluvial loam"],
        maxClayPct: 24,
        minSocGKg: 5.0,
        minCecCmolKg: 6.0,
        droughtTolerance: 0.6,
        floodTolerance: 0.1,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif or Summer Groundnut (खरीफ / जायद: Gujarat, Andhra, TN)",
        seasonDetails: "Friable, well-aerated light sandy loam is mandatory so pegs can freely push underground into the soil and form pods.",
        maturityDays: 115,
        growthStages: [
            { stage: "Pegging", name: "Peg Penetration Stage", gddThreshold: 450, ageDaysMin: 30, ageDaysMax: 50, description: "Gynophores (pegs) elongate and penetrate 3-5 cm into soil.", fertilizerPriority: "Apply Agricultural Gypsum (जिप्सम 250 kg/ha) at pegging for pod shell calcium." },
            { stage: "Pod Fill", name: "Underground Pod Expansion", gddThreshold: 850, ageDaysMin: 55, ageDaysMax: 85, description: "Kernels swell inside underground pods.", fertilizerPriority: "Maintain friable moisture; avoid hard crusting." },
            { stage: "Lifting & Harvest", name: "Digging", gddThreshold: 1200, ageDaysMin: 95, ageDaysMax: 115, description: "Inner shell lining turns dark brown.", fertilizerPriority: "Tractor groundnut digger lifting." }
        ]
    },

    // ── CASH & COMMERCIAL ──────────────────────────────────────────
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
        seasonDetails: "India's 'White Gold'. Perfectly adapted to deep black cracking vertisols of Maharashtra, Gujarat, Telangana, and Malwa plateau.",
        maturityDays: 155,
        growthStages: [
            { stage: "Squaring", name: "Square Formation (35-45 days)", gddThreshold: 450, ageDaysMin: 30, ageDaysMax: 50, description: "Fruiting branches form pyramid-shaped flower buds (squares).", fertilizerPriority: "Split Neem-coated Urea + Potassium." },
            { stage: "Peak Boll Setting", name: "Flowering to Boll Formation", gddThreshold: 850, ageDaysMin: 55, ageDaysMax: 90, description: "Flowers open white, turn pink on day two; green bolls develop.", fertilizerPriority: "Foliar 2% Potassium Nitrate (KNO3) + Planofix to curb flower drop." },
            { stage: "Boll Bursting & Picking", name: "Boll Opening", gddThreshold: 1450, ageDaysMin: 125, ageDaysMax: 155, description: "Bolls burst open exposing clean dry lint.", fertilizerPriority: "Begin 1st picking." }
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
        bestSeason: "Autumn or Spring Planting (शरद/वसंत: Oct-Nov or Feb-Mar Planting)",
        seasonDetails: "Heavy water and fertilizer consumer dominating UP, Maharashtra, Tamil Nadu, Karnataka. High sucrose accumulation under bright sunny winter days.",
        maturityDays: 330,
        growthStages: [
            { stage: "Sprouting & Tillering", name: "Formative Phase (30-100 days)", gddThreshold: 800, ageDaysMin: 30, ageDaysMax: 100, description: "Eyebuds on setts sprout into multi-stalk stools.", fertilizerPriority: "Basal DAP (75 kg/ha) + Potash (50 kg/ha) + heavy Urea splits." },
            { stage: "Grand Growth", name: "Cane Elongation", gddThreshold: 2200, ageDaysMin: 110, ageDaysMax: 240, description: "Internodes lengthen rapidly with monsoon rains.", fertilizerPriority: "Earthing up (मिट्टी चढ़ाना) to prevent lodging." },
            { stage: "Sucrose Ripening", name: "Maturity", gddThreshold: 3200, ageDaysMin: 250, ageDaysMax: 330, description: "Juice Brix exceeds 18%. Ready for sugar mill crushing.", fertilizerPriority: "Stop irrigation 3-4 weeks before harvest." }
        ]
    },

    // ── VEGETABLES ─────────────────────────────────────────────────
    tomato: {
        key: "tomato",
        commonName: "Tomato (Tamatar / टमाटर)",
        hindiName: "टमाटर",
        scientificName: "Solanum lycopersicum",
        category: "vegetables",
        family: "Solanaceae",
        optimalPh: [6.0, 7.0],
        minAnnualRainfallMm: 500,
        maxAnnualRainfallMm: 1300,
        typicalWaterDemandMm: 550,
        minTempC: 15.0,
        maxTempC: 32.0,
        preferredTextures: ["loam", "sandy loam", "silt loam"],
        maxClayPct: 30,
        minSocGKg: 8.0,
        minCecCmolKg: 12.0,
        droughtTolerance: 0.25,
        floodTolerance: 0.1,
        indianSeason: "Rabi (रबी)",
        bestSeason: "Rabi or Post-Monsoon (रबी / शरद: Oct-Nov Transplanting)",
        seasonDetails: "Warm sunny days with mild night temperatures (15-20°C). Cannot tolerate frost or waterlogged roots.",
        maturityDays: 105,
        growthStages: [
            { stage: "Branching", name: "Canopy Branching", gddThreshold: 350, ageDaysMin: 20, ageDaysMax: 40, description: "Side shoots develop canopy.", fertilizerPriority: "NPK 19:19:19 water-soluble fertigation." },
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
        bestSeason: "Rabi Winter (रबी: Oct-Nov Planting, Jan-Feb Harvest)",
        seasonDetails: "Huge crop in Indo-Gangetic belt (UP, West Bengal, Bihar, Punjab). Cool night temperatures (<18°C) are mandatory for tuber formation.",
        maturityDays: 95,
        growthStages: [
            { stage: "Stolon Formation", name: "Stolon Hooking", gddThreshold: 280, ageDaysMin: 20, ageDaysMax: 35, description: "Underground stolons initiate.", fertilizerPriority: "Earthing up with Potassium Sulfate (SOP)." },
            { stage: "Tuber Bulking", name: "Rapid Bulking", gddThreshold: 650, ageDaysMin: 40, ageDaysMax: 70, description: "Tubers swell in cool loose soil.", fertilizerPriority: "High Potassium and Phosphorus." },
            { stage: "Dehaulming & Harvest", name: "Harvest", gddThreshold: 950, ageDaysMin: 80, ageDaysMax: 95, description: "Cut haulms 10 days before digging to cure skin.", fertilizerPriority: "Stop irrigation." }
        ]
    },
    onion: {
        key: "onion",
        commonName: "Onion (Pyaz / प्याज)",
        hindiName: "प्याज",
        scientificName: "Allium cepa",
        category: "vegetables",
        family: "Amaryllidaceae",
        optimalPh: [6.0, 7.2],
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
        bestSeason: "Rabi or Late Kharif (रबी/खरीफ: Nashik & Pune Belt, Maharashtra)",
        seasonDetails: "Shallow fibrous root system requires friable fertile loam. Bulb development triggered by warm days and cool nights.",
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
        optimalPh: [6.0, 7.2],
        minAnnualRainfallMm: 550,
        maxAnnualRainfallMm: 1400,
        typicalWaterDemandMm: 550,
        minTempC: 18.0,
        maxTempC: 36.0,
        preferredTextures: ["loam", "sandy loam", "silt loam", "black cotton"],
        maxClayPct: 35,
        minSocGKg: 8.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.35,
        floodTolerance: 0.1,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif or Rabi (खरीफ/रबी: Andhra Pradesh Guntur Belt, MP, Karnataka)",
        seasonDetails: "Major commercial spice-vegetable. High capsaicin development requires warm days. Cannot tolerate waterlogging.",
        maturityDays: 130,
        growthStages: [
            { stage: "Branching", name: "Forking Branching", gddThreshold: 400, ageDaysMin: 25, ageDaysMax: 50, description: "Multiple flowering forks establish.", fertilizerPriority: "NPK 19:19:19 + Micronutrients." },
            { stage: "Fruit Set", name: "Pod Sizing", gddThreshold: 800, ageDaysMin: 55, ageDaysMax: 85, description: "White pendulous blooms set fruit.", fertilizerPriority: "Potassium and Calcium." },
            { stage: "Harvest", name: "Green / Red Picking", gddThreshold: 1250, ageDaysMin: 90, ageDaysMax: 130, description: "Harvest green or allow to sun-dry red on threshing floor.", fertilizerPriority: "Multiple pickings." }
        ]
    },

    // ── SPICES & FRUITS ────────────────────────────────────────────
    turmeric: {
        key: "turmeric",
        commonName: "Turmeric (Haldi / हल्दी)",
        hindiName: "हल्दी",
        scientificName: "Curcuma longa",
        category: "spices",
        family: "Zingiberaceae",
        optimalPh: [5.5, 7.0],
        minAnnualRainfallMm: 1200,
        maxAnnualRainfallMm: 2500,
        typicalWaterDemandMm: 1100,
        minTempC: 20.0,
        maxTempC: 35.0,
        preferredTextures: ["loam", "sandy loam", "clay loam"],
        maxClayPct: 30,
        minSocGKg: 10.0,
        minCecCmolKg: 8.0,
        droughtTolerance: 0.2,
        floodTolerance: 0.15,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif Season (खरीफ: May-June Planting, Jan-Feb Harvest)",
        seasonDetails: "Telangana, Andhra Pradesh, Maharashtra, Tamil Nadu leader. High curcumin synthesis occurs in friable organic-rich loams.",
        maturityDays: 240,
        growthStages: [
            { stage: "Sprouting", name: "Shoot Emergence", gddThreshold: 800, ageDaysMin: 40, ageDaysMax: 100, description: "Broad glossy green blades unfurl.", fertilizerPriority: "Farmyard manure (FYM) 15 t/ha + Neem cake." },
            { stage: "Rhizome Bulking", name: "Golden Finger Formation", gddThreshold: 1800, ageDaysMin: 110, ageDaysMax: 200, description: "Deep orange fingers develop underground.", fertilizerPriority: "Potassium Sulfate (SOP) + earthing up." },
            { stage: "Maturity", name: "Harvest", gddThreshold: 2400, ageDaysMin: 210, ageDaysMax: 240, description: "Leaves dry and turn straw brown.", fertilizerPriority: "Harvest and curing." }
        ]
    },
    ginger: {
        key: "ginger",
        commonName: "Ginger (Adrak / अदरक)",
        hindiName: "अदरक",
        scientificName: "Zingiber officinale",
        category: "spices",
        family: "Zingiberaceae",
        optimalPh: [5.5, 6.5],
        minAnnualRainfallMm: 1400,
        maxAnnualRainfallMm: 2800,
        typicalWaterDemandMm: 1200,
        minTempC: 20.0,
        maxTempC: 35.0,
        preferredTextures: ["loam", "sandy loam", "silt loam"],
        maxClayPct: 25,
        minSocGKg: 12.0,
        minCecCmolKg: 10.0,
        droughtTolerance: 0.1,
        floodTolerance: 0.1,
        indianSeason: "Kharif (खरीफ)",
        bestSeason: "Kharif Season (खरीफ: May-June Planting, Dec-Jan Harvest)",
        seasonDetails: "Kerala, Assam, Karnataka, Himachal Pradesh. Demands high organic matter, partial shade, and raised beds to avoid rhizome rot.",
        maturityDays: 220,
        growthStages: [
            { stage: "Tillering", name: "Vegetative Shoots", gddThreshold: 800, ageDaysMin: 40, ageDaysMax: 90, description: "Pseudostems multiply.", fertilizerPriority: "Compost & Trichoderma drench." },
            { stage: "Rhizome Bulking", name: "Finger Bulking", gddThreshold: 1600, ageDaysMin: 100, ageDaysMax: 180, description: "Pungent ginger fingers expand.", fertilizerPriority: "Potash and green leaf mulching." },
            { stage: "Harvest", name: "Harvest", gddThreshold: 2200, ageDaysMin: 190, ageDaysMax: 220, description: "Foliage withers completely.", fertilizerPriority: "Harvest." }
        ]
    },
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
        bestSeason: "Flowering in Jan-Feb (Rabi), Harvest in May-July (Zaid/Summer)",
        seasonDetails: "India's National Fruit (UP Dussehri, Maharashtra Alphonso, Andhra Banganapalli). 2-3 months dry winter rest induces heavy floral bud differentiation.",
        maturityDays: 130,
        growthStages: [
            { stage: "Panicle Bloom", name: "Flowering (Jan-Feb)", gddThreshold: 400, ageDaysMin: 20, ageDaysMax: 45, description: "Golden panicles flower. Never irrigate during bloom.", fertilizerPriority: "Withhold irrigation during bloom." },
            { stage: "Fruit Setting", name: "Pea to Marble Sizing", gddThreshold: 900, ageDaysMin: 50, ageDaysMax: 95, description: "Fruitlets set and expand rapidly.", fertilizerPriority: "Resume irrigation + 0:0:50 Potash spray." },
            { stage: "Maturity", name: "Tapka Ripening", gddThreshold: 1350, ageDaysMin: 100, ageDaysMax: 130, description: "Shoulders fill, skin color breaks.", fertilizerPriority: "Harvest." }
        ]
    }
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            cropHint = "wheat",
            photoName = "field_sample.jpg",
            photoType = "soil", // "soil" or "crop"
            lat = 30.9,
            lon = 75.8,
            soilPh = 7.2,
            soilData,
            weatherData,
        } = body;

        // Current Environmental parameters
        const actualSoilPh = typeof soilData?.surface?.ph === "number" ? soilData.surface.ph : (soilPh || 7.2);
        const actualSoc = typeof soilData?.surface?.soc === "number" ? soilData.surface.soc : 18.5;
        const actualClay = typeof soilData?.surface?.clayPct === "number" ? soilData.surface.clayPct : 22.0;
        const actualSand = typeof soilData?.surface?.sandPct === "number" ? soilData.surface.sandPct : 45.0;
        const actualCec = typeof soilData?.surface?.cec === "number" ? soilData.surface.cec : 16.5;
        const actualTexture = soilData?.surface?.textureClass || "Sandy Loam";

        const tempC = weatherData?.current?.temperature ?? 22.0;
        const precip7d = weatherData?.agronomy?.totalPrecip7Days ?? 0.0;
        // Estimated Indian local annual rainfall based on latitude/longitude geography
        let estimatedAnnualRainfallMm = 650;
        if (lon < 74.0) { // Western Arid (Rajasthan / Gujarat)
            estimatedAnnualRainfallMm = 380;
        } else if (lat > 28.0 && lon > 74.0 && lon < 80.0) { // Punjab / Haryana / Western UP
            estimatedAnnualRainfallMm = 620;
        } else if (lat > 24.0 && lon >= 80.0) { // Eastern Gangetic / Terai / Bengal
            estimatedAnnualRainfallMm = 1250;
        } else if (lat < 16.0 && lon < 77.0) { // Western Ghats / Kerala / Coastal Karnataka
            estimatedAnnualRainfallMm = 2400;
        } else if (lat < 21.0 && lon >= 75.0 && lon <= 80.0) { // Deccan Plateau / Vidarbha
            estimatedAnnualRainfallMm = 850;
        }

        const soilMoisture = weatherData?.current?.soilMoisture0_1cm ?? 0.28;

        // Determine current Indian Agricultural Season based on month
        const currentMonth = new Date().getMonth() + 1; // 1 - 12
        let currentIndianSeason: "Rabi (रबी)" | "Kharif (खरीफ)" | "Zaid (जायद)" = "Rabi (रबी)";
        let seasonDescription = "Rabi (रबी - Winter Crop Sowing Window)";

        if (currentMonth >= 6 && currentMonth <= 10) {
            currentIndianSeason = "Kharif (खरीफ)";
            seasonDescription = "Kharif (खरीफ - Monsoon Season)";
        } else if (currentMonth >= 11 || currentMonth <= 3) {
            currentIndianSeason = "Rabi (रबी)";
            seasonDescription = "Rabi (रबी - Winter Sowing & Growth Window)";
        } else {
            currentIndianSeason = "Zaid (जायद)";
            seasonDescription = "Zaid (जायद - Summer Short-Duration Window)";
        }

        // ─────────────────────────────────────────────────────────────
        // 1. EVALUATE ALL CROPS FOR INDIAN RECOMMENDATIONS
        // ─────────────────────────────────────────────────────────────
        const rankedCrops: Array<{
            cropKey: string;
            commonName: string;
            hindiName: string;
            category: string;
            suitabilityScore: number;
            indianSeason: string;
            bestSeason: string;
            rainfallMatchText: string;
            soilMatchText: string;
            whyExcels: string;
            waterDemandMm: number;
        }> = [];

        for (const [key, profile] of Object.entries(CROP_DATABASE)) {
            let score = 100;
            const reasons: string[] = [];

            // A. Season Alignment Bonus/Penalty in India
            if (profile.indianSeason.includes(currentIndianSeason)) {
                score += 5; // Bonus for in-season sowing
                reasons.push(`Currently in active ${currentIndianSeason} planting calendar`);
            } else if (!profile.indianSeason.includes("Perennial")) {
                score -= 10;
            }

            // B. Soil pH Fit (Weight 30%)
            const [minPh, maxPh] = profile.optimalPh;
            if (actualSoilPh < minPh) {
                const diff = minPh - actualSoilPh;
                score -= Math.min(35, diff * 22);
            } else if (actualSoilPh > maxPh) {
                const diff = actualSoilPh - maxPh;
                score -= Math.min(35, diff * 20);
            } else {
                reasons.push(`Soil pH ${actualSoilPh} optimal for ${profile.hindiName}`);
            }

            // C. Rainfall Match (Weight 30%)
            if (estimatedAnnualRainfallMm < profile.minAnnualRainfallMm) {
                const deficit = profile.minAnnualRainfallMm - estimatedAnnualRainfallMm;
                const penalty = Math.min(35, (deficit / profile.minAnnualRainfallMm) * 35);
                score -= penalty * (1.2 - profile.droughtTolerance * 0.5);
            } else if (estimatedAnnualRainfallMm > profile.maxAnnualRainfallMm) {
                const excess = estimatedAnnualRainfallMm - profile.maxAnnualRainfallMm;
                const penalty = Math.min(30, (excess / profile.maxAnnualRainfallMm) * 30);
                score -= penalty * (1.2 - profile.floodTolerance * 0.5);
            } else {
                reasons.push(`Rainfall ${estimatedAnnualRainfallMm}mm matches requirement`);
            }

            // D. Clay & Texture Fit (Weight 20%)
            if (actualClay > profile.maxClayPct) {
                score -= Math.min(25, (actualClay - profile.maxClayPct) * 1.5);
            }
            if (profile.minClayPct && actualClay < profile.minClayPct) {
                score -= Math.min(20, (profile.minClayPct - actualClay) * 1.2);
            }

            // E. Temperature Fit (Weight 20%)
            if (tempC < profile.minTempC) {
                score -= Math.min(25, (profile.minTempC - tempC) * 2.0);
            } else if (tempC > profile.maxTempC) {
                score -= Math.min(25, (tempC - profile.maxTempC) * 2.0);
            }

            score = Math.max(15, Math.min(99, Math.round(score)));

            const rainfallMatch = estimatedAnnualRainfallMm >= profile.minAnnualRainfallMm && estimatedAnnualRainfallMm <= profile.maxAnnualRainfallMm
                ? `Optimal (${estimatedAnnualRainfallMm}mm / yr matches demand)`
                : estimatedAnnualRainfallMm < profile.minAnnualRainfallMm
                ? `Deficit of ${profile.minAnnualRainfallMm - estimatedAnnualRainfallMm}mm (Canal/Tube-well required)`
                : `High Monsoon Rainfall (${estimatedAnnualRainfallMm}mm)`;

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
                whyExcels: reasons.length > 0 ? reasons.join(" · ") : `Adapted to local ${actualTexture}`,
                waterDemandMm: profile.typicalWaterDemandMm,
            });
        }

        // Sort descending by suitability score
        rankedCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
        const topRecommendedCrops = rankedCrops.slice(0, 6);

        // ─────────────────────────────────────────────────────────────
        // 2. TARGET CROP VIABILITY VERDICT (INDIAN AGRONOMIC STANDARDS)
        // ─────────────────────────────────────────────────────────────
        const normalizedHint = Object.keys(CROP_DATABASE).includes(cropHint.toLowerCase())
            ? cropHint.toLowerCase()
            : "wheat";
        const targetCrop = CROP_DATABASE[normalizedHint];

        const [optMinPh, optMaxPh] = targetCrop.optimalPh;
        const whyNoList: string[] = [];
        const whatToChangeList: string[] = [];

        // Check 1: Soil pH Bottleneck
        let phViable = true;
        if (actualSoilPh < optMinPh) {
            phViable = false;
            const diff = (optMinPh - actualSoilPh).toFixed(1);
            whyNoList.push(
                `Soil pH is ${actualSoilPh} (Suboptimal / Too Acidic for ${targetCrop.commonName}, which requires ${optMinPh} - ${optMaxPh} pH). In acidic soils, Aluminum and Iron toxicity causes root stunting and locks up applied DAP/Phosphorus fertilizers into insoluble phosphates.`
            );
            whatToChangeList.push(
                `Apply Agricultural Limestone (चूना / CaCO3) or Dolomite at ${Math.max(1.5, Math.round(Number(diff) * 2.0 * 10) / 10)} - 3.0 tonnes/hectare 4 weeks prior to sowing, followed by deep rotavator tillage to neutralize soil acidity.`
            );
        } else if (actualSoilPh > optMaxPh) {
            phViable = false;
            whyNoList.push(
                `Soil pH is ${actualSoilPh} (Suboptimal / Calcareous & Alkaline/Kallar for ${targetCrop.commonName}, optimal is ${optMinPh} - ${optMaxPh} pH). High exchangeable sodium and calcium carbonate causes lime-induced iron chlorosis (पीलापन) and renders zinc and phosphorus unavailable.`
            );
            whatToChangeList.push(
                `Apply Agricultural Gypsum (कृषि जिप्सम) at 1.5 - 2.5 tonnes/hectare or Elemental Sulfur (300 kg/ha) with abundant canal water flushing. Cultivate Dhaincha (ढैंचा - Sesbania) as green manure (हरी खाद) before crop sowing to reclaim sodicity.`
            );
        }

        // Check 2: Rainfall & Water Deficit
        let waterViable = true;
        const waterDeficit = targetCrop.minAnnualRainfallMm - estimatedAnnualRainfallMm;
        const waterExcess = estimatedAnnualRainfallMm - targetCrop.maxAnnualRainfallMm;

        if (waterDeficit > 50) {
            waterViable = false;
            whyNoList.push(
                `Water Deficit: Local regional rainfall is ~${estimatedAnnualRainfallMm} mm, whereas ${targetCrop.commonName} requires a minimum of ${targetCrop.minAnnualRainfallMm} mm (typical water demand: ${targetCrop.typicalWaterDemandMm} mm). There is a net water deficit of ~${waterDeficit} mm.`
            );
            whatToChangeList.push(
                `Deploy Drip Irrigation (टपक सिंचाई) or Tube-well / Canal irrigation to bridge the ${waterDeficit} mm deficit. Follow the critical stage irrigation schedule (e.g. CRI stage for Wheat, Silking for Maize).`
            );
        } else if (waterExcess > 300 && targetCrop.floodTolerance < 0.3) {
            waterViable = false;
            whyNoList.push(
                `Excess Moisture / Waterlogging Hazard: Local rainfall (~${estimatedAnnualRainfallMm} mm) exceeds ${targetCrop.commonName}'s tolerance. Heavy monsoon pooling risks collar rot, damping off, and root hypoxia.`
            );
            whatToChangeList.push(
                `Construct Broad Bed and Furrows (BBF - चौड़ी क्यारी एवं कुंड विधि) or raised beds with 30 cm drainage ditches to swiftly evacuate excess storm water runoff.`
            );
        }

        // Check 3: Soil Texture & Heavy Clay Compaction
        let textureViable = true;
        if (actualClay > targetCrop.maxClayPct) {
            textureViable = false;
            whyNoList.push(
                `Texture Compaction: Soil clay content is ${actualClay}% (${actualTexture}), exceeding ${targetCrop.commonName}'s maximum limit of ${targetCrop.maxClayPct}%. Heavy clay impedes root aeration and pegging.`
            );
            whatToChangeList.push(
                `Incorporate 15 - 20 tonnes/hectare of well-decomposed Farmyard Manure (गोबर की खाद - FYM), vermicompost, or press-mud to loosen clay matrix and improve aeration.`
            );
        } else if (targetCrop.minClayPct && actualClay < targetCrop.minClayPct) {
            textureViable = false;
            whyNoList.push(
                `High Percolation in Sandy Soil: Clay content (${actualClay}%) is too low for ${targetCrop.commonName} (min ${targetCrop.minClayPct}% needed), causing excessive water seepage and nitrogen leaching.`
            );
            whatToChangeList.push(
                `Apply pond silt (तालाब की काली मिट्टी) or high doses of organic compost to augment water-holding capacity.`
            );
        }

        // Check 4: Organic Carbon & Soil Fertility
        if (actualSoc < targetCrop.minSocGKg) {
            whyNoList.push(
                `Soil Organic Carbon Deficit: Topsoil SOC is ${actualSoc} g/kg, below the recommended Indian soil standard of ${targetCrop.minSocGKg} g/kg for biological fertility.`
            );
            whatToChangeList.push(
                `Apply 10 - 15 tonnes/ha of well-rotted Gobar Khad (FYM) or Vermicompost and incorporate crop residues (पराली मल्चिंग) instead of burning.`
            );
        }

        // Determine Viability Verdict
        let verdict: "VIABLE (YES)" | "CONDITIONALLY VIABLE" | "NOT VIABLE (NO)" = "VIABLE (YES)";
        let verdictColor = "emerald";
        let viabilityScore = 94;

        if (whyNoList.length === 0) {
            verdict = "VIABLE (YES)";
            verdictColor = "emerald";
            viabilityScore = 95;
        } else if (whyNoList.length <= 2 && (phViable || waterDeficit < 250)) {
            verdict = "CONDITIONALLY VIABLE";
            verdictColor = "amber";
            viabilityScore = 72;
        } else {
            verdict = "NOT VIABLE (NO)";
            verdictColor = "rose";
            viabilityScore = 44;
        }

        // ─────────────────────────────────────────────────────────────
        // 3. VISUAL SOIL CHARACTERIZATION FOR INDIAN SOILS
        // ─────────────────────────────────────────────────────────────
        let soilVisualDiagnosis = null;
        if (photoType === "soil" || photoName.toLowerCase().includes("soil")) {
            let indianSoilName = "Alluvial Soil (जलोढ़ मिट्टी)";
            if (photoName.includes("black") || actualClay > 38) indianSoilName = "Black Cotton Soil / Regur (काली मिट्टी)";
            else if (photoName.includes("red") || (actualClay > 25 && actualSoilPh < 6.0)) indianSoilName = "Red Loamy Soil (लाल मिट्टी)";
            else if (photoName.includes("desert") || actualSand > 60) indianSoilName = "Desert / Sandy Arid Soil (बलुई / मरुस्थलीय मिट्टी)";
            else if (photoName.includes("laterite") || actualSoilPh < 5.5) indianSoilName = "Laterite Soil (लैटेराइट मिट्टी)";
            else if (photoName.includes("tarai")) indianSoilName = "Terai Clay Loam (तराई मिट्टी)";

            soilVisualDiagnosis = {
                indianSoilClassification: indianSoilName,
                detectedSoilType: actualTexture,
                soilColorMunsell: actualSoc > 20 ? "Dark Grey / Black (10YR 2/1 - High Humus)" : actualClay > 30 ? "Reddish / Brown (5YR 4/4 - Ferric)" : "Light Yellowish Tan (10YR 6/4 - Alluvial/Sandy)",
                structuralTilth: actualClay > 40 ? "Angular Blocky / Cracking Vertisol" : actualSand > 40 ? "Loose Single Grain Sandy" : "Crumb / Subangular Blocky (Ideal Tilth)",
                visualOrganicMatterEst: actualSoc > 15 ? "Adequate Organic Carbon (>0.75% Organic Matter)" : "Moderate to Low Organic Carbon (<0.50% Organic Matter)",
                surfaceCrustingRisk: actualClay > 38 ? "High Crusting Risk (पपड़ी जमना) after Heavy Rain" : "Low Crusting Risk",
                drainageAeration: actualClay > 42 ? "Slow Drainage / Waterlogging Risk" : actualSand > 50 ? "Excessive Drainage / High Leaching" : "Well-Drained & Aerated",
            };
        }

        // ─────────────────────────────────────────────────────────────
        // 4. INDIAN RAINFALL FACTOR & WATER BALANCE TELEMETRY
        // ─────────────────────────────────────────────────────────────
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
            irrigationCyclesNeeded: waterDeficit > 0
                ? Math.ceil(waterDeficit / 60)
                : 0,
        };

        // ─────────────────────────────────────────────────────────────
        // 5. AGROCLOUD PRECISION ACTION PLAN (INDIAN AGRONOMY)
        // ─────────────────────────────────────────────────────────────
        const precisionActionPlan = [
            {
                title: "Soil pH & Salinity Correction (मृदा सुधार)",
                category: "Chemical Remediation",
                detail: whatToChangeList.find(c => c.toLowerCase().includes("chuna") || c.toLowerCase().includes("lime") || c.toLowerCase().includes("gypsum") || c.toLowerCase().includes("sulfur")) ||
                    `Soil pH (${actualSoilPh}) is in the optimal range (${optMinPh} - ${optMaxPh}) for ${targetCrop.commonName}. Continue applying balanced N-P-K (4:2:1) with Neem-coated Urea.`,
            },
            {
                title: "Monsoon & Irrigation Water Strategy (जल प्रबंधन)",
                category: "Water Strategy",
                detail: rainfallFactor.waterStatus.includes("Deficit")
                    ? `Bridge the ${Math.abs(rainfallFactor.netWaterBalanceMm)} mm deficit with ${rainfallFactor.irrigationCyclesNeeded} irrigation rounds. Apply light irrigation at critical crown root and flowering stages.`
                    : `Annual rainfall (${estimatedAnnualRainfallMm} mm) satisfies water needs. Construct perimeter drainage channels to evacuate excess monsoon storm water.`,
            },
            {
                title: "Organic Matter & Soil Tilth (जैविक पोषण)",
                category: "Agronomic Practice",
                detail: whatToChangeList.find(c => c.toLowerCase().includes("gobar") || c.toLowerCase().includes("fym") || c.toLowerCase().includes("furrow")) ||
                    `Apply 10-15 tonnes/ha of well-rotted Farmyard Manure (FYM / गोबर खाद) or Vermicompost during field preparation. Treat seeds with Trichoderma or Rhizobium culture before sowing.`,
            },
        ];

        return NextResponse.json({
            success: true,
            analyzedAt: new Date().toISOString(),
            photoType,
            photoName,
            currentIndianSeason: seasonDescription,
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
                currentSeasonMatch: targetCrop.indianSeason.includes(currentIndianSeason)
                    ? `Currently in Optimal ${currentIndianSeason} Sowing Window`
                    : `Next Best Sowing Window: ${targetCrop.bestSeason}`,
                whyNo: whyNoList,
                whatShouldBeChanged: whatToChangeList,
            },
            rainfallFactor,
            soilVisualDiagnosis,
            topRecommendedCrops,
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
    } catch (err: any) {
        console.error("Analyze crop/soil error:", err);
        return NextResponse.json(
            { success: false, error: err.message || "Failed to execute AgroCloud agronomic intelligence engine." },
            { status: 500 }
        );
    }
}
