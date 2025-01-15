import { db } from "@/services/firebase";
import { addDoc, arrayUnion, collection, deleteField, doc, DocumentReference, DocumentSnapshot, getDoc, getDocs, limit, query, setDoc, updateDoc, where } from "firebase/firestore";

const replaceRef = (obj: any) => {
    for (const [key, value] of Object.entries(obj)) {
        if (value instanceof DocumentReference) {
            obj[key] = value.id;
        } else if (typeof value === "object" && value !== null) {
            replaceRef(value);
        }
    }
    return obj;
}

const fireStoreError = (error?: unknown): never => {
    console.log(error);
    throw new Error("Server Error");
}

export const ref = (collectionName: string, id: string) => {
    return doc(db, collectionName, id);
}

export const getData = (snapshot: DocumentSnapshot) => {
    return { id: snapshot.id, ...replaceRef(snapshot.data()) }
}

export const fetchCollectionData = async (collectionName: string): Promise<Array<object>|never> => {
    try {
        const q = query(collection(db, collectionName), limit(10));
        const snapshot = await getDocs(q);
        return snapshot.docs.map( doc => getData(doc) );
    } catch (error) {
        return fireStoreError(error);
    }
}

export const fetchDocumentData = async (documentId: string, collectionName: string): Promise<object|never> => {
    const documentRef = doc(db, collectionName, documentId);
    try {
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
            return getData(documentSnapshot);
        } else {
            return fireStoreError("Invalid Id");
        }
    } catch (error) {
        return fireStoreError(error);
    }
}

export const findDocument = async (collectionName: string, fieldName: string, value: string): Promise<DocumentReference | null | never> => {
    const s = query(collection(db, collectionName), where(fieldName, "==", value));
    try{
        const snapshot = await getDocs(s);
        if (snapshot.empty) return null;
        else {
            return snapshot.docs[0].ref;
        }
    } catch(error) {
        return fireStoreError(error);
    }
}

export const uploadDocument = async (collectionName: string, data: object): Promise<DocumentReference | never> => {
    try {
        const documentRef = await addDoc(collection(db, collectionName), data);
        return documentRef;
    } catch (error) {
        return fireStoreError(error);
    }
}

export const setDocument = async (collectionName: string, id: string, data: object): Promise<void> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await setDoc(docRef, data);
    } else {
        return fireStoreError("Invalid Id");
    }
}

export const updateDocumentArray = async (collectionName: string, id: string, arrayFieldName: string, value: any): Promise<void> => {
    const docRef = doc(db, collectionName, id);
    const obj: any = {};
    obj[arrayFieldName] = arrayUnion(value);
    try {
        await updateDoc(docRef, obj);
    } catch (error) {
        fireStoreError();
    }
}

// TODO: Delete
export const exe = async () => {
    // const res = await Promise.all( (await getDocs( query(collection(db, "movies")) )).docs.map(async (doc)=>{
    //     await updateDoc(doc.ref, {creatorRefList: deleteField()});
    // }));
    // return {};
}