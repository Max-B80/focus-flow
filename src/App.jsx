import { useState } from 'react';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import { initialTasks } from './data/initialTasks';
import { useLocalStorage } from './hooks/useLocalStorage';
import logo from './assets/logo.png';
import logocopy from './assets/logocopy.png';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusflow_tasks', initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Open' ? 'Completed' : 'Open' }
          : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => task.status !== 'Completed'));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const hasCompletedTasks = tasks.some((task) => task.status === 'Completed');

  return (
    <>
      <header className="app-header" aria-label="FocusFlow">
        <img src={logo} alt="" className="app-logo" />
        <img src={logocopy} alt="" className="app-logocopy" />
        <h1>ocus Flow</h1>
      </header>

      <main className="app-container">
        <TaskForm onAddTask={addTask} />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
        />

        {hasCompletedTasks && (
          <button className="clear-btn" onClick={clearCompleted}>
            Clear Completed
          </button>
        )}

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p>No matching tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onToggleTask={toggleTask}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}