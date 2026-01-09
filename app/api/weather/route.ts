import { NextResponse } from "next/server";

export const revalidate = 600; // Cache for 10 minutes (ISR)

interface WeatherData {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
    uvIndex: number;
    uvLevel: string;
    airQuality?: {
        aqi: number;
        level: string;
        pm25?: number;
        pm10?: number;
    };
}

const getWeatherCondition = (code: number) => {
    if (code === 0) return { condition: "Clear", icon: "☀️" };
    if (code <= 3) return { condition: "Partly Cloudy", icon: "⛅" };
    if (code <= 48) return { condition: "Foggy", icon: "🌫️" };
    if (code <= 67) return { condition: "Rainy", icon: "🌧️" };
    if (code <= 77) return { condition: "Snowy", icon: "❄️" };
    if (code <= 99) return { condition: "Stormy", icon: "⛈️" };
    return { condition: "Unknown", icon: "🌤️" };
};

const getUVLevel = (uv: number): string => {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
};

const getAQILevel = (aqi: number): string => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json(
            { success: false, error: "Missing latitude or longitude" },
            { status: 400 }
        );
    }

    try {
        // Fetch weather data with UV index
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,uv_index&temperature_unit=celsius&timezone=auto`,
            { next: { revalidate: 600 } }
        );
        const weatherJson = await weatherResponse.json();

        const weatherCode = weatherJson.current?.weather_code || 0;
        const weatherInfo = getWeatherCondition(weatherCode);
        const uvIndex = Math.round(weatherJson.current?.uv_index || 0);

        // Fetch air quality data
        let airQuality;
        try {
            const aqResponse = await fetch(
                `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm2_5,pm10`,
                { next: { revalidate: 600 } }
            );
            const aqJson = await aqResponse.json();

            if (aqJson.current) {
                const aqi = Math.round(aqJson.current.us_aqi || 0);
                airQuality = {
                    aqi,
                    level: getAQILevel(aqi),
                    pm25: Math.round(aqJson.current.pm2_5 || 0),
                    pm10: Math.round(aqJson.current.pm10 || 0),
                };
            }
        } catch (aqError) {
            console.error("Air quality fetch failed:", aqError);
        }

        const weather: WeatherData = {
            temperature: Math.round(weatherJson.current?.temperature_2m || 0),
            condition: weatherInfo.condition,
            humidity: weatherJson.current?.relative_humidity_2m || 0,
            windSpeed: Math.round(weatherJson.current?.wind_speed_10m || 0),
            icon: weatherInfo.icon,
            uvIndex,
            uvLevel: getUVLevel(uvIndex),
            airQuality,
        };

        return NextResponse.json({
            success: true,
            weather,
            lastUpdated: new Date().toISOString(),
        }, {
            headers: {
                "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
            },
        });
    } catch (error) {
        console.error("Weather API error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch weather data" },
            { status: 500 }
        );
    }
}
