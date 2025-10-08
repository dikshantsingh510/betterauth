import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const ReturnHomeButton = () => {
  return (
    <Button size="sm" asChild>
      <Link href="/">
        <ArrowLeftIcon /> Home
      </Link>
    </Button>
  );
};