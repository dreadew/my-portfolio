import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST create project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image || null,
        url: body.url,
        tags: body.tags || [],
        featured: body.featured || false,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
