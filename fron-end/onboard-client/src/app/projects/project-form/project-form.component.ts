import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreateProjectRequest } from '../model/create-project-request';
import { Project } from "../model/project"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ProjectService } from "../project.service"

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  @Input() project: Project
  @Input() isNew: boolean
  @Output() createProjectSubmit = new EventEmitter();
  projectForm: FormGroup

  class_labels_file: File
  data_type_values: Array<string> = ['image', 'text', 'numerical']
  problem_type_values: Array<string> = ['object_detection', 'classification', 'text_classification']

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(this.isNew ? '' : { value: this.project.name, disabled: true },
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ),
      data_type: new FormControl(this.isNew ? '' : this.project.data_type,
        [Validators.required]
      ),
      ipv4: new FormControl(this.isNew ? '' : this.project.ipv4,
        [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)]
      ),
      port: new FormControl(this.isNew ? '' : this.project.port,
        [Validators.required, Validators.pattern(/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/)]
      ),
      train_size: new FormControl(this.isNew ? '' : this.project.train_size,
        [Validators.required]
      ),
      problem_type: new FormControl(this.isNew ? '' : this.project.problem_type,
        [Validators.required]
      ),
    })

    if (this.isNew) {
      this.projectForm.addControl('class_labels', new FormControl('', [Validators.required]));
    } else {
      this.projectForm.addControl('class_labels', new FormControl(''));
    }
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      this.class_labels_file = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return
    }

    const createProjectRequest: CreateProjectRequest = this.projectForm.getRawValue()
    createProjectRequest.class_labels = this.class_labels_file
    this.createProjectSubmit.emit(createProjectRequest);
  }

}