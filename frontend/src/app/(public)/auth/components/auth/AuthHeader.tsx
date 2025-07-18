type AuthHeaderProps = {
  title: string
  role?: 'USER' | 'ORGANIZER'
}

export function AuthHeader({ title, role }: AuthHeaderProps) {
  const normalizedRole = role?.toUpperCase();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="my-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        {title}
        {role && (
          <span className="block text-sm mt-1 font-normal text-muted-foreground">
            {normalizedRole === 'ORGANIZER' ? 'Perfil de organizador' : 'Usuário votante'}
          </span>
        )}
      </h2>
    </div>
  )
}
