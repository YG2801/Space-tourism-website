import firebaseConfig from "../config/config";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export class FirebaseService {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    this.storage = getStorage();
  }

  async getDocument(collection, docId) {
    try {
      const docRef = doc(this.db, collection, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (e) {
      console.log("Firebase Service :: getDocument :: Error :: ", e);
      return null;
    }
  }

  async getImageURL(imagePath) {
    try {
      const imageRef = ref(this.storage, imagePath);
      return await getDownloadURL(imageRef);
    } catch (e) {
      console.log("Firebase Service :: getImageURL :: Error :: ", e);
      return null;
    }
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
