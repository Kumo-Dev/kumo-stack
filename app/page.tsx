"use client";
import Image from "next/image";
import { trpcServer } from "./_trpc/serverClient";
import { trpc } from "./_trpc/client";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const data = trpc.allUsers.useQuery();
  const session = useSession();
  console.log(session);
  console.log(data);
  return <main>
    <p>{!session.data?.user && "you are not login"}</p>
    <button onClick={() => signIn("discord")}>login with google</button>
  </main>;
}
