import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
   url='http://localhost:57678';
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.url+'/users');
  }
}
