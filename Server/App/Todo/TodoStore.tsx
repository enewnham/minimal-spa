import { makeAutoObservable } from "mobx";

export class TodoStore {
  items = new Map<number, Server.Controllers.Todo.Entry>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async load() {
    // TODO: issue fetch GET
    this.items.set(1, { id: 1, value: "First task", complete: false });
    this.items.set(2, { id: 2, value: "Second task", complete: false });
  }

  addTask(value: string) {
    // TODO: issue fetch POST
    this.items.set(3, { id: 3, value, complete: false });
  }

  toggleComplete(id: number) {
    // TODO: issue fetch UPDATE
    const task = this.items.get(id);
    if (task) task.complete = !task.complete;
  }

  removeCompleted() {
    // TODO: issue fetch DELETE
    const openItems = Array.from(this.items)
      .map(([k, e]) => e)
      .filter((e) => e.complete);
    for (const i of openItems) this.items.delete(i.id);
  }
}
