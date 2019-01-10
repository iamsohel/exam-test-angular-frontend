import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { UpdateComponent } from "./update";
import { AddComponent } from "./add";
import { RegisterComponent } from "./register";
import { AuthGuard } from "./_guards";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "update/:id", component: UpdateComponent, canActivate: [AuthGuard] },
  { path: "add", component: AddComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);
