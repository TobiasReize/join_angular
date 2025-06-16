import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs, Query, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firestore = inject(Firestore);


  getCollectionRef(colName: string) {
    return collection(this.firestore, colName);
  }


  getDocRef(colName: string, docId: string) {
    return doc(this.getCollectionRef(colName), docId);
  }


  async getMultipleDocs(query: Query) {
    return await getDocs(query);
  }


  getSubcollectionRef(colName: string, docId: string, subcolName: string) {
    return collection(this.firestore, colName, docId, subcolName);
  }


  async updateDocData(colName: string, docId: string, data: any) {
    const docRef = this.getDocRef(colName, docId);
    await updateDoc(docRef, data);
  }


  async addDoc(colName: string, docId: string, data: any) {
    const docRef = this.getDocRef(colName, docId);
    await setDoc(docRef, data)
  }

}
