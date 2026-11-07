import { getDefaultTasks } from "@/server/taskService";
import { AgentDashboard } from "@/components/ui/AgentDashboard";

export default function HomePage() {
  const initialTasks = getDefaultTasks();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <header className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          Orca Workspace • Ready for Git Worktrees
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Orca Multi-Agent Web App Starter
        </h1>
        <p className="text-sm text-slate-400">
          Cấu trúc phân tầng chuẩn cho Antigravity (UI/Orchestrator), Codex (Backend/Test) và Claude Code (Architect).
        </p>
      </header>

      <AgentDashboard initialTasks={initialTasks} />
    </main>
  );
}
