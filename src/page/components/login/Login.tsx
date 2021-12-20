import React from "react";
import classes from "./login.module.css";
import { useForm } from "react-hook-form";
import { authSelector, ILog, login } from "../../../redux/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(authSelector);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: ILog) => {
    dispatch(login(data));
    if (!data.rememberMe) reset();
  };

  if (isAuth) return <Navigate to={"/profile"} />;
  return (
    <div className={classes.formContainer}>
      <form className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          className={classes.formEmail}
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          type="email"
        />
        {errors.email && (
          <span className={classes.formErrors} role="alert">
            {errors.email.message}
          </span>
        )}
        <label htmlFor="password">Password</label>
        <input
          className={classes.formPassword}
          {...register("password", {
            required: true,
            minLength: {
              value: 5,
              message: "Minimum length is 5",
            },
          })}
          type="password"
        />
        {errors.password && (
          <span className={classes.formErrors} role="alert">
            {errors.password.message}
          </span>
        )}
        <div className={classes.formCheckBoxBlock}>
          <input
            type="checkbox"
            {...register("rememberMe")}
            // value={true}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};
