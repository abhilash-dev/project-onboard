import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ProjectService } from "../project.service";
import { CreateProjectRequest } from '../model/create-project-request';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  showModal: boolean = false
  project: Project
  constructor(private projectService: ProjectService) {
    this.project = {
      name: '',
      data_type: '',
      ipv4: '',
      port: 0,
      train_size: 0,
      problem_type: '',
    }
  }

  ngOnInit(): void {
  }

  onSubmit(newProject: CreateProjectRequest) {
    const { class_labels, ...p } = newProject;
    this.projectService.createProject(p).subscribe((res) => {
      const formData = new FormData();
      this.showModal = false;
      formData.append('file', class_labels)
      this.projectService.uploadProjectLabelFile(res.data.name, formData).subscribe(() => { })
    })
  }

}
