"use client";

import { useState } from "react";
import type { AgentTask, TaskStatus } from "@/types";

export function useAgentTasks(initialTasks: AgentTask[]) {
  const [tasks, setTasks] = useState<AgentTask[]>(initialTasks);

  const cycleTaskStatus = (id: string) => {
    const order: TaskStatus[] = ["todo", "in_progress", "done"];
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const nextStatus = order[(order.indexOf(task.status) + 1) % order.length];
        return { ...task, status: nextStatus };
      })
    );
  };

  return {
    tasks,
    cycleTaskStatus,
  };
}
