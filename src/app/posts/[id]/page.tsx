import { prisma } from "@/lib/prisma";
import Link from "next/link";

// const getPostById = async (id: string) => {
//   const posts = await prisma.posts.findUnique({
//     where: {
//       id: id,
//     },
//   });

//   return posts;
// };

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const posts: any = await prisma.posts.findUnique({
    where: {
      id: id,
    },
  });
  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          Titulo:
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
          {posts.title}
        </h2>
        <p className="leading-relaxed text-base">{posts.description}</p>
        <div className="flex justify-center items-center mt-2">
          <Link
            href={"/"}
            className="text-center p-2 bg-gray-500 text-white mb-2 rounded-md"
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
