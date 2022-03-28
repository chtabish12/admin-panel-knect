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
import { AdminPanelService } from "../../Service/AdminPanelService";
import {
  USERNAME_VALID,
  USERPASSWORD_VALID,
  LOGIN_VALIDATION,
  FOOTER_NAME,
  FOOTER_RIGHTS,
} from "../../helper/Helper";
import { useForm } from "react-hook-form";
// styles
import useStyles from "./styles";
// logo
import logo from "./logo.svg";
// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { toast } from "react-toastify";

const Login = (props) => {
  const validationSchema = Yup.object().shape({
    loginValue: Yup.string().required(USERNAME_VALID),
    passwordValue: Yup.string().required(USERPASSWORD_VALID),
  });

  const classes = useStyles();
  // global
  const userDispatch = useUserDispatch();
  // local
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabId, setActiveTabId] = useState(0);

  const formOptions = {
    defaultValues: validationSchema.cast(),
    resolver: yupResolver(validationSchema),
  };
  const { handleSubmit, register, formState } = useForm(formOptions);
  const { errors } = formState;
  // login and password schema validation

  const formSubmit = (data) => {
    const request = {
      email: data.loginValue,
      password: data.passwordValue,
    };
    AdminPanelService.Login(request)
      .then((resp) => {
        if (resp.status !== 200) {
          return toast(LOGIN_VALIDATION);
        }
        // console.log(JSON.parse(resp.data.user.permission))
        sessionStorage.setItem("token-user", resp.data.token);
        localStorage.setItem("api-data", JSON.stringify(resp.data.regions));
        sessionStorage.setItem("user-name", resp.data.user.name);
        sessionStorage.setItem("user-id", resp.data.user.id);
        loginUser(userDispatch, props.history, setIsLoading, resp.status);
      })
      .catch(() => toast(LOGIN_VALIDATION));
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
              <form
                onSubmit={handleSubmit(formSubmit)}
                className={classes.formControlField}
              >
                <div className={classes.inputFieldSpace}>
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
                </div>
                <div>
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
            {FOOTER_NAME}
          </a>
          {FOOTER_RIGHTS}
        </Typography>
      </div>
    </Grid>
  );
};

export default withRouter(Login);
