import { describe, expect, it } from "vitest";
import { getDefaultTasks, getRecommendedBackup } from "@/server/taskService";

describe("taskService", () => {
  it("returns default multi-agent tasks without mutating original array", () => {
    const tasks = getDefaultTasks();
    expect(tasks.length).toBeGreaterThanOrEqual(4);
  });

  it("recommends Antigravity as backup when Claude runs out of tokens on UI tasks", () => {
    expect(getRecommendedBackup("claude", true)).toBe("antigravity");
  });

  it("recommends Codex as backup when Claude runs out of tokens on Backend/Logic tasks", () => {
    expect(getRecommendedBackup("claude", false)).toBe("codex");
  });
});
