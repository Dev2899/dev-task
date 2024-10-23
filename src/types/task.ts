// src/types/task.ts
export interface Task {
    id: string; 
    title: string; 
    description?: string; 
    assignee: string; 
    dueDate: string | null; 
    priority?: "Low" | "Medium" | "High"; 
    status?: "To Do" | "In Progress" | "Completed"; 
  }
  