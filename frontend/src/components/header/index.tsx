import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let role: string | null = null;
  let name: string | null = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (typeof payload.role === "string") {
        role = payload.role;
      }

      if (typeof payload.name === "string") {
        name = payload.name;
      }

    } catch (err) {
      console.log(err)
    }
  }
  return <HeaderClient role={role} name={name} />;
}
