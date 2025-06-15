import * as Yup from "yup";

const updatePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required"),

  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .required("New password is required"),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default updatePasswordValidationSchema;
