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
  const token = await getToken({ req, secret });
  const userId = token?.id as string;

  const comment = await prisma.comment.create({
    data: {
      content: data.commentBody,
      userId: userId,
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
  let commentText = params.get("postText");
  let commentPosterId = params.get("commentPosterId");
  const secret = process.env.SECRET;
  const token = await getToken({ req, secret });
  const userId = token?.id as string;
  const whitelisted = token?.whitelisted;

  if (!commentText)
    return NextResponse.json(
      { error: "Invalid comment text" },
      { status: 400 },
    );
  if (!commentId)
    return NextResponse.json(
      { error: "comment ID not specified" },
      { status: 400 },
    );
  if (userId !== commentPosterId && whitelisted !== true)
    return NextResponse.json(
      { error: "Dont have access to changing this comment!" },
      { status: 401 },
    );

  const post = await prisma.comment.update({
    where: {
      id: commentId,
    },

    data: {
      content: commentText,
    },
  });
  return NextResponse.json({ post });
}
