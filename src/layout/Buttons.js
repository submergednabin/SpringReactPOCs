import { Button } from "react-bootstrap";

const Buttons = (props) => {
  return (
    <>
      <Button size={props.size} type={props.action} variant={props.color} className={props.class}>
        {props.children}
      </Button>
    </>
  );
};

export default Buttons;
