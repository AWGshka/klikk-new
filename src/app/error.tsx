"use client";

import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="page-container empty-page">
      <p className="eyebrow">Something went wrong</p>
      <h1>Let’s try that again.</h1>
      <p>We couldn’t load this part of the store right now.</p>
      <button className="button" type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
