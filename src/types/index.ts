export type AgentName = "antigravity" | "codex" | "claude";

export type TaskStatus = "todo" | "in_progress" | "done";

export interface AgentTask {
  id: string;
  title: string;
  assignedTo: AgentName;
  backupAgent: AgentName;
  status: TaskStatus;
  layer: "UI/Full-stack" | "Backend/QA" | "Architecture";
}
