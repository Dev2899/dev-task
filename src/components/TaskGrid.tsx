// src/components/TaskGrid.tsx
import React from "react";
import { Row, Col } from "antd";
import TaskOverview from "./TaskOverview";
import { Task } from "../types/task";

interface TaskGridProps {
  tasks: Task[];
  selectedFilter: string;
  onEdit: (task: Task) => void;
}

const TaskGrid: React.FC<TaskGridProps> = ({
  tasks,
  selectedFilter,
  onEdit,
}) => {
  const displayedTasks = tasks.filter(
    (task) => selectedFilter === "All" || task.status === selectedFilter
  );

  return (
    <Row gutter={[16, 16]}>
      {displayedTasks.map((task) => (
        <Col span={6} key={task.id}>
          <TaskOverview task={task} onEdit={onEdit} />
        </Col>
      ))}
    </Row>
  );
};

export default TaskGrid;
