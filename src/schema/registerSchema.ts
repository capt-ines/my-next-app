import * as Yup from "yup";

export const registerSchema = Yup.object({
  username: Yup.string().required("Username is required."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters long.")
    .required("Password is required."),
});
