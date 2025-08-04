import React from 'react';
import { Task, Category } from '../lib/database.types';
import { TaskItem } from './TaskItem';
import { CheckCircle2, Clock, List } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  loading: boolean;
}

export function TaskList({ tasks, categories, loading }: TaskListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <List className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas</h3>
        <p className="text-gray-500">Crea tu primera tarea para comenzar a organizarte.</p>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Pendientes ({pendingTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <TaskItem key={task.id} task={task} categories={categories} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Completadas ({completedTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} categories={categories} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}