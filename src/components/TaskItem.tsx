import React, { useState } from 'react';
import { Task, Category } from '../lib/database.types';
import { useTasks } from '../hooks/useTasks';
import { Check, Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface TaskItemProps {
  task: Task;
  categories: Category[];
}

export function TaskItem({ task, categories }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const { updateTask, deleteTask } = useTasks();

  const category = categories.find(c => c.id === task.category_id);

  const handleToggleComplete = async () => {
    await updateTask(task.id, { completed: !task.completed });
  };

  const handleSaveEdit = async () => {
    if (editTitle.trim() && editTitle !== task.title) {
      await updateTask(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      await deleteTask(task.id);
    }
  };

  return (
    <div className={clsx(
      'bg-white rounded-lg shadow-sm border p-4 transition-all duration-200',
      task.completed ? 'opacity-60' : 'hover:shadow-md'
    )}>
      <div className="flex items-start space-x-3">
        <button
          onClick={handleToggleComplete}
          className={clsx(
            'mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          )}
        >
          {task.completed && <Check className="h-3 w-3" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') {
                  setEditTitle(task.title);
                  setIsEditing(false);
                }
              }}
              className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <h3
              className={clsx(
                'text-sm font-medium cursor-pointer',
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              )}
              onClick={() => setIsEditing(true)}
            >
              {task.title}
            </h3>
          )}

          {task.description && (
            <p className={clsx(
              'mt-1 text-xs',
              task.completed ? 'text-gray-400' : 'text-gray-600'
            )}>
              {task.description}
            </p>
          )}

          <div className="flex items-center space-x-4 mt-2">
            {category && (
              <div className="flex items-center space-x-1">
                <Tag className="h-3 w-3 text-gray-400" />
                <span
                  className="text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </span>
              </div>
            )}

            {task.due_date && (
              <div className="flex items-center space-x-1 text-gray-500">
                <Calendar className="h-3 w-3" />
                <span className="text-xs">
                  {format(new Date(task.due_date), 'dd/MM/yyyy')}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}