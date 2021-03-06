import React from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";

const UserMessageBallon = ({
  msg,
  messages,
  handleSubmitMsg,
  index,
  states,
  cities,
  handleSelectChange,
}) => {
  const validations = () => {
    switch (msg.name) {
      case "name":
        console.log(msg.name);
        return yup.object().shape({
          name: yup.string().required("Campo não pode estar vazio."),
        });
      case "email":
        console.log(msg.name);
        return yup.object().shape({
          email: yup
            .string()
            .email("Email inválido")
            .required("Campo não pode estar vazio."),
        });
      case "birthday":
        return yup.object().shape({
          birthday: yup
            .date("Formato inválido")
            .required("Campo não pode estar vazio."),
        });
      case "addresss":
        console.log(msg.name);
        return yup.object().shape({
          state: yup
            .date("Formato inválido")
            .required("Campo não pode estar vazio."),
          city: yup
            .date("Formato inválido")
            .required("Campo não pode estar vazio."),
        });
      default:
        console.log(msg.name);
        return yup.object().shape({});
    }
  };

  const formAddress = (
    <>
      <select
        onChange={(e) => handleSelectChange(e, "state")}
        disabled={index + 1 < messages.length}
        name="state"
      >
        <option>Estado</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        className="select-city"
        onChange={(e) => handleSelectChange(e, "city")}
        disabled={index + 1 < messages.length}
        name="city"
      >
        <option>Cidade</option>
        {cities.map((city, index) => (
          <option key={city.nome + "-" + index}>{city.nome}</option>
        ))}
      </select>
    </>
  );

  return (
    <div className="box ballon2">
      <Formik
        initialValues={{ [msg.name]: "" }}
        onSubmit={handleSubmitMsg}
        validationSchema={validations}
      >
        <Form>
          {msg.name === "address" ? (
            formAddress
          ) : (
            <Field
              name={msg.name}
              type={msg.type}
              placeholder={msg.placeholder}
              disabled={index + 1 < messages.length}
              autoFocus={index + 1 === messages.length}
              onBlur={msg.name === "rating" ? handleSubmitMsg : ""}
            />
          )}
          {index < 9 && (
            <button type="submit" disabled={index + 1 < messages.length}>
              <i className="lni lni-telegram-original"></i>
            </button>
          )}
          <ErrorMessage name={msg.name}>
            {(msg) => <div>{msg}</div>}
          </ErrorMessage>
        </Form>
      </Formik>
    </div>
  );
};

export default UserMessageBallon;
