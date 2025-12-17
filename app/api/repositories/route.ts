import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all repositories
export async function GET() {
  try {
    const repositories = await prisma.repository.findMany({
      orderBy: [
        { stars: "desc" },
        { createdAt: "desc" },
      ],
    });
    return NextResponse.json(repositories);
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}

// POST create repository
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const repository = await prisma.repository.create({
      data: {
        name: body.name,
        description: body.description || null,
        url: body.url,
        stars: body.stars || 0,
        language: body.language || null,
      },
    });
    return NextResponse.json(repository, { status: 201 });
  } catch (error) {
    console.error("Failed to create repository:", error);
    return NextResponse.json(
      { error: "Failed to create repository" },
      { status: 500 }
    );
  }
}
