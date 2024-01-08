"use client";
import Image from "next/image";
import { trpcServer } from "./_trpc/serverClient";
import { trpc } from "./_trpc/client";
import { signIn, useSession } from "next-auth/react";
import { AvatarIcon, Button } from "@nextui-org/react";

export default function Home() {
  return (
    <Button
      isIconOnly
      className="rounded-full"
      variant="bordered"
      color="primary"
    >
      <AvatarIcon />
    </Button>
  );
}
