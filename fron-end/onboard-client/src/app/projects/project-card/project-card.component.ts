import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Project } from '../model/project';
import { ProjectService } from "../project.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
  }

  onEdit() {
    console.log(`Edit: ${this.project.name}`)
  }

  onRemove() {
    this.projectService.removeProject(this.project.name).subscribe(() => { });
  }
}
