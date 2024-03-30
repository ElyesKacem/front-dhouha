import MultiSelect from "../../utils/multiSelectFun";
import { Field, ErrorMessage } from "formik";

function SelectField({ ...props }) {
  return (
    <div className={` w-full flex flex-col space-y-3`}>
      <label
        className="text-gray-500 capitalize font-semibold text-xl"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <Field
        className="w-full border  border-gray-300 rounded-sm p-3 "
        {...props}
        component={MultiSelect}
      />
      <ErrorMessage
        className="text-red-500 text-sm p-0"
        name={props.name}
        component="div"
      />
    </div>
  );
}

export default SelectField;
