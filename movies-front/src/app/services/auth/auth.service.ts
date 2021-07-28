import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean;
  logginPage: boolean = false;
  constructor(private router: Router, private localStorage: LocalstorageService) { }

  isLoggedIn() {
      return this.localStorage.getItem('token') != null && this.localStorage.getItem('token') != undefined;
  }

  logOut() {
      this.loggedIn = false;
      this.localStorage.removeItem('user');
      this.localStorage.removeItem('token');
  }

  getUser() {
      if(this.localStorage.getItem('token') != null && this.localStorage.getItem('token') != undefined) {
        let userString = this.localStorage.getItem('user');
        let str = '';
        if(userString != null)
          str = userString;
        let user = JSON.parse(str);
          return user;
      }
      else {
          return null;
      }
  }

  getRol() {
    if(this.localStorage.getItem('token') != null && this.localStorage.getItem('token') != undefined) {
      let userString = this.localStorage.getItem('user');
      let str = '';
      if(userString != null)
        str = userString;
      let user = JSON.parse(str);
        return user.rol;
    }
    else {
        return 'GUEST';
    }
  }
}
