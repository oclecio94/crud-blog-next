import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

  const post = await prisma.posts.create({
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(post);
}

export async function GET(request: Request) {
  const posts = await prisma.posts.findMany();

  return NextResponse.json(posts);
}
