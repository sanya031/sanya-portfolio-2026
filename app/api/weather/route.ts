import { NextResponse } from "next/server";

// Toronto, ON. Open-Meteo is free and needs no API key.
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&current=temperature_2m";

// One shared lookup per 15 minutes for every visitor.
export const revalidate = 900;

type OpenMeteoResponse = { current?: { temperature_2m?: number } };

export async function GET() {
  try {
    const response = await fetch(WEATHER_URL, { next: { revalidate } });

    if (!response.ok) {
      return NextResponse.json({ temperature: null }, { status: 502 });
    }

    const data = (await response.json()) as OpenMeteoResponse;
    const temperature = data.current?.temperature_2m;

    return NextResponse.json({
      temperature: typeof temperature === "number" ? Math.round(temperature) : null,
    });
  } catch {
    return NextResponse.json({ temperature: null }, { status: 502 });
  }
}
