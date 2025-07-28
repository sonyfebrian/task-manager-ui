import React, {useState} from 'react';


import {Calendar,   Trash2, Edit3 } from 'lucide-react';
import type { Task } from '../../types/task';
import { format } from 'date-fns';
import ConfirmationModal from '../ConfirmationModal';


interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
 


  const isOverdue = new Date(task.dueDate) < new Date() && !task.status;
const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOpenModal = () => {
    setShowConfirmModal(true);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmAction = () => {
    // Perform the action after confirmation
    console.log('Action confirmed!');
    onDelete(task.id)
    setShowConfirmModal(false); // Close modal after action
  };

  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg ${
      task.status ? 'opacity-75' : ''
    } ${isOverdue ? 'border-l-4 border-red-500' : 'border-l-4 border-transparent'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => onToggleComplete(task.id)}
            className="w-5 h-5 cursor-pointer text-blue-600 rounded focus:ring-blue-500 transition-colors"
          />
          <div>
            <h3 className={`font-semibold text-lg ${
              task.status ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
          
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={handleOpenModal}
            className="p-2 text-gray-400 cursor-pointer hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
          
        </div>
      </div>
      
      <p className={`text-gray-600 mb-4 ${task.status ? 'line-through' : ''}`}>
        {task.description}
      </p>
       <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
      <div className="flex items-center justify-between text-sm text-gray-500">
       <div className="flex items-center gap-1 sm:gap-2">
          <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
          <span className={isOverdue && !task.status ? 'text-red-600 font-medium' : ''}>
            Due Date: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
        </div>
       <span>
  Created: {format(new Date(task.createdAt * 1000), 'MMM dd')}
</span>
      </div>
    </div>
  );
};