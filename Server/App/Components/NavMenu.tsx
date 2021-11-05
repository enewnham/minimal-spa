import React, { FC } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

class NavMenuState {
  collapsed = true;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleNavbar() {
    this.collapsed = !this.collapsed;
  }
}

const state = new NavMenuState();

export const NavMenu: FC = observer(() => (
  <header>
    <Navbar
      className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
      light
    >
      <Container>
        <NavbarBrand tag={Link} to="/">
          todo {state.collapsed}
        </NavbarBrand>
        <NavbarToggler onClick={state.toggleNavbar} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!state.collapsed}
          navbar
        >
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">
                Home
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Container>
    </Navbar>
  </header>
));
