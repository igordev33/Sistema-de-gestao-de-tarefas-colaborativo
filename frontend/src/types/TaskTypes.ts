export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'done'

export type CreateTaskData = {
    message: string
    task: Task
}

export type TaskCreate = {
    task_title: string
    task_description: string
    task_priority: TaskPriority
    task_status: TaskStatus
    task_created_by: string
}

export type CompleteTask = {
    task_id?: number
    task_solution: string
}

export type Task = TaskCreate & {
    task_id: number
    task_solution: string
    task_creation_date: string
}

export type PaginatedResponse<T> = {
  tasks: T[]
  page: number
  limit: number
  total_tasks: number
  total_pages: number
}