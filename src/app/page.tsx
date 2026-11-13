import { getDefaultTasks } from "@/server/taskService";
import { AgentDashboard } from "@/components/ui/AgentDashboard";

export default function HomePage() {
  const initialTasks = getDefaultTasks();

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <header className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          Multi-Agent Starter Kit v2.0 • Codex Code Chính (65%) • Antigravity Điều Phối (25%) • Claude Phụ (≤10%)
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Orca Web Workspace & Multi-Agent Playbook
        </h1>
        <p className="text-sm text-slate-400">
          Bộ khung ứng dụng web và bảng điều phối công việc, kèm Toolbox tái sử dụng & Failsafe 3 lớp.
        </p>
      </header>

      {/* Bảng điều phối trạng thái Multi-Agent Kit v2.0 */}
      <AgentDashboard initialTasks={initialTasks} />
    </main>
  );
}
