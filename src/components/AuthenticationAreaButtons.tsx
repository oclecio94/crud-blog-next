"use client";
import { useSession, signOut, signIn } from "next-auth/react";

const AuthenticationAreaButtons = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-white">{session.user.email}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sair
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()} className="text-white ml-auto">
      Logar
    </button>
  );
};

export default AuthenticationAreaButtons;
