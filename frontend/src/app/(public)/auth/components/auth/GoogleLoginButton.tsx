import { FaGoogle } from "react-icons/fa"

type GoogleLoginButtonProps = {
  role: 'USER' | 'ORGANIZER'
}

export function GoogleLoginButton({ role }: GoogleLoginButtonProps) {
  const handleGoogleLogin = () => {
    const state = encodeURIComponent(role)
    window.location.href = `http://localhost:3333/api/auth/auth/google?state=${state}`
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex w-full border-2 gap-3 rounded-full justify-center items-center px-3 py-1.5 text-md font-semibold text-gray-700 shadow-xs hover:border-primary hover:text-primary"
    >
      <FaGoogle />
      Entrar com Google
    </button>
  )
}
