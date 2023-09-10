import React from "react";
import { prisma } from "@/lib/prisma";
import Posts from "./Posts";

const Hero = async () => {
  const posts = await prisma.posts.findMany();
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts.map((post) => (
            <Posts key={post.id} posts={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
