import { useField, Field } from "formik";

const InputField = ({ placeholder, inputError, ratingValue, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {props.name === "rating" ? (
        <Field
          type="text"
          {...field}
          {...props}
          placeholder={placeholder}
          className={`rating-input`}
          value={ratingValue + 1}
        />
      ) : (
        <Field
          type="text"
          {...field}
          {...props}
          placeholder={placeholder}
          className={` ${meta.touched && meta.error ? "invalid-input" : ""}`}
        />
      )}
    </>
  );
};

export default InputField;
