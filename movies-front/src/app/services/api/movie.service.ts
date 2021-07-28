import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends ApiService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.base_url = 'movies'
  }
}
