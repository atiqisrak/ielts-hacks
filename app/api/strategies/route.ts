import { NextResponse } from "next/server";
import strategiesData from "@/data/strategies.json";

export async function GET() {
  try {
    return NextResponse.json(strategiesData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch strategies" },
      { status: 500 }
    );
  }
}

