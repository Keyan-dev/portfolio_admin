import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonAuthService {
  userDetails: BehaviorSubject<any>;
  constructor(private httpService: HttpService) {
    this.userDetails = new BehaviorSubject<any>(null);
  }
  login(data: any) {
    return this.httpService.post('auth/login', {}, data);
  }
  getUserDetails(token: any) {
    return this.httpService.get('auth/current', {}, {});
  }
}
