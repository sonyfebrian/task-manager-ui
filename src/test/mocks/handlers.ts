import { http, HttpResponse } from 'msw';
import type { Task } from '../../types/task';

const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Test Task 1',
        description: 'Test description 1',
        status: true,
        priority: 'high',
        createdAt: '2025-01-08T10:00:00Z',
        updatedAt: '2025-01-08T10:00:00Z',
    },
    {
        id: '2',
        title: 'Test Task 2',
        description: 'Test description 2',
        status: true,
        priority: 'medium',
        createdAt: '2025-01-07T14:30:00Z',
        updatedAt: '2025-01-09T16:45:00Z',
    },
];

export const handlers = [
    http.get('https://687dc764918b64224332b51d.mockapi.io/api/v1/tasks', () => {
        return HttpResponse.json(mockTasks);
    }),

    http.post('https://687dc764918b64224332b51d.mockapi.io/api/v1/tasks', async ({ request }) => {
        const newTask = await request.json() as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
        const task: Task = {
            ...newTask,
            id: Date.now().toString(),
            status: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        return HttpResponse.json(task);
    }),

    http.patch('https://687dc764918b64224332b51d.mockapi.io/api/v1/tasks/:id', async ({ params, request }) => {

        const { id } = params;
        const updates = await request.json() as Partial<Task>;
        const existingTask = mockTasks.find(task => task.id === id);

        if (!existingTask) {
            return new HttpResponse(null, { status: 404 });
        }

        const updatedTask = {
            ...existingTask,
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        return HttpResponse.json(updatedTask);
    }),

    http.delete('https://687dc764918b64224332b51d.mockapi.io/api/v1/tasks/:id', ({ params }) => {
        const { id } = params;
        const taskIndex = mockTasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        return new HttpResponse(null, { status: 200 });
    }),
];