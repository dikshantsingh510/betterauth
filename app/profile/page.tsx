import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { ArrowLeftIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <ReturnButton  href="/" label="Home " />

        <h1 className="text-3xl font-bold">Profile</h1>

        <SignOutButton />

        <pre className="text-sm overflow-clip">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
