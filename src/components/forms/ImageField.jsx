import { ErrorMessage } from "formik";
import React, { useState } from "react";
function ImageField({ setFieldValue, name, setRestImg, restImg }) {
  const [image, setImage] = useState(null);

  return (
    <div className={``}>
      {/* {image ? <img src={image} alt="img" /> : <></>} */}
      <label className={` `} htmlFor={name}>
        {image && restImg ? <i class={``}></i> : <></>}
        {image && restImg ? (
          <i class={`fa-regular fa-image `}></i>
        ) : (
          <i class={` fa-solid fa-folder-plus `}></i>
        )}
        {image && restImg ? image.name : "No Image Selected"}
      </label>
      <input
        className="d-none"
        type="file"
        name={name}
        id={name}
        onChange={(event) => {
          // setImage(URL.createObjectURL(event.target.files[0]));
          setRestImg(true);
          setImage(event.target.files[0]);
          setFieldValue(name, event.currentTarget.files[0]); // Dosyayı setFieldValue ile ayarlayın
        }}
      />
      <ErrorMessage name={name} component="div" />
    </div>
  );
}

export default ImageField;
