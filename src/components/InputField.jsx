import { useField, Field } from "formik";

const InputField = ({ placeholder, inputError, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Field
        type="text"
        {...field}
        {...props}
        placeholder={placeholder}
        className={`${meta.touched && meta.error ? "invalid-input" : ""}`}
      />
    </>
  );
};

export default InputField;
