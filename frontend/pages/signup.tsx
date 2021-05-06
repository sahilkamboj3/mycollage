import Link from "next/link";
import { Box, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import FormInput from "./util/components/FormInput";

const SignUp = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputTypes = ["text", "text", "text", "email", "password"];
  const inputLabels = [
    "First name",
    "Last name",
    "Username",
    "Email",
    "Password",
  ];
  const values = [firstName, lastName, username, email, password];
  const setValues = [
    setFirstName,
    setLastName,
    setUsername,
    setEmail,
    setPassword,
  ];

  const signUpAccount = () => {
    setErrors(["Verifying information..."]);
    fetch("http://localhost:5000/accounts/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["errors"]) {
          let newErrors: string[] = [];
          data["errors"].map((error) => newErrors.push(error["message"]));
          setErrors(newErrors);
        } else {
          setErrors([]);
        }
      });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUpAccount();
  };

  return (
    <Box>
      <Typography variant="h2">Sign Up</Typography>
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
          Sign Up
        </Button>
        {errors.map((error) => (
          <Alert key={error} severity="error">
            {error}
          </Alert>
        ))}
      </form>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </Box>
  );
};

export default SignUp;
