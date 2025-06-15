import * as Yup from "yup";

const updateProfileValidationSchema = Yup.object().shape({
  fullName: Yup.string().min(3).max(20).required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
   balance: Yup.number().min(0).max(2000).required(),
  profileImage: Yup.string().url().optional(),
 
});

export default updateProfileValidationSchema;
 