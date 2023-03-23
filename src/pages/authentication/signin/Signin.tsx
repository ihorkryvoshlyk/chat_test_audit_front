import React from "react";
import { Button, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LoginForm } from "@interfaces/form";
import chatHttpService from "@utils/chatHttpService";

const LoginFormSchema = yup.object().shape({
  username: yup.string().required("This field must be required."),
  password: yup.string().required("This field must be required.")
});

const resolver = yupResolver(LoginFormSchema);

const Signin = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver,
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const resp = await chatHttpService.login(values);
      chatHttpService.setLS("userid", resp.data.userId);
      navigate("/home");
    } catch (error) {
      alert("Invalid login details");
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => handleLogin(data))}>
      <FormGroup>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextField type="text" placeholder="Enter username" {...field} />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField type="text" placeholder="Enter username" {...field} />
          )}
        />
      </FormGroup>
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
};

export default Signin;
