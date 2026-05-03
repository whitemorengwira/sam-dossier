'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, DotsThree, User, Clock, Flag } from '@phosphor-icons/react'

type Priority = 'critical' | 'high' | 'medium' | 'low'
type Column = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done'

interface Task {
  id: string; title: string; assignee: string; priority: Priority
  dueDate: string; tags: string[]
}

const priorityConfig: Record<Priority, { label: string; cls: string }> = {
  critical: { label: 'Critical', cls: 'bg-danger/20 text-danger border-danger/30' },
  high: { label: 'High', cls: 'bg-warning/20 text-warning border-warning/30' },
  medium: { label: 'Medium', cls: 'bg-info/20 text-info border-info/30' },
  low: { label: 'Low', cls: 'bg-success/20 text-success border-success/30' },
}

const columnConfig: Record<Column, { title: string; colour: string }> = {
  backlog: { title: 'Backlog', colour: 'border-text-muted/30' },
  todo: { title: 'To Do', colour: 'border-info/50' },
  in_progress: { title: 'In Progress', colour: 'border-warning/50' },
  review: { title: 'Review', colour: 'border-purple-500/50' },
  done: { title: 'Done', colour: 'border-success/50' },
}

const initialTasks: Record<Column, Task[]> = {
  backlog: [
    { id: '1', title: 'Commission independent geologist for SAMREC CPR', assignee: 'SM', priority: 'high', dueDate: '22 May', tags: ['Geology'] },
    { id: '2', title: 'Prepare investor documentation portal', assignee: 'WN', priority: 'medium', dueDate: '30 May', tags: ['Tech'] },
  ],
  todo: [
    { id: '3', title: 'Book flights and accommodation to Mutare', assignee: 'TA', priority: 'high', dueDate: '15 May', tags: ['Logistics'] },
    { id: '4', title: 'Complete site visit briefing pack', assignee: 'JD', priority: 'critical', dueDate: '25 May', tags: ['Operations'] },
    { id: '5', title: 'Finalise shareholder agreement draft', assignee: 'OM', priority: 'critical', dueDate: '20 May', tags: ['Legal'] },
  ],
  in_progress: [
    { id: '6', title: 'Financial model stress testing', assignee: 'MD', priority: 'high', dueDate: '18 May', tags: ['Finance'] },
    { id: '7', title: 'SAM Dossier platform development', assignee: 'WN', priority: 'high', dueDate: 'Ongoing', tags: ['Tech'] },
  ],
  review: [
    { id: '8', title: 'NDA for investor review', assignee: 'OM', priority: 'medium', dueDate: '12 May', tags: ['Legal'] },
  ],
  done: [
    { id: '9', title: 'Geological report upload to vault', assignee: 'SM', priority: 'medium', dueDate: 'Completed', tags: ['Geology'] },
    { id: '10', title: 'Mining pitch deck finalisation', assignee: 'JD', priority: 'high', dueDate: 'Completed', tags: ['Sales'] },
  ],
}

export default function BoardsPage() {
  const [tasks] = useState(initialTasks)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Project Boards</h1>
            <p className="text-text-muted text-sm">Chikonga Mine - Pre-Production Sprint</p>
          </div>
          <button className="btn-gold px-4 py-2 text-sm flex items-center gap-2">
            <Plus size={16} weight="bold" /> New Task
          </button>
        </div>
      </motion.div>

      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {(Object.keys(columnConfig) as Column[]).map((col, colIdx) => (
          <motion.div
            key={col}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIdx * 0.08, duration: 0.5 }}
            className="shrink-0 w-[280px]"
          >
            <div className={`border-t-2 ${columnConfig[col].colour} mb-3 pt-3`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-text-primary font-body font-semibold text-sm flex items-center gap-2">
                  {columnConfig[col].title}
                  <span className="text-text-muted font-mono text-xs">({tasks[col].length})</span>
                </h3>
                <button className="text-text-muted hover:text-gold transition-colors">
                  <DotsThree size={18} weight="bold" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {tasks[col].map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: colIdx * 0.08 + i * 0.04, duration: 0.4 }}
                  className="glass-card p-3 cursor-pointer hover:border-gold/40 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-[9px] px-2 py-0.5 border font-mono ${priorityConfig[task.priority].cls}`}>
                      {priorityConfig[task.priority].label}
                    </span>
                    <Flag size={12} weight="duotone" className="text-text-muted group-hover:text-gold transition-colors" />
                  </div>
                  <h4 className="text-text-primary text-xs font-body font-medium leading-relaxed mb-3">{task.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                        <span className="text-[8px] font-mono text-gold font-bold">{task.assignee}</span>
                      </div>
                      {task.tags.map((tag) => (
                        <span key={tag} className="text-[9px] text-text-muted bg-navy-light px-1.5 py-0.5">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-text-muted">
                      <Clock size={10} />
                      <span className="text-[9px] font-mono">{task.dueDate}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-2 p-2 border border-dashed border-gold/15 text-text-muted text-xs hover:border-gold/30 hover:text-gold transition-colors flex items-center justify-center gap-1">
              <Plus size={12} /> Add task
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
