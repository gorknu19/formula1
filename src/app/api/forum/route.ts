import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Comment, Post, Prisma, PrismaClient, User } from "@prisma/client";
import { Posts } from "@/types/forum/forum.types";
import { forumPostSchema } from "./schema";

export type ForumGET = {
  posts: (Post & {
    user: {
      id: User["id"];
      name: User["name"];
    };
  })[];
  postsLength: number;
  nextCursor?: number;
};

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let pageSize = parseInt(params.get("pageSize") || "2");
  let skip = parseInt(params.get("skip") || "0");
  let userId = params.get("userId");
  const postsLength = await prisma.post.count({
    where: { ...(userId ? { userId: userId } : {}) },
  });
  const posts = await prisma.post.findMany({
    where: { ...(userId ? { userId: userId } : {}) },
    skip: skip, // Calculate the number of records to skip
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
  let nextCursor: number | undefined = skip + pageSize;
  if (nextCursor > postsLength) {
    nextCursor = undefined;
  }
  return NextResponse.json<ForumGET>({
    posts,
    postsLength,
    nextCursor: nextCursor,
  });
}
export type ForumPOST = {
  post: Post;
};
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = forumPostSchema.parse(await req.json());
  const secret = process.env.SECRET;
  //@ts-ignore
  const token = await getToken({ req, secret });
  const userId = token?.id as string;
  const post = await prisma.post.create({
    data: {
      title: data.postTitle,
      content: data.postBody,
      userId: userId,
    },
  });

  return NextResponse.json<ForumPOST>({ post });
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

  if (posterId !== userId || whitelisted === false) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }

  const prisma = new PrismaClient();
  if (!postId) {
    return NextResponse.json({ error: "No post specified" }, { status: 400 });
  }
  const comments = await prisma.comment.deleteMany({
    where: {
      postId: postId,
    },
  });
  const post = await prisma.post.deleteMany({
    where: {
      id: postId,
    },
  });

  console.log({ post }, { comments });
  return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest) {
  const prisma = new PrismaClient();
  const url = new URL(req.nextUrl);
  const params = url.searchParams;
  let postId = params.get("postId");
  let postTitle = params.get("postTitle");
  let postText = params.get("postText");
  const secret = process.env.SECRET;

  const token = await getToken({ req, secret });
  const userId = token?.id as string;
  if (!postTitle || !postText)
    return NextResponse.json(
      { error: "Invalid title or body" },
      { status: 400 },
    );

  if (!postId) {
    return NextResponse.json({ error: "No post specified" }, { status: 400 });
  }
  const post = await prisma.post.update({
    where: {
      id: postId,
    },

    data: {
      title: postTitle,
      content: postText,
    },
  });
  return NextResponse.json({ post });
}
