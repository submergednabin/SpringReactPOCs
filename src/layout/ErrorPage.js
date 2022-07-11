import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cards from "./Card";

export const ErrorPage = (props) => {
  return (
    <>
      <Cards variant="danger">
        <Card.Title>{props.errorTitle}</Card.Title>
        <Card.Text>
          <NavLink to={props.reRouteLink} >{props.routingTitle}</NavLink>
        </Card.Text>
      </Cards>
    </>
  );
};
