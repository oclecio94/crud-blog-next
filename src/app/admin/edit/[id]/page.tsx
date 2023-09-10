"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const updatePost = async (data: any) => {
  console.log(data);
  const res = fetch(`http://localhost:3000/api/posts/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: data.title,
      description: data.description,
    }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return res;
};

const deletePost = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/posts/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return res;
};

const getPostById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const data = await res.json();
  return data;
};

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getPostById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Busca completa!");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Erro ao buscar postagem!");
      });
  }, []);

  // const isValidFields = () => {
  //   if (titleRef.current && descriptionRef.current) {
  //     toast.error("Erro ao atualizar!");
  //   }
  //   return;
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // isValidFields();
    if (titleRef.current && descriptionRef.current) {
      await updatePost({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        id: params.id,
      });

      toast.success("Postagem atualizada com sucesso!");
      router.push("/admin");
    } else {
      toast.error("Falha ao se atualizar!", {
        position: "bottom-center",
      });
    }
  };

  const handleDelete = async () => {
    await deletePost(params.id);
    toast.success("Postagem deletada com sucesso!");
    router.push("/admin");
  };

  return (
    <Fragment>
      <div className="bg-slate-600 h-screen">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3 mt-4">
            Atualize a Postagem!
          </p>
          <form
            className="w-[350px] mt-4 border rounded-md p-2"
            onSubmit={handleSubmit}
          >
            <input
              ref={titleRef}
              placeholder="titulo..."
              type="text"
              className="rounded-md px-4 py-2 my-2 w-full"
            />
            <input
              ref={descriptionRef}
              placeholder="descrição..."
              className="rounded-md px-4 py-2 w-full my-2"
            ></input>

            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="my-2 font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
              >
                Atualizar
              </button>
              <button
                onClick={handleDelete}
                className="mt-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-500"
              >
                Deletar
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
