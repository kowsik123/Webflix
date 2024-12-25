import { db } from "@/services/firebase";
import { doc, DocumentReference, getDoc } from "firebase/firestore";

export const fetchDocument = async (documentId: string, collectionName: string) => {
  const documentRef = doc(db,collectionName, documentId);
  try {
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      return removeReference({ id: documentSnapshot.id, ...documentSnapshot.data() });
    } else {
      return {"Error": "Invalid Id"};
    }
  } catch (error) {
    console.log("Error fetching movie by ID:", error);
    return {"Error": "Server Error"};
  }
};

export function removeReference(obj:any) {
    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof DocumentReference) {
        obj[key] = value.id;
      } else if (typeof value === "object" && value !== null) {
        removeReference(value);
      }
    }
    return obj;
}