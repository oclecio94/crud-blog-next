"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

type InitialStateProps = {
  email: string;
  password: string;
};

const initialState: InitialStateProps = {
  email: "",
  password: "",
};

type Props = {
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    event.preventDefault();
    const res = await signIn("credentials", {
      ...state,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Não Autorizado!");
      // alert("nao autorizado!");
    } else {
      toast.success("Logado com sucesso!");
      router.push("/admin");
    }
  }

  return (
    <form onSubmit={handleLogin} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <input
          className="w-full p-4 pt-6 font-light bg-white border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-black"
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
        <input
          className="w-full p-4 pt-6 font-light bg-white border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-black"
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
        <div className="flex justify-between">
          <button className="text-blue-500" type="submit">
            Entrar
          </button>
          <Link
            href={"/"}
            // href={props.callbackUrl ?? "/"}
            className="w-28 border border-red-600 text-center py-2 rounded-md text-red-600 transition hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
