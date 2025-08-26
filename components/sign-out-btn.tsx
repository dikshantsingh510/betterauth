"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { toast } from "sonner";

export const SignOutButton = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  async function handleClick() {
    await signOut({
      fetchOptions: {
        onError: (ctx: {
          error: {
            message:
              | string
              | number
              | bigint
              | boolean
              | (() => React.ReactNode)
              | ReactElement<unknown, string | JSXElementConstructor<unknown>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactPortal
                  | ReactElement<
                      unknown,
                      string | JSXElementConstructor<unknown>
                    >
                  | Iterable<ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
          };
        }) => {
          toast.error(ctx.error.message);
        },
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  }

  return (
    <Button onClick={handleClick} size="sm" variant="destructive">
      Sign Out
    </Button>
  );
};
