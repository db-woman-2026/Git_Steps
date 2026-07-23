export function formatTask(task) {
  return `${task.done ? "[x]" : "[ ]"} ${task.title}`;
}
