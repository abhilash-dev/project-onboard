import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../project.service"
import { Project } from '../model/project';
import { BehaviorSubject } from "rxjs"

@Component({
  selector: 'app-project-index',
  templateUrl: './project-index.component.html',
  styleUrls: ['./project-index.component.css']
})
export class ProjectIndexComponent implements OnInit {
  projects$: Project[]
  refresh$: BehaviorSubject<boolean>

  constructor(private projectService: ProjectService) {
    this.refresh$ = this.projectService.refresh$
  }

  ngOnInit(): void {
    this.refresh$.subscribe(() => {
      this.getProjects();
    })
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe((res) => {
      if (res.success) {
        this.projects$ = res.data;
      }
    })
  }
}