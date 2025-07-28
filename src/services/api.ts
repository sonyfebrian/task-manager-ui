import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';

const API_BASE_URL = 'https://687dc764918b64224332b51d.mockapi.io/api/v1';

export class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        return response.json();
    }

    async getTasks(): Promise<Task[]> {
        return this.request<Task[]>('/tasks');
    }

    async createTask(task: CreateTaskDto): Promise<Task> {
        const newTask = {
            ...task,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        return this.request<Task>('/tasks', {
            method: 'POST',
            body: JSON.stringify(newTask),
        });
    }

    async updateTask(id: string, updates: UpdateTaskDto): Promise<Task> {
        const updatedTask = {
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        return this.request<Task>(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTask),
        });
    }

    async deleteTask(id: string): Promise<void> {
        await this.request(`/tasks/${id}`, {
            method: 'DELETE',
        });
    }
}

export const apiService = new ApiService();