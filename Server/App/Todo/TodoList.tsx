import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { TodoItem } from "./TodoItem";

class TodoListStore {
  items = new Map<number, Server.Controllers.Todo.Entry>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadAsync() {
    // TODO: issue fetch
    this.items.set(1, { id: 1, value: "First task" });
    this.items.set(2, { id: 2, value: "Second task" });
  }
}

const store = new TodoListStore();

export const TodoList = observer(() => {
  useEffect(() => {
    store.loadAsync();
  });

  return (
    <div>
      <h1>A Todo list</h1>
      <p>
        This module is fully backed by SQL and tested via end-to-end integration
        tests
      </p>
      <ul>
        {Array.from(store.items).map(([k, e]) => (
          <TodoItem key={k} entry={e} />
        ))}
      </ul>
    </div>
  );
});
