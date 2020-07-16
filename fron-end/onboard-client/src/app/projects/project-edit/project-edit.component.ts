import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from "../model/project"
import { CreateProjectRequest } from "../model/create-project-request"
import { ProjectService } from "../project.service"

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  showModal: boolean = false
  @Input() project: Project
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  onSubmit(editProjectRequest: CreateProjectRequest) {
    const { class_labels, ...p } = editProjectRequest;
    this.projectService.updateProject(p).subscribe((res) => {
      this.showModal = false;
      if (class_labels) {
        const formData = new FormData();
        formData.append('file', class_labels)
        this.projectService.uploadProjectLabelFile(res.data.name, formData).subscribe(() => { })
      }
    })
  }

}
