import React from "react";
import { Grid, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "@component/Button";
import { LoginForm } from "@interfaces/form";
import chatHttpService from "@utils/chatHttpService";

const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("This field must be required.")
    .email("Invalid Email address"),
  password: yup.string().required("This field must be required.")
});

const resolver = yupResolver(LoginFormSchema);

const Signin = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver,
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const resp = await chatHttpService.login(values);
      chatHttpService.setLS("userid", resp.data.userId);
      navigate("/");
    } catch (error) {
      alert("Invalid login details");
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
                <TextField type="text" placeholder="Input email" {...field} />
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
