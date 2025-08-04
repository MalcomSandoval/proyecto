import React, { useState, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useCategories } from '../hooks/useCategories';
import { Header } from './Header';
import { FilterBar, FilterType } from './FilterBar';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';

export function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  
  const { tasks, loading: tasksLoading } = useTasks();
  const { categories, loading: categoriesLoading } = useCategories();

  const filteredTasks = useMemo(() => {
    switch (currentFilter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, currentFilter]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  }), [tasks]);

  const loading = tasksLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <FilterBar
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          onNewTask={() => setShowTaskForm(true)}
          taskCounts={taskCounts}
        />

        <TaskList
          tasks={filteredTasks}
          categories={categories}
          loading={loading}
        />

        <TaskForm
          isOpen={showTaskForm}
          onClose={() => setShowTaskForm(false)}
        />
      </main>
    </div>
  );
}