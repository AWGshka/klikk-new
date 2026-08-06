import "server-only";
import {
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { BasketLine } from "@/lib/commerce";

export type Address = {
  id: string;
  label: string;
  line1: string;
  city: string;
  postcode: string;
};
type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  addresses: Address[];
  orders: Array<{ reference: string; createdAt: string; total: number }>;
};
type Session = { token: string; userId: string; createdAt: string };
type Store = {
  users: User[];
  sessions: Session[];
  carts: Record<string, BasketLine[]>;
};
const statePath = join(process.cwd(), ".data", "app-state.json");

async function readStore(): Promise<Store> {
  return JSON.parse(await readFile(statePath, "utf8")) as Store;
}
async function saveStore(store: Store) {
  await writeFile(statePath, `${JSON.stringify(store, null, 2)}\n`);
}
function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
function matchesPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  const candidate = scryptSync(password, salt, 64);
  return timingSafeEqual(candidate, Buffer.from(hash, "hex"));
}
function publicUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    addresses: user.addresses,
    orders: user.orders,
  };
}

export async function register(name: string, email: string, password: string) {
  const store = await readStore();
  const normalisedEmail = email.trim().toLowerCase();
  if (store.users.some((user) => user.email === normalisedEmail))
    throw new Error("An account already exists for this email address.");
  const user: User = {
    id: randomUUID(),
    name: name.trim(),
    email: normalisedEmail,
    passwordHash: hashPassword(password),
    addresses: [],
    orders: [],
  };
  store.users.push(user);
  const token = randomUUID();
  store.sessions.push({
    token,
    userId: user.id,
    createdAt: new Date().toISOString(),
  });
  await saveStore(store);
  return { token, user: publicUser(user) };
}
export async function login(email: string, password: string) {
  const store = await readStore();
  const user = store.users.find(
    (item) => item.email === email.trim().toLowerCase(),
  );
  if (!user || !matchesPassword(password, user.passwordHash))
    throw new Error("Email address or password is incorrect.");
  const token = randomUUID();
  store.sessions.push({
    token,
    userId: user.id,
    createdAt: new Date().toISOString(),
  });
  await saveStore(store);
  return { token, user: publicUser(user) };
}
export async function logout(token: string) {
  const store = await readStore();
  store.sessions = store.sessions.filter((session) => session.token !== token);
  await saveStore(store);
}
export async function getUser(token: string) {
  const store = await readStore();
  const session = store.sessions.find((item) => item.token === token);
  const user =
    session && store.users.find((item) => item.id === session.userId);
  return user ? publicUser(user) : null;
}
export async function addAddress(token: string, address: Omit<Address, "id">) {
  const store = await readStore();
  const session = store.sessions.find((item) => item.token === token);
  const user =
    session && store.users.find((item) => item.id === session.userId);
  if (!user) throw new Error("Please sign in to save an address.");
  const saved = { id: randomUUID(), ...address };
  user.addresses.push(saved);
  await saveStore(store);
  return publicUser(user);
}
export async function addOrder(
  token: string,
  order: { reference: string; total: number },
) {
  const store = await readStore();
  const session = store.sessions.find((item) => item.token === token);
  const user =
    session && store.users.find((item) => item.id === session.userId);
  if (!user) return null;
  user.orders.unshift({
    reference: order.reference,
    total: order.total,
    createdAt: new Date().toISOString(),
  });
  await saveStore(store);
  return publicUser(user);
}
export async function getCart(token: string) {
  const store = await readStore();
  const session = store.sessions.find((item) => item.token === token);
  if (!session) return null;
  return store.carts[session.userId] ?? [];
}
export async function saveCart(token: string, lines: BasketLine[]) {
  const store = await readStore();
  const session = store.sessions.find((item) => item.token === token);
  if (!session) return null;
  store.carts[session.userId] = lines;
  await saveStore(store);
  return lines;
}
