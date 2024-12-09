"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  // automatically take user back home after delay
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <main className="text-lg">
      <h2>There was a problem.</h2>
      <p>We could not find the page you were looking for</p>
      <p>
        Go back to <Link href="/">Home</Link>.
      </p>
    </main>
  );
}
