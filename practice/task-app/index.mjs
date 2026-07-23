import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

for (const task of tasks) {
  console.log(formatTask(task));
}
