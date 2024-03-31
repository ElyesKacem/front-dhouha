import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { addAudition } from "../../api/auditionApi";
import { toast } from "react-hot-toast";

function AuditionForm() {
  const initialValues = {
    audition_starting_date: "",
    season: "",
    starting_date: "",
    ending_date: "",
    nb_candidate_day: 0,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addAudition(values);
      toast.success("Audition created successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to create audition.");
    }
  };

  const validationSchema = Yup.object({
    audition_starting_date: Yup.date().required("Starting date is required"),
    season: Yup.string().required("Season is required"),
    starting_date: Yup.date().required("Starting date is required"),
    ending_date: Yup.date().required("Ending date is required"),
    nb_candidate_day: Yup.number().required("Number of candidates per day is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <div className=" bg-white w-1/4 p-8 pb-0 shadow-md">
          <Form>
            <div className="flex flex-col space-y-5">
              <InputField
                id="audition_starting_date"
                name="audition_starting_date"
                type="date"
                label="Audition Starting Date"
              />
              <InputField
                id="season"
                name="season"
                type="text"
                label="Season"
                placeholder="Enter season ID"
              />
              <InputField
                id="starting_date"
                name="starting_date"
                type="date"
                label="Starting Date"
              />
              <InputField
                id="ending_date"
                name="ending_date"
                type="date"
                label="Ending Date"
              />
              <InputField
                id="nb_candidate_day"
                name="nb_candidate_day"
                type="number"
                label="Number of Candidates per Day"
              />
            </div>
            <button
              className="w-full bg-black text-white font-semibold p-4 text-xl rounded-md mt-10"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default AuditionForm;
