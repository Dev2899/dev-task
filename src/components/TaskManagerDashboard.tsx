import React, { useState } from "react";
import { Button, Layout, Typography, Pagination, Row, Col } from "antd"; // Import Row and Col
import TaskEditor from "./TaskEditor";
import useTaskList from "../hooks/useTaskList";
import TaskFilter from "./TaskFilter";
import TaskOverview from "./TaskOverview";
import { Task } from "../types/task";

const { Header, Content } = Layout;
const { Title } = Typography;

const TaskManagerDashboard: React.FC = () => {
  const { taskList, setTaskList } = useTaskList();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 8;

  const usersList = [
    { id: "john", name: "john" },
    { id: "Doe", name: "Doe" },
    { id: "Dev", name: "Dev" },
  ];

  const handleTaskSave = (taskToUpdate: Task) => {
    setTaskList((prevTasks) => {
      const taskIndex = prevTasks.findIndex(
        (task) => task.id === taskToUpdate.id
      );
      if (taskIndex > -1) {
        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex] = taskToUpdate;
        return updatedTasks;
      }
      return [...prevTasks, taskToUpdate];
    });
    closeEditor();
  };

  const openEditor = (task: Task) => {
    setCurrentTask(task);
    setIsEditorVisible(true);
  };

  const closeEditor = () => {
    setIsEditorVisible(false);
    setCurrentTask(null);
  };

  const filteredTaskList = taskList.filter((task) => {
    return selectedFilter === "All" || task.status === selectedFilter;
  });

  const totalTaskCount = filteredTaskList.length;
  const displayedTasks = filteredTaskList.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header style={{ backgroundColor: "#52c41a", padding: "0 20px" }}>
        <Title
          style={{
            color: "white",
            margin: 0,
            textAlign: "center",
            justifyContent: "center",
            marginTop:"8px"
          }}
        >
          Task Management
        </Title>
      </Header>
      <Content
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              setCurrentTask(null);
              setIsEditorVisible(true);
            }}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Create Task
          </Button>
          <TaskFilter onFilterChange={setSelectedFilter} />
        </div>
        <Row gutter={[16, 16]}>
          {displayedTasks.map((task) => (
            <Col xs={24} sm={12} md={8} lg={6} key={task.id}>
              <TaskOverview task={task} onEdit={openEditor} />
            </Col>
          ))}
        </Row>
        <Pagination
          current={activePage}
          pageSize={itemsPerPage}
          total={totalTaskCount}
          onChange={setActivePage}
          style={{ marginTop: "20px", textAlign: "right" }}
        />
        <TaskEditor
          isVisible={isEditorVisible}
          onClose={closeEditor}
          onSubmit={handleTaskSave}
          existingTask={currentTask}
          users={usersList}
        />
      </Content>
    </Layout>
  );
};

export default TaskManagerDashboard;
