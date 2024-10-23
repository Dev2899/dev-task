// src/hooks/useTaskList.ts
import { useState, useEffect } from "react";
import { Task } from "../types/task";

const useTaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("taskList");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTaskList(data);
        localStorage.setItem("taskList", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (taskList.length === 0) {
      fetchTaskList();
    }
  }, [taskList.length]);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return { taskList, setTaskList };
};

export default useTaskList;
