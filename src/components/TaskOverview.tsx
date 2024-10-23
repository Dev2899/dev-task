// src/components/TaskOverview.tsx
import React from "react";
import { Card, Button } from "antd";
import { Task } from "../types/task";
import {
  CheckCircleOutlined,
  UserOutlined,
  FlagOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

interface TaskOverviewProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ task, onEdit }) => {
  return (
    <Card
      title={task.title}
      style={{
        marginBottom: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "none",
      }}
      headStyle={{
        backgroundColor: "#e6ffe6",
        borderBottom: "2px solid #52c41a",
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      <p style={{ marginBottom: "8px" }}>
        <CheckCircleOutlined style={{ marginRight: "8px", color: "#52c41a" }} />
        <strong>Status:</strong> {task.status}
      </p>
      <p style={{ marginBottom: "8px" }}>
        <UserOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
        <strong>Assignee:</strong> {task.assignee}
      </p>
      <p style={{ marginBottom: "8px" }}>
        <FlagOutlined style={{ marginRight: "8px", color: "#faad14" }} />
        <strong>Priority:</strong> {task.priority}
      </p>
      <p style={{ marginBottom: "16px" }}>
        <CalendarOutlined style={{ marginRight: "8px", color: "#eb2f2f" }} />
        <strong>Due Date:</strong>{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date set"}
      </p>
      <Button
        onClick={() => onEdit(task)}
        type="primary"
        style={{
          borderRadius: "20px",
          backgroundColor: "#52c41a",
          borderColor: "#52c41a",
          transition: "background-color 0.3s, transform 0.3s",
        }}
      >
        Edit Task
      </Button>
    </Card>
  );
};

export default TaskOverview;
