"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PostsAdmin from "./components/PostsAdmin";
import Header from "@/components/Header";

const page = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3000/api/posts");

    const json = await response.json();

    setPosts(json);
  };
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-3xl">
        Carregando!
      </div>
    );
  }

  if (status === "unauthenticated") {
    alert("Você não tem permissao para accessar esta pagina!");
    return router.push("/");
  }

  fetchPosts();

  return (
    <section className="text-gray-600">
      <Header />
      <div className="container px-5 py-5 mx-auto">
        <div className="flex justify-center items-center">
          <Link
            href={"/admin/add"}
            className="text-center p-2 bg-gray-500 text-white mb-2 rounded-md"
          >
            Adicionar nova postagem
          </Link>
        </div>
        <div className="flex flex-wrap -m-4">
          {posts.map((post) => (
            //@ts-ignore
            <PostsAdmin key={post.id} posts={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
