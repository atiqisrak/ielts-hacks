import { NextResponse } from "next/server";
import materialsData from "@/data/materials.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const categoryMap: Record<string, string> = {
      books: "book",
      guides: "guide",
      "practice-papers": "practice-paper",
    };
    const mappedCategory = categoryMap[category] || category;
    const filteredMaterials = materialsData.materials.filter(
      (material) => material.category === mappedCategory
    );
    
    return NextResponse.json({ materials: filteredMaterials });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
}

