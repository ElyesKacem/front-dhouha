import React, { useState } from "react";
import * as Yup from "yup";
import * as XLSX from "xlsx";
import { Formik, Form } from "formik";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { addConcert } from "../../api/concertApi"; 
import { toast } from "react-hot-toast";

function ConcertForm({onConcertAdded}) {
  const initialValues = {
    season:"",
    name:"",
    date: "",
    location: "",
    description:"",
    music: [], 
    list_final: [],
    list_candidate: [],
  };
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; 
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(file);
  };
  const handleSubmitExcel = () => {
    if (!excelData) {
      toast.error("Veuillez d'abord importer un fichier Excel.");
      return;
    }
    onConcertAdded(excelData);
  
    setExcelData(null);
    toast.success("Données importées avec succès depuis le fichier Excel.");
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await addConcert(values);
      toast.success("Concert successfully created!");
      console.log("New concert added:", res.data); 
      resetForm();
      onConcertAdded(res.data); 
    } catch (err) {
      toast.error(err.response.data.errors[0].msg);
    }
  };

  const validationSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    location: Yup.string().required("Location is required"),
    
  });

  return (
    <div>
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
          <button
            type="submit"
            className="bg-black text-white font-semibold p-4 rounded-md mt-4"
            disabled={isSubmitting}
          >
            Ajouter
          </button>
        </Form>
      )}
    </Formik>
    <div>
      <input type="file" 
      onChange={handleFileUpload}
       />
      <button 
        type="button" 
        className="bg-black text-white font-semibold p-4 rounded-md mt-4" 
        onClick={handleSubmitExcel}
      >
        Importer depuis Excel
      </button>
    </div>
    </div>
  );
}

export default ConcertForm;
