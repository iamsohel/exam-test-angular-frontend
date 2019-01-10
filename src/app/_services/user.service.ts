import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndPoint } from "./config";

import { User } from "../_models";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(query?: string) {
    if (query) {
      return this.http.get<User[]>(
        `${EndPoint}/users?search=${query ? query : ""}`
      );
    } else {
      return this.http.get<User[]>(`${EndPoint}/users`);
    }
  }

  getById(id: string) {
    return this.http.get(`${EndPoint}/users/${id}`);
  }

  create(user: User) {
    return this.http.post(`${EndPoint}/users`, user);
  }

  update(user: User) {
    return this.http.put(`${EndPoint}/users/${user._id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${EndPoint}/users/${id}`);
  }

  file() {
    return this.http.get(`${EndPoint}/file`);
  }
}
