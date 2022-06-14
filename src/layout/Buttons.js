import { Button } from "react-bootstrap";

const Buttons = (props) => {
  return (
    <>
      <Button size="lg" type={props.action} variant="primary" className="mx-4">
        {props.children}
      </Button>
    </>
  );
};

export default Buttons;
