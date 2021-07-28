import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router, private localStorage: LocalstorageService) { }
  canActivate(): boolean {
    let token = this.localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
