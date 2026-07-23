export function formatTask(task) {
  const label = task.done ? "완료 [x]" : "대기 [ ]";
  return `${label} ${task.title}`;
}
