export interface Task {
    id: string;
    title: string;
    description: string;
    status: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskDto {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: boolean;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    status?: boolean;
}