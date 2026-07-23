import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

const sortedTasks = [...tasks].sort(
  (left, right) => Number(left.done) - Number(right.done),
);
const completedCount = tasks.filter((task) => task.done).length;

console.log(`완료: ${completedCount}/${tasks.length}`);

for (const task of sortedTasks) {
  console.log(formatTask(task));
}
