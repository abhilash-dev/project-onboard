import { Project } from "./project"

export interface ProjectResponse {
    success: boolean
    count?: number
    data?: Project[]
    error?: string
}
