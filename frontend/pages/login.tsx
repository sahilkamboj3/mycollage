import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState, Fragment } from "react";
import FormInput from "./util/components/FormInput";
import { NODE_BACKEND_SERVER } from "../config";

const Login = () => {
  const router = useRouter();

  // state variables
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);

  const inputTypes = ["email", "password"];
  const inputLabels = ["Email", "Password"];
  const values = [email, password];
  const setValues = [setEmail, setPassword];

  const loginAccount = () => {
    setErrors([]);
    setVerifying(true);
    // fetch("http://localhost:5000/accounts/login", {
    fetch(`${NODE_BACKEND_SERVER}/accounts/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["errors"]) {
          setVerifying(false);
          let newErrors: string[] = [];
          data["errors"].map((error: { [x: string]: string }) =>
            newErrors.push(error["message"])
          );
          setErrors(newErrors);
        } else {
          setErrors([]);
          router.push(`/projects/${data["accounts"][0].uuid}`);
        }
      });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    loginAccount();
  };

  return (
    <div className="wrapper signup">
      <div className="content">
        <Box textAlign="center">
          <Typography variant="h2">Log In</Typography>
          <form
            method="POST"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
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

            <br />

            <Link href="/signup">
              <Button variant="contained" color="inherit">
                Sign Up
              </Button>
            </Link>
          </form>
          <br />
          {errors.length > 0
            ? errors.map((error) => (
                <Alert key={error} severity="error">
                  {error}
                </Alert>
              ))
            : verifying && (
                <Alert key={"Verifying"}>Verifying information...</Alert>
              )}
        </Box>
      </div>
      <div className="svg"></div>
    </div>
  );
};

export default Login;
