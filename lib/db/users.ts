import { getDatabase } from "../mongodb";
import { User } from "@/types";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "users";

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const db = await getDatabase();
  const collection = db.collection<User>(COLLECTION_NAME);

  // Check if user exists
  const existingUser = await collection.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user: User = {
    email,
    password: hashedPassword,
    name,
    createdAt: new Date(),
  };

  const result = await collection.insertOne(user);
  return { ...user, _id: result.insertedId.toString() };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase();
  const collection = db.collection(COLLECTION_NAME);
  const user = (await collection.findOne({ email })) as (User & { _id?: ObjectId }) | null;
  if (!user) return null;

  return { ...user, _id: user._id?.toString() };
}

export async function getUserById(id: string): Promise<User | null> {
  const db = await getDatabase();
  const collection = db.collection(COLLECTION_NAME);
  try {
    const user = (await collection.findOne({ _id: new ObjectId(id) })) as (User & { _id?: ObjectId }) | null;
    if (!user) return null;

    return { ...user, _id: user._id?.toString() };
  } catch {
    return null;
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

