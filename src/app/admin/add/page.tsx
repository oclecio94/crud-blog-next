"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { toast } from "react-toastify";

const post = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const res = fetch("http://localhost:3000/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const page = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      await post({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      });
      toast.success("Postagem enviada com sucesso!");
      router.push("/admin");
    }
  };
  return (
    <Fragment>
      <div className="bg-slate-600 h-screen">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3 mt-4">
            Adicionar uma nova postagem!
          </p>
          <form
            className="w-[350px] mt-4 border rounded-md p-2"
            onSubmit={handleSubmit}
          >
            <input
              ref={titleRef}
              placeholder="titulo..."
              type="text"
              className="rounded-md px-4 py-2 my-2 w-full mt-2"
            />
            <input
              ref={descriptionRef}
              placeholder="descrição..."
              className="rounded-md px-4 py-2 w-full my-2 mt-2"
            ></input>
            <div className="flex mt-2">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Adicionar
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-2">
            <Link
              href={"/admin"}
              className="text-center p-2 bg-gray-500 text-white mb-2 rounded-md"
            >
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default page;
