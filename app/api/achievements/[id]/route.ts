import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single achievement
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const achievement = await prisma.achievement.findUnique({
      where: { id },
    });
    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Failed to fetch achievement:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievement" },
      { status: 500 }
    );
  }
}

// PUT update achievement
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const achievement = await prisma.achievement.update({
      where: { id },
      data: {
        type: body.type,
        title: body.title,
        description: body.description,
        url: body.url,
        date: body.date ? new Date(body.date) : null,
      },
    });
    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Failed to update achievement:", error);
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 }
    );
  }
}

// DELETE achievement
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.achievement.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete achievement:", error);
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
