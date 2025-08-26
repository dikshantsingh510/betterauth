import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface ReturnButtonProps {
  href: string;
  label: string;
}

export const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
    <Button size={"sm"} asChild>
      <Link href={href} prefetch>
        <ArrowLeft />
        {label}
      </Link>
    </Button>
  );
};
