import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useParams } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = (props) => {
  const { userId } = useParams();

  // const checkActive = (isActive) => {
  //   return isActive ? styles["active"] : "";
  // };
  // console.log("Navignation User", props.userData);
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link className={styles.headers} to="/">
              BOC
            </Link>
          </Navbar.Brand>
          <Nav.Link>
            <NavLink
              to={"/user/" + userId + "/newAccount"}
              className={({ isActive }) =>
                isActive === true ? styles["active"] : styles["inactive"]
              }
            >
              Open a Account
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              to={"/user/" + userId + "/dashboard"}
              className={({ isActive }) =>
                isActive ? styles["active"] : styles["inactive"]
              }
            >
              Dashboard
            </NavLink>
          </Nav.Link>
          <Navbar.Collapse
            className={`justify-content-end ${styles["dropdown-menu"]}`}
          >
            <NavDropdown
              title= {(props.userData.firstName !==null?props.userData.firstName:" ")  +
              " " +
              (props.userData.middleName !==null? props.userData.middleName:" ")  +
              " " +
              (props.userData.lastName !==null?props.userData.lastName:" ")}
              className={({ isActive }) =>
                isActive ? styles["active"] : styles["inactive"]
              }
            >
              <NavDropdown.Item>
                <NavLink
                  to={`/user/${userId}/profile`}
                  className={({ isActive }) =>
                    isActive
                      ? styles["active-dropdown"]
                      : styles["inactive-dropdown"]
                  }
                >
                  Settings
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? styles["active-dropdown"]
                      : styles["inactive-dropdown"]
                  }
                >
                 Signout
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
