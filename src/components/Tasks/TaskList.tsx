import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStores';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';
import type { Task } from '../../types/task';
import {generateTaskReport} from '../../utils/pdfGenerator';


export const TaskList: React.FC = () => {
  const {
    tasks,
    loading,
    error,
    searchQuery,
    filterStatus,
    createTask,
    updateTask,
    deleteTask,
    setSearchQuery,
    setFilterStatus,
    getFilteredTasks,
  } = useTaskStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = getFilteredTasks();

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, {
        status: !task.status,
        priority: 'low',
        dueDate: ''
      });
    }
  };

  const handleDelete = async (id: string) => {
   
    await deleteTask(id)
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (taskData: any) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      await createTask(taskData);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleGenerateReport = () => {
    generateTaskReport(tasks);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center  h-64">
        {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> */}
     
<div className="flex-col gap-4 w-full flex items-center justify-center">
  <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
    </svg>
  </div>
</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

 
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onGenerateReport={handleGenerateReport}
      />

      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tasks found</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first task
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editingTask={editingTask}
      />
    </div>
  );
};