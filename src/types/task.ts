export interface Task {
    id: string;
    title: string;
    description: string;
    status: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    createdAt: number;
    updatedAt: string;
}

export interface CreateTaskDto {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: boolean;
    dueDate: string;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    status?: boolean;
    dueDate: string;
}