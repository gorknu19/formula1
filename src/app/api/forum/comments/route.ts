import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let postId = params.get("postId");
  if (!postId)
    return NextResponse.json({ error: "no post ID" }, { status: 400 });

  const comment = await prisma.comment.findMany({
    where: {
      postId: postId,
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
  return NextResponse.json(comment.reverse());
}

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();

  const data = await req.json();
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });
  console.log(token);
  const userId = token?.id as string;
  console.log(userId);

  const comment = await prisma.comment.create({
    data: {
      content: data.commentBody,
      userId: userId,
      //@ts-ignore
      postId: data.postId,
    },
  });
  console.log({ comment });

  return NextResponse.json({ comment });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let commentId = params.get("commentId");
  let commentPosterId = params.get("commentPosterId");
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });
  const userId = token?.id as string;
  const whitelisted = token?.whitelisted;
  console.log(commentId);
  const prisma = new PrismaClient();
  if (commentPosterId === userId || whitelisted === true) {
    const comment = await prisma.comment.deleteMany({
      where: {
        //@ts-ignore
        id: commentId,
      },
    });

    console.log({ comment });
    return NextResponse.json({ comment });
  } else return NextResponse.json({ error: "not authorized" }, { status: 401 });
}

export async function PATCH(req: NextRequest) {
  const prisma = new PrismaClient();
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let commentId = params.get("postId");
  let postText = params.get("postText");
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });
  const userId = token?.id as string;
  if (!postText)
    return NextResponse.json(
      { error: "Invalid title or body" },
      { status: 400 },
    );
  const post = await prisma.comment.update({
    where: {
      //@ts-ignore
      id: commentId,
      // userId: userId,
    },

    data: {
      content: postText,
    },
  });
  return NextResponse.json({ post });
}
