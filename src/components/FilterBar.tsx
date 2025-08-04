import React from 'react';
import { Filter, Plus } from 'lucide-react';
import { clsx } from 'clsx';

export type FilterType = 'all' | 'pending' | 'completed';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onNewTask: () => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export function FilterBar({ currentFilter, onFilterChange, onNewTask, taskCounts }: FilterBarProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'Todas', count: taskCounts.all },
    { key: 'pending', label: 'Pendientes', count: taskCounts.pending },
    { key: 'completed', label: 'Completadas', count: taskCounts.completed },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtros:</span>
          
          <div className="flex space-x-1 ml-2">
            {filters.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => onFilterChange(key)}
                className={clsx(
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  currentFilter === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onNewTask}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nueva Tarea</span>
        </button>
      </div>
    </div>
  );
}