import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";

const publicRoutes = [
  { path: "/auth/organizer/login", whenAuthenticated: "redirect" },
  { path: "/auth/organizer/register", whenAuthenticated: "redirect" },
  { path: "/auth/user/login", whenAuthenticated: "redirect" },
  { path: "/auth/user/register", whenAuthenticated: "redirect" },
  { path: "/votings", whenAuthenticated: "next" },
  { path: "/auth", whenAuthenticated: "next" },
  { path: "/auth/", whenAuthenticated: "next" },
  { path: "/auth/callback", whenAuthenticated: "next" },
  { path: "/", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "auth";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(route => route.path === path);
  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
        
    // Checar se o JWT está EXPIRADO
    // Se sim, remover o cookie e redirecionar o usuário pro login
    return NextResponse.next()
  }
    
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets/images).*)",],
};