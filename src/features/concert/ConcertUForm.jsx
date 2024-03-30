import React from "react";
import * as Yup from "yup";
import { Formik, Form, FieldArray, Field } from "formik";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { updateConcert} from "../../api/concertApi"; 
import { toast } from "react-hot-toast";

function ConcertUForm({ concert, refetch }) {
  const initialValues = {
    season: concert.season,
    name: concert.name,
    date: concert.date,
    location: concert.location,
    description: concert.description,
    music: concert.music,
    list_final: concert.list_final,
    list_candidate: concert.list_candidate,
  };

  const handleSubmit = async (values, { resetForm }) => {
    updateConcert(concert._id, values)
      .then((res) => {
        toast.success("Concert successfully updated!");
        resetForm();
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    date: Yup.date().required("Date is required"),
    location: Yup.string().required("Location is required"),
   
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          
          <InputField
            type="text"
            label="Name"
            name="name"
            placeholder="Enter name"
          />
          <InputField
            type="text"
            label="Description"
            name="description"
            placeholder="Enter description"
          />
          <InputField
            type="date"
            label="Date"
            name="date"
            placeholder="Enter date"
          />
          <InputField
            type="text"
            label="Location"
            name="location"
            placeholder="Enter location"
          />
          <InputField
            type="text"
            label="Season"
            name="season"
            placeholder="Enter season"
          />
          
          <FieldArray name="music">
            {({ push, remove, form: { values } }) => (
              <div>
                <h3>Music List</h3>
                {values.music.map((music, index) => (
                  <div key={index}>
                    <SelectField
                id="music"
                name="music"
                label="music"
                isMulti={true}
                placeholder="Single Select"
                options={[
                  { value: "657c423e99cf596cbfcbe363", label: "657c423e99cf596cbfcbe363" },
                  { value: "657c423e99cf596cbfcbe364", label: "657c423e99cf596cbfcbe364" },
                  { value: "657c423e99cf596cbfcbe365", label: "657c423e99cf596cbfcbe365" },
                ]}
              />
                    <button type="button" onClick={() => remove(index)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => push('')}>Add Music</button>
              </div>
            )}
          </FieldArray>
          <FieldArray name="list_candidate">
            {({ push, remove, form: { values } }) => (
              <div>
                <h3>Candidate List</h3>
                {values.list_candidate.map((music, index) => (
                  <div key={index}>
                    <SelectField
                id="list_candidate"
                name="list_candidate"
                label="list_candidate"
                isMulti={true}
                placeholder="Single Select"
                options={[
                  { value: "657c423e99cf596cbfcbe363", label: "657c423e99cf596cbfcbe363" },
                  { value: "657c423e99cf596cbfcbe364", label: "657c423e99cf596cbfcbe364" },
                  { value: "657c423e99cf596cbfcbe365", label: "657c423e99cf596cbfcbe365" },
                ]}
              />
                    <button type="button" onClick={() => remove(index)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => push('')}>Add candidate</button>
              </div>
            )}
          </FieldArray>
          <FieldArray name="list_final">
            {({ push, remove, form: { values } }) => (
              <div>
                <h3>Final candidates List</h3>
                {values.list_final.map((music, index) => (
                  <div key={index}>
                    <SelectField
                id="list_final"
                name="list_final"
                label="list_final"
                isMulti={true}
                placeholder="Single Select"
                options={[
                  { value: "657c423e99cf596cbfcbe363", label: "657c423e99cf596cbfcbe363" },
                  { value: "657c423e99cf596cbfcbe364", label: "657c423e99cf596cbfcbe364" },
                  { value: "657c423e99cf596cbfcbe365", label: "657c423e99cf596cbfcbe365" },
                ]}
              />
                    
                    <button type="button" onClick={() => remove(index)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => push('')}>Add candidate</button>
              </div>
            )}
          </FieldArray>

          
          <button
            type="submit"
            className="bg-black text-white font-semibold p-4 rounded-md mt-4"
            disabled={isSubmitting}
          >
            Update
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ConcertUForm;
