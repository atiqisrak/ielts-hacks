import { NextResponse } from "next/server";
import materialsData from "@/data/materials.json";

export async function GET() {
  try {
    return NextResponse.json(materialsData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
}

