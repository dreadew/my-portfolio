import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single repository
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repository = await prisma.repository.findUnique({
      where: { id },
    });
    if (!repository) {
      return NextResponse.json(
        { error: "Repository not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(repository);
  } catch (error) {
    console.error("Failed to fetch repository:", error);
    return NextResponse.json(
      { error: "Failed to fetch repository" },
      { status: 500 }
    );
  }
}

// PUT update repository
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const repository = await prisma.repository.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        url: body.url,
        stars: body.stars,
        language: body.language,
      },
    });
    return NextResponse.json(repository);
  } catch (error) {
    console.error("Failed to update repository:", error);
    return NextResponse.json(
      { error: "Failed to update repository" },
      { status: 500 }
    );
  }
}

// DELETE repository
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.repository.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete repository:", error);
    return NextResponse.json(
      { error: "Failed to delete repository" },
      { status: 500 }
    );
  }
}
