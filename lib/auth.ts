import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function getAuthUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("token in auth.ts", token);


    if (!token) return null;

    try {
        const payload = verifyToken(token);

        return await prisma.user.findUnique({
            where: { id: String(payload.id) },
            select: { id: true, email: true, name: true },
        });

    } catch {
        return null;
    }
}
