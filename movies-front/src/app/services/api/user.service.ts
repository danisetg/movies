import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.base_url = 'users'
  }

  register(user: User): Observable<any> {
    return this.httpClient.post(this.api_url + 'auth' + '/signup', user);
  }

  login(user: User): Observable<any> {
    return this.httpClient.post(this.api_url + 'auth' + '/signin', user);
  }
}
