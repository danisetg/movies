import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends ApiService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.base_url = 'comments'
  }
}
