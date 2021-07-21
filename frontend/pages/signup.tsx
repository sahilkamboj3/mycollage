import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState, Fragment } from "react";
import FormInput from "./util/components/FormInput";

// import "../styles/Account.css";

const SignUp = () => {
  const router = useRouter();

  // state variables
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);

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
    setVerifying(true);
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
          setVerifying(false);
          let newErrors: string[] = [];
          data["errors"].map((error) => newErrors.push(error["message"]));
          setErrors(newErrors);
        } else {
          setErrors([]);
          router.push(`/projects/${data["accounts"][0].uuid}`);
        }
      });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUpAccount();
  };

  return (
    <div className="wrapper login">
      <div className="content">
        <Box>
          <Typography variant="h2">Sign Up</Typography>
          <form method="POST" onSubmit={handleSubmit}>
            {inputTypes.map((inputType, i) => (
              <Fragment>
                <FormInput
                  key={inputLabels[i]}
                  id={`${inputLabels[i].toLowerCase()}-input`}
                  inputLabel={inputLabels[i]}
                  inputType={inputType}
                  isRequired={true}
                  value={values[i]}
                  setValue={setValues[i]}
                />
                <br />
              </Fragment>
            ))}
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
            {errors.length > 0
              ? errors.map((error) => (
                  <Alert key={error} severity="error">
                    {error}
                  </Alert>
                ))
              : verifying && (
                  <Alert key={"Verifying"}>Verifying information...</Alert>
                )}
          </form>

          <Link href="/login">
            <a>Login</a>
          </Link>
        </Box>
      </div>
      <div className="svg"></div>
    </div>
  );
};

export default SignUp;
