import { getDatabase } from "../mongodb";
import { Activity } from "@/types";

const COLLECTION_NAME = "activities";

export async function createActivity(
  userId: string,
  toolType: Activity["toolType"],
  fileName: string,
  fileSize: number,
  downloadUrl?: string
): Promise<Activity> {
  const db = await getDatabase();
  const collection = db.collection<Activity>(COLLECTION_NAME);

  const activity: Activity = {
    userId,
    toolType,
    fileName,
    fileSize,
    createdAt: new Date(),
    downloadUrl,
  };

  const result = await collection.insertOne(activity);
  return { ...activity, _id: result.insertedId.toString() };
}

export async function getActivitiesByUserId(userId: string, limit: number = 20): Promise<Activity[]> {
  const db = await getDatabase();
  const collection = db.collection<Activity>(COLLECTION_NAME);

  return await collection
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

