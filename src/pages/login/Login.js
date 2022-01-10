import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// Yup package for email and password validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
// styles
import useStyles from "./styles";
// logo
import logo from "./logo.svg";
// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Constants";

const Login = (props) => {
  const validationSchema = Yup.object().shape({
    loginValue: Yup.string().required(
      "Email is required (Example: me@example.com.au)",
    ),
    passwordValue: Yup.string().required("Please enter your password"),
    // .matches(
    //         /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //         "Password must contain at least 8 characters, one uppercase, one number and one special case character",
    //       )
    // .when("firstName", {
    //   // is: (val) => !id,
    //   then: Yup.string()
    //     .required("Please enter your password")
    //     .matches(
    //       /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //       "Password must contain at least 8 characters, one uppercase, one number and one special case character",
    //     )
    // }),
  });

  const classes = useStyles();
  // global
  const userDispatch = useUserDispatch();
  // local
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabId, setActiveTabId] = useState(0);
  // const [messageApi, setMessageApi] = useState("");

  const formOptions = {
    defaultValues: validationSchema.cast(),
    resolver: yupResolver(validationSchema),
  };
  const { handleSubmit, register, formState } = useForm(formOptions);
  const { errors } = formState;
  // login and password schema validation

  const formSubmit = async (data) => {
    const request = {
      email: data.loginValue,
      password: data.passwordValue,
    };
    const response = await fetch(
      `${BASE_URL}user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(request),
      },
      );
      let resp = await response.json();
    
//  console.log(response)
    // setMessageApi(response.status);
    if(response.status!==200){
      return(
        toast("Please Check your User Name or Password and then retry!!")
      )
    }
    sessionStorage.setItem("token-user", resp.token);
    localStorage.setItem("api-data", JSON.stringify(resp.products));
    // setIsLoading(true);
    loginUser(userDispatch, props.history, setIsLoading, response.status);
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Knect</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <form onSubmit={handleSubmit(formSubmit)} className={classes.formControlField}>
                <input
                  placeholder="Enter Email"
                  {...register("loginValue")}
                  className={`form-control ${
                    errors.loginValue ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.loginValue?.message}
                </div>
                <input
                  placeholder="Enter Password"
                  {...register("passwordValue")}
                  type="password"
                  className={`form-control ${
                    errors.passwordValue ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.passwordValue?.message}
                </div>
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      type="submit"
                      // onClick={() =>
                      //   loginUser(
                      //     userDispatch,
                      //     props.history,
                      //     setIsLoading,
                      //     messageApi,
                      //   )
                      // }
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </form>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2010-{new Date().getFullYear()}{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://khaleef.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Khaleef Technologies
          </a>
          , LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
};

export default withRouter(Login);
