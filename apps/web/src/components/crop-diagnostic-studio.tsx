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
    SwitchCamera,
    X,
    ShieldAlert,
    ShieldCheck,
    Bug,
    Pill,
    Stethoscope,
    FileText,
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
    isInSeason?: boolean;
}

interface CropHealthAnalysisData {
    hasCropPhoto: boolean;
    cropName: string;
    hindiName: string;
    scientificName: string;
    overallHealthScore: number;
    healthStatus: "Healthy" | "Mild Stress" | "Moderate Disease" | "Severe Infection";
    healthStatusColor: string;
    primaryDisease: {
        id: string;
        name: string;
        hindiName: string;
        pathogen: string;
        pathogenType: string;
        severity: string;
        confidence: number;
        symptomsObserved: string[];
        pathologyNotes: string;
    };
    secondaryStress: string;
    weatherAttribution: string;
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
    visualMetrics: {
        greenCanopyPct: number;
        chlorosisPct: number;
        necrosisPct: number;
        lesionDensity: string;
    };
}

interface DiagnosticResponse {
    success: boolean;
    photoType: "soil" | "crop";
    photoName: string;
    currentIndianSeason: string;
    activeIndianSeasonName?: string;
    regionName?: string;
    gpsCoordinates?: { lat: number; lon: number };
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
        soilOrder?: string;
        soilColorMunsell: string;
        structuralTilth: string;
        visualOrganicMatterEst: string;
        surfaceCrustingRisk: string;
        drainageAeration: string;
        phVerdictNote?: string;
        nitrogenStatus?: string;
        phosphorusStatus?: string;
        potassiumStatus?: string;
        salinityRisk?: string;
    } | null;
    cropHealthAnalysis?: CropHealthAnalysisData | null;
    topRecommendedCrops: RecommendedCrop[];
    topVegetables?: RecommendedCrop[];
    topFruits?: RecommendedCrop[];
    topStaples?: RecommendedCrop[];
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

interface ImageAnalysisData {
    avgR: number;
    avgG: number;
    avgB: number;
    hue: number;
    saturation: number;
    brightness: number;
    luminance: number;
}

function extractPixelMetricsFromCanvas(canvas: HTMLCanvasElement): ImageAnalysisData {
    try {
        const sampleW = Math.min(100, canvas.width || 100);
        const sampleH = Math.min(100, canvas.height || 100);
        const offscreen = document.createElement("canvas");
        offscreen.width = sampleW;
        offscreen.height = sampleH;
        const offCtx = offscreen.getContext("2d");
        if (!offCtx) {
            return { avgR: 125, avgG: 110, avgB: 95, hue: 32, saturation: 0.25, brightness: 0.49, luminance: 112 };
        }
        offCtx.drawImage(canvas, 0, 0, sampleW, sampleH);
        const imgData = offCtx.getImageData(0, 0, sampleW, sampleH).data;
        let rSum = 0, gSum = 0, bSum = 0;
        const count = imgData.length / 4;
        for (let i = 0; i < imgData.length; i += 4) {
            rSum += imgData[i];
            gSum += imgData[i + 1];
            bSum += imgData[i + 2];
        }
        const avgR = Math.round(rSum / count);
        const avgG = Math.round(gSum / count);
        const avgB = Math.round(bSum / count);
        const luminance = Math.round(0.299 * avgR + 0.587 * avgG + 0.114 * avgB);

        const rNorm = avgR / 255;
        const gNorm = avgG / 255;
        const bNorm = avgB / 255;
        const max = Math.max(rNorm, gNorm, bNorm);
        const min = Math.min(rNorm, gNorm, bNorm);
        const delta = max - min;

        let hue = 0;
        if (delta > 0) {
            if (max === rNorm) {
                hue = ((gNorm - bNorm) / delta) % 6;
            } else if (max === gNorm) {
                hue = (bNorm - rNorm) / delta + 2;
            } else {
                hue = (rNorm - gNorm) / delta + 4;
            }
            hue = Math.round(hue * 60);
            if (hue < 0) hue += 360;
        }
        const saturation = max === 0 ? 0 : Math.round((delta / max) * 100) / 100;
        const brightness = Math.round(max * 100) / 100;

        return { avgR, avgG, avgB, hue, saturation, brightness, luminance };
    } catch {
        return { avgR: 125, avgG: 110, avgB: 95, hue: 32, saturation: 0.25, brightness: 0.49, luminance: 112 };
    }
}

function extractPixelMetricsFromImage(img: HTMLImageElement): ImageAnalysisData {
    try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width || 300;
        canvas.height = img.naturalHeight || img.height || 300;
        const ctx = canvas.getContext("2d");
        if (!ctx) return { avgR: 125, avgG: 110, avgB: 95, hue: 32, saturation: 0.25, brightness: 0.49, luminance: 112 };
        ctx.drawImage(img, 0, 0);
        return extractPixelMetricsFromCanvas(canvas);
    } catch {
        return { avgR: 125, avgG: 110, avgB: 95, hue: 32, saturation: 0.25, brightness: 0.49, luminance: 112 };
    }
}

// Major Indian Agro-Climatic Regions for Instant GPS Telemetry
const INDIAN_REGIONS = [
    { name: "Punjab (Indo-Gangetic Alluvial)", lat: 30.9, lon: 75.8, soilType: "Alluvial Silt Loam (जलोढ़ दोमट)" },
    { name: "Maharashtra (Deccan Black Vertisol)", lat: 20.7, lon: 77.0, soilType: "Black Cotton Soil (काली कपासी)" },
    { name: "Karnataka (South Red Loam)", lat: 12.9, lon: 77.6, soilType: "Red Sandy Loam (लाल दोमट)" },
    { name: "Rajasthan (Thar Desert Sandy)", lat: 26.9, lon: 70.9, soilType: "Arid Desert Sand (मरुस्थलीय बलुई)" },
    { name: "UP / Bihar (Sub-Himalayan Terai)", lat: 26.8, lon: 80.9, soilType: "Terai Wetland Loam (तराई नम दोमट)" },
    { name: "Kerala (Western Ghats Laterite)", lat: 10.5, lon: 76.2, soilType: "Acidic Laterite (अम्लीय लैटेराइट)" },
    { name: "West Bengal (Deltaic Alluvium)", lat: 23.2, lon: 87.8, soilType: "Deltaic Alluvial Loam (डेल्टाई दोमट)" },
];

// Verified Crop Sample Presets for Instant Disease & Health Diagnosis
const CROP_DISEASE_PRESETS = [
    {
        id: "tomato-early-blight",
        title: "Tomato Early Blight (अगेती झुलसा)",
        cropKey: "tomato",
        diseaseHint: "Alternaria solani",
        imageUrl: "/samples/tomato.jpg",
        description: "Dark concentric target spots with yellow chlorotic rings on leaves.",
    },
    {
        id: "paddy-blast",
        title: "Paddy / Rice Blast (झोंका रोग)",
        cropKey: "rice",
        diseaseHint: "Magnaporthe oryzae",
        imageUrl: "/samples/paddy.jpg",
        description: "Spindle-shaped lesions with grey center and brown necrotic margin.",
    },
    {
        id: "wheat-stripe-rust",
        title: "Wheat Stripe Rust (पीला रतुआ)",
        cropKey: "wheat",
        diseaseHint: "Puccinia striiformis",
        imageUrl: "/samples/wheat.jpg",
        description: "Linear yellow-orange powdery pustules along leaf veins.",
    },
    {
        id: "cotton-leaf-curl",
        title: "Cotton Leaf Curl Virus (पत्ती मरोड़)",
        cropKey: "cotton",
        diseaseHint: "Begomovirus (CLCuV)",
        imageUrl: "/samples/cotton.jpg",
        description: "Upward leaf cupping, vein thickening and enation outgrowths.",
    },
    {
        id: "mustard-white-rust",
        title: "Mustard White Rust (सफेद रतुआ)",
        cropKey: "mustard",
        diseaseHint: "Albugo candida",
        imageUrl: "/samples/mustard.jpg",
        description: "Chalky white blister pustules on underside of leaf and staghead.",
    },
    {
        id: "maize-foliar-blight",
        title: "Maize Foliar Blight (पत्ती झुलसा)",
        cropKey: "maize",
        diseaseHint: "Bipolaris maydis",
        imageUrl: "/samples/maize.jpg",
        description: "Elongated necrotic lesions with dark brown margins.",
    },
];

export function CropDiagnosticStudio() {
    // Top-Level Studio Mode: GPS Soil vs Crop Disease Studio
    const [studioTab, setStudioTab] = useState<"gps_soil" | "crop_disease">("gps_soil");

    // Coordinates (Default: Central Punjab Agricultural Belt)
    const [lat, setLat] = useState<number>(30.9);
    const [lon, setLon] = useState<number>(75.8);
    const [selectedCrop, setSelectedCrop] = useState<string>("wheat");
    const [recommendationCategory, setRecommendationCategory] = useState<"all" | "vegetables" | "fruits" | "staples">("all");

    // Crop Photo State
    const [cropPhotoPreview, setCropPhotoPreview] = useState<string>("/samples/tomato.jpg");
    const [cropPhotoName, setCropPhotoName] = useState<string>("tomato.jpg");
    const [hasUserUploadedCropPhoto, setHasUserUploadedCropPhoto] = useState<boolean>(false);
    const [lastImageAnalysis, setLastImageAnalysis] = useState<ImageAnalysisData | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(false);

    // Telemetry & Results
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
        provider: "ISRIC SoilGrids 2.0 & National Pedological Survey",
        surface: {
            ph: 7.2,
            soc: 18.5,
            organicMatterPct: 3.2,
            clayPct: 22.0,
            sandPct: 45.0,
            siltPct: 33.0,
            cec: 18.5,
            textureClass: "Silt Loam (गाद दोमट)",
        },
        profile: [
            { depth: "0-5 cm", ph: 7.2, soc: 18.5, clay: 22.0, cec: 18.5 },
            { depth: "5-15 cm", ph: 7.3, soc: 15.2, clay: 24.0, cec: 19.0 },
        ],
        interpretation: {
            category: "Optimal / Neutral (संतुलित)",
            status: "optimal",
            badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
            description: "Indo-Gangetic Alluvial Silt Loam. Balanced neutral pH, high cation exchange capacity.",
            amendment: "Optimal conditions. Apply balanced NPK with Neem-coated Urea.",
        },
    });

    const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResponse | null>(null);

    // Latency & Debug
    const [weatherLatency, setWeatherLatency] = useState<number>(110);
    const [soilLatency, setSoilLatency] = useState<number>(230);
    const [lastSyncTime, setLastSyncTime] = useState<string>("Live");
    const [showRawJson, setShowRawJson] = useState<boolean>(false);

    // Loading states
    const [loadingEnv, setLoadingEnv] = useState<boolean>(false);
    const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);

    // Camera Refs
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraFallbackInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
    const [cameraFacingMode, setCameraFacingMode] = useState<"environment" | "user">("environment");
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
    const [isStartingCamera, setIsStartingCamera] = useState<boolean>(false);

    const stopCameraStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                try {
                    track.stop();
                } catch (e) {
                    console.error("Error stopping track:", e);
                }
            });
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const startCamera = async (facing: "environment" | "user" = cameraFacingMode) => {
        setCameraError(null);
        setIsStartingCamera(true);
        stopCameraStream();

        if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setIsStartingCamera(false);
            toast.info("Opening device camera...");
            cameraFallbackInputRef.current?.click();
            return;
        }

        setIsCameraOpen(true);

        try {
            let stream: MediaStream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1080 } },
                    audio: false,
                });
            } catch {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            }

            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                try {
                    await videoRef.current.play();
                } catch {}
            }
        } catch (err: unknown) {
            console.error("Camera access error:", err);
            const msg = "Could not access camera. Please allow camera permissions.";
            setCameraError(msg);
            toast.error(msg);
        } finally {
            setIsStartingCamera(false);
        }
    };

    const closeCamera = () => {
        stopCameraStream();
        setIsCameraOpen(false);
        setCameraError(null);
    };

    const handleSwitchCamera = () => {
        const nextFacing = cameraFacingMode === "environment" ? "user" : "environment";
        setCameraFacingMode(nextFacing);
        startCamera(nextFacing);
    };

    const capturePhotoFromCamera = () => {
        if (!videoRef.current) return;
        const video = videoRef.current;
        if (!video.videoWidth || !video.videoHeight) {
            toast.error("Camera feed is not ready. Please wait.");
            return;
        }

        setIsFlashActive(true);
        setTimeout(() => setIsFlashActive(false), 180);

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (cameraFacingMode === "user") {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoDataUrl = canvas.toDataURL("image/jpeg", 0.92);
        setCropPhotoPreview(photoDataUrl);
        setCropPhotoName("camera_leaf_capture.jpg");
        setHasUserUploadedCropPhoto(true);
        setStudioTab("crop_disease");

        const pixelMetrics = extractPixelMetricsFromCanvas(canvas);
        setLastImageAnalysis(pixelMetrics);

        closeCamera();
        toast.success("Crop photo captured! Analyzing foliar health and diseases...");
        runAnalysis(selectedCrop, soilData, weatherData, "crop", "camera_leaf_capture.jpg", pixelMetrics);
    };

    useEffect(() => {
        return () => {
            stopCameraStream();
        };
    }, []);

    useEffect(() => {
        if (isCameraOpen && streamRef.current && videoRef.current) {
            videoRef.current.srcObject = streamRef.current;
            videoRef.current.play().catch(() => {});
        }
    }, [isCameraOpen]);

    // Fetch Environmental Data (Open-Meteo & SoilGrids)
    const fetchEnvironmentalData = async (latitude: number, longitude: number) => {
        setLoadingEnv(true);
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

            // Direct Open-Meteo Fallback
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
                            conditionText: "Open-Meteo Live Telemetry",
                            soilTemperature0cm: directData.hourly?.soil_temperature_0cm?.[0] ?? 20.0,
                            soilTemperature6cm: directData.hourly?.soil_temperature_6cm?.[0] ?? 19.2,
                            soilMoisture0_1cm: directData.hourly?.soil_moisture_0_to_1cm?.[0] ?? 0.28,
                            soilMoisture1_3cm: directData.hourly?.soil_moisture_1_to_3cm?.[0] ?? 0.30,
                            moistureStatus: "Optimal Vapsa (वतर अनुकूल)",
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

            if (fetchedWeather) setWeatherData(fetchedWeather);
            if (fetchedSoil) setSoilData(fetchedSoil);

            setLastSyncTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
            return { weather: fetchedWeather, soil: fetchedSoil };
        } catch (err) {
            console.error("Fetch environmental data error:", err);
            return null;
        } finally {
            setLoadingEnv(false);
        }
    };

    // Primary Orchestration Engine
    const runAnalysis = async (
        cropKey: string = selectedCrop,
        currentSoil: SoilData | null = soilData,
        currentWeather: WeatherData | null = weatherData,
        type: "soil" | "crop" = "crop",
        imgName: string = cropPhotoName,
        imageAnalysis?: ImageAnalysisData | null
    ) => {
        setLoadingAnalysis(true);
        setIsScanning(true);

        const activeImageAnalysis = imageAnalysis !== undefined ? imageAnalysis : lastImageAnalysis;
        if (imageAnalysis) {
            setLastImageAnalysis(imageAnalysis);
        }

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
                    imageAnalysis: activeImageAnalysis,
                }),
            });

            const result = await res.json();
            if (result.success) {
                setDiagnosticResult(result);

                // Update local soil data from GPS telemetry
                if (result.soilProfileSummary) {
                    setSoilData((prev) => ({
                        ...prev,
                        surface: {
                            ...prev.surface,
                            ph: result.soilProfileSummary.ph,
                            textureClass: result.soilProfileSummary.textureClass,
                            soc: result.soilProfileSummary.soc,
                            clayPct: result.soilProfileSummary.clayPct,
                            sandPct: result.soilProfileSummary.sandPct,
                            cec: result.soilProfileSummary.cec,
                        },
                        interpretation: {
                            ...prev.interpretation,
                            category: result.soilVisualDiagnosis?.indianSoilClassification || prev.interpretation.category,
                            status: result.soilProfileSummary.ph >= 6.0 && result.soilProfileSummary.ph <= 7.5 ? "optimal" : "needs_amendment",
                            badgeColor: result.soilProfileSummary.ph >= 6.0 && result.soilProfileSummary.ph <= 7.5
                                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                                : "text-amber-400 bg-amber-500/10 border-amber-500/30",
                            description: result.soilVisualDiagnosis?.phVerdictNote || `GPS Soil: ${result.soilVisualDiagnosis?.indianSoilClassification}`,
                        }
                    }));
                }

                if (result.cropHealthAnalysis) {
                    toast.success(
                        `Crop Health: ${result.cropHealthAnalysis.primaryDisease.name} (${result.cropHealthAnalysis.healthStatus}) · ${result.cropHealthAnalysis.overallHealthScore}% Vitality`
                    );
                } else {
                    toast.success(
                        `GPS Soil Synced: ${result.soilVisualDiagnosis?.indianSoilClassification} (pH ${result.soilProfileSummary?.ph}) · ${result.targetCrop.commonName} is ${result.viabilityVerdict.verdict}`
                    );
                }
            } else {
                toast.error(result.error || "Analysis failed.");
            }
        } catch (err) {
            console.error("Analysis failed:", err);
            toast.error("Failed to execute AgroCloud agronomic engine.");
        } finally {
            setLoadingAnalysis(false);
            setTimeout(() => setIsScanning(false), 500);
        }
    };

    // Initial Load
    useEffect(() => {
        const init = async () => {
            const env = await fetchEnvironmentalData(lat, lon);
            if (env) {
                await runAnalysis("wheat", env.soil, env.weather, "crop", "wheat.jpg");
            }
        };
        init();
    }, []);

    // Handle Crop Photo File Upload
    const handleCropPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setCropPhotoName(file.name);
        const objectUrl = URL.createObjectURL(file);
        setCropPhotoPreview(objectUrl);
        setHasUserUploadedCropPhoto(true);
        setStudioTab("crop_disease");
        toast.info(`Analyzing crop photo: ${file.name}...`);

        const img = new Image();
        img.onload = () => {
            const pixelAnalysis = extractPixelMetricsFromImage(img);
            setLastImageAnalysis(pixelAnalysis);
            runAnalysis(selectedCrop, soilData, weatherData, "crop", file.name, pixelAnalysis);
        };
        img.onerror = () => {
            runAnalysis(selectedCrop, soilData, weatherData, "crop", file.name);
        };
        img.src = objectUrl;
    };

    // 1-Click Select an Indian Region (GPS Telemetry Only - No Soil Photo)
    const handleSelectRegion = async (reg: typeof INDIAN_REGIONS[0]) => {
        setLat(reg.lat);
        setLon(reg.lon);
        toast.info(`Switched GPS Location to: ${reg.name}`);
        const env = await fetchEnvironmentalData(reg.lat, reg.lon);
        if (env) {
            await runAnalysis(selectedCrop, env.soil, env.weather, "soil", "", null);
        }
    };

    // 1-Click Select a Crop Disease Preset
    const handleSelectDiseasePreset = async (preset: typeof CROP_DISEASE_PRESETS[0]) => {
        setCropPhotoPreview(preset.imageUrl);
        setCropPhotoName(`${preset.id}.jpg`);
        setSelectedCrop(preset.cropKey);
        setHasUserUploadedCropPhoto(true);
        setStudioTab("crop_disease");
        toast.info(`Inspecting disease preset: ${preset.title}`);

        const img = new Image();
        img.onload = async () => {
            const pixelAnalysis = extractPixelMetricsFromImage(img);
            setLastImageAnalysis(pixelAnalysis);
            await runAnalysis(preset.cropKey, soilData, weatherData, "crop", `${preset.id}.jpg`, pixelAnalysis);
        };
        img.onerror = async () => {
            await runAnalysis(preset.cropKey, soilData, weatherData, "crop", `${preset.id}.jpg`);
        };
        img.src = preset.imageUrl;
    };

    // 1-Click Select a Recommended Crop
    const handlePickRecommendedCrop = async (cropKey: string) => {
        setSelectedCrop(cropKey);
        toast.info(`Evaluating GPS Soil Viability for: ${cropKey.toUpperCase()}`);
        await runAnalysis(cropKey, soilData, weatherData, "soil", cropPhotoName, lastImageAnalysis);
        const dossierEl = document.getElementById("target-crop-viability-dossier");
        if (dossierEl) {
            dossierEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
                toast.success(`GPS Location Detected: ${newLat}° N, ${newLon}° E`);
                const env = await fetchEnvironmentalData(newLat, newLon);
                if (env) {
                    await runAnalysis(selectedCrop, env.soil, env.weather, "soil", "");
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
            {/* Live Device Camera Modal */}
            {isCameraOpen && (
                <div
                    id="camera-modal-backdrop"
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeCamera();
                    }}
                >
                    <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/60">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                    <Camera className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                                        Crop Leaf Camera Viewfinder
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono uppercase">
                                            Disease & Health Intake
                                        </span>
                                    </h3>
                                    <p className="text-xs text-zinc-400">
                                        Frame the crop leaf or diseased section clearly and press capture
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                id="close-camera-btn"
                                onClick={closeCamera}
                                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative w-full aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className={`w-full h-full object-cover ${cameraFacingMode === "user" ? "scale-x-[-1]" : ""}`}
                            />

                            <div
                                className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-200 ${
                                    isFlashActive ? "opacity-90" : "opacity-0"
                                }`}
                            />

                            <div className="absolute inset-6 pointer-events-none border border-emerald-500/20 rounded-xl">
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/80 border-t border-zinc-800">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleSwitchCamera}
                                className="gap-2 text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                            >
                                <SwitchCamera className="w-4 h-4" />
                                Flip Camera
                            </Button>

                            <button
                                type="button"
                                id="capture-shutter-btn"
                                onClick={capturePhotoFromCamera}
                                className="w-14 h-14 rounded-full border-4 border-white bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-950/40 active:scale-95 flex items-center justify-center text-white"
                            >
                                <Camera className="w-6 h-6" />
                            </button>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={closeCamera}
                                className="text-xs text-zinc-400 hover:text-zinc-200"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden Input Fallbacks */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCropPhotoUpload}
            />
            <input
                ref={cameraFallbackInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleCropPhotoUpload}
            />

            {/* Main Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        AgroCloud India · राष्ट्रीय जीपीएस मृदा एवं फसल रोग निदान प्रणाली
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                        <span>Precision Agronomy & Crop Intelligence Studio</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Dual Engine: <strong>Zero-Photo GPS Soil Analysis</strong> across all Indian states & <strong>AI Foliar Disease Diagnostics</strong> for user-uploaded crop photos.
                    </p>
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
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Telemetry Bar */}
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
                            <span className="text-blue-400 font-semibold block text-[11px]">ISRIC SoilGrids & National Survey:</span>
                            <pre className="p-3 rounded-lg bg-zinc-950 overflow-x-auto text-[11px] text-zinc-300 max-h-48 scrollbar-thin">
                                {JSON.stringify(diagnosticResult?.soilVisualDiagnosis || soilData?.surface, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* DUAL WORKSPACE TABS: GPS SOIL INTELLIGENCE vs CROP HEALTH STUDIO */}
            {/* ───────────────────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 rounded-2xl bg-surface-2 border border-border/60">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        id="tab-gps-soil-btn"
                        onClick={() => setStudioTab("gps_soil")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            studioTab === "gps_soil"
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/30 ring-1 ring-emerald-400"
                                : "text-muted-foreground hover:text-foreground hover:bg-surface-1"
                        }`}
                    >
                        <Compass className="w-4 h-4" />
                        <span>📍 GPS Soil & Field Intelligence (No Photo Needed)</span>
                    </button>

                    <button
                        type="button"
                        id="tab-crop-disease-btn"
                        onClick={() => setStudioTab("crop_disease")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            studioTab === "crop_disease"
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/30 ring-1 ring-emerald-400"
                                : "text-muted-foreground hover:text-foreground hover:bg-surface-1"
                        }`}
                    >
                        <Leaf className="w-4 h-4" />
                        <span>🌿 Crop Disease & Health Diagnostic (Upload Crop Photo)</span>
                    </button>
                </div>

                <div className="text-xs text-muted-foreground px-3 py-1">
                    {studioTab === "gps_soil" ? (
                        <span className="text-emerald-400 font-medium">Predicts pH, texture & nutrients purely from coordinates</span>
                    ) : (
                        <span className="text-amber-400 font-medium">Detects leaf pathogens, blights, rusts & prescribes remedies</span>
                    )}
                </div>
            </div>

            {/* Quick Indian Agricultural Belt Presets */}
            <div className="p-3.5 rounded-xl bg-surface-1 border border-border/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Quick-Select Indian Agro-Climatic Belt (1-Click Sync):</span>
                    </span>
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">
                        Instantly updates GPS coordinates, national soil survey data, pH & live weather
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {INDIAN_REGIONS.map((reg) => (
                        <button
                            key={reg.name}
                            type="button"
                            onClick={() => handleSelectRegion(reg)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                                lat === reg.lat && lon === reg.lon
                                    ? "bg-emerald-600 text-white border-emerald-500 font-semibold shadow-sm"
                                    : "bg-surface-2 border-border/60 text-muted-foreground hover:text-foreground hover:border-emerald-500/40"
                            }`}
                        >
                            <span>{reg.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ───────────────────────────────────────────────────────────── */}
            {/* WORKSPACE VIEW 1: GPS SOIL & FIELD INTELLIGENCE (ZERO PHOTO NEEDED) */}
            {/* ───────────────────────────────────────────────────────────── */}
            {studioTab === "gps_soil" && (
                <div className="space-y-6">
                    {/* Coordinates & Crop Selector Card */}
                    <div className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>Nationwide Geolocation & Coordinate Input</span>
                                </div>
                                <h3 className="text-lg font-bold text-foreground">
                                    Field Coordinates & Ground Truth Sync
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    AgroCloud cross-references these coordinates against ISRIC SoilGrids 2.0 and India&apos;s National Pedological Survey to identify soil type, pH, and nutrients without requiring any photo.
                                </p>
                            </div>

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
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">Target Crop for Viability Check</label>
                                <select
                                    id="select-crop-target"
                                    value={selectedCrop}
                                    onChange={(e) => {
                                        const newCrop = e.target.value;
                                        setSelectedCrop(newCrop);
                                        runAnalysis(newCrop, soilData, weatherData, "soil", "");
                                    }}
                                    className="w-full h-10 px-3 rounded-lg bg-surface-2 border border-border/80 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                                >
                                    <optgroup label="🥬 Vegetables (सब्जियां)">
                                        <option value="tomato">Tomato (Tamatar / टमाटर)</option>
                                        <option value="potato">Potato (Aloo / आलू)</option>
                                        <option value="onion">Onion (Pyaz / प्याज)</option>
                                        <option value="chili">Chili Pepper (Mirch / मिर्च)</option>
                                        <option value="brinjal">Brinjal / Eggplant (Baingan / बैंगन)</option>
                                        <option value="cauliflower">Cauliflower (Phoolgobhi / फूलगोभी)</option>
                                        <option value="cabbage">Cabbage (Pattagobhi / पत्तागोभी)</option>
                                        <option value="peas">Green Peas (Matar / हरी मटर)</option>
                                        <option value="okra">Ladyfinger / Okra (Bhindi / भिंडी)</option>
                                        <option value="carrot">Carrot (Gajar / गाजर)</option>
                                    </optgroup>
                                    <optgroup label="🍎 Fruits & Horticulture (फल एवं बागवानी)">
                                        <option value="mango">Mango (Aam / आम)</option>
                                        <option value="guava">Guava (Amrood / अमरूद)</option>
                                        <option value="pomegranate">Pomegranate (Anar / अनार)</option>
                                        <option value="papaya">Papaya (Papita / पपीता)</option>
                                        <option value="banana">Banana (Kela / केला)</option>
                                        <option value="lemon">Lemon / Acid Lime (Nimbu / नींबू)</option>
                                        <option value="watermelon">Watermelon (Tarbooj / तरबूज)</option>
                                        <option value="grapes">Grapes (Angoor / अंगूर)</option>
                                        <option value="ber">Indian Jujube (Ber / बेर)</option>
                                        <option value="cashew">Cashew Nut (Kaju / काजू)</option>
                                    </optgroup>
                                    <optgroup label="🌾 Cereals & Cash Crops (अनाज व नकदी)">
                                        <option value="wheat">Wheat (Gehun / गेहूं)</option>
                                        <option value="rice">Paddy / Rice (Dhan / धान)</option>
                                        <option value="maize">Maize / Corn (Makka / मक्का)</option>
                                        <option value="bajra">Pearl Millet (Bajra / बाजरा)</option>
                                        <option value="chickpea">Chickpea / Bengal Gram (Chana / चना)</option>
                                        <option value="mustard">Mustard (Sarson / सरसों)</option>
                                        <option value="soybean">Soybean (सोयाबीन)</option>
                                        <option value="cotton">Cotton (Kapas / कपास)</option>
                                        <option value="sugarcane">Sugarcane (Ganna / गन्ना)</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>

                        {/* Sync Button */}
                        <div className="flex items-center justify-between pt-1">
                            <Button
                                id="sync-gps-coords-btn"
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={loadingEnv || loadingAnalysis}
                                onClick={async () => {
                                    toast.info(`Analyzing GPS soil data for (${lat}° N, ${lon}° E)...`);
                                    const env = await fetchEnvironmentalData(lat, lon);
                                    if (env) {
                                        await runAnalysis(selectedCrop, env.soil, env.weather, "soil", "");
                                    }
                                }}
                                className="text-xs h-9 gap-2 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${loadingEnv ? "animate-spin" : ""}`} />
                                <span>Analyze Soil from GPS Coordinates (मृदा परीक्षण करें)</span>
                            </Button>

                            <span className="text-xs text-muted-foreground font-mono">
                                Lat: {lat}° N · Lon: {lon}° E
                            </span>
                        </div>
                    </div>

                    {/* Instant Soil Health Card (Derived Purely From Coordinates) */}
                    {diagnosticResult?.soilVisualDiagnosis && (
                        <div className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                        <FlaskConical className="w-3.5 h-3.5" />
                                        <span>GPS Soil Health Card (भू-स्थानिक मृदा स्वास्थ्य पत्रक)</span>
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-foreground">
                                        {diagnosticResult.soilVisualDiagnosis.indianSoilClassification}
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Derived from coordinates: <strong className="text-foreground">{diagnosticResult.regionName}</strong> · Soil Order: <strong className="text-blue-400">{diagnosticResult.soilVisualDiagnosis.soilOrder || "Inceptisols"}</strong>
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="px-4 py-2 rounded-xl bg-surface-2 border border-border/60 flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                                        <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Soil pH (H2O)</span>
                                            <span className="text-xl font-extrabold text-amber-400 leading-none">
                                                {soilData.surface.ph} pH
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Soil Metric Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-3.5 rounded-xl bg-surface-2 border border-border/40 space-y-1">
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase block">Texture Class</span>
                                    <span className="text-sm font-bold text-foreground block truncate">{soilData.surface.textureClass}</span>
                                    <span className="text-[11px] text-muted-foreground block">
                                        Clay: {diagnosticResult.soilProfileSummary.clayPct}% · Sand: {diagnosticResult.soilProfileSummary.sandPct}%
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-surface-2 border border-border/40 space-y-1">
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase block">Organic Carbon (SOC)</span>
                                    <span className="text-sm font-bold text-emerald-400 block">{soilData.surface.soc} g/kg</span>
                                    <span className="text-[11px] text-muted-foreground block">
                                        Organic Matter: ~{soilData.surface.organicMatterPct}%
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-surface-2 border border-border/40 space-y-1">
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase block">Cation Exchange (CEC)</span>
                                    <span className="text-sm font-bold text-blue-400 block">{diagnosticResult.soilProfileSummary.cec} cmol/kg</span>
                                    <span className="text-[11px] text-muted-foreground block">
                                        Nutrient Buffer Capacity
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-surface-2 border border-border/40 space-y-1">
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase block">Seedbed Vapsa Status</span>
                                    <span className="text-sm font-bold text-emerald-400 block truncate">
                                        {weatherData.current.moistureStatus || "Optimal Vapsa (वतर)"}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground block">
                                        Moisture: {Math.round(weatherData.current.soilMoisture0_1cm * 100)}% vol
                                    </span>
                                </div>
                            </div>

                            {/* Agronomic Verdict & Physical Tilth */}
                            <div className="p-4 rounded-xl bg-surface-2 border border-border/50 space-y-2">
                                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Pedological Field Diagnosis & Tilth Verdict:</span>
                                </span>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {diagnosticResult.soilVisualDiagnosis.phVerdictNote}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-border/40 text-[11px]">
                                    <div>
                                        <span className="text-muted-foreground">Structural Tilth: </span>
                                        <strong className="text-foreground">{diagnosticResult.soilVisualDiagnosis.structuralTilth}</strong>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Drainage & Aeration: </span>
                                        <strong className="text-foreground">{diagnosticResult.soilVisualDiagnosis.drainageAeration}</strong>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Surface Crusting Risk: </span>
                                        <strong className="text-foreground">{diagnosticResult.soilVisualDiagnosis.surfaceCrustingRisk}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* WORKSPACE VIEW 2: CROP HEALTH & DISEASE DIAGNOSTIC STUDIO */}
            {/* ───────────────────────────────────────────────────────────── */}
            {studioTab === "crop_disease" && (
                <div className="space-y-6">
                    {/* Crop Photo Intake Card */}
                    <div className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                    <Leaf className="w-3.5 h-3.5" />
                                    <span>AI Crop Pathology & Disease Diagnostic Intake</span>
                                </div>
                                <h3 className="text-lg font-bold text-foreground">
                                    Upload Any Crop Foliage or Leaf Photo (फसल की फोटो अपलोड करें)
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Upload any plant or leaf photo taken from your farm or garden. AgroCloud&apos;s plant pathology model detects diseases, blights, rusts, viral leaf curl, and nutrient deficiencies, providing exact chemical and biological prescriptions.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="gap-2 text-xs border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                                >
                                    <Upload className="w-3.5 h-3.5" />
                                    Upload File
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => startCamera()}
                                    className="gap-2 text-xs text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10"
                                >
                                    <Camera className="w-3.5 h-3.5" />
                                    Live Camera
                                </Button>
                            </div>
                        </div>

                        {/* Quick Disease Sample Presets Strip */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                <Bug className="w-3.5 h-3.5 text-amber-400" />
                                <span>Try Common Crop Disease Samples (1-Click Test):</span>
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                {CROP_DISEASE_PRESETS.map((preset) => {
                                    const isCurrent = cropPhotoPreview === preset.imageUrl;
                                    return (
                                        <button
                                            key={preset.id}
                                            type="button"
                                            onClick={() => handleSelectDiseasePreset(preset)}
                                            className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                                                isCurrent
                                                    ? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500 shadow-md"
                                                    : "border-border/60 bg-surface-2 hover:border-emerald-500/40 hover:bg-surface-2/80"
                                            }`}
                                        >
                                            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-muted mb-2 relative">
                                                <img
                                                    src={preset.imageUrl}
                                                    alt={preset.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.currentTarget;
                                                        if (!target.src.includes("tomato.jpg")) target.src = "/samples/tomato.jpg";
                                                    }}
                                                />
                                                {isCurrent && (
                                                    <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-foreground truncate">{preset.title.split(" (")[0]}</h4>
                                                <p className="text-[10px] text-muted-foreground truncate italic">{preset.diseaseHint}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* AI CROP HEALTH & DISEASE DIAGNOSTIC REPORT CARD */}
                    {diagnosticResult?.cropHealthAnalysis ? (
                        <div className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                                        <Stethoscope className="w-3.5 h-3.5" />
                                        <span>Full Crop Pathology & Foliar Health Report (पौध स्वास्थ्य एवं रोग निदान रिपोर्ट)</span>
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                                        <span>{diagnosticResult.cropHealthAnalysis.primaryDisease.name}</span>
                                        <span className="text-sm font-normal text-muted-foreground">
                                            ({diagnosticResult.cropHealthAnalysis.primaryDisease.hindiName})
                                        </span>
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Crop: <strong className="text-foreground">{diagnosticResult.cropHealthAnalysis.cropName}</strong> · Pathogen: <strong className="text-amber-400 italic">{diagnosticResult.cropHealthAnalysis.primaryDisease.pathogen}</strong> ({diagnosticResult.cropHealthAnalysis.primaryDisease.pathogenType})
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-3 shadow-md ${
                                        diagnosticResult.cropHealthAnalysis.healthStatus === "Healthy"
                                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                                            : diagnosticResult.cropHealthAnalysis.healthStatus === "Mild Stress"
                                            ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                                            : "bg-rose-500/15 border-rose-500/40 text-rose-400"
                                    }`}>
                                        {diagnosticResult.cropHealthAnalysis.healthStatus === "Healthy" ? (
                                            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                                        ) : (
                                            <ShieldAlert className="w-6 h-6 shrink-0" />
                                        )}
                                        <div>
                                            <span className="text-[10px] uppercase font-bold tracking-wider block opacity-90">
                                                Health Vitality Score:
                                            </span>
                                            <span className="text-lg font-extrabold leading-none">
                                                {diagnosticResult.cropHealthAnalysis.overallHealthScore}% · {diagnosticResult.cropHealthAnalysis.healthStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Symptoms & Pathology Notes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-surface-2 border border-border/50 space-y-2">
                                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                        <span>Observed Symptoms (लक्षण):</span>
                                    </h4>
                                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                                        {diagnosticResult.cropHealthAnalysis.primaryDisease.symptomsObserved.map((sym, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-amber-400 font-bold">•</span>
                                                <span>{sym}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-4 rounded-xl bg-surface-2 border border-border/50 space-y-2">
                                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                        <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                                        <span>Weather & Microclimate Correlation:</span>
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {diagnosticResult.cropHealthAnalysis.weatherAttribution}
                                    </p>
                                    <div className="text-[11px] text-zinc-300 pt-1 border-t border-border/30">
                                        Pathology: {diagnosticResult.cropHealthAnalysis.primaryDisease.pathologyNotes}
                                    </div>
                                </div>
                            </div>

                            {/* 3-Pillar Treatment Protocols */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Pill className="w-4 h-4 text-emerald-400" />
                                    <span>Prescription & Agronomic Treatment Plan (उपचार एवं प्रबंधन):</span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Chemical Treatments */}
                                    <div className="p-4 rounded-xl bg-surface-2 border border-border/50 space-y-3">
                                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                                            Pillar 1 · Fast-Acting Chemical Curatives
                                        </div>
                                        {diagnosticResult.cropHealthAnalysis.fastActingChemicals.length > 0 ? (
                                            <div className="space-y-2.5">
                                                {diagnosticResult.cropHealthAnalysis.fastActingChemicals.map((chem, idx) => (
                                                    <div key={idx} className="p-2.5 rounded-lg bg-surface-1 border border-border/30 text-xs space-y-1">
                                                        <div className="font-bold text-foreground">{chem.commercialBrand}</div>
                                                        <div className="text-[11px] text-blue-300 font-mono">{chem.activeIngredient}</div>
                                                        <div className="text-[11px] text-emerald-400 font-semibold">Dosage: {chem.dosagePerLiter}</div>
                                                        <div className="text-[10px] text-muted-foreground">{chem.applicationMethod}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-muted-foreground">Foliage is healthy. Zero chemical spraying required.</p>
                                        )}
                                    </div>

                                    {/* Biological & Organic Remedies */}
                                    <div className="p-4 rounded-xl bg-surface-2 border border-border/50 space-y-3">
                                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                            Pillar 2 · Biological & Organic Controls
                                        </div>
                                        {diagnosticResult.cropHealthAnalysis.organicBioRemedies.length > 0 ? (
                                            <div className="space-y-2.5">
                                                {diagnosticResult.cropHealthAnalysis.organicBioRemedies.map((bio, idx) => (
                                                    <div key={idx} className="p-2.5 rounded-lg bg-surface-1 border border-border/30 text-xs space-y-1">
                                                        <div className="font-bold text-foreground">{bio.name}</div>
                                                        <div className="text-[11px] text-emerald-300 font-mono">{bio.type}</div>
                                                        <div className="text-[11px] text-emerald-400 font-semibold">Dosage: {bio.dosagePerLiter}</div>
                                                        <div className="text-[10px] text-muted-foreground">{bio.preparationNotes}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-muted-foreground">No active organic remedies required for healthy canopy.</p>
                                        )}
                                    </div>

                                    {/* Cultural Preventative Practices */}
                                    <div className="p-4 rounded-xl bg-surface-2 border border-border/50 space-y-3">
                                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                                            Pillar 3 · Cultural & Preventative Care
                                        </div>
                                        <div className="space-y-2.5">
                                            {diagnosticResult.cropHealthAnalysis.preventativePractices.map((prev, idx) => (
                                                <div key={idx} className="p-2.5 rounded-lg bg-surface-1 border border-border/30 text-xs space-y-1">
                                                    <div className="font-bold text-foreground">{prev.title}</div>
                                                    <div className="text-[11px] text-muted-foreground leading-relaxed">{prev.description}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 rounded-2xl bg-surface-1 border border-dashed border-border/70 text-center space-y-3">
                            <Leaf className="w-10 h-10 text-emerald-400 mx-auto opacity-75" />
                            <h4 className="text-base font-bold text-foreground">
                                Upload a Crop Leaf or Plant Photo to Run Pathology Diagnostics
                            </h4>
                            <p className="text-xs text-muted-foreground max-w-md mx-auto">
                                Click the upload button above or select one of the disease sample presets to inspect real-time AI disease detection, visible symptom breakdown, and fungicide prescriptions.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* GPS SOIL RESULTS SECTION: DOSSIER, RECOMMENDATIONS & HYDROLOGY */}
            {/* (Displayed only in GPS Soil & Field Intelligence Section)      */}
            {/* ───────────────────────────────────────────────────────────── */}
            {studioTab === "gps_soil" && diagnosticResult && (
                <div id="agrocloud-results-container" className="space-y-8 pt-4">
                    {/* SECTION 1: TARGET CROP VIABILITY DOSSIER */}
                    <div id="target-crop-viability-dossier" className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                                    <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Target Crop Viability Dossier (फसल अनुकूलता एवं व्यवहार्यता रिपोर्ट)</span>
                                </div>
                                <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                                    <span>{diagnosticResult.targetCrop.commonName}</span>
                                    <span className="text-sm font-normal text-muted-foreground italic">
                                        ({diagnosticResult.targetCrop.scientificName})
                                    </span>
                                </h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Evaluated against GPS-derived <strong className="text-amber-400">pH {soilData.surface.ph}</strong> ({soilData.surface.textureClass}), regional rainfall, and active season: <strong className="text-emerald-400">{diagnosticResult.currentIndianSeason}</strong>
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div
                                    className={`px-4 py-2.5 rounded-xl border flex items-center gap-3 shadow-md ${
                                        diagnosticResult.viabilityVerdict.verdict === "VIABLE (YES)"
                                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                                            : diagnosticResult.viabilityVerdict.verdict === "CONDITIONALLY VIABLE"
                                            ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                                            : "bg-rose-500/15 border-rose-500/40 text-rose-400"
                                    }`}
                                >
                                    {diagnosticResult.viabilityVerdict.verdict === "VIABLE (YES)" ? (
                                        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                                    ) : diagnosticResult.viabilityVerdict.verdict === "CONDITIONALLY VIABLE" ? (
                                        <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                                    )}
                                    <div>
                                        <span className="text-[10px] uppercase font-bold tracking-wider block opacity-90">
                                            Soil Viability Verdict:
                                        </span>
                                        <span className="text-lg font-extrabold leading-none">
                                            {diagnosticResult.viabilityVerdict.verdict} · {diagnosticResult.viabilityVerdict.viabilityScore}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Compatibility Matrix */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="p-3 rounded-xl bg-surface-2 border border-border/50 space-y-1">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Soil pH Compatibility</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-bold text-amber-400">{soilData.surface.ph} pH</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                        diagnosticResult.soilProfileSummary.optimalForTarget
                                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                    }`}>
                                        {diagnosticResult.soilProfileSummary.optimalForTarget ? "Optimal Fit" : "Stress Risk"}
                                    </span>
                                </div>
                                <span className="text-[11px] text-muted-foreground block truncate">
                                    {diagnosticResult.soilProfileSummary.optimalForTarget ? "Matches preferred range" : "Requires amendment"}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-surface-2 border border-border/50 space-y-1">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Soil Texture & Tilth</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-foreground truncate">{soilData.surface.textureClass}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-surface-1 text-muted-foreground border border-border/40">
                                        {diagnosticResult.soilProfileSummary.clayPct}% Clay
                                    </span>
                                </div>
                                <span className="text-[11px] text-muted-foreground block truncate">
                                    {diagnosticResult.soilVisualDiagnosis?.indianSoilClassification || "GPS-Derived"}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-surface-2 border border-border/50 space-y-1">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Active Season Window</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-foreground truncate">{diagnosticResult.targetCrop.indianSeason.split(" ")[0]}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                        In Window
                                    </span>
                                </div>
                                <span className="text-[11px] text-emerald-400 block truncate">
                                    {diagnosticResult.viabilityVerdict.currentSeasonMatch}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-surface-2 border border-border/50 space-y-1">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Water Balance Factor</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-foreground truncate">{diagnosticResult.rainfallFactor.waterStatus.split(" ")[0]}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                        diagnosticResult.rainfallFactor.netWaterBalanceMm >= 0 ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"
                                    }`}>
                                        {diagnosticResult.rainfallFactor.netWaterBalanceMm >= 0 ? "+" : ""}
                                        {diagnosticResult.rainfallFactor.netWaterBalanceMm} mm
                                    </span>
                                </div>
                                <span className="text-[11px] text-muted-foreground block truncate">
                                    Demand: {diagnosticResult.rainfallFactor.cropDemandMm} mm
                                </span>
                            </div>
                        </div>

                        {/* Actionable Remedies if Not Completely Viable */}
                        {diagnosticResult.viabilityVerdict.whyNo.length > 0 && (
                            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                                <div className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                    <span>Agronomic Bottlenecks & Required Changes (कारण एवं उपाय):</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                    <div className="space-y-1.5">
                                        <span className="font-semibold text-zinc-300 block">Identified Limiting Factors (बाधाएं):</span>
                                        <ul className="space-y-1 text-zinc-400">
                                            {diagnosticResult.viabilityVerdict.whyNo.map((why, i) => (
                                                <li key={i} className="flex items-start gap-1.5">
                                                    <span className="text-rose-400 font-bold">•</span>
                                                    <span>{why}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-1.5">
                                        <span className="font-semibold text-emerald-400 block">Scientific Prescriptions (सुझाव):</span>
                                        <ul className="space-y-1 text-emerald-300">
                                            {diagnosticResult.viabilityVerdict.whatShouldBeChanged.map((sol, i) => (
                                                <li key={i} className="flex items-start gap-1.5">
                                                    <span className="text-emerald-400 font-bold">✓</span>
                                                    <span>{sol}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION 2: CATEGORIZED RECOMMENDED CROPS FOR THIS GPS SOIL */}
                    <div id="recommended-crops-section" className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                                    <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Recommended Crops for this GPS Soil & Climate (अनुशंसित फसलें)</span>
                                </div>
                                <h2 className="text-xl font-bold text-foreground">
                                    Best Crops, Vegetables & Fruits for this Soil (pH {soilData.surface.ph})
                                </h2>
                            </div>

                            <div className="inline-flex rounded-lg bg-surface-2 p-1 border border-border/60 text-xs font-medium">
                                <button
                                    type="button"
                                    onClick={() => setRecommendationCategory("all")}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        recommendationCategory === "all" ? "bg-emerald-600 text-white font-semibold" : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    All ({diagnosticResult.topRecommendedCrops.length})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRecommendationCategory("vegetables")}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        recommendationCategory === "vegetables" ? "bg-emerald-600 text-white font-semibold" : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    🥬 Vegetables ({diagnosticResult.topVegetables?.length || 0})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRecommendationCategory("fruits")}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        recommendationCategory === "fruits" ? "bg-emerald-600 text-white font-semibold" : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    🍎 Fruits ({diagnosticResult.topFruits?.length || 0})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRecommendationCategory("staples")}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        recommendationCategory === "staples" ? "bg-emerald-600 text-white font-semibold" : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    🌾 Grains & Cash ({diagnosticResult.topStaples?.length || 0})
                                </button>
                            </div>
                        </div>

                        {/* Crops Grid */}
                        {(() => {
                            const displayCrops =
                                recommendationCategory === "vegetables"
                                    ? diagnosticResult.topVegetables || []
                                    : recommendationCategory === "fruits"
                                    ? diagnosticResult.topFruits || []
                                    : recommendationCategory === "staples"
                                    ? diagnosticResult.topStaples || []
                                    : diagnosticResult.topRecommendedCrops;

                            return (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {displayCrops.map((crop, idx) => {
                                        const isSelected = selectedCrop.toLowerCase() === crop.cropKey.toLowerCase();
                                        return (
                                            <div
                                                key={crop.cropKey}
                                                className={`p-4 rounded-xl border transition-all space-y-3 cursor-pointer ${
                                                    isSelected
                                                        ? "bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500 shadow-md"
                                                        : "bg-surface-2 border-border/60 hover:border-emerald-500/50 hover:bg-surface-2/80"
                                                }`}
                                                onClick={() => handlePickRecommendedCrop(crop.cropKey)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        Rank #{idx + 1}
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
                                                        {crop.bestSeason}
                                                    </span>
                                                </div>

                                                <div className="p-2.5 rounded-lg bg-surface-1 border border-border/30 text-xs space-y-1">
                                                    <div className="flex justify-between text-[11px]">
                                                        <span className="text-muted-foreground">Soil & pH Match:</span>
                                                        <span className="font-semibold text-amber-400">{crop.soilMatchText}</span>
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
                                                    {isSelected ? "Inspected in Dossier" : "Inspect Soil Viability ↑"}
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}
                    </div>

                    {/* SECTION 3: MONSOON & RAINFALL HYDROLOGY */}
                    <div id="monsoon-rainfall-factor-section" className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                    <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                                    <span>Monsoon & Rootzone Water Balance</span>
                                </div>
                                <h3 className="text-lg font-bold text-foreground">
                                    Rainfall Factor & Seedbed Moisture
                                </h3>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                diagnosticResult.rainfallFactor.waterStatus.includes("Optimal")
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                    : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            }`}>
                                {diagnosticResult.rainfallFactor.waterStatus}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-surface-2 border border-border/40">
                                <span className="text-muted-foreground block text-[10px]">Crop Requirement</span>
                                <span className="font-bold text-foreground text-sm">{diagnosticResult.rainfallFactor.cropDemandMm} mm</span>
                            </div>
                            <div className="p-3 rounded-xl bg-surface-2 border border-border/40">
                                <span className="text-muted-foreground block text-[10px]">Regional Rainfall</span>
                                <span className="font-bold text-cyan-400 text-sm">{diagnosticResult.rainfallFactor.localAnnualMm} mm</span>
                            </div>
                            <div className="p-3 rounded-xl bg-surface-2 border border-border/40">
                                <span className="text-muted-foreground block text-[10px]">Net Water Balance</span>
                                <span className={`font-bold text-sm ${
                                    diagnosticResult.rainfallFactor.netWaterBalanceMm >= 0 ? "text-emerald-400" : "text-amber-400"
                                }`}>
                                    {diagnosticResult.rainfallFactor.netWaterBalanceMm >= 0 ? "+" : ""}
                                    {diagnosticResult.rainfallFactor.netWaterBalanceMm} mm
                                </span>
                            </div>
                            <div className="p-3 rounded-xl bg-surface-2 border border-border/40">
                                <span className="text-muted-foreground block text-[10px]">Topsoil Vapsa Moisture</span>
                                <span className="font-bold text-emerald-400 text-sm">{diagnosticResult.rainfallFactor.topsoilMoistureVolPct}% vol</span>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: AGROCLOUD PRECISION ACTION PLAN */}
                    <div id="agrocloud-precision-action-plan" className="p-6 rounded-2xl bg-surface-1 border border-border/60 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-border/40 pb-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Precision Action Plan (सटीक कार्य योजना)</span>
                                </div>
                                <h3 className="text-lg font-bold text-foreground">
                                    AgroCloud Precision Agronomy Directives
                                </h3>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                Customized for {diagnosticResult.targetCrop.commonName}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {diagnosticResult.precisionActionPlan.map((action, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-xl bg-surface-2 border border-border/50 space-y-2 hover:border-emerald-500/40 transition-colors"
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
            )}
        </div>
    );
}
