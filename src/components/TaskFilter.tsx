// src/components/TaskFilter.tsx
import { Select } from "antd";
import React from "react";

const { Option } = Select;

interface TaskFilterProps {
  onFilterChange: (filter: string) => void; // Updated prop name
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  return (
    <Select defaultValue="All" style={{ width: 120 }} onChange={onFilterChange}>
      <Option value="All">All</Option>
      <Option value="To Do">To Do</Option>
      <Option value="In Progress">In Progress</Option>
      <Option value="Completed">Completed</Option>
    </Select>
  );
};

export default TaskFilter;
