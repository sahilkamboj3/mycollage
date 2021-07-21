import { useState } from "react";
import { authorizeUser, sleep } from "../util/logic";

import { useRouter } from "next/router";
import FormInput from "../util/components/FormInput";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const ProjectForm = ({ userUUID }) => {
  const router = useRouter();

  // state variables
  const [creating, setCreating] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [projectName, setProjectName] = useState<string>("");

  const inputTypes = [""];
  const inputLabels = ["Project Name"];
  const values = [projectName];
  const setValues = [setProjectName];
  const isFormValid = projectName.length > 0;

  // submit form
  const submitCollage = async () => {
    await fetch("http://localhost:8080/collage/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountUUID: userUUID, projectName }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`http://localhost:3000/collages/${data["projectUUID"]}`);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authorizeRes = await authorizeUser();
    setIsAuthorized(authorizeRes);
    setCreating(false);

    if (!authorizeRes) {
      await sleep(2500); // sleep 2.5 seconds
      router.push("/login");
    } else {
      setCreating(true);
      await submitCollage();
    }
  };

  return (
    <div>
      <h1>Collage Form</h1>
      <form method="POST" onSubmit={handleSubmit}>
        {inputTypes.map((inputType, i) => (
          <FormInput
            key={inputLabels[i]}
            id={`${inputLabels[i].toLowerCase()}-input`}
            inputLabel={inputLabels[i]}
            inputType={inputType}
            isRequired={true}
            value={values[i]}
            setValue={setValues[i]}
          />
        ))}

        <Button
          disabled={!isFormValid}
          variant="contained"
          color="primary"
          type="submit"
        >
          Start Collage
        </Button>
        {creating && <Alert>Creating collage...</Alert>}
        {!isAuthorized && (
          <Alert severity="error">
            You are logged out. We are taking you back to the login page.
          </Alert>
        )}
      </form>
    </div>
  );
};

export default ProjectForm;
