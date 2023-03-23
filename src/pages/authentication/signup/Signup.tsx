import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import chatHttpService from "@utils/chatHttpService";
import { SignupForm } from "@interfaces/form";

const SignpuFormSchema = yup.object().shape({
  username: yup.string().required("This field must be required."),
  password: yup.string().required("This field must be required.")
});

const resolver = yupResolver(SignpuFormSchema);

const Signup = () => {
  const { control, handleSubmit } = useForm<SignupForm>({
    resolver,
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      const response = await chatHttpService.register(values);
      chatHttpService.setLS("userid", response.data.userId);
      navigate("/home");
    } catch (error) {
      alert("Unable to register, try after some time.");
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => handleSignup(data))}>
      <FormGroup>
        <Controller
          control={control}
          name="username"
          render={({ field }) => <TextField {...field} />}
        />
      </FormGroup>

      <FormGroup>
        <Controller
          control={control}
          name="password"
          render={({ field }) => <TextField {...field} />}
        />
      </FormGroup>
      <Button variant="contained" type="submit">
        Signup
      </Button>
    </form>
  );
};

export default Signup;
