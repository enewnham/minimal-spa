import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { TodoEntry } from "./TodoEntry";
import { TodoStore } from "./TodoStore";

const store = new TodoStore();

export const TodoList = observer(() => {
  useEffect(() => {
    store.load();
  }, []);
  const [userInput, setUserInput] = useState("");

  function onInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(event.currentTarget.value);
  }

  async function onAdd() {
    await store.addTask(userInput);
    setUserInput("");
  }

  return (
    <div>
      <h1>A Todo list</h1>
      <p>
        This module is fully backed by SQL and tested via end-to-end integration
        tests
      </p>
      <InputGroup>
        <Input
          type="text"
          value={userInput}
          onChange={onInput}
          placeholder="Enter Item..."
        />
        <Button color="success" onClick={onAdd}>
          Add
        </Button>
      </InputGroup>
      <ul>
        {Array.from(store.entries).map(([k, e]) => (
          <TodoEntry key={k} entry={e} store={store} />
        ))}
      </ul>
      <Button color="danger" onClick={store.removeCompleted}>
        Remove Completed Tasks
      </Button>
    </div>
  );
});
