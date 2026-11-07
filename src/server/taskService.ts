import type { AgentTask, AgentName } from "@/types";

const INITIAL_TASKS: AgentTask[] = [
  {
    id: "task-1",
    title: "Quét codebase & chuẩn bị Context Brief vào HANDOFF.md",
    assignedTo: "antigravity",
    backupAgent: "codex",
    status: "done",
    layer: "UI/Full-stack",
  },
  {
    id: "task-2",
    title: "Thiết kế Core Architecture & Data Contracts (src/types)",
    assignedTo: "claude",
    backupAgent: "codex",
    status: "done",
    layer: "Architecture",
  },
  {
    id: "task-3",
    title: "Xây dựng giao diện Web App & tích hợp API",
    assignedTo: "antigravity",
    backupAgent: "claude",
    status: "in_progress",
    layer: "UI/Full-stack",
  },
  {
    id: "task-4",
    title: "Chạy vòng lặp Typecheck, Unit Test & Code Review",
    assignedTo: "codex",
    backupAgent: "antigravity",
    status: "todo",
    layer: "Backend/QA",
  },
];

export function getDefaultTasks(): AgentTask[] {
  return INITIAL_TASKS.map((task) => ({ ...task }));
}

export function getRecommendedBackup(primary: AgentName, isUiTask: boolean): AgentName {
  if (primary === "claude") {
    return isUiTask ? "antigravity" : "codex";
  }
  if (primary === "antigravity") {
    return "codex";
  }
  return "antigravity";
}
