import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const user = await getAuthUser();
  if (!user) redirect("/auth/login");

  return (
    <div>
      <h1>Chat</h1>
      <p>Logged in as {user.email}</p>
      {/* Client component will load messages */}
    </div>
  );
}
