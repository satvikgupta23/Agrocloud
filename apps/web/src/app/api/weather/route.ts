import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// WMO weather code dictionary
const WMO_CODES: Record<number, { label: string; icon: string }> = {
    0: { label: "Clear sky", icon: "sun" },
    1: { label: "Mainly clear", icon: "sun-cloud" },
    2: { label: "Partly cloudy", icon: "cloud-sun" },
    3: { label: "Overcast", icon: "cloud" },
    45: { label: "Foggy", icon: "cloud-fog" },
    48: { label: "Depositing rime fog", icon: "cloud-fog" },
    51: { label: "Light drizzle", icon: "cloud-drizzle" },
    53: { label: "Moderate drizzle", icon: "cloud-drizzle" },
    55: { label: "Dense drizzle", icon: "cloud-drizzle" },
    61: { label: "Slight rain", icon: "cloud-rain" },
    63: { label: "Moderate rain", icon: "cloud-rain" },
    65: { label: "Heavy rain", icon: "cloud-rain-heavy" },
    71: { label: "Slight snow fall", icon: "cloud-snow" },
    73: { label: "Moderate snow fall", icon: "cloud-snow" },
    75: { label: "Heavy snow fall", icon: "cloud-snow" },
    80: { label: "Slight rain showers", icon: "cloud-rain" },
    81: { label: "Moderate rain showers", icon: "cloud-rain" },
    82: { label: "Violent rain showers", icon: "cloud-lightning" },
    95: { label: "Thunderstorm", icon: "cloud-lightning" },
    96: { label: "Thunderstorm with slight hail", icon: "cloud-lightning" },
    99: { label: "Thunderstorm with heavy hail", icon: "cloud-lightning" },
};

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = parseFloat(searchParams.get("lat") || "41.5");
        const lon = parseFloat(searchParams.get("lon") || "-93.5");

        const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=soil_temperature_0cm,soil_temperature_6cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,et0_fao_evapotranspiration&timezone=auto`;

        const res = await fetch(openMeteoUrl, {
            headers: { "User-Agent": "OpenFarm-CropIntelligence/1.0" },
            next: { revalidate: 300 }, // cache 5 mins
        });

        if (!res.ok) {
            throw new Error(`Open-Meteo returned status ${res.status}`);
        }

        const data = await res.json();

        const current = data.current || {};
        const weatherCode = current.weather_code ?? 0;
        const condition = WMO_CODES[weatherCode] || { label: "Variable", icon: "cloud" };

        // Latest hourly soil data
        const hourly = data.hourly || {};
        const soilTemp0 = hourly.soil_temperature_0cm ? hourly.soil_temperature_0cm[hourly.soil_temperature_0cm.length - 1] ?? 16.0 : 16.0;
        const soilTemp6 = hourly.soil_temperature_6cm ? hourly.soil_temperature_6cm[hourly.soil_temperature_6cm.length - 1] ?? 15.2 : 15.2;
        const soilMoist0 = hourly.soil_moisture_0_to_1cm ? hourly.soil_moisture_0_to_1cm[hourly.soil_moisture_0_to_1cm.length - 1] ?? 0.32 : 0.32;
        const soilMoist1 = hourly.soil_moisture_1_to_3cm ? hourly.soil_moisture_1_to_3cm[hourly.soil_moisture_1_to_3cm.length - 1] ?? 0.34 : 0.34;

        // Daily forecast & GDD computation (Base 10°C)
        const daily = data.daily || {};
        const days = daily.time || [];
        const maxTemps = daily.temperature_2m_max || [];
        const minTemps = daily.temperature_2m_min || [];
        const precipSums = daily.precipitation_sum || [];
        const et0s = daily.et0_fao_evapotranspiration || [];

        let accumulatedGdd7Days = 0;
        const forecast = days.map((day: string, idx: number) => {
            const tMax = maxTemps[idx] ?? 20;
            const tMin = minTemps[idx] ?? 10;
            const tMean = (tMax + tMin) / 2;
            const gdd = Math.max(0, tMean - 10);
            accumulatedGdd7Days += gdd;

            return {
                date: day,
                tempMax: tMax,
                tempMin: tMin,
                precipitation: precipSums[idx] ?? 0,
                et0: et0s[idx] ?? 3.5,
                gdd: Math.round(gdd * 10) / 10,
            };
        });

        // Moisture status description
        let moistureStatus = "Optimal";
        if (soilMoist0 < 0.18) moistureStatus = "Severe Deficit (Drought Stress)";
        else if (soilMoist0 < 0.25) moistureStatus = "Mild Deficit";
        else if (soilMoist0 > 0.42) moistureStatus = "Near Saturation (Waterlogging Risk)";

        return NextResponse.json({
            success: true,
            location: {
                lat,
                lon,
                timezone: data.timezone || "UTC",
                elevation: data.elevation || 0,
            },
            current: {
                temperature: current.temperature_2m ?? 20.0,
                humidity: current.relative_humidity_2m ?? 65,
                precipitation: current.precipitation ?? 0,
                windSpeed: current.wind_speed_10m ?? 10,
                weatherCode,
                conditionText: condition.label,
                conditionIcon: condition.icon,
                soilTemperature0cm: soilTemp0,
                soilTemperature6cm: soilTemp6,
                soilMoisture0_1cm: soilMoist0,
                soilMoisture1_3cm: soilMoist1,
                moistureStatus,
            },
            agronomy: {
                accumulatedGdd7Days: Math.round(accumulatedGdd7Days * 10) / 10,
                dailyGddRate: Math.round((accumulatedGdd7Days / (forecast.length || 1)) * 10) / 10,
                totalPrecip7Days: Math.round(precipSums.reduce((a: number, b: number) => a + b, 0) * 10) / 10,
                totalEt07Days: Math.round(et0s.reduce((a: number, b: number) => a + b, 0) * 10) / 10,
            },
            forecast,
        });
    } catch (err: any) {
        console.error("Open-Meteo API route error:", err);
        return NextResponse.json(
            {
                success: false,
                error: err.message || "Failed to fetch Open-Meteo weather data",
                fallback: {
                    current: {
                        temperature: 21.5,
                        humidity: 62,
                        precipitation: 0,
                        windSpeed: 12.4,
                        conditionText: "Partly cloudy",
                        conditionIcon: "cloud-sun",
                        soilTemperature0cm: 18.2,
                        soilTemperature6cm: 17.5,
                        soilMoisture0_1cm: 0.31,
                        soilMoisture1_3cm: 0.33,
                        moistureStatus: "Optimal",
                    },
                    agronomy: {
                        accumulatedGdd7Days: 78.4,
                        dailyGddRate: 11.2,
                        totalPrecip7Days: 14.5,
                        totalEt07Days: 22.8,
                    },
                    forecast: [],
                },
            },
            { status: 200 }
        );
    }
}
