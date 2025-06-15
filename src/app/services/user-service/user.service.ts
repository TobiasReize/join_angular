import { inject, Injectable, signal } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  firebaseService = inject(FirebaseService);

  private allUsersSignal = signal<User[]>([]);
  readonly allUsers = this.allUsersSignal.asReadonly();


  subUserCol() {
    return onSnapshot(this.firebaseService.getCollectionRef('users'), usersCollection => {
      this.allUsersSignal.set([]);
      let users: User[] = [];
      usersCollection.forEach(user => {
        const data = new User(user.data(), user.id);
        users.push(data);
      });
      this.allUsersSignal.set([...users]);
      console.log('allUsers: ', this.allUsers());
    });
  }

}
