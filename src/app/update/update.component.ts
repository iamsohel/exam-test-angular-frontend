import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService, UserService, AuthenticationService } from "../_services";

@Component({ templateUrl: "update.component.html" })
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  user_id: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.user_id = route.snapshot.paramMap.get("id");
    console.log(this.user_id);
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      name: ["", Validators.required],
      _id: [""],
      email: [""]
    });
    this.userService.getById(this.user_id).subscribe(data => {
      this.updateForm.setValue(data);
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.updateForm.value);
    this.userService.update(this.updateForm.value).subscribe(
      data => {
        this.alertService.success("User Updated successful", true);
        this.router.navigate(["/"]);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
