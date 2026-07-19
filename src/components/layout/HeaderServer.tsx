import { auth } from "@/lib/auth";
import { Header as HeaderClient } from "@/components/layout/Header";

export async function Header() {
  const session = await auth();
  return (
    <HeaderClient
      isLoggedIn={!!session?.user}
      userRole={(session?.user as { role?: string })?.role}
    />
  );
}
