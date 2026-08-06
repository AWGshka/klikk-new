"use client";

import { useEffect, useState } from "react";

type Account = {
  name: string;
  email: string;
  addresses: Array<{
    id: string;
    label: string;
    line1: string;
    city: string;
    postcode: string;
  }>;
  orders: Array<{ reference: string; createdAt: string; total: number }>;
};
export default function AccountPage() {
  const [user, setUser] = useState<Account | null>(null);
  const [mode, setMode] = useState<"sign-in" | "register">("sign-in");
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/account")
      .then((response) => response.json())
      .then((result) => setUser(result.user));
  }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      action: mode === "register" ? "register" : "login",
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
    };
    const response = await fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error);
      return;
    }
    setUser(result.user);
    window.location.reload();
  }
  async function saveAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "address",
        address: {
          label: form.get("label"),
          line1: form.get("line1"),
          city: form.get("city"),
          postcode: form.get("postcode"),
        },
      }),
    });
    const result = await response.json();
    if (response.ok) {
      setUser(result.user);
      event.currentTarget.reset();
    } else setMessage(result.error);
  }
  if (!user)
    return (
      <section className="page-container account-page">
        <p className="eyebrow">Account</p>
        <h1>{mode === "sign-in" ? "Sign in" : "Create an account"}</h1>
        <form className="account-form" onSubmit={submit}>
          {mode === "register" && (
            <label>
              Full name
              <input name="name" required />
            </label>
          )}
          <label>
            Email address
            <input name="email" type="email" required />
          </label>
          <label>
            Password
            <input name="password" type="password" minLength={8} required />
          </label>
          {message && (
            <p className="form-error" role="alert">
              {message}
            </p>
          )}
          <button className="button" type="submit">
            {mode === "sign-in" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          className="text-button"
          type="button"
          onClick={() => setMode(mode === "sign-in" ? "register" : "sign-in")}
        >
          {mode === "sign-in"
            ? "Create an account"
            : "Already have an account? Sign in"}
        </button>
      </section>
    );
  return (
    <section className="page-container account-page">
      <p className="eyebrow">Account</p>
      <h1>Hello, {user.name}</h1>
      <div className="account-grid">
        <div>
          <h2>Saved addresses</h2>
          {user.addresses.map((address) => (
            <p key={address.id}>
              <strong>{address.label}</strong>
              <br />
              {address.line1}, {address.city} {address.postcode}
            </p>
          ))}
          <form className="account-form" onSubmit={saveAddress}>
            <label>
              Address label
              <input name="label" placeholder="Home" required />
            </label>
            <label>
              Address line
              <input name="line1" required />
            </label>
            <label>
              Town / city
              <input name="city" required />
            </label>
            <label>
              Postcode
              <input name="postcode" required />
            </label>
            <button className="button" type="submit">
              Save address
            </button>
          </form>
        </div>
        <div>
          <h2>Order history</h2>
          {user.orders.length ? (
            user.orders.map((order) => (
              <p key={order.reference}>
                {order.reference} — €{order.total.toFixed(2)}
              </p>
            ))
          ) : (
            <p>No orders yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
