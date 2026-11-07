"use client";

import type { AgentTask, AgentName } from "@/types";
import { useAgentTasks } from "@/hooks/useAgentTasks";

const AGENT_BADGE: Record<AgentName, { label: string; quota: string; color: string }> = {
  antigravity: {
    label: "Antigravity (Gemini Pro)",
    quota: "50% tải • UI & Orchestrator",
    color: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  codex: {
    label: "Codex (GPT Pro)",
    quota: "35% tải • Backend & Test Loop",
    color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  claude: {
    label: "Claude Code (Claude Pro)",
    quota: "15% tải • Architect (Tiết kiệm Token)",
    color: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
};

interface AgentDashboardProps {
  initialTasks: AgentTask[];
}

export function AgentDashboard({ initialTasks }: AgentDashboardProps) {
  const { tasks, cycleTaskStatus } = useAgentTasks(initialTasks);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(AGENT_BADGE) as AgentName[]).map((agentKey) => {
          const info = AGENT_BADGE[agentKey];
          return (
            <div
              key={agentKey}
              className={`rounded-xl border p-4 ${info.color}`}
            >
              <div className="font-semibold text-base">{info.label}</div>
              <div className="mt-1 text-xs opacity-85">{info.quota}</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-100">
            Bảng Điều Phối Nhiệm Vụ (Nhấn vào trạng thái để đổi)
          </h2>
          <span className="text-xs text-slate-400">
            Đồng bộ quy chuẩn với HANDOFF.md
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-4"
            >
              <div>
                <div className="font-medium text-slate-100">{task.title}</div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span>Phụ trách: <strong className="text-slate-200">{task.assignedTo}</strong></span>
                  <span>•</span>
                  <span>Backup khi hết token: <strong className="text-amber-300">{task.backupAgent}</strong></span>
                  <span>•</span>
                  <span>Tầng: {task.layer}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => cycleTaskStatus(task.id)}
                className="self-start sm:self-center rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                {task.status === "done"
                  ? "✅ Hoàn thành"
                  : task.status === "in_progress"
                  ? "⏳ Đang xử lý"
                  : "📝 Chờ làm"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
