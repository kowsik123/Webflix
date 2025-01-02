import { db } from "@/services/firebase";
import { addDoc, collection, doc, DocumentReference, getDoc, setDoc, updateDoc } from "firebase/firestore";

function removeReference(obj:any) {
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof DocumentReference) {
      obj[key] = value.id;
    } else if (typeof value === "object" && value !== null) {
      removeReference(value);
    }
  }
  return obj;
}

const firestoreDB = {
  fetchDocument: async (documentId: string, collectionName: string) => {
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
  },
  uploadDocument: async (collectionName: string, data: object) => {
    try {
      const documentRef = await addDoc(collection(db,collectionName),data);
      return { ...data, id: documentRef.id};
    } catch(e) {
      console.log(e);
      return {"Error": "Server Error"};
    }
  },
  updateDocument: async (collectionName: string, id: string, data: object)=>{
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await setDoc(docRef, structuredClone(data));
      return { ...structuredClone(data), id:id };
    } else {
      return {"Error": "Server Error"};
    }
  }
}

export default firestoreDB;