import { useState } from "react";

import FormInput from "../util/components/FormInput";
import { Button } from "@material-ui/core";

const ImageForm = ({ collageUUID }) => {
  // state variables
  //  const [projectName, setProjectName] = useState<string>("");
  //
  //  const inputTypes = [""];
  //  const inputLabels = ["Project Name"];
  //  const values = [projectName];
  //  const setValues = [setProjectName];

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {/*
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

        <Button variant="contained" color="primary" type="submit">
          Start Collage
        </Button>
      </form>
        */}
    </div>
  );
};

export default ImageForm;
