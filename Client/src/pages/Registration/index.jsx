import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignUp } from "../../redux/slice/authSlice";
import { Navigate } from "react-router-dom";
export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Huanil",
      email: "abobsud@gamil.com",
      password: "yhjikmkoijhyh",
    },
    mode: "onChange",
  });

  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //If state got user data it`s will navigate him to home-page
  if (data) {
    return <Navigate to={"/"} />;
  }

  const Submit = async (data) => {
    //declarate user data to varible
    const user = await dispatch(fetchSignUp(data));
    //if user data does`t exist return alert
    if (!user.payload) {
      alert("failure to login");
    }
    // check if record 'tokek' exist save it to localStorage
    if ("token" in user.payload) {
      localStorage.setItem("auth-token", user.payload.token);
    }
    // dispatch(fetchSignIn(data)).then((res) => {
    //   if (!res.payload) {
    //     alert("failure to login");
    //   }
    //   if ("token" in res.payload) {
    //     localStorage.setItem("auth-token", res.payload.token);
    //   }
    // });
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(Submit)}>
        <TextField
          className={styles.field}
          {...register("fullName", { required: "Full Name is required" })}
          error={errors.fullName?.message}
          helperText={errors.fullName?.message}
          label="Full Name"
          fullWidth
        />
        <TextField
          className={styles.field}
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
          helperText={errors.email?.message}
          label="E-Mail"
          fullWidth
        />
        <TextField
          className={styles.field}
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password should be longer the 6 characters",
            },
          })}
          error={errors.password?.message}
          helperText={errors.password?.message}
          label="password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Registration
        </Button>
      </form>
    </Paper>
  );
};
