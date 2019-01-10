import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { AlertComponent } from "./_components/alert.component";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers/index";
import { HomeComponent } from "./home/index";
import { AddComponent } from "./add/index";
import { UpdateComponent } from "./update/index";
import { LoginComponent } from "./login/index";
import { RegisterComponent } from "./register/index";

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, routing],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddComponent,
    UpdateComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
