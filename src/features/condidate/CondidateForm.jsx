import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { createNewCandidate } from "../../api/condidate/CondidateApi";
import { useNavigate } from "react-router";

function CondidateForm() {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    phone: "",
    nationality: "",
    cin: "",
    birthday: "",
    height: "",
    professional_situation: "",
    availability: "",
    musical_knowledge: [],
    other_choir_activity: false,
  };

  const handleSubmit = async (values) => {
    const newCondidate = { ...values, audition_id: "656cc25b1fcbeea90f47dc9f" };
    createNewCandidate(newCondidate)
      .then((data) => navigate("/"))
      .catch((error) => console.error("Failed:", error));
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must be only digits")
      .required("Phone number is required"),
    nationality: Yup.string().required("Nationality is required"),
    cin: Yup.string().required("CIN is required"),
    birthday: Yup.date().required("Birthday is required"),
    height: Yup.number().required("Height is required"),

    professional_situation: Yup.string().required(
      "Professional situation is required"
    ),
    availability: Yup.date().required("Availability is required"),
    musical_knowledge: Yup.array()
      .of(Yup.string())
      .required("Musical knowledge is required"),
    other_choir_activity: Yup.boolean(),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="grid grid-cols-2  place-content-center  gap-5	">
          <InputField label="First Name" name="firstName" />
          <InputField label="Last Name" name="lastName" />
          <InputField label="Email" name="email" type="email" />
          <InputField label="Address" name="address" />
          <SelectField
            label="Gender"
            name="gender"
            placeholder="Gender"
            options={[
              { value: "homme", label: "Homme" },
              { value: "femme", label: "Femme" },
            ]}
          />
          <SelectField
            label="Musical Knowledge"
            name="musical_knowledge"
            placeholder="Musical knowledge"
            isMulti={true}
            options={[{ value: "tunisis", label: "Tunisis" }]}
          />

          <InputField label="CIN" name="cin" />
          <InputField label="Nationality" name="nationality" />
          <InputField label="Phone" name="phone" />
          <InputField label="Birthday" name="birthday" type="date" />
          <InputField label="Height" name="height" type="number" />

          <InputField
            label="Professional Situation"
            name="professional_situation"
          />
          <InputField label="Availability" name="availability" type="date" />

          <button
            type="submit"
            className="bg-stone-800 w-36  hover:bg-stone-950 text-white font-bold py-2  px-4 rounded col-span-full justify-self-center self-center hover:w-40  transition-all  duration-200 "
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default CondidateForm;
