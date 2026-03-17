"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

async function getCsrfToken() {
  const res = await fetch("/api/auth/csrf");
  if (!res.ok) return null;
  const data = await res.json();
  return data?.csrfToken ?? null;
}

export function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      onClick={async () => {
        const csrfToken = await getCsrfToken();
        const body = new URLSearchParams();
        if (csrfToken) body.set("csrfToken", csrfToken);
        body.set("callbackUrl", "/auth/login");

        await fetch("/api/auth/signout", {
          method: "POST",
          body,
        });

        router.push("/auth/login");
      }}
    >
      Sign out
    </Button>
  );
}
