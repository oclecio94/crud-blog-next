import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);

  if (!id) {
    return {
      status: 400,
      body: {
        message: "Missing id",
      },
    };
  }

  const post = await prisma.posts.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  return new NextResponse(JSON.stringify(post));
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);

  if (!id) {
    return {
      status: 400,
      body: {
        message: "Missing id",
      },
    };
  }
  const body = await request.json();
  const { title, description } = body;

  if (!title || !description) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.posts.findUnique({
    where: {
      title,
    },
  });

  if (exist) {
    throw new Error("Post already exists");
  }

  const post = await prisma.posts.update({
    where: {
      id,
    },
    data: { title, description },
  });

  return new NextResponse(JSON.stringify(post));
}

export async function DELETE(
  _request: Request,
  { params: { id } }: { params: { id: string } }
) {
  if (!id) {
    return {
      status: 400,
      body: {
        message: "Missing id",
      },
    };
  }
  const post = await prisma.posts.delete({ where: { id } });

  return new NextResponse(JSON.stringify(post));
}
