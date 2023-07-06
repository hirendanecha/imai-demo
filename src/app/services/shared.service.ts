import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  url: string;
  headers = new HttpHeaders();
  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.apiUrl;
    this.headers = this.headers.append('authkey', environment.apiKey);
  }

  getUser(userName: '') {
    return this.http.get(
      `${this.url}/dict/users/?q=${userName}&limit=18&type=lookalike&platform=instagram`,
      { headers: this.headers }
    );
  }

  getUserDetailsById(userId: any) {
    return this.http.get(`${this.url}/raw/ig/user/feed/?url=${userId}`, {
      headers: this.headers,
    });
  }
}
