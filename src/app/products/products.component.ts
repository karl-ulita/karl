import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router, Params } from '@angular/router';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {
    try{
      if (firebase.auth().currentUser == null){
        this.router.navigate(['/user-login']);
      }
    }
    catch{
      console.error();
    }
  }

  ngOnInit() {}

}
