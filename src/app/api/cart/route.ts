import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCart, saveCart } from "@/lib/server/account-store";

const sessionCookie = "klikk-session";
export async function GET() {
  const token = (await cookies()).get(sessionCookie)?.value;
  const lines = token ? await getCart(token) : null;
  return lines === null
    ? NextResponse.json({ error: "Please sign in." }, { status: 401 })
    : NextResponse.json({ lines });
}
export async function PUT(request: Request) {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token)
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const { lines } = await request.json();
  if (!Array.isArray(lines))
    return NextResponse.json({ error: "Invalid cart." }, { status: 400 });
  return NextResponse.json({ lines: await saveCart(token, lines) });
}
