export function loginProps(props: {
  setFormDone: boolean;
  email: string;
  password: string;
}) {
  return (
    <div>
      <h1>
        {props.email}.{props.password}{props.setFormDone?"OK":"OR NOT"}
      </h1>
    </div>
  );
}
