import { NextResponse } from "next/server";
import strategiesData from "@/data/strategies.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    const filteredStrategies = strategiesData.strategies.filter(
      (strategy) => strategy.section === section
    );
    
    return NextResponse.json({ strategies: filteredStrategies });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch strategies" },
      { status: 500 }
    );
  }
}

