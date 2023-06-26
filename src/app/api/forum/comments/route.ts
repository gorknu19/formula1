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
