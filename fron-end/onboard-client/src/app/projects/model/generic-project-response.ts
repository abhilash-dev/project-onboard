import { Project } from "./project"

export interface GenericProjectResponse {
    success: boolean
    data?: Project
    error?: string
}
