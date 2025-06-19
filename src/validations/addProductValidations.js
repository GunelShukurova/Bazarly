
import * as Yup from "yup";

const addProductvalidationSchema = Yup.object({

    title: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    salePercentage: Yup.number().min(5).max(80).required('Required'),
    image: Yup.string().url().required('Required'),
    brand: Yup.string().required('Required'),
    price: Yup.number().min(10).required('Required'),
    inStock: Yup.number().min(1).required('Required'),
});


export default addProductvalidationSchema;
