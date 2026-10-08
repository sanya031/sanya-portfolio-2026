"use client";

import { DialRoot } from "dialkit";
import { useEffect, useState } from "react";

// Tuning panels show locally and on Vercel preview deployments, never on the live domain.
const isTuningHost = () =>
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
  window.location.hostname.endsWith(".vercel.app");

export function DialKitRoot() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isTuningHost());
  }, []);

  if (!enabled) {
    return null;
  }

  return <DialRoot defaultOpen={false} position="top-right" theme="dark" productionEnabled />;
}
