import { NextResponse } from "next/server";
import { getDefaultTasks } from "@/server/taskService";

export async function GET() {
  const tasks = getDefaultTasks();
  return NextResponse.json({ tasks });
}
