import { Component, OnInit } from '@angular/core';
import { LoginRequest } from "../model/login-request"
import { AuthService } from "../auth.service"
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ])
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {


  }

  onSubmit() {
    if (this.authForm.invalid) {
      return
    }

    const loginRequest = <LoginRequest>this.authForm.value

    this.authService.login(loginRequest).subscribe({
      next: (res) => {
        // Route the user to projects component
      },
      error: (err) => {
        // check for No Internt Connection
        if (err.status === 0) {
          this.authForm.setErrors({ noInternetConnection: true })
        } else if (err.status === 401) {
          // Invalid credentials
          this.authForm.setErrors({ invalidCredentials: true })
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      }
    })
  }

}
