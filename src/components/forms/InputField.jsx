import React from "react";
import { Field, ErrorMessage } from "formik";
function InputField({ label, ...input }) {
  return (
    <div className={` w-full flex flex-col space-y-3`}>
      <label
        className="text-gray-500 capitalize font-semibold text-xl"
        htmlFor={input.id}>
        {label}
      </label>
      <Field
        className="w-full border  border-gray-300 rounded-sm p-3 "
        {...input}
      />
      <ErrorMessage
        className="text-red-500 text-sm p-0"
        name={input.name}
        component="div"
      />
    </div>
  );
}

export default InputField;
