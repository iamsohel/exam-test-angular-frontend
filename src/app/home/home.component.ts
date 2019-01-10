import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { User } from "../_models";
import { UserService, AuthenticationService } from "../_services";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  searchForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {
    this.loadAllUsers();
    this.searchForm = this.formBuilder.group({
      search: [""]
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  updateUser(id: string) {
   this.router.navigateByUrl(`update/${id}`)
  }

  file() {
    this.userService
      .file()
      .pipe(first())
      .subscribe(() => {
        console.log('files')
      });
   }

  private loadAllUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.searchForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid

    this.loading = true;
    console.log(this.searchForm.value);
    this.userService
      .getAll(this.searchForm.value.search)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["/"]);
        },
        error => {
          this.loading = false;
        }
      );
  }
}
