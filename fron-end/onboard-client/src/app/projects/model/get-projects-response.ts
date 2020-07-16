import { Project } from "./project"

export interface GetProjectsResponse {
    success: boolean
    count?: number
    data?: Project[]
    error?: string
}
