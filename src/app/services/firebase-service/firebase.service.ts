import { inject, Injectable } from '@angular/core';
import { Auth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, Firestore, getDocs, Query, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firestore = inject(Firestore);
  private auth = inject(Auth);


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


  async signOutUser() {
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('email');
    await signOut(this.auth).catch((error) => {
        console.log('Error:', error);
    });
  }


  async signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        console.log('Login fehlgeschlagen, Error-Code:', error.code);
        console.log('Login fehlgeschlagen, Error-Message:', error.message);
      });
  }

}
