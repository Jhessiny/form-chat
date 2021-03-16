import React from "react";
import { Field, ErrorMessage, useField } from "formik";

function Select(props) {
  const [field, meta] = useField(props);
  const {
    label,
    name,
    options,
    inputError,
    handleSelectChange,
    ...rest
  } = props;

  return (
    <>
      <Field
        className={`${name === "city" && "select-city"} ${
          meta.touched && meta.error ? "invalid-input" : ""
        }`}
        as="select"
        id={name}
        name={name}
        onChange={(e) => {
          handleSelectChange(e, name);
          field.onChange(e);
        }}
        {...rest}
      >
        <option>{label}</option>
        {options.map((option, index) => {
          const optValue = name === "state" ? option : option.nome;
          return (
            <option key={`${index}-${option}`} value={optValue}>
              {optValue}
            </option>
          );
        })}
      </Field>
    </>
  );
}

export default Select;
