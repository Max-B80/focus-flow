export default function TaskItem({ task, onDeleteTask, onToggleTask }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span>{task.priority}</span>
      <span>{task.status}</span>
      <button onClick={() => onToggleTask(task.id)}>
        {task.status === "Open" ? "Complete" : "Reopen"}
      </button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
}
