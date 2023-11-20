import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignIn } from "../../redux/slice/authSlice";
import { Navigate } from "react-router-dom";
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "sex@gamil.com",
      password: "2231231123",
    },
    mode: "onChange",
  });

  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // if data in store navigatre to home page
  if (data) {
    return <Navigate to={"/"} />;
  }

  const Submit = async (data) => {
    //declarate user data to varible
    const user = await dispatch(fetchSignIn(data));
    //if user data does`t exist return alert
    if (!user.payload) {
      alert("failure to login");
    }
    // check if record 'tokek' exist save it to localStorage
    if ("token" in user.payload) {
      localStorage.setItem("auth-token", user.payload.token);
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Account Login
      </Typography>
      <form onSubmit={handleSubmit(Submit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password should be longer the 6 characters",
            },
          })}
          error={errors.password?.message}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Sign In
        </Button>
      </form>
    </Paper>
  );
};
