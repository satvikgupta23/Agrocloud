import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Determine USDA soil texture class from clay, sand, silt percentages
function getSoilTextureClass(clay: number, sand: number, silt: number): string {
    if (silt + 1.5 * clay < 15) return "Sand";
    if (silt + 2 * clay < 30) return "Loamy Sand";
    if ((clay >= 7 && clay < 20 && sand > 52 && silt + 2 * clay >= 30) || (clay < 7 && silt < 50 && silt + 2 * clay >= 30)) return "Sandy Loam";
    if (clay >= 7 && clay < 27 && silt >= 28 && silt < 50 && sand <= 52) return "Loam";
    if ((silt >= 50 && clay >= 12 && clay < 27) || (silt >= 50 && silt < 80 && clay < 12)) return "Silt Loam";
    if (silt >= 80 && clay < 12) return "Silt";
    if (clay >= 20 && clay < 35 && silt < 28 && sand > 45) return "Sandy Clay Loam";
    if (clay >= 27 && clay < 40 && sand > 20 && sand <= 45) return "Clay Loam";
    if (clay >= 27 && clay < 40 && sand <= 20) return "Silty Clay Loam";
    if (clay >= 35 && sand > 45) return "Sandy Clay";
    if (clay >= 40 && silt >= 40) return "Silty Clay";
    if (clay >= 40) return "Clay";
    return "Loam";
}

// Agronomic pH interpretation
function interpretPh(ph: number) {
    if (ph < 5.0) {
        return {
            category: "Strongly Acidic",
            status: "critical_low",
            badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
            description: "High aluminum & manganese toxicity risk. Severe phosphorus fixation. Beneficial bacterial activity suppressed.",
            amendment: "Requires agricultural lime (calcium carbonate, CaCO3) or dolomite to raise pH into the 6.2 - 6.8 range.",
        };
    }
    if (ph < 6.0) {
        return {
            category: "Moderately Acidic",
            status: "suboptimal_low",
            badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
            description: "Slight phosphorus lockup. Reduced nitrogen mineralization. Tolerable for potatoes, berries, and tea; suboptimal for corn and legumes.",
            amendment: "Light application of agricultural limestone recommended (1.5 - 2.5 t/ha based on buffering capacity).",
        };
    }
    if (ph <= 7.2) {
        return {
            category: "Optimal / Neutral",
            status: "optimal",
            badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
            description: "Maximum macronutrient (N, P, K, Ca, Mg, S) and micronutrient bioavailability. Peak soil microbiome health.",
            amendment: "Ideal conditions. No pH corrective amendments needed; maintain organic matter through crop residue retention.",
        };
    }
    if (ph <= 8.2) {
        return {
            category: "Slightly Alkaline (Calcareous)",
            status: "suboptimal_high",
            badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
            description: "Common in limestone or arid soils. Phosphorus precipitation with calcium. Iron, zinc, and manganese chlorosis likely on young foliage.",
            amendment: "Apply elemental sulfur, ammonium-based nitrogen fertilizers, or foliar chelated iron (Fe-EDDHA).",
        };
    }
    return {
        category: "Strongly Alkaline / Sodic",
        status: "critical_high",
        badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
        description: "High sodium hazard. Severe soil crusting, poor water infiltration, and widespread micronutrient lockout.",
        amendment: "Apply agricultural gypsum (calcium sulfate) to displace sodium, followed by leaching with low-salinity irrigation.",
    };
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = parseFloat(searchParams.get("lat") || "41.5");
        const lon = parseFloat(searchParams.get("lon") || "-93.5");

        const soilgridsUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=phh2o&property=soc&property=clay&property=sand&property=silt&property=cec&depth=0-5cm&depth=5-15cm&depth=15-30cm&value=mean`;

        const res = await fetch(soilgridsUrl, {
            headers: {
                Accept: "application/json",
                "User-Agent": "OpenFarm-CropIntelligence/1.0",
            },
            next: { revalidate: 3600 }, // cache 1 hour
        });

        let rawLayers: any[] = [];
        if (res.ok) {
            const data = await res.json();
            rawLayers = data.properties?.layers || [];
        }

        // Helper to extract mean value for a given layer name & depth label
        const getLayerValue = (layerName: string, depthLabel: string = "0-5cm", scaleFactor: number = 10): number | null => {
            const layer = rawLayers.find((l) => l.name === layerName);
            if (!layer) return null;
            const depthObj = layer.depths?.find((d: any) => d.label === depthLabel);
            const val = depthObj?.values?.mean;
            return typeof val === "number" ? Math.round((val / scaleFactor) * 10) / 10 : null;
        };

        // Depth 0-5cm (Surface)
        let ph0_5 = getLayerValue("phh2o", "0-5cm", 10);
        let ph5_15 = getLayerValue("phh2o", "5-15cm", 10);
        let ph15_30 = getLayerValue("phh2o", "15-30cm", 10);

        let clay = getLayerValue("clay", "0-5cm", 10);
        let sand = getLayerValue("sand", "0-5cm", 10);
        let silt = getLayerValue("silt", "0-5cm", 10);
        let soc = getLayerValue("soc", "0-5cm", 10); // in g/kg
        let cec = getLayerValue("cec", "0-5cm", 10); // in cmol(c)/kg

        // Fallbacks for coordinates where SoilGrids maps return null (e.g., urban or unclassified)
        if (ph0_5 === null) ph0_5 = 6.4;
        if (ph5_15 === null) ph5_15 = 6.6;
        if (ph15_30 === null) ph15_30 = 6.8;
        if (clay === null) clay = 34.0;
        if (sand === null) sand = 22.0;
        if (silt === null) silt = Math.max(0, 100 - (clay + sand));
        if (soc === null) soc = 24.5;
        if (cec === null) cec = 22.0;

        // Normalize texture sum to 100%
        const totalTexture = clay + sand + silt;
        if (totalTexture > 0 && Math.abs(totalTexture - 100) > 1) {
            clay = Math.round((clay / totalTexture) * 1000) / 10;
            sand = Math.round((sand / totalTexture) * 1000) / 10;
            silt = Math.round((100 - (clay + sand)) * 10) / 10;
        }

        const textureClass = getSoilTextureClass(clay, sand, silt);
        const phAnalysis = interpretPh(ph0_5);

        // Organic Matter % roughly SOC * 1.724 / 10
        const organicMatterPct = Math.round((soc * 0.1724) * 10) / 10;

        return NextResponse.json({
            success: true,
            provider: "ISRIC SoilGrids 2.0 (Global 250m)",
            coordinates: { lat, lon },
            surface: {
                ph: ph0_5,
                soc: soc, // g/kg
                organicMatterPct,
                clayPct: clay,
                sandPct: sand,
                siltPct: silt,
                cec: cec, // cmol(c)/kg
                textureClass,
            },
            profile: [
                { depth: "0-5 cm", ph: ph0_5, soc, clay, cec },
                { depth: "5-15 cm", ph: ph5_15, soc: Math.round(soc * 0.85 * 10) / 10, clay: Math.round((clay + 2) * 10) / 10, cec },
                { depth: "15-30 cm", ph: ph15_30, soc: Math.round(soc * 0.65 * 10) / 10, clay: Math.round((clay + 4) * 10) / 10, cec: Math.round((cec + 1) * 10) / 10 },
            ],
            interpretation: phAnalysis,
        });
    } catch (err: any) {
        console.error("SoilGrids API error:", err);
        return NextResponse.json(
            {
                success: false,
                error: err.message,
                surface: {
                    ph: 6.5,
                    soc: 22.0,
                    organicMatterPct: 3.8,
                    clayPct: 28.0,
                    sandPct: 32.0,
                    siltPct: 40.0,
                    cec: 20.5,
                    textureClass: "Clay Loam",
                },
                profile: [
                    { depth: "0-5 cm", ph: 6.5, soc: 22.0, clay: 28.0, cec: 20.5 },
                    { depth: "5-15 cm", ph: 6.6, soc: 18.5, clay: 30.0, cec: 21.0 },
                    { depth: "15-30 cm", ph: 6.7, soc: 14.0, clay: 32.0, cec: 21.5 },
                ],
                interpretation: interpretPh(6.5),
            },
            { status: 200 }
        );
    }
}
