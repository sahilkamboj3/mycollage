//import { BrowserRouter as Router } from "react-router-dom";
//import Route from "react-router-dom/Route";
//import { useHistory } from "react-router-dom";
import Link from "next/link";
import { Box, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import FormInput from "./util/components/FormInput";

const Login = () => {
  // url history
  //  const history = useHistory();
  //
  // state variables
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputTypes = ["email", "password"];
  const inputLabels = ["Email", "Password"];
  const values = [email, password];
  const setValues = [setEmail, setPassword];

  const loginAccount = () => {
    setErrors(["Verifying information..."]);
    fetch("http://localhost:5000/accounts/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data["errors"]) {
          let newErrors: string[] = [];
          data["errors"].map((error: { [x: string]: string }) =>
            newErrors.push(error["message"])
          );
          setErrors(newErrors);
        } else {
          setErrors([]);
        }
      });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    loginAccount();
  };

  return (
    <Box>
      <Typography variant="h2">Log In</Typography>
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
          Log In
        </Button>
        {errors.map((error) => (
          <Alert key={error} severity="error">
            {error}
          </Alert>
        ))}
      </form>
      <Link href="/signup">
        <a>Create Account</a>
      </Link>
    </Box>
  );
};

export default Login;
