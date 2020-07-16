import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms"

import { ProjectsRoutingModule } from './projects-routing.module';
import { HomeComponent } from './home/home.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectIndexComponent } from './project-index/project-index.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { SharedModule } from "../shared/shared.module";
import { ProjectFormComponent } from './project-form/project-form.component'


@NgModule({
  declarations: [HomeComponent, ProjectCreateComponent, ProjectEditComponent, ProjectIndexComponent, ProjectCardComponent, ProjectFormComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProjectsModule { }
