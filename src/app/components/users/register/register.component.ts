import { Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;

  email = ""
  password = ""
  uploadPercent: Observable<number>
  urlImage: Observable<string>

  constructor(private authService: AuthService, private router: Router, private storage: AngularFireStorage) { }

  onUpload(e:any) {

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
 task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe()

  }

  onAddUser() :void{

    this.authService.registerUser(this.email, this.password)
      .then((res) => {
       this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then(() => {
              console.log('USER UPDATED', user)
              this.onLoginRedirect(), err => this.onLoginError(err)
            })
          }
        })
      }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle():void {
    this.authService.loginGoogleUser()
      .then(() => this.onLoginRedirect()
        , err => this.onLoginError(err))

  }

  onLoginFacebook():void {

    this.authService.loginFacebookUser()
      .then(() => this.onLoginRedirect)
      .catch(err => this.onLoginError(err))

  }
  onLoginRedirect():void {
    this.router.navigate(['admin/list-books'])
  }
  onLoginError(err:any):void {
    console.log(err.message)
  }

}
