import React, { FC } from "react";
import { Outlet } from "react-router";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

export const Layout: FC = () => (
  <div>
    <NavMenu />
    <Container>
      <Outlet />
    </Container>
  </div>
);
