import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const dataCollectionRef = collection(db, "auction");

class dataService {
  adddata = (newdata) => {
    return addDoc(dataCollectionRef, newdata);
  };

  updateData = (id, updatedData) => {
    const data = doc(db, "auction", id);
    return updateDoc(data, updatedData);
  };

  deleteData = (id) => {
    const data = doc(db, "auction", id);
    return deleteDoc(data);
  };

  getAll = () => {
    return getDocs(dataCollectionRef);
  };

  getdata = (id) => {
    const data = doc(db, "auction", id);
    return getDoc(data);
  };
}

export default new dataService();
