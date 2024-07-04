import {
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function EditNoticePage() {
  const [formControls, setFormControls] = useState<
    { label: string; defaultChecked: boolean; showInput: boolean }[]
  >([{ label: "A", defaultChecked: false, showInput: false }]);

  const handleAddFormControl = () => {
    const newLabel = String.fromCharCode(65 + formControls.length);
    setFormControls([
      ...formControls,
      { label: newLabel, defaultChecked: false, showInput: false },
    ]);
  };

  const handleRemoveFormControl = () => {
    if (formControls.length > 1) {
      setFormControls(formControls.slice(0, -1));
    }
  };

  const handleSwitchChange = (index: number, checked: boolean) => {
    setFormControls(
      formControls.map((control, i) =>
        i === index ? { ...control, showInput: checked } : control
      )
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    try {
      await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createAdmin`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(EditNoticePage),
        }
      );
    } catch (error) {
      console.error("Error edit:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Post title: <input defaultValue="title" />
      </label>
      <label>
        Edit your post:
        <textarea name="postContent" defaultValue="" rows={4} cols={40} />
      </label>
      <hr />
      <div>
        {formControls.map((control, index) => (
          <FormGroup key={index}>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={control.defaultChecked}
                  onChange={(_, checked) => handleSwitchChange(index, checked)}
                />
              }
              label={control.label}
            />
            {control.showInput && (
              <TextField
                label={`Input ${control.label}`}
                variant="outlined"
                size="small"
                style={{ marginTop: "8px" }}
                name={`input${control.label}`}
              />
            )}
          </FormGroup>
        ))}
        <div>
          <Button onClick={handleAddFormControl}>Add</Button>
          <Button onClick={handleRemoveFormControl}>Reduce</Button>
        </div>
        <label>
          grade: <input defaultValue="grade" />
        </label>
        <p />
        <label>
          class: <input defaultValue="class" />
        </label>
      </div>
      <button type="reset">Reset edits</button>
      <button type="submit">Save post</button>
    </form>
  );
}
