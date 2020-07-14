import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { MatchPassword } from "../validators/match-password"

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
      Validators.maxLength(50)
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ])
  }, {
    validators: [this.matchPassword.validate]
  });
  constructor(private matchPassword: MatchPassword) { }

  ngOnInit(): void {
  }

}
