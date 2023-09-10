import Link from "next/link";
import React from "react";

const Posts = ({ posts }: any) => {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <Link
          href={`/posts/${posts.id}`}
          className="block relative h-48 rounded overflow-hidden"
        >
          <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
            Titulo:
          </h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
            {posts.title}
          </h2>
          <p className="leading-relaxed text-base">{posts.description}</p>
        </Link>
      </div>
    </div>
  );
};

export default Posts;
