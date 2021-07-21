import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import React, { Fragment } from "react";

import FormInputInterface from "../../interfaces";

const FormInput: React.FC<FormInputInterface> = ({
  id,
  value,
  setValue,
  inputLabel = "",
  helperText = "",
  isRequired = false,
  inputType = "text",
}) => {
  const handleValueChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  return (
    <Fragment>
      <FormControl id="formcontrol">
        <InputLabel htmlFor="input" aria-describedby="helper-text">
          {inputLabel}
        </InputLabel>
        <Input
          id={id}
          required={isRequired}
          type={inputType}
          value={value}
          onChange={handleValueChange}
          fullWidth={true}
        />
        <FormHelperText id="helper-text">{helperText}</FormHelperText>
      </FormControl>
      <br />
    </Fragment>
  );
};

export default FormInput;
