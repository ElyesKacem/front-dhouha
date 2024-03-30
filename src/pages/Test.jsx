import { Formik, Form } from "formik";
import InputField from "../components/forms/InputField";
import * as Yup from "yup";

function Test(props) {
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  const Validation = Yup.object({
    email: Yup.string().required("password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Validation}
      onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form>
          {/* <SelectField
            id="password"
            name="password"
            isMulti={false}
            placeholder="Single Select"
            options={[
              { value: "one", label: "One" },
              { value: "two", label: "Two" },
              { value: "three", label: "Three" },
            ]}
          /> */}

          <InputField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          {/* <ImageField name="image" setFieldValue={setFieldValue} /> */}

          {/* <InputField
            id="password"
            name="password"
            type="password"
            label="password"
            placeholder="Enter your password"
          />
          <InputField
            id="passwordConfirm"
            name="passwordConfirm"
            type="passwordConfirm"
            label="passwordConfirm"
            placeholder="Enter your passwordConfirm"
          /> */}

          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Test;
