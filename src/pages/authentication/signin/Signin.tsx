import React from "react";
import { Grid, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError } from "axios";

import Button from "@component/Button";
import { LoginForm } from "@interfaces/form";
import chatHttpService from "@utils/chatHttpService";
import useGlobalSnackbar from "@hooks/useGlobalSnackbar";

const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("This field must be required.")
    .email("Invalid Email address"),
  password: yup.string().required("This field must be required.")
});

const resolver = yupResolver(LoginFormSchema);

const Signin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver,
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const navigate = useNavigate();
  const { openSnackbar } = useGlobalSnackbar();

  const handleLogin = async (values) => {
    try {
      const resp = await chatHttpService.login(values);
      chatHttpService.setLS("userid", resp.data.userId);
      navigate("/");
    } catch (error) {
      const { response } = error as AxiosError;
      openSnackbar({
        color: "error",
        gradient: true,
        rounded: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        message:
          Object.values(response?.data || {})[0] ||
          "Signin request is failre, Please try again later.",
        autoHideDuration: 3000
      });
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => handleLogin(data))}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="Input email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  type="password"
                  placeholder="Input password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button
            gradient
            variant="contained"
            type="submit"
            rounded
            size="large"
            fullWidth
          >
            Signin
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signin;
