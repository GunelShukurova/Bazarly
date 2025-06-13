import * as Yup from "yup";

const contactValidationSchema = Yup.object().shape({
  fullName: Yup.string().min(3).max(20).required(),
  email: Yup.string().email().required(),
    subject: Yup.string().min(4).max(20).required(),
      message: Yup.string().min(4).max(50).required(),
});

export default contactValidationSchema;
