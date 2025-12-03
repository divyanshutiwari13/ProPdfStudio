import { cookies } from "next/headers";
import { getUserByEmail, verifyPassword, getUserById } from "./db/users";

export async function login(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("session", user._id || "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    id: user._id,
    email: user.email,
    name: user.name,
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return null;
  }

  // Get user from database
  try {
    const user = await getUserById(sessionId);

    if (!user) {
      return null;
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    return null;
  }
}

