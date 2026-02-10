import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string().min(3).max(20).required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  password: Yup.string()
   
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
  profileImage: Yup.string().url().optional(),
  balance: Yup.number().min(0).max(10000).required(),
});

export default registerValidationSchema;
