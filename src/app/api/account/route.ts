import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  addAddress,
  addOrder,
  getUser,
  login,
  logout,
  register,
} from "@/lib/server/account-store";

const sessionCookie = "klikk-session";

export async function GET() {
  const token = (await cookies()).get(sessionCookie)?.value;
  return NextResponse.json({ user: token ? await getUser(token) : null });
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action;
    const cookieStore = await cookies();
    if (action === "register" || action === "login") {
      const result =
        action === "register"
          ? await register(body.name, body.email, body.password)
          : await login(body.email, body.password);
      const response = NextResponse.json({ user: result.user });
      response.cookies.set(sessionCookie, result.token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      return response;
    }
    const token = cookieStore.get(sessionCookie)?.value;
    if (!token)
      return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    if (action === "logout") {
      await logout(token);
      const response = NextResponse.json({ user: null });
      response.cookies.delete(sessionCookie);
      return response;
    }
    if (action === "address")
      return NextResponse.json({ user: await addAddress(token, body.address) });
    if (action === "order")
      return NextResponse.json({ user: await addOrder(token, body.order) });
    return NextResponse.json(
      { error: "Unknown account action." },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update your account.",
      },
      { status: 400 },
    );
  }
}
