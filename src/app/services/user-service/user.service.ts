import { computed, inject, Injectable, signal } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firebaseService = inject(FirebaseService);
  private auth = inject(Auth);
  private router = inject(Router);

  private allUsersSignal = signal<User[]>([]);
  readonly allUsers = this.allUsersSignal.asReadonly();

  private currentUserUIDSignal = signal<string>('');
  readonly currentUserUID = this.currentUserUIDSignal.asReadonly();

  currentUser = computed(() => this.allUsers().find(user => user.uid === this.currentUserUID()));


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


  async signOutUser() {
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('email');
    await signOut(this.auth).catch((error) => {
        console.log('Error:', error);
    });
  }


  async signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        return userCredential.user;
      })
      .catch((error) => {
        console.log('Login fehlgeschlagen, Error-Code:', error.code);
        console.log('Login fehlgeschlagen, Error-Message:', error.message);
      });
  }


  registerUser(name: string, email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = {name: name, email: email};
        await this.firebaseService.setDoc('users', userCredential.user.uid, user);
      })
      .catch((error) => {
        console.log('Sign up fehlgeschlagen, Error-Code:', error.code);
        console.log('Sign up fehlgeschlagen, Error-Message:', error.message);
      });
  }


  checkCredentials() {
    const uid = sessionStorage.getItem('uid');
    if (uid) {
      this.currentUserUIDSignal.set(uid);
    } else {
      this.router.navigateByUrl('');
    }
  }

}
