"use client";

import { useState } from "react";
import styles from "./page.module.css";

const TASKS = [
  { id: 1, title: "Finalise investment dossier document", assignee: "Whitemore", status: "in-progress", priority: "high", due: "6 May 2026" },
  { id: 2, title: "Budget presentation — comprehensive projections", assignee: "Patience", status: "in-progress", priority: "high", due: "6 May 2026" },
  { id: 3, title: "Book flights JHB → Harare for delegation", assignee: "Olwethu", status: "todo", priority: "medium", due: "20 May 2026" },
  { id: 4, title: "Arrange transport Harare → Mutare (chartered)", assignee: "Olwethu", status: "todo", priority: "medium", due: "25 May 2026" },
  { id: 5, title: "Commission SAMREC CPR — independent geologist", assignee: "Shingirai", status: "todo", priority: "high", due: "15 June 2026" },
  { id: 6, title: "CIP plant equipment sourcing & quotations", assignee: "Shingirai", status: "todo", priority: "medium", due: "30 June 2026" },
  { id: 7, title: "Office space — Johannesburg mission centre", assignee: "Jabulile", status: "blocked", priority: "low", due: "TBD" },
  { id: 8, title: "Smart mining IoT device specification", assignee: "Whitemore", status: "todo", priority: "medium", due: "20 June 2026" },
  { id: 9, title: "Sign MoU with Hilltouch Investments", assignee: "Jabulile", status: "todo", priority: "high", due: "Week 1 June 2026" },
  { id: 10, title: "Open dedicated investment bank account (SPV)", assignee: "Patience", status: "todo", priority: "high", due: "15 May 2026" },
];

const KPI_DATA = [
  { label: "Investment Secured", value: "ZAR 500M", trend: "+100%", icon: "💰" },
  { label: "Current Production", value: "5 KG/month", trend: "Baseline", icon: "⛏️" },
  { label: "Target Production", value: "15 KG/month", trend: "+200%", icon: "📈" },
  { label: "Gold Spot Price", value: "$4,615/oz", trend: "+12.3%", icon: "🪙" },
  { label: "Tasks Completed", value: "0 / 10", trend: "0%", icon: "✅" },
  { label: "Days to Trip", value: "~28", trend: "June 2026", icon: "✈️" },
];

const STATUS_LABELS: Record<string, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "done": "Done",
  "blocked": "Blocked",
};

const STATUS_COLOURS: Record<string, string> = {
  "todo": "var(--smoke)",
  "in-progress": "var(--info)",
  "done": "var(--success)",
  "blocked": "var(--danger)",
};

const PRIORITY_COLOURS: Record<string, string> = {
  "high": "var(--danger)",
  "medium": "var(--warning)",
  "low": "var(--smoke)",
};

export default function WorkspaceDashboard() {
  const [tasks, setTasks] = useState(TASKS);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.trim(),
        assignee: "Unassigned",
        status: "todo",
        priority: "medium",
        due: "TBD",
      },
    ]);
    setNewTask("");
  };

  const cycleStatus = (id: number) => {
    const order = ["todo", "in-progress", "done", "blocked"];
    setTasks(tasks.map(t => {
      if (t.id !== id) return t;
      const idx = order.indexOf(t.status);
      return { ...t, status: order[(idx + 1) % order.length] };
    }));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.status === "done").length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className={styles.page}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <div>
          <span className={styles.badge}>Workspace</span>
          <h1>
            Team <span className={styles.textGold}>Dashboard</span>
          </h1>
          <p className={styles.lead}>
            Real-time overview of the Chikonga Mine investment project —
            tasks, milestones, and key performance indicators.
          </p>
        </div>
      </header>

      {/* ── KPI Grid ────────────────────────────────────────────── */}
      <section className={styles.kpiGrid}>
        {KPI_DATA.map((kpi, i) => (
          <div key={i} className={styles.kpiCard}>
            <div className={styles.kpiIcon}>{kpi.icon}</div>
            <div className={styles.kpiValue}>{kpi.label === "Tasks Completed" ? `${completedCount} / ${tasks.length}` : kpi.value}</div>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiTrend}>{kpi.label === "Tasks Completed" ? `${progressPct}%` : kpi.trend}</div>
          </div>
        ))}
      </section>

      {/* ── Progress Bar ────────────────────────────────────────── */}
      <section className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <h3>Overall Progress</h3>
          <span className={styles.progressPct}>{progressPct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </section>

      {/* ── Task List ───────────────────────────────────────────── */}
      <section className={styles.taskSection}>
        <div className={styles.taskHeader}>
          <h3>Active Tasks</h3>
          <div className={styles.addTask}>
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className={styles.taskInput}
            />
            <button onClick={addTask} className="btn btn-gold">
              Add
            </button>
          </div>
        </div>

        <div className={styles.taskTable}>
          <div className={styles.taskTableHead}>
            <span className={styles.colTask}>Task</span>
            <span className={styles.colAssignee}>Assignee</span>
            <span className={styles.colStatus}>Status</span>
            <span className={styles.colPriority}>Priority</span>
            <span className={styles.colDue}>Due Date</span>
            <span className={styles.colActions}>Actions</span>
          </div>
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskRow}>
              <span className={styles.colTask}>{task.title}</span>
              <span className={styles.colAssignee}>
                <span className={styles.avatar}>{task.assignee[0]}</span>
                {task.assignee}
              </span>
              <span className={styles.colStatus}>
                <button
                  className={styles.statusBtn}
                  style={{ background: STATUS_COLOURS[task.status] }}
                  onClick={() => cycleStatus(task.id)}
                  title="Click to cycle status"
                >
                  {STATUS_LABELS[task.status]}
                </button>
              </span>
              <span className={styles.colPriority}>
                <span
                  className={styles.priorityDot}
                  style={{ background: PRIORITY_COLOURS[task.priority] }}
                />
                {task.priority}
              </span>
              <span className={styles.colDue}>{task.due}</span>
              <span className={styles.colActions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                >
                  ✕
                </button>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Meeting Minutes Archive ─────────────────────────────── */}
      <section className={styles.meetingSection}>
        <h3>Meeting Minutes Archive</h3>
        <div className={styles.meetingGrid}>
          <div className={styles.meetingCard}>
            <div className={styles.meetingDate}>30 April 2026</div>
            <h4>Policy Documents Meeting Guidance</h4>
            <p>
              Established corporate organogram, defined reporting lines
              (CFO → CEO → MD), resolved office space decision in abeyance,
              adopted establishment policy.
            </p>
            <span className="badge badge-gold">Governance</span>
          </div>
          <div className={styles.meetingCard}>
            <div className={styles.meetingDate}>2 May 2026</div>
            <h4>Budget Meeting — Operations & Strategy</h4>
            <p>
              Approved simulation-based dossier approach, budgeted Zimbabwe
              trip as pre-production expense, resolved to deliver comprehensive
              budget by Tuesday, approved smart mining IoT integration.
            </p>
            <span className="badge badge-gold">Budget</span>
          </div>
        </div>
      </section>
    </div>
  );
}
