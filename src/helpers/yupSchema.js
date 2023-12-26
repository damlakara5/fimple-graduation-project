import * as yup from 'yup';

export const schema = yup.object({
    name: yup.string().required("Name is required"),
    lastName: yup.string().required("Surname is required"),
    age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
    tc: yup.string().required("TR ID number is required").length(11, "TR ID number must be 11 digits"),
    applicationReason: yup.string().required("Application reason is required"),
    address: yup.string().required("Address is required"),
    file: yup.mixed().required("A file is required") // Assuming you want to ensure a file is uploaded
}).required();
