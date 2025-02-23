// 以下の型を定義すること
//  - User: { id: number, name: string }
//  - Task: { title: string, completed: boolean, user: User }
//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型

// npx tsx caller.ts

interface User {
  id: number;
  name: string;
}
interface Task {
  title: string;
  completed: boolean;
  user: User;
}
type Priority = "low" | "middle" | "high";
// interfaceでも書ける
// interface Priority {  
//   priority: "low" | "middle" | "high";
// }
export type PriorityTask = Task & { priority: Priority };
// interface PriorityTask extends Task , Priority {}

// Userオブジェクトであることを判定する
// 型ガード、引数がUserオブジェクトであればtrueを返し引数はUserオブジェクトと保証される
function isUserObject(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    typeof obj["id"] === "number" &&
    typeof obj["name"] === "string"
  );
}

// TはTask型を持つようにガード
export class TaskManager<T extends Task> {
  //Tの配列
  _tasks : T[]= [];

  // タスクを追加する
  add(task: T) {
    this._tasks.push(task);
  }

  // タスクを完了にする
  // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
  // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
  completeTask(target: User | string) {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  // 引数を省略した場合はすべてのタスクを返す
  // predicateはnot(isLowOrCompletedTask)みたいな関数
  getTasks(predicate?: (task: T) => boolean): T[] {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
// classにまとめてpriorityTaskをTに?
export function isLowOrCompletedTask(priorityTask: PriorityTask): boolean {
  return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
// fはisLowOrCompletedTaskみたいな関数
export function not(f: (arg: PriorityTask) => boolean): (arg: PriorityTask) => boolean {
  return (arg) => !f(arg);
}
