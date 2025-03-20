"use client";

import { useGlobalAuthenticationStore } from "@/components/auth/store/data";
import EnhancedHero from "@/components/hero/EnhancedHero";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const address = useGlobalAuthenticationStore((state) => state.address);
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push("/dashboard");
    }
  }, [address, router]);

  return (
    <main className="min-h-screen">
      <EnhancedHero />
    </main>
  );
}
