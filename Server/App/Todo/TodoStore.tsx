import { makeAutoObservable } from "mobx";

export class TodoStore {
  entries = new Map<number, Server.Controllers.Todo.Entry>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async load() {
    // TODO: issue fetch GET
    this.entries.set(1, { id: 1, value: "First task", complete: false });
    this.entries.set(2, { id: 2, value: "Second task", complete: false });
  }

  addTask(value: string) {
    // TODO: issue fetch POST
    this.entries.set(3, { id: 3, value, complete: false });
  }

  toggleComplete(id: number) {
    // TODO: issue fetch UPDATE
    const task = this.entries.get(id);
    if (task) task.complete = !task.complete;
  }

  removeCompleted() {
    // TODO: issue fetch DELETE
    const openItems = Array.from(this.entries)
      .map(([k, e]) => e)
      .filter((e) => e.complete);
    for (const e of openItems) this.entries.delete(e.id);
  }
}
