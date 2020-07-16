import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { GetProjectsResponse } from "./model/get-projects-response"
import { GenericProjectResponse } from "./model/generic-project-response"
import { UploadFileResponse } from "./model/upload-file-response"
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Project } from './model/project';
import { UpdateProjectRequest } from "./model/update-project-request"

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  rootUrl = "http://localhost:3000/api/v1/projects"
  refresh$ = new BehaviorSubject(true);
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<GetProjectsResponse>(`${this.rootUrl}/`, { withCredentials: true });
  }

  getProject(name: string) {
    return this.http.get<GenericProjectResponse>(`${this.rootUrl}/${name}`, { withCredentials: true });
  }

  removeProject(name: string) {
    return this.http.delete<GenericProjectResponse>(`${this.rootUrl}/${name}`, { withCredentials: true })
      .pipe(tap(() => this.refresh$.next(true)))
  }

  createProject(project: Project) {
    return this.http.post<GenericProjectResponse>(`${this.rootUrl}/`, project, { withCredentials: true })
      .pipe(tap(() => this.refresh$.next(true)))
  }

  updateProject(updateProjectRequest: Project) {
    return this.http.put<GenericProjectResponse>(`${this.rootUrl}/${updateProjectRequest.name}`, updateProjectRequest, { withCredentials: true })
      .pipe(tap(() => this.refresh$.next(true)))
  }

  uploadProjectLabelFile(projectName: string, file: FormData) {
    return this.http.put<UploadFileResponse>(`${this.rootUrl}/${projectName}/file`, file, { withCredentials: true })
      .pipe(tap(() => this.refresh$.next(true)))
  }
}