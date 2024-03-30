import React, { useEffect } from "react";
import * as Yup from "yup";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { Formik, Form } from "formik";
import { updateMusicals } from "../../api/musicalApi";
import { toast } from "react-hot-toast";

function MusicalUForm({ music, setMusic, refetch }) {
  let initialValues = {
    title: music?.title,
    composator: music?.composator,
    pupitre: music?.pupitre,
    genre: music?.genre,
    lyrics: music?.lyrics,
    arrangeurs: music?.arrangeurs,
    date_composition: music?.date_composition,
    part_choeur: true,
    presence_Choeur: true,
  };

  const handleSubmit = async (values, { resetForm }) => {
    updateMusicals(music._id, values)
      .then((res) => {
        toast.success("Successfully updated!");
        resetForm();
        setMusic(null);
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };

  const Validation = Yup.object({
    title: Yup.string().required("title is required"),
    genre: Yup.string().required("genre is required"),
    lyrics: Yup.string().required("lyrics is required"),
    arrangeurs: Yup.string().required("arrangeurs is required"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Validation}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({}) => (
        <div className=" bg-white w-1/4  p-8 pb-0 shadow-md">
          <Form>
            <div className="flex flex-col space-y-5">
              {" "}
              <InputField
                id="title"
                name="title"
                type="text"
                label="title"
                placeholder="Enter your title"
              />
              <InputField
                id="genre"
                name="genre"
                type="text"
                label="genre"
                placeholder="Enter your genre"
              />
              <InputField
                id="lyrics"
                name="lyrics"
                type="text"
                label="lyrics"
                placeholder="Enter your lyrics"
              />{" "}
              <InputField
                id="arrangeurs"
                name="arrangeurs"
                type="text"
                label="arrangeurs"
                placeholder="Enter your arrangeurs"
              />{" "}
              <InputField
                id="date_composition"
                name="date_composition"
                type="date"
                label="date_composition"
                placeholder="Enter your date_composition"
              />
              <SelectField
                id="pupitre"
                name="pupitre"
                label="pupitre"
                isMulti={true}
                placeholder="Single Select"
                options={[
                  { value: "first", label: "first" },
                  { value: "second", label: "second" },
                  { value: "third", label: "third" },
                ]}
              />
              <SelectField
                id="composator"
                name="composator"
                label="composator"
                isMulti={true}
                placeholder="Single Select"
                options={[
                  { value: "one", label: "One" },
                  { value: "two", label: "Two" },
                  { value: "three", label: "Three" },
                ]}
              />
            </div>
            <div className="flex space-x-2">
              {" "}
              <button
                onClick={() => setMusic(null)}
                className="w-1/2 bg-gray-400 text-white font-semibold p-4 text-xl rounded-md mt-10"
                type="reset">
                Cancel
              </button>
              <button
                className="w-1/2 bg-black text-white font-semibold p-4 text-xl rounded-md mt-10"
                type="submit">
                Update
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default MusicalUForm;
