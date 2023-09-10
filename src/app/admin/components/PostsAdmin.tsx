import Link from "next/link";
import React from "react";

const PostsAdmin = ({ posts }: any) => {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="block relative h-56 rounded overflow-hidden">
          <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
            Titulo:
          </h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
            {posts.title}
          </h2>
          <p className="leading-relaxed text-base mb-3">{posts.description}</p>
          <div className="flex justify-center items-center">
            <Link
              href={`/admin/edit/${posts.id}`}
              className="text-center p-2 bg-blue-500 text-white mb-2 rounded-md"
            >
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsAdmin;
