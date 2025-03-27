import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const SignupForm = () => {
  const { login_user } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be at most 50 characters.......also.....really?.......50 characters wasnt enough?")
        .required("Username is required"),
      password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const userData = await response.json();
          login_user(userData);
          navigate("/");
        } else {
          alert("Signup failed. Try a different username.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" mb={2}>
          Sign Up
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignupForm;
