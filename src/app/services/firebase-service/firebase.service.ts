import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore } from '@angular/fire/firestore';

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

}
