import { makeAutoObservable } from "mobx";

export class TodoStore {
  entries = new Map<number, Server.Controllers.Todo.Entry>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async load() {
    const response = await fetch("/api/todos");
    const entries: Server.Controllers.Todo.Entry[] = await response.json();

    for (const e of entries) this.entries.set(e.id, e);
  }

  async addTask(value: string) {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
    const entry: Server.Controllers.Todo.Entry = await response.json();

    this.entries.set(entry.id, entry);
  }

  async toggleComplete(id: number) {
    const response = await fetch(`/api/todos/${id}/complete`, {
      method: "PUT",
    });
    const entry: Server.Controllers.Todo.Entry = await response.json();

    this.entries.set(entry.id, entry);
  }

  async removeCompleted() {
    const response = await fetch("/api/todos", { method: "DELETE" });
    const entries: Server.Controllers.Todo.Entry[] = await response.json();
    for (const e of entries) this.entries.set(e.id, e);

    const complete = Array.from(this.entries)
      .map(([k, e]) => e)
      .filter((e) => e.complete);
    for (const e of complete) this.entries.delete(e.id);
  }
}
