"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = fetch("http://localhost:3000/api/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};
export default function page() {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      await createUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      toast.success("Registrado com sucesso!", {
        position: "bottom-center",
      });
      router.push("/admin");
    } else {
      toast.error("Falha ao se registrar!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <input
          ref={emailRef}
          className="w-full p-4 pt-6 font-light bg-white border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-black"
          placeholder="Email"
          id="email"
          type="email"
          name="email"
        />
        <input
          ref={passwordRef}
          className="w-full p-4 pt-6 font-light bg-white border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-black"
          placeholder="Password"
          id="password"
          type="password"
          name="password"
        />

        <button className="text-blue-500" type="submit">
          Registrar
        </button>
      </div>

      <div>
        <div>
          já tem uma conta?{" "}
          <Link className="text-blue-500" href="/login">
            Entrar
          </Link>
        </div>
      </div>
    </form>
  );
}
