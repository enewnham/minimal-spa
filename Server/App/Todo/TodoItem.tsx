import { observer } from "mobx-react-lite";
import React, { FC } from "react";

export const TodoItem: FC<{ entry: Server.Controllers.Todo.Entry }> = observer(
  ({ entry }) => <li>{entry.value}</li>
);
