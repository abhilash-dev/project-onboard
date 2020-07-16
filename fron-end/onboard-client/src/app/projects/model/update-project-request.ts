export interface UpdateProjectRequest {
    name: string
    data_type?: string
    ipv4?: string
    port?: number
    train_size?: number
    problem_type?: string
    class_labels?: File
}