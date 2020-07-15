import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { HomeComponent } from './home/home.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectIndexComponent } from './project-index/project-index.component';
import { ProjectDisplayComponent } from './project-display/project-display.component';
import { ProjectCardComponent } from './project-card/project-card.component';


@NgModule({
  declarations: [HomeComponent, ProjectCreateComponent, ProjectEditComponent, ProjectIndexComponent, ProjectDisplayComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
