export default function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}) {
  return (
    <>
      <select
        className="status-select"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Open">Open</option>
        <option value="Completed">Completed</option>
      </select>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </>
  );
}