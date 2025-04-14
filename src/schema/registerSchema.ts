import * as Yup from "yup";

export const registerSchema = Yup.object({
  // username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});
