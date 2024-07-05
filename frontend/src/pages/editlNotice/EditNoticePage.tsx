import {
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import styles from "./EditNoticePage.module.css";
import { createGlobalStyle } from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";
import { request } from "http";

const GlobalStyles = createGlobalStyle`
  /* Add your global styles here */
`;
interface NoticeChoice {
  option: String
  content: String
  price: number
  defaultChecked: boolean
}
interface FormData {
  class_name: string;
  content: string;
  grade: string;
  notice_choice: NoticeChoice[];
  topic: string;
}

export default function EditNoticePage() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      class_name: "B",
      content: "i go to school by bus 123",
      grade: "2",
      notice_choice : [{
        option : "A",
        content: "content",
        price: 0,
        defaultChecked: true
      }],
      topic: "topic123"
    },
    reValidateMode: "onChange",
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "notice_choice", // unique name for your Field Array
  });

  function generateAtoZ(prevValue: String) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const prevIndex = alphabet.indexOf(prevValue.toUpperCase());
    
    if (prevIndex === -1) {
      return 'A';
    } else {
      const nextIndex = (prevIndex + 1) % alphabet.length;
      return alphabet[nextIndex];
    }
  }

  const handleAddFormControl = () => {
    let value = "A";
    if (fields.length) {
      value = generateAtoZ(fields[fields.length - 1].option)
    }
     
    const choice: NoticeChoice = {
      option: value,
      content: '',
      price: 0,
      defaultChecked: true
    }
    append(choice)
  };

  const handleRemoveFormControl = () => {
    if (fields.length > 0) {
      remove(fields.length - 1)
    }
 
  };

  const handleSwitchChange = (index: number, checked: boolean) => {
    const data = getValues()
    setValue(`notice_choice.${index}.defaultChecked`, checked); 
  };

  async function handleSubmita(data: FormData) {
      console.log(data);
    try {
      await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createNotice`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.error("Error edit:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit((d: FormData) => handleSubmita(d))}>
      <div id={styles.titleAndTextArea}>
        <label id={styles.title}>
          <input
            type="text"          
            placeholder="topic"
            {...register("topic")}
          />
        </label>
        <label id={styles.textArea}>
          <textarea           
            placeholder="content"
            {...register("content")}
          />
        </label>
      </div>

      <div>
        {fields.map((control, index) => (
         <FormGroup key={control.id}>
            <FormControlLabel
              control={
                <Switch
                {...register(`notice_choice.${index}.defaultChecked`)}
                  defaultChecked={control.defaultChecked}
                  onChange={(_, checked) => handleSwitchChange(index, checked)}
                />
              }
              label={control.content}
            />

            {control.defaultChecked && (
              <TextField
                label={`choice ${control.content}`}
                variant="outlined"
                size="small"
                style={{ marginTop: "8px" }}
                {...register(`notice_choice.${index}.content`)}
                type="text"
                placeholder="notice_choice"
                required
              />
            )}
          </FormGroup>
          
        ))}
        <div>
          <Button onClick={handleAddFormControl}>Add</Button>
          <Button onClick={handleRemoveFormControl}>Reduce</Button>
        </div>
        <div>
          <input
            type="text"
            {...register("grade")}
            placeholder="grade"
            required
          />
          <p />
          <input
            type="text"
            {...register("class_name")}
            placeholder="class_name"
            required
          />
          <p />
        </div>
      </div>
      <button type="reset">Reset edits</button>
      <button type="submit">Save post</button>
    </form>
  );
}