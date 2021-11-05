import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Input } from "reactstrap";
import "./TodoItem.css";
import { TodoStore } from "./TodoStore";

export const TodoItem: FC<{
  entry: Server.Controllers.Todo.Entry;
  store: TodoStore;
}> = observer(({ entry, store }) => (
  <li className={entry.complete ? "strike" : ""}>
    <Input
      className="me-2"
      type="checkbox"
      checked={entry.complete}
      onChange={(e) => store.toggleComplete(entry.id)}
      placeholder="Enter task..."
    />
    {entry.value}
  </li>
));
