import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService, UserService, AuthenticationService } from "../_services/index";

@Component({ templateUrl: "add.component.html" })
export class AddComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.userForm.value);
    this.userService
      .create(this.userForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("User saved  successful", true);
          this.router.navigate(["/"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
