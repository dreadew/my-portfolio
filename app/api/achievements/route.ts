import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all achievements
export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error("Failed to fetch achievements:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    );
  }
}

// POST create achievement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const achievement = await prisma.achievement.create({
      data: {
        type: body.type,
        title: body.title,
        description: body.description || null,
        url: body.url || null,
        date: body.date ? new Date(body.date) : null,
      },
    });
    return NextResponse.json(achievement, { status: 201 });
  } catch (error) {
    console.error("Failed to create achievement:", error);
    return NextResponse.json(
      { error: "Failed to create achievement" },
      { status: 500 }
    );
  }
}
