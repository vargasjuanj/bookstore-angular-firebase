import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs:AngularFirestore) { }
  registerUser(email:string,pass:string) {
return this.afsAuth.auth.createUserWithEmailAndPassword(email,pass)
.then(userData=>this.updateUserData(userData.user),
err=>console.log('err ',err))
  }
  loginEmailUser(email:string,pass:string) {
return new Promise((resolve,reject)=>{
  this.afsAuth.auth.signInWithEmailAndPassword(email,pass).then(userData=>resolve(userData)
  ,err=>reject(err))

})
   }
  loginFacebookUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then(userData=>this.updateUserData(userData.user))
  }
  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(userData=>this.updateUserData(userData.user))
  }

  isAuth() {
    return this.afsAuth.authState
  }
  onLogout() {
    this.afsAuth.auth.signOut()

  }

private updateUserData(user:any){
  const userRef:AngularFirestoreDocument<any>=this.afs.doc(`users/${user.uid}`)
const data:UserInterface={
  id:user.uid,
  email:user.email,
  roles:{
  editor:true
  }
}
return userRef.set(data,{merge:true})

}
isUserAdmin(userUid:string){
return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges()
}
}
