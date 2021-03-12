import { useField } from "formik";

const InputField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  console.log(meta.touched && meta.error ? "invalid-input" : "");
  return (
    <div>
      <input
        type="text"
        {...field}
        {...props}
        placeholder={placeholder}
        className={`${meta.touched && meta.error ? "invalid-input" : ""}`}
      />
    </div>
  );
};

export default InputField;
