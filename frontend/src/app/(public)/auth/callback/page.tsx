'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LoadingSpinner/>
  );
}
