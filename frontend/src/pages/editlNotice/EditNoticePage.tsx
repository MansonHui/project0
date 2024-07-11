import { FormGroup, TextField, Button, Box } from "@mui/material";
import styles from "./EditNoticePage.module.css";
import { useForm, useFieldArray } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface NoticeChoice {
  option: string;
  content: string;
  price: number;
  defaultChecked: boolean;
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
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      topic: "",
      class_name: "A",
      content: "good day",
      grade: "1",
      notice_choice: [
        {
          option: "A",
          content: "123",
          price: 0,
          defaultChecked: true,
        },
      ],
      // topic: "Hello",
    },
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "notice_choice",
  });

  function generateAtoZ(prevValue: string): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const prevIndex = alphabet.indexOf(prevValue.toUpperCase());

    if (prevIndex === -1) {
      return "A";
    } else {
      const nextIndex = (prevIndex + 1) % alphabet.length;
      return alphabet[nextIndex];
    }
  }

  const handleAddFormControl = () => {
    // Check if the maximum number of choices (5) has been reached
    if (fields.length >= 5) {
      alert("The maximum number of choices is 5.");
      return;
    }

    let value = "A";
    if (fields.length > 0) {
      value = generateAtoZ(fields[fields.length - 1].option);
    }

    const choice: NoticeChoice = {
      option: value,
      content: "",
      price: 0,
      defaultChecked: true,
    };
    append(choice);
  };

  const handleRemoveFormControl = () => {
    if (fields.length > 1) {
      try {
        remove(fields.length - 1);
      } catch (error) {
        console.error("Error removing form control:", error);
        alert("Unable to remove the last form control. Please try again.");
      }
    } else {
      alert("You must have at least one form control.");
    }
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
        <label id={styles.titleArea}>
          <Box
            sx={{ display: "flex", alignItems: "flex-end" }}
            {...register("topic")}
          >
            <textarea id={styles.titleInput} {...register("topic")} required />
          </Box>
        </label>
        <label id={styles.textArea}>
          <textarea
            placeholder="Notice content"
            {...register("content")}
            required
          />
        </label>
      </div>

      <div>
        <div id={styles.choiceArea}>
          {fields.map((control, index) => (
            <FormGroup key={control.id}>
              {control.defaultChecked && (
                <TextField
                  label={`choice ${control.option}`}
                  variant="outlined"
                  size="small"
                  style={{ width: "80vw", height: "6vh" }}
                  id={styles.choiceInput}
                  {...register(`notice_choice.${index}.content`)}
                  type="text"
                  placeholder="notice_choice"
                  required
                />
              )}
            </FormGroup>
          ))}
        </div>
        <div id={styles.addAndReduceAndGradeAndClassNameAndSendAndReset}>
          <div id={styles.addAndReduceArea}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddFormControl}
            >
              Add
            </Button>
            <Button
              color="error"
              variant="contained"
              startIcon={<RemoveIcon />}
              onClick={handleRemoveFormControl}
            >
              Reduce
            </Button>
          </div>
          <div id={styles.gradeAndClassNameAndSendAndResetArea}>
            <input
              id={styles.gradeInput}
              type="number"
              {...register("grade")}
              placeholder="grade"
              required
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (
                  event.currentTarget.value.length > 0 &&
                  event.key !== "Backspace" &&
                  event.key !== "Delete"
                ) {
                  event.preventDefault();
                  alert("Please enter only one number.");
                }
              }}
            />
            <p />
            <input
              id={styles.classNameInput}
              type="text"
              {...register("class_name")}
              placeholder="class"
              required
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (
                  event.currentTarget.value.length > 0 &&
                  event.key !== "Backspace" &&
                  event.key !== "Delete"
                ) {
                  event.preventDefault();
                  alert("Please enter only one English.");
                }
              }}
            />

            <Button
              id={styles.sendButton}
              variant="outlined"
              color="success"
              endIcon={<SendIcon />}
              type="submit"
            >
              SEND
            </Button>
            <Button
              id={styles.resetButton}
              color="error"
              variant="outlined"
              endIcon={<RestartAltIcon />}
              type="reset"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
