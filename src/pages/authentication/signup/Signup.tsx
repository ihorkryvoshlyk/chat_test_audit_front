import React from "react";
import { Grid, FormGroup, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "@component/Button";
import chatHttpService from "@utils/chatHttpService";
import { SignupForm } from "@interfaces/form";

const SignpuFormSchema = yup.object().shape({
  firstName: yup.string().required("This field must be required."),
  lastName: yup.string().required("This field must be required."),
  email: yup
    .string()
    .required("This field must be required.")
    .email("Invalid Email address"),
  password: yup.string().required("This field must be required.")
});

const resolver = yupResolver(SignpuFormSchema);

const Signup = () => {
  const { control, handleSubmit } = useForm<SignupForm>({
    resolver,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });

  const handleSignup = async (values) => {
    try {
      const response = await chatHttpService.register(values);
      chatHttpService.setLS("userid", response.data.userId);
    } catch (error) {
      alert("Unable to register, try after some time.");
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => handleSignup(data))}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField placeholder="Input your first name." {...field} />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField placeholder="Input your last name." {...field} />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField placeholder="Input email address." {...field} />
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
                  placeholder="Input password."
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" gradient rounded fullWidth>
            Signup
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signup;
