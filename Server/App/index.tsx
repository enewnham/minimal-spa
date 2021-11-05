import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Home } from "./Home";

const appElement = document.getElementById("app");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  appElement
);