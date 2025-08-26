import { ReturnButton } from "@/components/return-button";

export default function Home() {
  return (
    <>
      <ReturnButton href="/" label="Home " />
      <h1 className="text-3xl text-center text-blue-600 py-10">
        Hey! I&apos;m back
      </h1>
    </>
  );
}
