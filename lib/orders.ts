import {
  APPWRITE_DATABASE_ID,
  APPWRITE_ORDERS_COLLECTION_ID,
  databases,
  ID,
} from "./appwrite";
import { OrderPayload } from "./types";

export async function createOrder(payload: OrderPayload) {
  if (!APPWRITE_DATABASE_ID || !APPWRITE_ORDERS_COLLECTION_ID) {
    // Appwrite isn't configured yet — resolve so the UI can still show
    // a confirmation while running in demo mode.
    console.warn("Appwrite orders collection not configured; order not saved.");
    return { $id: "demo-order" };
  }
  return databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_ORDERS_COLLECTION_ID,
    ID.unique(),
    payload
  );
}
