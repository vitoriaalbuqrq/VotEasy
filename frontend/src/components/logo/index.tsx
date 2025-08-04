import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
}

export function Logo({variant = "dark"}: LogoProps ) {
  const variantStyles = {
    light: {
      text: "text-white",
      icon: "text-primary",
      bg: "bg-white",
    },
    dark: {
      text: "text-primary",
      icon: "text-white",
      bg: "bg-primary",
    }
  }
  const styles = variantStyles[variant];

  return (
    <Link href="/" className="flex items-center hover:font-bold transition-transform duration-300 hover:scale-105">
      <CircleCheckBig className={`h-7 w-7 p-1 ${styles.icon} ${styles.bg} rounded-full`}/>
      <h1 className={`font-thin text-2xl pl-1 ${styles.text}`}><span className="font-bold">Vot</span>Easy</h1>
    </Link>
  )
}