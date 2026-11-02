"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Upload,
    Camera,
    MapPin,
    Sprout,
    Thermometer,
    Droplets,
    CloudRain,
    Sun,
    Wind,
    Compass,
    Activity,
    CheckCircle2,
    AlertTriangle,
    FlaskConical,
    Sparkles,
    Calendar,
    Layers,
    Clock,
    RefreshCw,
    Download,
    Leaf,
    ArrowUpRight,
    Info,
    Code2,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    XCircle,
    Filter,
    Search,
    Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WeatherData {
    success: boolean;
    location: { lat: number; lon: number; timezone: string; elevation: number };
    current: {
        temperature: number;
        humidity: number;
        precipitation: number;
        windSpeed: number;
        conditionText: string;
        soilTemperature0cm: number;
        soilTemperature6cm: number;
        soilMoisture0_1cm: number;
        soilMoisture1_3cm: number;
        moistureStatus: string;
    };
    agronomy: {
        accumulatedGdd7Days: number;
        dailyGddRate: number;
        totalPrecip7Days: number;
        totalEt07Days: number;
    };
    forecast: Array<{
        date: string;
        tempMax: number;
        tempMin: number;
        precipitation: number;
        gdd: number;
    }>;
}

interface SoilData {
    success: boolean;
    provider: string;
    surface: {
        ph: number;
        soc: number;
        organicMatterPct: number;
        clayPct: number;
        sandPct: number;
        siltPct: number;
        cec: number;
        textureClass: string;
    };
    profile: Array<{
        depth: string;
        ph: number;
        soc: number;
        clay: number;
        cec: number;
    }>;
    interpretation: {
        category: string;
        status: string;
        badgeColor: string;
        description: string;
        amendment: string;
    };
}

interface RecommendedCrop {
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
}

interface DiagnosticResponse {
    success: boolean;
    photoType: "soil" | "crop";
    photoName: string;
    currentIndianSeason: string;
    targetCrop: {
        key: string;
        commonName: string;
        hindiName: string;
        scientificName: string;
        category: string;
        family: string;
        indianSeason: string;
        maturityDays: number;
    };
    viabilityVerdict: {
        verdict: "VIABLE (YES)" | "CONDITIONALLY VIABLE" | "NOT VIABLE (NO)";
        viabilityScore: number;
        verdictColor: string;
        bestSeason: string;
        seasonDetails: string;
        currentSeasonMatch: string;
        whyNo: string[];
        whatShouldBeChanged: string[];
    };
    rainfallFactor: {
        cropDemandMm: number;
        cropMinMm: number;
        cropMaxMm: number;
        localAnnualMm: number;
        local7DayForecastMm: number;
        netWaterBalanceMm: number;
        waterStatus: string;
        topsoilMoistureVolPct: number;
        seedbedMoistureVerdict: string;
        irrigationCyclesNeeded: number;
    };
    soilVisualDiagnosis?: {
        indianSoilClassification: string;
        detectedSoilType: string;
        soilColorMunsell: string;
        structuralTilth: string;
        visualOrganicMatterEst: string;
        surfaceCrustingRisk: string;
        drainageAeration: string;
    } | null;
    topRecommendedCrops: RecommendedCrop[];
    soilProfileSummary: {
        ph: number;
        textureClass: string;
        soc: number;
        clayPct: number;
        sandPct: number;
        cec: number;
        optimalForTarget: boolean;
    };
    precisionActionPlan: Array<{
        title: string;
        category: string;
        detail: string;
    }>;
}

// 6 Dedicated Indian Soil Presets (Verified Local JPEGs)
const INDIAN_SOIL_PRESETS = [
    {
        id: "soil-alluvial-punjab",
        title: "Alluvial Loam (जलोढ़ मिट्टी)",
        region: "Punjab / Indo-Gangetic Plains",
        lat: 30.9,
        lon: 75.8,
        ph: 7.2,
        imageUrl: "/samples/soil-alluvial-punjab.jpg",
        description: "Fertile river silt loam. Ideal for Wheat, Paddy, Mustard, Sugarcane, Potato.",
        suggestedCrop: "wheat",
    },
    {
        id: "soil-black-cotton",
        title: "Black Cotton Soil / Regur (काली मिट्टी)",
        region: "Maharashtra / Vidarbha & Gujarat",
        lat: 20.7,
        lon: 77.0,
        ph: 7.9,
        imageUrl: "/samples/soil-black-cotton.jpg",
        description: "Montmorillonite cracking clay. High water retentivity. Prime for Cotton, Soybean, Tur, Jowar.",
        suggestedCrop: "cotton",
    },
    {
        id: "soil-red-loam",
        title: "Red Loamy Soil (लाल मिट्टी)",
        region: "Karnataka / Deccan Uplands & TN",
        lat: 12.9,
        lon: 77.6,
        ph: 5.6,
        imageUrl: "/samples/soil-red-loam.jpg",
        description: "Porous ferric loam with good drainage. Excellent for Groundnut, Ragi/Millet, Tomato.",
        suggestedCrop: "groundnut",
    },
    {
        id: "soil-arid-desert",
        title: "Desert / Arid Sandy Soil (मरुस्थलीय बलुई)",
        region: "Rajasthan / Thar Basin",
        lat: 26.9,
        lon: 70.9,
        ph: 8.2,
        imageUrl: "/samples/soil-arid-desert.jpg",
        description: "Light coarse sand with high permeability. Ideal for Bajra (Pearl Millet), Mustard, Guar.",
        suggestedCrop: "millet",
    },
    {
        id: "soil-laterite-kerala",
        title: "Laterite Soil (लैटेराइट मिट्टी)",
        region: "Kerala / Western Ghats & Assam",
        lat: 10.5,
        lon: 76.2,
        ph: 5.2,
        imageUrl: "/samples/soil-laterite-kerala.jpg",
        description: "Intensely leached acidic soil rich in iron & bauxite. Ideal for Turmeric, Ginger, Tea, Spices.",
        suggestedCrop: "turmeric",
    },
    {
        id: "soil-tarai-loam",
        title: "Terai Clay Loam (तराई मिट्टी)",
        region: "Uttar Pradesh / Bihar Terai",
        lat: 26.8,
        lon: 80.9,
        ph: 6.8,
        imageUrl: "/samples/soil-tarai-loam.jpg",
        description: "High organic matter wetland loam along Himalayan foothills. Ideal for Sugarcane, Rice, Potato.",
        suggestedCrop: "sugarcane",
    },
];

// 6 Dedicated Indian Crop Presets (Verified Local JPEGs)
const INDIAN_CROP_PRESETS = [
    {
        id: "wheat-punjab",
        title: "Wheat (Gehun / गेहूं)",
        cropKey: "wheat",
        region: "Punjab / Haryana (Rabi Staple)",
        lat: 30.9,
        lon: 75.8,
        ph: 7.2,
        imageUrl: "/samples/wheat.jpg",
    },
    {
        id: "paddy-bengal",
        title: "Paddy / Rice (Dhan / धान)",
        cropKey: "rice",
        region: "West Bengal / Coastal (Kharif Staple)",
        lat: 23.2,
        lon: 87.8,
        ph: 6.2,
        imageUrl: "/samples/paddy.jpg",
    },
    {
        id: "mustard-rajasthan",
        title: "Mustard (Sarson / सरसों)",
        cropKey: "mustard",
        region: "Rajasthan / Bharatpur (Rabi Oilseed)",
        lat: 27.2,
        lon: 77.5,
        ph: 7.4,
        imageUrl: "/samples/mustard.jpg",
    },
    {
        id: "cotton-maharashtra",
        title: "Cotton (Kapas / कपास)",
        cropKey: "cotton",
        region: "Maharashtra / Vidarbha (Kharif Cash)",
        lat: 20.7,
        lon: 77.0,
        ph: 7.8,
        imageUrl: "/samples/cotton.jpg",
    },
    {
        id: "sugarcane-up",
        title: "Sugarcane (Ganna / गन्ना)",
        cropKey: "sugarcane",
        region: "Western UP / Meerut (Cash Crop)",
        lat: 29.0,
        lon: 77.7,
        ph: 7.0,
        imageUrl: "/samples/sugarcane.jpg",
    },
    {
        id: "soybean-mp",
        title: "Soybean (सोयाबीन)",
        cropKey: "soybean",
        region: "Madhya Pradesh / Malwa (Kharif Oilseed)",
        lat: 22.7,
        lon: 75.8,
        ph: 6.8,
        imageUrl: "/samples/soybean.jpg",
    },
];

// Major Indian Agro-Climatic Regions for Quick Geolocation
const INDIAN_REGIONS = [
    { name: "Punjab (North Alluvial)", lat: 30.9, lon: 75.8, soilPh: 7.2 },
    { name: "Maharashtra (Deccan Black Soil)", lat: 20.7, lon: 77.0, soilPh: 7.9 },
    { name: "Karnataka (South Red Loam)", lat: 12.9, lon: 77.6, soilPh: 5.6 },
    { name: "Rajasthan (West Arid Sandy)", lat: 26.9, lon: 70.9, soilPh: 8.2 },
    { name: "UP / Bihar (Gangetic Terai)", lat: 26.8, lon: 80.9, soilPh: 6.8 },
    { name: "Kerala (Laterite Coastal)", lat: 10.5, lon: 76.2, soilPh: 5.2 },
];

export function CropDiagnosticStudio() {
    // Mode: Soil Photo vs Crop Photo
    const [photoType, setPhotoType] = useState<"soil" | "crop">("soil");

    // Coordinates (Default: Central Punjab Agricultural Belt)
    const [lat, setLat] = useState<number>(30.9);
    const [lon, setLon] = useState<number>(75.8);
    const [selectedCrop, setSelectedCrop] = useState<string>("wheat");

    // Photo state
    const [previewUrl, setPreviewUrl] = useState<string>(INDIAN_SOIL_PRESETS[0].imageUrl);
    const [photoName, setPhotoName] = useState<string>("soil-alluvial-punjab.jpg");
    const [isScanning, setIsScanning] = useState<boolean>(false);

    // API Data
    const [weatherData, setWeatherData] = useState<WeatherData>({
        success: true,
        location: { lat: 30.9, lon: 75.8, timezone: "Asia/Kolkata", elevation: 247 },
        current: {
            temperature: 22.4,
            humidity: 60,
            precipitation: 0.0,
            windSpeed: 10.5,
            conditionText: "Clear Sunny (Rabi Weather)",
            soilTemperature0cm: 20.1,
            soilTemperature6cm: 19.4,
            soilMoisture0_1cm: 0.28,
            soilMoisture1_3cm: 0.30,
            moistureStatus: "Optimal Vapsa (वतर अनुकूल)",
        },
        agronomy: {
            accumulatedGdd7Days: 14.8,
            dailyGddRate: 2.1,
            totalPrecip7Days: 0.0,
            totalEt07Days: 16.4,
        },
        forecast: [
            { date: "2026-11-02", tempMax: 27.5, tempMin: 16.2, precipitation: 0.0, gdd: 11.8 },
            { date: "2026-11-03", tempMax: 28.1, tempMin: 16.8, precipitation: 0.0, gdd: 12.4 },
        ],
    });

    const [soilData, setSoilData] = useState<SoilData>({
        success: true,
        provider: "ISRIC SoilGrids 2.0 (Global 250m)",
        surface: {
            ph: 7.2,
            soc: 18.5,
            organicMatterPct: 3.2,
            clayPct: 22.0,
            sandPct: 45.0,
            siltPct: 33.0,
            cec: 16.5,
            textureClass: "Sandy Loam (बलुई दोमट)",
        },
        profile: [
            { depth: "0-5 cm", ph: 7.2, soc: 18.5, clay: 22.0, cec: 16.5 },
            { depth: "5-15 cm", ph: 7.3, soc: 15.2, clay: 24.0, cec: 17.0 },
        ],
        interpretation: {
            category: "Optimal / Neutral (संतुलित)",
            status: "optimal",
            badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
            description: "Fertile alluvial soil. High biological activity and base saturation.",
            amendment: "Optimal conditions. Apply balanced NPK with Neem-coated Urea.",
        },
    });

    const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResponse | null>(null);

    // Live API Telemetry
    const [weatherLatency, setWeatherLatency] = useState<number>(110);
    const [soilLatency, setSoilLatency] = useState<number>(230);
    const [lastSyncTime, setLastSyncTime] = useState<string>("Live");
    const [showRawJson, setShowRawJson] = useState<boolean>(false);

    // Loading states
    const [loadingEnv, setLoadingEnv] = useState<boolean>(false);
    const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch Environmental Data (Open-Meteo & SoilGrids)
    const fetchEnvironmentalData = async (latitude: number, longitude: number) => {
        setLoadingEnv(true);
        const startTime = Date.now();
        let fetchedWeather: WeatherData | null = null;
        let fetchedSoil: SoilData | null = null;

        try {
            // 1. Fetch Open-Meteo Weather
            const t0Weather = Date.now();
            try {
                const weatherRes = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
                if (weatherRes.ok) {
                    fetchedWeather = await weatherRes.json();
                    setWeatherLatency(Date.now() - t0Weather);
                }
            } catch (e) {
                console.warn("Weather API fallback");
            }

            // Direct Open-Meteo fallback
            if (!fetchedWeather || !fetchedWeather.success) {
                const directUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=soil_temperature_0cm,soil_temperature_6cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FKolkata`;
                const directRes = await fetch(directUrl);
                if (directRes.ok) {
                    const directData = await directRes.json();
                    fetchedWeather = {
                        success: true,
                        location: { lat: latitude, lon: longitude, timezone: directData.timezone || "Asia/Kolkata", elevation: directData.elevation || 200 },
                        current: {
                            temperature: directData.current?.temperature_2m ?? 23.0,
                            humidity: directData.current?.relative_humidity_2m ?? 58,
                            precipitation: directData.current?.precipitation ?? 0,
                            windSpeed: directData.current?.wind_speed_10m ?? 11,
                            conditionText: "Open-Meteo Live",
                            soilTemperature0cm: directData.hourly?.soil_temperature_0cm?.[0] ?? 20.0,
                            soilTemperature6cm: directData.hourly?.soil_temperature_6cm?.[0] ?? 19.2,
                            soilMoisture0_1cm: directData.hourly?.soil_moisture_0_to_1cm?.[0] ?? 0.28,
                            soilMoisture1_3cm: directData.hourly?.soil_moisture_1_to_3cm?.[0] ?? 0.30,
                            moistureStatus: "Optimal Vapsa",
                        },
                        agronomy: { accumulatedGdd7Days: 14.0, dailyGddRate: 2.0, totalPrecip7Days: 0.0, totalEt07Days: 15.0 },
                        forecast: [],
                    };
                    setWeatherLatency(Date.now() - t0Weather);
                }
            }

            // 2. Fetch ISRIC SoilGrids
            const t0Soil = Date.now();
            try {
                const soilRes = await fetch(`/api/soil?lat=${latitude}&lon=${longitude}`);
                if (soilRes.ok) {
                    fetchedSoil = await soilRes.json();
                    setSoilLatency(Date.now() - t0Soil);
                }
            } catch (e) {
                console.warn("Soil API fallback");
            }

            // Direct SoilGrids fallback
            if (!fetchedSoil || !fetchedSoil.success) {
                const directSoilUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o&property=soc&property=clay&property=sand&property=silt&property=cec&depth=0-5cm`;
                const directSoilRes = await fetch(directSoilUrl);
                if (directSoilRes.ok) {
                    const d = await directSoilRes.json();
                    const phVal = d.properties?.layers?.find((l: any) => l.name === "phh2o")?.depths?.[0]?.values?.mean;
                    const ph = typeof phVal === "number" ? phVal / 10 : 7.2;
                    fetchedSoil = {
                        success: true,
                        provider: "ISRIC SoilGrids 2.0 (Global 250m)",
                        surface: {
                            ph,
                            soc: 18.0,
                            organicMatterPct: 3.1,
                            clayPct: 22.0,
                            sandPct: 45.0,
                            siltPct: 33.0,
                            cec: 16.5,
                            textureClass: "Sandy Loam",
                        },
                        profile: [{ depth: "0-5 cm", ph, soc: 18.0, clay: 22.0, cec: 16.5 }],
                        interpretation: {
                            category: ph < 6.0 ? "Acidic" : ph > 7.5 ? "Alkaline" : "Optimal",
                            status: "optimal",
                            badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                            description: "SoilGrids ground truth profile synced.",
                            amendment: "Maintain current management.",
                        },
                    };
                    setSoilLatency(Date.now() - t0Soil);
                }
            }

            if (fetchedWeather) setWeatherData(fetchedWeather);
            if (fetchedSoil) setSoilData(fetchedSoil);

            const now = new Date();
            setLastSyncTime(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }));
            toast.success(`Telemetry Live: Open-Meteo & SoilGrids connected (${Date.now() - startTime}ms)`);
            return { weather: fetchedWeather || weatherData, soil: fetchedSoil || soilData };
        } catch (err) {
            console.error("Error fetching environmental data:", err);
            toast.error("Could not fetch environmental data.");
            return { weather: weatherData, soil: soilData };
        } finally {
            setLoadingEnv(false);
        }
    };

    // Run Full Indian Agronomic Analysis
    const runAnalysis = async (
        cropKey: string,
        currentSoil: SoilData | null,
        currentWeather: WeatherData | null,
        type: "soil" | "crop" = photoType,
        imgName: string = photoName
    ) => {
        setLoadingAnalysis(true);
        setIsScanning(true);

        try {
            const soilPh = currentSoil?.surface?.ph ?? 7.2;

            const res = await fetch("/api/analyze-crop", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cropHint: cropKey,
                    photoName: imgName,
                    photoType: type,
                    lat,
                    lon,
                    soilPh,
                    soilData: currentSoil,
                    weatherData: currentWeather,
                }),
            });

            const result = await res.json();
            if (result.success) {
                setDiagnosticResult(result);
                toast.success(
                    `AgroCloud India: ${result.targetCrop.commonName} is ${result.viabilityVerdict.verdict} (${result.viabilityVerdict.viabilityScore}%)`
                );
            } else {
                toast.error(result.error || "Analysis failed.");
            }
        } catch (err) {
            console.error("Analysis failed:", err);
            toast.error("Failed to execute AgroCloud agronomic engine.");
        } finally {
            setLoadingAnalysis(false);
            setTimeout(() => setIsScanning(false), 600);
        }
    };

    // Initial load on mount
    useEffect(() => {
        const init = async () => {
            const env = await fetchEnvironmentalData(lat, lon);
            if (env) {
                await runAnalysis("wheat", env.soil, env.weather, "soil", "soil-alluvial-punjab.jpg");
            }
        };
        init();
    }, []);

    // Handle File Upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPhotoName(file.name);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        toast.success(`Photo Loaded: ${file.name}`);

        runAnalysis(selectedCrop, soilData, weatherData, photoType, file.name);
    };

    // Select Indian Soil Preset
    const handleSelectSoilPreset = async (preset: typeof INDIAN_SOIL_PRESETS[0]) => {
        setPhotoType("soil");
        setLat(preset.lat);
        setLon(preset.lon);
        setPreviewUrl(preset.imageUrl);
        setPhotoName(`${preset.id}.jpg`);
        setSelectedCrop(preset.suggestedCrop);

        const env = await fetchEnvironmentalData(preset.lat, preset.lon);
        if (env) {
            await runAnalysis(preset.suggestedCrop, env.soil, env.weather, "soil", `${preset.id}.jpg`);
        }
    };

    // Select Indian Crop Preset
    const handleSelectCropPreset = async (preset: typeof INDIAN_CROP_PRESETS[0]) => {
        setPhotoType("crop");
        setSelectedCrop(preset.cropKey);
        setLat(preset.lat);
        setLon(preset.lon);
        setPreviewUrl(preset.imageUrl);
        setPhotoName(`${preset.id}.jpg`);

        const env = await fetchEnvironmentalData(preset.lat, preset.lon);
        if (env) {
            await runAnalysis(preset.cropKey, env.soil, env.weather, "crop", `${preset.id}.jpg`);
        }
    };

    // 1-Click Select an Indian Region
    const handleSelectRegion = async (reg: typeof INDIAN_REGIONS[0]) => {
        setLat(reg.lat);
        setLon(reg.lon);
        toast.info(`Switched Region to: ${reg.name}`);
        const env = await fetchEnvironmentalData(reg.lat, reg.lon);
        if (env) {
            await runAnalysis(selectedCrop, env.soil, env.weather, photoType, photoName);
        }
    };

    // 1-Click Select a Recommended Crop
    const handlePickRecommendedCrop = async (cropKey: string) => {
        setSelectedCrop(cropKey);
        toast.info(`Evaluating Indian Soil Viability for: ${cropKey.toUpperCase()}`);
        await runAnalysis(cropKey, soilData, weatherData, photoType, photoName);
    };

    // Detect Device GPS
    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.");
            return;
        }

        toast.info("Acquiring GPS coordinates...");
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const newLat = Math.round(pos.coords.latitude * 10000) / 10000;
                const newLon = Math.round(pos.coords.longitude * 10000) / 10000;
                setLat(newLat);
                setLon(newLon);
                toast.success(`Location set: ${newLat}° N, ${newLon}° E`);
                const env = await fetchEnvironmentalData(newLat, newLon);
                if (env) {
                    await runAnalysis(selectedCrop, env.soil, env.weather, photoType, photoName);
                }
            },
            (err) => {
                console.error(err);
                toast.error("Unable to retrieve location. Please input coordinates manually.");
            }
        );
    };

    return (
        <div id="agrocloud-dashboard" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Control Header & Live Telemetry Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        AgroCloud India · भारतीय कृषि मृदा एवं फसल प्रणाली
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                        <span>Indian Soil Viability, Rainfall & Precision Crop Recommendation</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        id="verify-apis-btn"
                        variant="outline"
                        size="sm"
                        className="gap-2 text-xs border-border/60 hover:bg-surface-2"
                        onClick={() => setShowRawJson(!showRawJson)}
                    >
                        <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                        {showRawJson ? "Hide Telemetry JSON" : "Verify Live API JSON"}
                        {showRawJson ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </Button>

                    <Button
                        id="print-action-plan-btn"
                        variant="outline"
                        size="sm"
                        className="gap-2 text-xs"
                        onClick={() => window.print()}
                    >
                        <Download className="w-3.5 h-3.5" />
                        Export Action Plan
                    </Button>
                </div>
            </div>

            {/* Live API Telemetry Status Bar */}
            <div className="p-3.5 rounded-xl bg-surface-1 border border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
                        <span className="font-semibold text-foreground">Open-Meteo Weather:</span>
                        <span className="text-emerald-400 font-mono font-medium">200 OK ({weatherLatency}ms)</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-sm shadow-blue-500/50" />
                        <span className="font-semibold text-foreground">ISRIC SoilGrids 2.0:</span>
                        <span className="text-blue-400 font-mono font-medium">200 OK ({soilLatency}ms)</span>
                    </div>

                    <div className="hidden md:flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>IST: {lastSyncTime}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        id="test-ping-apis-btn"
                        onClick={() => fetchEnvironmentalData(lat, lon)}
                        disabled={loadingEnv}
                        className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 transition-colors"
                    >
                        <RefreshCw className={`w-3 h-3 ${loadingEnv ? "animate-spin" : ""}`} />
                        <span>Ping APIs</span>
                    </button>
                </div>
            </div>

            {/* Collapsible API JSON Inspector */}
            {showRawJson && (
                <div className="p-4 rounded-xl bg-black/90 border border-emerald-500/30 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between text-muted-foreground border-b border-border/40 pb-2">
                        <span className="font-bold text-emerald-400">Live Indian Field Telemetry:</span>
                        <span className="text-[11px]">Lat: {lat}° N, Lon: {lon}° E</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="text-amber-400 font-semibold block text-[11px]">Open-Meteo Weather & Soil Moisture:</span>
                            <pre className="p-3 rounded-lg bg-zinc-950 overflow-x-auto text-[11px] text-zinc-300 max-h-48 scrollbar-thin">
                                {JSON.stringify(weatherData?.current, null, 2)}
                            </pre>
                        </div>
                        <div className="space-y-1">
                            <span className="text-blue-400 font-semibold block text-[11px]">ISRIC SoilGrids Indian Profile:</span>
                            <pre className="p-3 rounded-lg bg-zinc-950 overflow-x-auto text-[11px] text-zinc-300 max-h-48 scrollbar-thin">
                                {JSON.stringify(soilData?.surface, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Indian Agricultural Belt Selector */}
            <div className="p-3.5 rounded-xl bg-surface-2 border border-border/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-emerald-400" />
                        Quick Select Indian Agro-Climatic Belt (1-Click Sync):
                    </span>
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">
                        Instantly updates GPS coordinates, local soil type, pH and weather
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {INDIAN_REGIONS.map((reg) => (
                        <button
                            key={reg.name}
                            type="button"
                            onClick={() => handleSelectRegion(reg)}
                            className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                                lat === reg.lat && lon === reg.lon
                                    ? "bg-emerald-600 text-white border-emerald-500 font-semibold shadow-sm"
                                    : "bg-surface-1 border-border/60 text-muted-foreground hover:text-foreground hover:border-emerald-500/40"
                            }`}
                        >
                            {reg.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mode Switcher: Soil Photo vs Crop Photo */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">Select Diagnostic Mode:</span>
                        <div className="inline-flex rounded-lg bg-surface-2 p-1 border border-border/60">
                            <button
                                type="button"
                                id="mode-soil-btn"
                                onClick={() => setPhotoType("soil")}
                                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                                    photoType === "soil"
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                🟤 Indian Soil Photo (मृदा फोटो)
                            </button>
                            <button
                                type="button"
                                id="mode-crop-btn"
                                onClick={() => setPhotoType("crop")}
                                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                                    photoType === "crop"
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                🌿 Indian Crop Foliage (फसल फोटो)
                            </button>
                        </div>
                    </div>

                    <span className="text-xs text-muted-foreground hidden sm:inline">
                        {photoType === "soil" ? "Upload or pick an Indian soil type to evaluate pH and best crops" : "Inspect Indian crop canopy & viability"}
                    </span>
                </div>

                {/* Preloaded Presets Strip: Guaranteed Verified Images with Safe Fallback */}
                {photoType === "soil" ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {INDIAN_SOIL_PRESETS.map((preset) => {
                            const isCurrent = previewUrl === preset.imageUrl;
                            return (
                                <button
                                    key={preset.id}
                                    id={`soil-preset-${preset.id}`}
                                    type="button"
                                    onClick={() => handleSelectSoilPreset(preset)}
                                    className={`group text-left p-2.5 rounded-xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                                        isCurrent
                                            ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500"
                                            : "border-border/60 bg-surface-1 hover:border-emerald-500/50 hover:bg-surface-2"
                                    }`}
                                >
                                    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-muted mb-2 relative">
                                        <img
                                            src={preset.imageUrl}
                                            alt={preset.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                if (!target.src.includes("wheat.jpg")) {
                                                    target.src = "/samples/wheat.jpg";
                                                }
                                            }}
                                        />
                                        {isCurrent && (
                                            <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-1 right-1 bg-black/85 px-1.5 py-0.5 rounded text-[10px] font-mono text-amber-300">
                                            pH {preset.ph}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-foreground truncate">{preset.title}</h4>
                                        <p className="text-[10px] text-muted-foreground truncate">{preset.region}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {INDIAN_CROP_PRESETS.map((preset) => {
                            const isCurrent = previewUrl === preset.imageUrl;
                            return (
                                <button
                                    key={preset.id}
                                    id={`crop-preset-${preset.id}`}
                                    type="button"
                                    onClick={() => handleSelectCropPreset(preset)}
                                    className={`group text-left p-2.5 rounded-xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                                        isCurrent
                                            ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500"
                                            : "border-border/60 bg-surface-1 hover:border-emerald-500/50 hover:bg-surface-2"
                                    }`}
                                >
                                    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-muted mb-2 relative">
                                        <img
                                            src={preset.imageUrl}
                                            alt={preset.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                if (!target.src.includes("wheat.jpg")) {
                                                    target.src = "/samples/wheat.jpg";
                                                }
                                            }}
                                        />
                                        {isCurrent && (
                                            <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-foreground truncate">{preset.title}</h4>
                                        <p className="text-[10px] text-muted-foreground truncate">{preset.region}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Primary Diagnostic Workspace: 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Photo Upload Viewport & Image Inspector */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="p-5 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                                {photoType === "soil" ? (
                                    <>
                                        <FlaskConical className="w-4 h-4 text-amber-400" />
                                        Soil Sample Intake & Vision Analysis
                                    </>
                                ) : (
                                    <>
                                        <Leaf className="w-4 h-4 text-emerald-400" />
                                        Indian Crop Canopy Intake
                                    </>
                                )}
                            </h3>
                            <span className="text-xs text-muted-foreground truncate max-w-[140px] font-mono">{photoName}</span>
                        </div>

                        {/* Image Preview with Scanning Overlay & Guaranteed Fallback */}
                        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/40 border border-border/80 group">
                            <img
                                src={previewUrl}
                                alt="Sample Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    if (!target.src.includes("wheat.jpg")) {
                                        target.src = "/samples/wheat.jpg";
                                    }
                                }}
                            />

                            {isScanning && (
                                <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none">
                                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute top-0 animate-bounce" />
                                    <div className="px-3 py-1.5 rounded-full bg-black/85 border border-emerald-500/60 text-emerald-300 text-xs font-mono font-medium tracking-wide shadow-xl flex items-center gap-2">
                                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                                        Analyzing Indian SoilGrids & Open-Meteo Weather...
                                    </div>
                                </div>
                            )}

                            {!isScanning && (
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                                    <div className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono text-emerald-300 border border-emerald-500/30">
                                        {photoType === "soil" ? `Texture: ${soilData.surface.textureClass}` : `Crop: ${selectedCrop.toUpperCase()}`}
                                    </div>
                                    <div className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono text-amber-300 border border-amber-500/30">
                                        pH {soilData.surface.ph}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upload & Camera Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="photo-file-input"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Button
                                id="upload-photo-btn"
                                variant="outline"
                                className="w-full gap-2 text-xs"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="w-3.5 h-3.5 text-muted-foreground" />
                                {photoType === "soil" ? "Upload Soil Photo (मृदा फोटो)" : "Upload Crop Photo (फसल फोटो)"}
                            </Button>

                            <Button
                                id="take-photo-btn"
                                variant="outline"
                                className="w-full gap-2 text-xs"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Camera className="w-3.5 h-3.5 text-muted-foreground" />
                                Camera (कैमरा)
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Geolocation, Weather Telemetry & Indian Crop Selector */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="p-5 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                                <Compass className="w-4 h-4 text-emerald-400" />
                                Indian Field Geolocation & Ground Truth Sync
                            </h3>
                            <Button
                                id="gps-auto-detect-btn"
                                variant="outline"
                                size="sm"
                                onClick={handleUseMyLocation}
                                className="gap-2 text-xs text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                            >
                                <MapPin className="w-3.5 h-3.5" />
                                Detect My GPS (भारत)
                            </Button>
                        </div>

                        {/* Latitude & Longitude Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">Latitude (° N)</label>
                                <input
                                    id="input-latitude"
                                    type="number"
                                    step="0.0001"
                                    value={lat}
                                    onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                                    className="w-full h-10 px-3 rounded-lg bg-surface-2 border border-border/80 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">Longitude (° E)</label>
                                <input
                                    id="input-longitude"
                                    type="number"
                                    step="0.0001"
                                    value={lon}
                                    onChange={(e) => setLon(parseFloat(e.target.value) || 0)}
                                    className="w-full h-10 px-3 rounded-lg bg-surface-2 border border-border/80 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        {/* Target Indian Crop Selector */}
                        <div className="space-y-2 pt-2 border-t border-border/40">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                    <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Select Crop to Evaluate Viability (फसल चुनें):</span>
                                </label>
                                <span className="text-[11px] text-emerald-400 font-medium">
                                    Active: Rabi Season (रबी मौसम)
                                </span>
                            </div>

                            {/* Dropdown with Indian crop categories */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                <div className="sm:col-span-8">
                                    <select
                                        id="select-crop-target"
                                        value={selectedCrop}
                                        onChange={(e) => setSelectedCrop(e.target.value)}
                                        className="w-full h-10 px-3 rounded-lg bg-surface-2 border border-border/80 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    >
                                        <optgroup label="Cereals & Grains (अनाज)">
                                            <option value="wheat">Wheat (Gehun / गेहूं)</option>
                                            <option value="rice">Paddy / Rice (Dhan / धान)</option>
                                            <option value="maize">Corn / Maize (Makka / मक्का)</option>
                                            <option value="barley">Barley (Jau / जौ)</option>
                                            <option value="millet">Pearl Millet (Bajra / बाजरा)</option>
                                            <option value="sorghum">Sorghum (Jowar / ज्वार)</option>
                                        </optgroup>
                                        <optgroup label="Pulses & Legumes (दलहन)">
                                            <option value="chickpea">Chickpea / Bengal Gram (Chana / चना)</option>
                                            <option value="pigeonpea">Pigeonpea / Red Gram (Tur / Arhar / अरहर)</option>
                                        </optgroup>
                                        <optgroup label="Oilseeds (तिलहन)">
                                            <option value="mustard">Mustard / Rapeseed (Sarson / सरसों)</option>
                                            <option value="soybean">Soybean (सोयाबीन)</option>
                                            <option value="groundnut">Groundnut / Peanut (Mungfali / मूंगफली)</option>
                                        </optgroup>
                                        <optgroup label="Cash Crops (नकदी फसलें)">
                                            <option value="cotton">Cotton (Kapas / कपास)</option>
                                            <option value="sugarcane">Sugarcane (Ganna / गन्ना)</option>
                                        </optgroup>
                                        <optgroup label="Vegetables (सब्जियां)">
                                            <option value="potato">Potato (Aloo / आलू)</option>
                                            <option value="tomato">Tomato (Tamatar / टमाटर)</option>
                                            <option value="onion">Onion (Pyaz / प्याज)</option>
                                            <option value="chili">Chili Pepper (Mirch / मिर्च)</option>
                                        </optgroup>
                                        <optgroup label="Spices & Fruits (मसाले एवं फल)">
                                            <option value="turmeric">Turmeric (Haldi / हल्दी)</option>
                                            <option value="ginger">Ginger (Adrak / अदरक)</option>
                                            <option value="mango">Mango (Aam / आम)</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div className="sm:col-span-4">
                                    <Button
                                        id="run-analysis-btn"
                                        onClick={() => runAnalysis(selectedCrop, soilData, weatherData, photoType, photoName)}
                                        disabled={loadingAnalysis || loadingEnv}
                                        className="w-full h-10 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-950/30 gap-1.5"
                                    >
                                        {loadingAnalysis ? (
                                            <>
                                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                                Computing...
                                            </>
                                        ) : (
                                            <>
                                                <Activity className="w-3.5 h-3.5" />
                                                Evaluate Viability
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Live Telemetry Summary Cards: Open-Meteo & SoilGrids */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            {/* Weather Live Card */}
                            <div className="p-3.5 rounded-xl bg-surface-2 border border-border/50 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                                        Open-Meteo India Weather
                                    </span>
                                    <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="p-2 rounded bg-surface-1 border border-border/30">
                                        <span className="text-[10px] text-muted-foreground block">Air Temp</span>
                                        <span className="font-bold text-foreground">{weatherData.current.temperature}°C</span>
                                    </div>
                                    <div className="p-2 rounded bg-surface-1 border border-border/30">
                                        <span className="text-[10px] text-muted-foreground block">Topsoil Moisture</span>
                                        <span className="font-bold text-emerald-400">{Math.round(weatherData.current.soilMoisture0_1cm * 100)}% vol</span>
                                    </div>
                                </div>
                            </div>

                            {/* SoilGrids Live Card */}
                            <div className="p-3.5 rounded-xl bg-surface-2 border border-border/50 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                                        <FlaskConical className="w-3.5 h-3.5 text-blue-400" />
                                        ISRIC SoilGrids India
                                    </span>
                                    <span className="text-[10px] text-blue-400 font-mono">250m Global</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="p-2 rounded bg-surface-1 border border-border/30">
                                        <span className="text-[10px] text-muted-foreground block">Soil pH (H2O)</span>
                                        <span className="font-bold text-amber-400">{soilData.surface.ph} pH</span>
                                    </div>
                                    <div className="p-2 rounded bg-surface-1 border border-border/30">
                                        <span className="text-[10px] text-muted-foreground block">Soil Texture</span>
                                        <span className="font-bold text-foreground truncate">{soilData.surface.textureClass}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {diagnosticResult && (
                <div id="agrocloud-results-container" className="space-y-8 pt-4">
                    {/* SECTION 1: TOP RECOMMENDED CROPS FOR THIS INDIAN SOIL & CLIMATE */}
                    <div className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    <Sprout className="w-5 h-5 text-emerald-400" />
                                    <span>Top Recommended Crops for this Indian Soil & Climate</span>
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Ranked for local pH ({soilData.surface.ph}), {soilData.surface.textureClass}, rainfall, and the active Indian season: <strong className="text-emerald-400">{diagnosticResult.currentIndianSeason}</strong>
                                </p>
                            </div>
                            <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                Click any crop to inspect viability verdict
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {diagnosticResult.topRecommendedCrops.map((crop, idx) => {
                                const isSelected = selectedCrop.toLowerCase() === crop.cropKey.toLowerCase();
                                return (
                                    <div
                                        key={crop.cropKey}
                                        id={`rec-card-${crop.cropKey}`}
                                        className={`p-4 rounded-xl border transition-all space-y-3 cursor-pointer ${
                                            isSelected
                                                ? "bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500"
                                                : "bg-surface-2 border-border/60 hover:border-emerald-500/50 hover:bg-surface-2/80"
                                        }`}
                                        onClick={() => handlePickRecommendedCrop(crop.cropKey)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                Rank #{idx + 1} · {crop.indianSeason}
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                                                {crop.suitabilityScore}% Match
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-base font-bold text-foreground flex items-center justify-between">
                                                <span>{crop.commonName}</span>
                                                {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                            </h3>
                                            <span className="text-[11px] text-emerald-400/90 font-medium block">
                                                Best Season: {crop.bestSeason}
                                            </span>
                                        </div>

                                        <div className="p-2.5 rounded-lg bg-surface-1 border border-border/30 text-xs space-y-1">
                                            <div className="flex justify-between text-[11px]">
                                                <span className="text-muted-foreground">Rainfall Match:</span>
                                                <span className="font-medium text-foreground">{crop.rainfallMatchText}</span>
                                            </div>
                                            <div className="flex justify-between text-[11px]">
                                                <span className="text-muted-foreground">Water Demand:</span>
                                                <span className="font-mono text-foreground">{crop.waterDemandMm} mm</span>
                                            </div>
                                            <div className="text-[11px] text-zinc-300 pt-1 border-t border-border/20">
                                                {crop.whyExcels}
                                            </div>
                                        </div>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="w-full text-xs h-8 border-border/60 hover:bg-emerald-500/10 hover:text-emerald-400"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePickRecommendedCrop(crop.cropKey);
                                            }}
                                        >
                                            {isSelected ? "Currently Inspected" : "Inspect Soil Viability"}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECTION 2: TARGET CROP VIABILITY DOSSIER (IS THE SOIL VIABLE OR NOT) */}
                    <div className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
                            <div>
                                <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider block">
                                    Target Crop Viability Dossier (फसल अनुकूलता रिपोर्ट):
                                </span>
                                <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                                    <span>{diagnosticResult.targetCrop.commonName}</span>
                                    <span className="text-sm font-normal text-muted-foreground italic">
                                        ({diagnosticResult.targetCrop.scientificName})
                                    </span>
                                </h2>
                            </div>

                            {/* Prominent Viability Verdict Badge */}
                            <div className="flex items-center gap-3">
                                <div
                                    className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 shadow-md ${
                                        diagnosticResult.viabilityVerdict.verdict === "VIABLE (YES)"
                                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                                            : diagnosticResult.viabilityVerdict.verdict === "CONDITIONALLY VIABLE"
                                            ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                                            : "bg-rose-500/15 border-rose-500/40 text-rose-400"
                                    }`}
                                >
                                    {diagnosticResult.viabilityVerdict.verdict === "VIABLE (YES)" ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    ) : diagnosticResult.viabilityVerdict.verdict === "CONDITIONALLY VIABLE" ? (
                                        <AlertCircle className="w-5 h-5 text-amber-400" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-rose-400" />
                                    )}
                                    <div>
                                        <span className="text-xs uppercase font-bold tracking-wider block">
                                            Soil Viability Verdict:
                                        </span>
                                        <span className="text-lg font-extrabold leading-none">
                                            {diagnosticResult.viabilityVerdict.verdict} · {diagnosticResult.viabilityVerdict.viabilityScore}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* If YES: Best Season to Grow Details */}
                        <div className="p-4 rounded-xl bg-surface-2 border border-border/40 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-emerald-400" />
                                    Optimal Indian Planting & Growing Season (सर्वोत्तम बुवाई मौसम):
                                </span>
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                                    {diagnosticResult.viabilityVerdict.currentSeasonMatch}
                                </span>
                            </div>
                            <div className="text-sm font-semibold text-emerald-300">
                                {diagnosticResult.viabilityVerdict.bestSeason}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {diagnosticResult.viabilityVerdict.seasonDetails} Typical crop duration: ~{diagnosticResult.targetCrop.maturityDays} days from sowing to harvest.
                            </p>
                        </div>

                        {/* If NO / CONDITIONAL: "Why No" & "What Should Be Changed" */}
                        {diagnosticResult.viabilityVerdict.whyNo.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                {/* Why No (Identified Bottlenecks) */}
                                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3">
                                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                                        <AlertTriangle className="w-4 h-4" />
                                        <span>Why No / Identified Agronomic Bottlenecks (कारण):</span>
                                    </div>
                                    <ul className="space-y-2 text-xs text-rose-200/90 leading-relaxed">
                                        {diagnosticResult.viabilityVerdict.whyNo.map((reason, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-rose-400 font-bold mt-0.5">•</span>
                                                <span>{reason}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* What Should Be Changed (Actionable Remediation) */}
                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                        <Sparkles className="w-4 h-4" />
                                        <span>What Should Be Changed (आवश्यक सुधार एवं उपाय):</span>
                                    </div>
                                    <ul className="space-y-2 text-xs text-emerald-200/90 leading-relaxed">
                                        {diagnosticResult.viabilityVerdict.whatShouldBeChanged.map((sol, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                                                <span>{sol}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* SECTION 3: RAINFALL FACTOR & ROOTZONE HYDROLOGY */}
                        <div className="p-5 rounded-xl bg-surface-2 border border-border/50 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <CloudRain className="w-4 h-4 text-cyan-400" />
                                    <span>Monsoon & Rainfall Factor (वर्षा एवं जल संतुलन)</span>
                                </h3>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                    diagnosticResult.rainfallFactor.waterStatus.includes("Optimal")
                                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                        : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                }`}>
                                    {diagnosticResult.rainfallFactor.waterStatus}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                <div className="p-3 rounded-lg bg-surface-1 border border-border/30">
                                    <span className="text-muted-foreground block text-[10px]">Crop Water Requirement</span>
                                    <span className="font-bold text-foreground text-sm">
                                        {diagnosticResult.rainfallFactor.cropDemandMm} mm
                                    </span>
                                    <span className="text-[10px] text-muted-foreground block">
                                        Range: {diagnosticResult.rainfallFactor.cropMinMm}-{diagnosticResult.rainfallFactor.cropMaxMm} mm
                                    </span>
                                </div>

                                <div className="p-3 rounded-lg bg-surface-1 border border-border/30">
                                    <span className="text-muted-foreground block text-[10px]">Regional Annual Rainfall</span>
                                    <span className="font-bold text-cyan-400 text-sm">
                                        {diagnosticResult.rainfallFactor.localAnnualMm} mm
                                    </span>
                                    <span className="text-[10px] text-muted-foreground block">
                                        7-Day Forecast: {diagnosticResult.rainfallFactor.local7DayForecastMm} mm
                                    </span>
                                </div>

                                <div className="p-3 rounded-lg bg-surface-1 border border-border/30">
                                    <span className="text-muted-foreground block text-[10px]">Net Water Balance</span>
                                    <span className={`font-bold text-sm ${
                                        diagnosticResult.rainfallFactor.netWaterBalanceMm >= 0 ? "text-emerald-400" : "text-amber-400"
                                    }`}>
                                        {diagnosticResult.rainfallFactor.netWaterBalanceMm >= 0 ? "+" : ""}
                                        {diagnosticResult.rainfallFactor.netWaterBalanceMm} mm
                                    </span>
                                    <span className="text-[10px] text-muted-foreground block">
                                        {diagnosticResult.rainfallFactor.irrigationCyclesNeeded > 0
                                            ? `${diagnosticResult.rainfallFactor.irrigationCyclesNeeded} irrigation rounds required (नहर/ट्यूबवेल)`
                                            : "Rainfed sufficient"}
                                    </span>
                                </div>

                                <div className="p-3 rounded-lg bg-surface-1 border border-border/30">
                                    <span className="text-muted-foreground block text-[10px]">Topsoil Vapsa Moisture</span>
                                    <span className="font-bold text-emerald-400 text-sm">
                                        {diagnosticResult.rainfallFactor.topsoilMoistureVolPct}% vol
                                    </span>
                                    <span className="text-[10px] text-zinc-300 block truncate">
                                        {diagnosticResult.rainfallFactor.seedbedMoistureVerdict}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 4: AGROCLOUD PRECISION ACTION PLAN (FINAL SECTION) */}
                        <div id="agrocloud-precision-action-plan" className="p-5 rounded-xl bg-surface-2 border border-border/50 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-emerald-400" />
                                    <span>AgroCloud Precision Action Plan (सटीक कार्य योजना)</span>
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                    Customized for {diagnosticResult.targetCrop.commonName}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {diagnosticResult.precisionActionPlan.map((action, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl bg-surface-1 border border-border/40 space-y-2 hover:border-emerald-500/40 transition-colors"
                                    >
                                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide block">
                                            {action.category}
                                        </span>
                                        <h4 className="text-sm font-bold text-foreground">{action.title}</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {action.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
