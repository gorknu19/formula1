import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

export async function GET(req: any) {
  const prisma = new PrismaClient();

  // const data = await req.json();
  // console.log(data);
  const comment = await prisma.comment.findMany({
    // where: {
    //   postId: data.postId,
    // },
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

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  const data = await req.json();
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });

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
