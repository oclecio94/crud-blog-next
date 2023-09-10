import React from "react";
import { prisma } from "@/lib/prisma";
import PostsAdmin from "./PostsAdmin";

const HeroAdmin = async () => {
  const posts = await prisma.posts.findMany();
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts.map((post) => (
            <PostsAdmin key={post.id} posts={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroAdmin;
