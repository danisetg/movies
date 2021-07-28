import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { UserService } from './api/user.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(public authService: AuthService, public localStorage: LocalstorageService,
                public userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
      let token = this.localStorage.getItem('token');
      if (this.authService.isLoggedIn() &&  token != null) {
        request = this.addToken(request, token.toString());
      }

      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          'Authorization': token
        }
      });
    }
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);
          let userString = this.localStorage.getItem('user');
          let str = '';
          if(userString != null)
            str = userString;
          let user = JSON.parse(str);
          return this.userService.login(user).pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token.jwt);
              return next.handle(this.addToken(request, token.jwt));
            }));
        } else {
          return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
              return next.handle(this.addToken(request, jwt));
            }));
        }
    }
  }
