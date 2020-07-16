import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth/auth.guard"
const routes: Routes = [
  {
    path: "projects",
    canLoad: [AuthGuard],
    loadChildren: () => import('./projects/projects.module').then(mod => mod.ProjectsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
