import * as Yup from "yup";

const MAX_FILE_SIZE = 102400; //100KB

const validFileExtensions = {
  image: ["jpg", "png", "jpeg", "webp"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

export const imgValidation = Yup.mixed()
  .required("Required")
  .test("is-valid-type", "Not a valid image type", (value) =>
    isValidFileType(value && value.name.toLowerCase(), "image")
  )
  .test(
    "is-valid-size",
    "Max allowed size is 100KB",
    (value) => value && value.size <= MAX_FILE_SIZE
  );
