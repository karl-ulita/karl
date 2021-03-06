import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    try{
      if (firebase.auth().currentUser != null){
        this.router.navigate(['/user-profile']);
      }
      else {
        this.createForm();
      }
    }
    catch{
      console.error();
    }
  }

  ngOnInit() {}

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user-profile']);
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/user-profile']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
