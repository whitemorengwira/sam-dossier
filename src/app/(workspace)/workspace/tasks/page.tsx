"use client";

import { useState } from "react";
import styles from "./page.module.css";

type TaskStatus = "To Do" | "In Progress" | "Review" | "Done";

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: "High" | "Medium" | "Low";
}

const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Flight Bookings JHB to Harare", assignee: "Olwethu", status: "To Do", priority: "High" },
  { id: "t2", title: "SAMREC CPR Commissioning", assignee: "Shingirai", status: "In Progress", priority: "High" },
  { id: "t3", title: "FGR Licensing Review", assignee: "Patience", status: "Review", priority: "High" },
  { id: "t4", title: "Procure CIP Plant Quotes", assignee: "Lufeyi", status: "Done", priority: "Medium" },
  { id: "t5", title: "Draft Board Resolution 12/2026", assignee: "Whitemore", status: "To Do", priority: "Low" },
];

const COLUMNS: TaskStatus[] = ["To Do", "In Progress", "Review", "Done"];

export default function KanbanTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const moveTask = (taskId: string, direction: "next" | "prev") => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const currentIndex = COLUMNS.indexOf(task.status);
        const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < COLUMNS.length) {
          return { ...task, status: COLUMNS[newIndex] };
        }
      }
      return task;
    }));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: newTaskTitle,
      assignee: "Unassigned",
      status: "To Do",
      priority: "Medium"
    };
    
    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle("");
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className="badge badge-gold">Operations Workspace</span>
          <h1>Project <span className="text-gold">Kanban</span></h1>
          <p className={styles.lead}>Agile task tracking for the Chikonga capital deployment.</p>
        </div>
        
        <form onSubmit={addTask} className={styles.addForm}>
          <input 
            type="text" 
            placeholder="Quick add task..." 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className="btn btn-gold">Add</button>
        </form>
      </header>

      <div className={styles.board}>
        {COLUMNS.map(column => (
          <div key={column} className={styles.column}>
            <div className={styles.columnHeader}>
              <h3>{column}</h3>
              <span className={styles.taskCount}>
                {tasks.filter(t => t.status === column).length}
              </span>
            </div>
            
            <div className={styles.taskList}>
              {tasks.filter(t => t.status === column).map(task => (
                <div key={task.id} className={styles.taskCard}>
                  <div className={styles.taskHeader}>
                    <span className={`${styles.priority} ${styles[`priority${task.priority}`]}`}>
                      {task.priority}
                    </span>
                    <button className={styles.deleteBtn} onClick={() => deleteTask(task.id)}>×</button>
                  </div>
                  
                  <h4 className={styles.taskTitle}>{task.title}</h4>
                  
                  <div className={styles.taskFooter}>
                    <div className={styles.assignee}>
                      <div className={styles.avatar}>{task.assignee.charAt(0)}</div>
                      <span>{task.assignee}</span>
                    </div>
                    
                    <div className={styles.controls}>
                      <button 
                        className={styles.moveBtn} 
                        onClick={() => moveTask(task.id, "prev")}
                        disabled={column === "To Do"}
                      >
                        ←
                      </button>
                      <button 
                        className={styles.moveBtn} 
                        onClick={() => moveTask(task.id, "next")}
                        disabled={column === "Done"}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
