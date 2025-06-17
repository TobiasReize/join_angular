import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, Query, setDoc, updateDoc, writeBatch } from '@angular/fire/firestore';

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


  async setDoc(colName: string, docId: string, data: any) {
    const docRef = this.getDocRef(colName, docId);
    await setDoc(docRef, data)
  }


  // async addDoc(colName: string, data: any) {
  //   const colRef = this.getCollectionRef(colName);
  //   return await addDoc(colRef, data)
  // }


  async addTask(taskData: any, subtaskData: any[]) {
    const batch = writeBatch(this.firestore);
    const taskDocRef = doc(collection(this.firestore, 'tasks'));
    batch.set(taskDocRef, taskData);
    subtaskData.forEach(subtask => {
      const subtaskDocRef = doc(collection(this.firestore, `tasks/${taskDocRef.id}/subtasks`));
      batch.set(subtaskDocRef, subtask);
    });
    await batch.commit();
  }


  async updateTask(taskId: string, taskData: any, subtaskData: any[], deletedSubtasks: string[]) {
    const batch = writeBatch(this.firestore);
    const taskDocRef = this.getDocRef('tasks', taskId);
    batch.update(taskDocRef, taskData);
    subtaskData.forEach(subtask => {
      const subtaskData = {title: subtask.title, status: subtask.status};
      if (subtask.id) {
        const subtaskDocRef = this.getDocRef(`tasks/${taskDocRef.id}/subtasks`, subtask.id);
        batch.update(subtaskDocRef, subtaskData);
      } else {
        const subtaskDocRef = doc(collection(this.firestore, `tasks/${taskDocRef.id}/subtasks`));
        batch.set(subtaskDocRef, subtask);
      }
    });
    deletedSubtasks.forEach(subtaskId => {
      const delSubtaskDocRef = this.getDocRef(`tasks/${taskDocRef.id}/subtasks`, subtaskId);
      batch.delete(delSubtaskDocRef);
    });
    await batch.commit();
  }

}
