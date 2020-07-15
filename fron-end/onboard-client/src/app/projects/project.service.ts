import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { ProjectResponse } from "./model/project-response"
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { ProjectIndexComponent } from "../projects/project-index/project-index.component"

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  rootUrl = "http://localhost:3000/api/v1/projects"
  refresh$ = new BehaviorSubject(true);
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<ProjectResponse>(`${this.rootUrl}/`, { withCredentials: true });
  }

  removeProject(name: string) {
    return this.http.delete<ProjectResponse>(`${this.rootUrl}/${name}`, { withCredentials: true })
      .pipe(tap(() => this.refresh$.next(true)))
  }
}
