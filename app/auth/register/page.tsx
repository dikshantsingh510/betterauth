import { RegisterForm } from "@/components/register-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <Button size="icon" asChild>
          <Link href="/">
            <ArrowLeftIcon />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Register</h1>
      </div>

      <RegisterForm />

      <p className="text-muted-foreground text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="hover:text-foreground" prefetch>
          Login
        </Link>
      </p>
    </div>
  );
}
