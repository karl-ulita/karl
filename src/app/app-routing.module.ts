import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent }   from './products/products.component';
import { ButtonComponent }     from './button/button.component';

import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserSignupComponent } from './users/user-signup/user-signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-login', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'user-login', component: UserLoginComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'user-signup', component: UserSignupComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/