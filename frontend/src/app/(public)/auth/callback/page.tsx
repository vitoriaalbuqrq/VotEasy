'use client'

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        variant: "error",
        title: "Erro ao fazer login com Google",
        description: decodeURIComponent(error),
      });
      // Volta para página de login após alguns segundos
      const timer = setTimeout(() => {
        router.replace("/auth/organizer/login");
      }, 3500);

      return () => clearTimeout(timer);
    } else {
      // Redireciona normalmente
      const timer = setTimeout(() => {
        router.replace("/dashboard");
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [error, router, toast]);

  return <LoadingSpinner />;
}
