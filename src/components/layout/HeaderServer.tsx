import { auth } from "@/lib/auth";
import { Header as HeaderClient } from "@/components/layout/Header";

export async function Header() {
  const session = await auth();
  const user = session?.user as { role?: string; name?: string | null; image?: string | null; email?: string | null } | undefined;
  return (
    <HeaderClient
      isLoggedIn={!!session?.user}
      userRole={user?.role}
      userName={user?.name}
      userImage={user?.image}
      userEmail={user?.email}
    />
  );
}
