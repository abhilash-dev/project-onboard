export interface Project {
    id?: string
    name: string
    data_type: string
    ipv4: string
    port: number
    train_size: number
    problem_type: string
    class_labels?: string
    created_on?: Date
}
