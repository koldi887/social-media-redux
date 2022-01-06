import React from "react";
import classes from "./login.module.css";
import { useForm } from "react-hook-form";
import { authSelector, ILog, login } from "../../../redux/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Navigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { ErrorMessage } from "@hookform/error-message";

export const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuth, captchaUrl } = useAppSelector(authSelector);
  const loginErrors = useAppSelector((state) => state.auth.errors?.loginErrors);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: ILog) => {
    dispatch(login(data));
  };
  if (isAuth) return <Navigate to={"/profile"} />;
  return (
    <div className={classes.formContainer}>
      <form className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
          type="password"
          label="Password"
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

        <ErrorMessage errors={errors} name="password" />
        <div className={classes.formCheckBoxBlock}>
          <FormControlLabel
            control={<Checkbox {...register("lookingForAJob")} />}
            label="Remember Me"
          />
        </div>

        {captchaUrl && (
          <div className={classes.captcha}>
            <img src={captchaUrl} alt="captcha" />
            <input type="text" {...register("captcha")} />
          </div>
        )}

        <Button type="submit" variant="contained" size="small" color="primary">
          Sign in
        </Button>
      </form>
    </div>
  );
};
