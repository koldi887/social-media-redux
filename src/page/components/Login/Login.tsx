import React from "react";
import classes from "./Login.module.css";
import {useForm} from "react-hook-form";
import {
  authSelector,
  login,
} from "../../../redux/reducers/authReducer/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Navigate} from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import {ErrorMessage} from "@hookform/error-message";
import {ROUTE} from "../../../routes/routes";
import {ILoginData} from "../../../types/IAuth";

export const Login = () => {
  const {isAuth, captchaUrl, loginErrors} = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginData>();

  const onFormSubmit = handleSubmit((data) => {
    dispatch(login(data));
  });

  if (isAuth) return <Navigate to={ROUTE.PROFILE}/>;
  return (
      <div className={classes.formContainer}>
        <form className={classes.loginForm} onSubmit={onFormSubmit}>
          {loginErrors &&
              loginErrors.map((error, index) => (
                  <span key={index} className={classes.errorMessage}>
              {error}
            </span>
              ))}

          <TextField
              label="Email"
              variant="outlined"
              size={"small"}
              {...register("email", {
                required: true,
              })}
          />

          <TextField
              label="Password"
              type="password"
              variant="outlined"
              size={"small"}
              {...register("password", {
                required: true,
                minLength: {
                  value: 5,
                  message: "Minimum length is 5",
                },
              })}
          />

          <ErrorMessage errors={errors} name="password"/>

          <div className={classes.formCheckBoxBlock}>
            <FormControlLabel
                control={<Checkbox {...register("rememberMe")} />}
                label="Remember Me"
            />
          </div>

          {captchaUrl && (
              <div className={classes.captcha}>
                <img src={captchaUrl} alt="captcha"/>
                <input type="text" {...register("captcha")} />
              </div>
          )}

          <Button type="submit" variant="contained" size="small"
                  color="primary">
            Sign in
          </Button>
        </form>
      </div>
  );
};
