import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { configure } from "mobx";
import { Layout } from "./Components/Layout";
import { Home } from "./Home/Home";
import { TodoList } from "./Todo/TodoList";

configure({ enforceActions: "never" });

const appElement = document.getElementById("app");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="todo" element={<TodoList />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  appElement
);
