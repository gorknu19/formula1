import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let pageSize = parseInt(params.get("pageSize") || "10");
  let page = parseInt(params.get("page") || "1");
  let userId = params.get("userId");
  const postsLength = await prisma.post.count({
    where: { ...(userId ? { userId: userId } : {}) },
  });

  const posts = await prisma.post.findMany({
    where: { ...(userId ? { userId: userId } : {}) },
    skip: (page - 1) * pageSize, // Calculate the number of records to skip
    take: pageSize, // Set the number of records to take per page
    orderBy: {
      createdAt: "desc", // Order the posts by creation date (descending)
    },

    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return NextResponse.json({ posts, postsLength });
}

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });
  const userId = token?.id as string;
  console.log(userId);
  const post = await prisma.post.create({
    data: {
      title: data.postTitle,
      content: data.postBody,
      userId: userId,
    },
  });
  console.log({ post });

  return NextResponse.json({ post });
}
export async function DELETE(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let postId = params.get("postId");
  let posterId = params.get("posterId");
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });
  const userId = token?.id as string;
  const whitelisted = token?.whitelisted;
  console.log(postId);
  const prisma = new PrismaClient();
  if (posterId === userId || whitelisted === true) {
    const comments = await prisma.comment.deleteMany({
      where: {
        //@ts-ignore
        postId: postId,
      },
    });
    const post = await prisma.post.deleteMany({
      where: {
        //@ts-ignore
        id: postId,
      },
    });

    console.log({ post }, { comments });
    return NextResponse.json({ post });
  } else return NextResponse.json({ error: "not authorized" }, { status: 401 });
}

export async function PATCH(req: NextRequest) {
  const prisma = new PrismaClient();
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let postId = params.get("postId");
  let postTitle = params.get("postTitle");
  let postText = params.get("postText");
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });
  const userId = token?.id as string;
  if (!postTitle || !postText)
    return NextResponse.json(
      { error: "Invalid title or body" },
      { status: 400 },
    );
  const post = await prisma.post.update({
    where: {
      //@ts-ignore
      id: postId,
      // userId: userId,
    },

    data: {
      title: postTitle,
      content: postText,
    },
  });
  return NextResponse.json({ post });
}
