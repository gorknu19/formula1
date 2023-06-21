import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Post, PrismaClient } from '@prisma/client';
export type PostGet = {
  posts: (Post & {
    user: {
      name: string;
      id: string;
    };
  })[];
  postsLength: number;
};
export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let pageSize = parseInt(params.get('pageSize') || '10');
  let page = parseInt(params.get('page') || '1');

  const postsLength = await prisma.post.count();

  const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize, // Calculate the number of records to skip
    take: pageSize, // Set the number of records to take per page
    orderBy: {
      createdAt: 'desc', // Order the posts by creation date (descending)
    },
    // where: {
    //   userId: userId,
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

  let res = { posts, postsLength };
  return NextResponse.json(res);
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
  let postId = params.get('postId');
  let posterId = params.get('posterId');
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });
  const userId = token?.id as string;

  console.log(postId);
  const prisma = new PrismaClient();
  const post = await prisma.post.deleteMany({
    where: {
      //@ts-ignore
      id: postId,
      userId: userId,
    },
  });
  console.log({ post });
  return NextResponse.json({ yuh: 'yuh' });
}

export async function PATCH(req: NextRequest) {}
