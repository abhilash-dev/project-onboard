import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { RegisterUserRequest } from "./model/register-user-request"
import { RegisterUserResponse } from "./model/register-user-response"
import { BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = "http://localhost:3000/api/v1/auth"
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  register(registerUserRequest: RegisterUserRequest) {
    return this.http.post<RegisterUserResponse>(`${this.rootUrl}/register`, registerUserRequest)
      .pipe(
        tap(() => { this.signedIn$.next(true) }
        )
      );
  }
}
