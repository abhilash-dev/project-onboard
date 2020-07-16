import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { AsyncValidator, FormControl } from "@angular/forms"
import { ProjectService } from '../project.service'
import { map, catchError } from "rxjs/operators"
import { of, Observable } from 'rxjs'


@Injectable({
    providedIn: 'root'
})
export class UniqueProjectName implements AsyncValidator {
    constructor(private http: HttpClient,
        private projectService: ProjectService) { }

    validate = (control: FormControl) => {
        const { value } = control;

        return this.projectService.checkProjectNameExists(value).pipe(
            map((value) => {
                return null;
            }),
            catchError((err) => {
                return of({ nonUniqueProjectName: true })
            })
        );
    }
}
