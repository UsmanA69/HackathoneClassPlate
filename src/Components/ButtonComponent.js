import Button from "@mui/material/Button";

const ButtonComponent = (props) => {
  return (
    <Button variant={props.variant} type="submit" onClick={props.onClick} color={props.color}>
      {props.value}
    </Button>
  );
};

export default ButtonComponent;
