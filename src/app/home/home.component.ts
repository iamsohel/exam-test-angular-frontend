import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
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
    this.loading = true;
    this.userService.delete(id).subscribe(() => {
      this.loadAllUsers();
    });
  }

  updateUser(id: string) {
    this.loading = true;
    this.router.navigateByUrl(`update/${id}`);
  }

  file() {
    this.userService.file().subscribe(() => {
      console.log("files");
    });
  }

  private loadAllUsers(search?: string) {
    const query= search ? search : '';
    this.userService.getAll(query).subscribe(res => {
        this.users = res;
        this.loading = false;
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.searchForm.controls;
  }

  reset(){
    this.searchForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.loadAllUsers(this.searchForm.value.search)
  }
}
