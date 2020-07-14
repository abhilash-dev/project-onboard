import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { MatchPassword } from "../validators/match-password"
import { AuthService } from "../auth.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  authForm = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
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
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ])
  }, {
    validators: [this.matchPassword.validate]
  });

  constructor(
    private matchPassword: MatchPassword,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return
    }

    const { name, email, password } = this.authForm.value
    this.authService.register({ name, email, password }).subscribe({
      // register successfull
      next: (res) => {
        // Navigate the user to projects
      },
      // register failed, display errors on form
      error: (err) => {
        // check for No Internt Connection
        if (err.status === 0) {
          this.authForm.setErrors({ noInternetConnection: true })
        } else if (err.error && err.error.error.startsWith("Duplicate")) {
          // Duplicate: Email already exists
          this.authForm.setErrors({ duplicateEmail: true })
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      }
    });
  }

}
