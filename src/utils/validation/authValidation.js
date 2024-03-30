import * as Yup from "yup";

export const loginValidation = Yup.object({
  password: Yup.string()
    .required("password is required")
    .min(5, "Too short password"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const registerValidation = Yup.object({
  password: Yup.string()
    .required("password is required")
    .min(5, "Too short password "),
  name: Yup.string().required("name is required").min(3, "Too short name "),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const resetCodeValidation = Yup.object({
  resetCode: Yup.string()
    .required("password is required")
    .test("len", "Must be exactly 5 characters", (val) => val.length === 6),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const resetPasswordValidation = Yup.object({
  password: Yup.string()
    .required("password is required")
    .min(5, "Too short password "),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});