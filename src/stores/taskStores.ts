import { create } from 'zustand';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';
import { apiService } from '../services/api';
import { toast } from 'react-toastify';

interface TaskStore {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    filterStatus: 'all' | 'completed' | 'pending';

    // Actions
    fetchTasks: () => Promise<void>;
    createTask: (task: CreateTaskDto) => Promise<void>;
    updateTask: (id: string, updates: UpdateTaskDto) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
    setFilterStatus: (status: 'all' | 'completed' | 'pending') => void;

    // Computed
    getFilteredTasks: () => Task[];
    getTaskStats: () => {
        total: number;
        completed: number;
        pending: number;
        highPriority: number;
    };
}

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,
    searchQuery: '',
    filterStatus: 'all',

    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const tasks = await apiService.getTasks();
            set({ tasks, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch tasks', loading: false });
        }
    },

    createTask: async (taskData: CreateTaskDto) => {
        set({ loading: true, error: null });
        try {
            const newTask = await apiService.createTask(taskData);
            set(state => ({
                tasks: [...state.tasks, newTask],
                loading: false,

            }));
            toast.success('Task created successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });

        } catch (error) {
            set({ error: 'Failed to create task', loading: false });
            toast.error('Failed to create task!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    },

    updateTask: async (id: string, updates: UpdateTaskDto) => {
        set({ loading: true, error: null });
        try {
            const updatedTask = await apiService.updateTask(id, updates);
            set(state => ({
                tasks: state.tasks.map(task =>
                    task.id === id ? updatedTask : task
                ),
                loading: false
            }));
            toast.success('Task updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        } catch (error) {
            set({ error: 'Failed to update task', loading: false });
            toast.error('Failed to update task!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    },

    deleteTask: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await apiService.deleteTask(id);
            set(state => ({
                tasks: state.tasks.filter(task => task.id !== id),
                loading: false
            }));
            toast.success('Task deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        } catch (error) {
            set({ error: 'Failed to delete task', loading: false });
            toast.error('Failed to delete task!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    },

    setSearchQuery: (query: string) => {
        set({ searchQuery: query });
    },

    setFilterStatus: (status: 'all' | 'completed' | 'pending') => {
        set({ filterStatus: status });
    },

    getFilteredTasks: () => {
        const { tasks, searchQuery, filterStatus } = get();

        let filtered = tasks;

        // Filter by status
        if (filterStatus === 'completed') {
            filtered = filtered.filter(task => task.status);
        } else if (filterStatus === 'pending') {
            filtered = filtered.filter(task => !task.status);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    },

    getTaskStats: () => {
        const { tasks } = get();
        return {
            total: tasks.length,
            completed: tasks.filter(task => task.status).length,
            pending: tasks.filter(task => !task.status).length,
            highPriority: tasks.filter(task => task.priority === 'high').length,
        };
    },
}));