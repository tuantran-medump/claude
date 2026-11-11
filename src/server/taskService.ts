import type { AgentTask, AgentName } from "@/types";

const INITIAL_TASKS: AgentTask[] = [
  {
    id: "task-1",
    title: "Phỏng vấn, lập PLAYBOOK.md & xây dựng Toolbox tái sử dụng (toolbox/)",
    assignedTo: "antigravity",
    backupAgent: "codex",
    status: "done",
    layer: "UI/Full-stack",
  },
  {
    id: "task-2",
    title: "Chốt Types (src/types/game.ts) & Công thức Cân bằng (GAME_BALANCE_SPEC.md)",
    assignedTo: "claude",
    backupAgent: "antigravity",
    status: "done",
    layer: "Architecture",
  },
  {
    id: "task-3",
    title: "Code chính Core Game Engine 4x4 Grid/Merge + Card Turn Logic & Unit Tests",
    assignedTo: "codex",
    backupAgent: "antigravity",
    status: "done",
    layer: "Backend/QA",
  },
  {
    id: "task-4",
    title: "Dựng HTML5 Canvas 60FPS, ghép Web Audio/Particles & Nghiệm thu verify-all.cmd",
    assignedTo: "antigravity",
    backupAgent: "codex",
    status: "done",
    layer: "UI/Full-stack",
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
