import { formatTask } from "./format.mjs";
import { tasks } from "./tasks.mjs";

const sortedTasks = [...tasks].sort(
  (left, right) => Number(left.done) - Number(right.done),
);
const completedCount = tasks.filter((task) => task.done).length;
const pendingCount = tasks.length - completedCount;

console.log(`완료: ${completedCount}/${tasks.length}`);
console.log(`대기: ${pendingCount}`);

for (const task of sortedTasks) {
  console.log(formatTask(task));
}

const highPriorityTitles = tasks
  .filter((task) => task.priority === "high")
  .map((task) => task.title);

console.log(`높은 우선순위: ${highPriorityTitles.join(", ")}`);
