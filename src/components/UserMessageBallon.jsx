import React, { useState } from "react";
import { ErrorMessage, Formik, Form } from "formik";
import * as yup from "yup";

import InputField from "./InputField";
import Select from "./Select";
import Rating from "./Rating";

const UserMessageBallon = ({
  msg,
  messages,
  handleSubmitMsg,
  index,
  states,
  cities,
  handleSelectChange,
}) => {
  const [selectedStar, setSelectedStar] = useState(null);
  const validations = () => {
    switch (msg.name) {
      case "name":
        return yup.object().shape({
          name: yup
            .string("")
            .trim("Campo não pode estar vazio.")
            .required("Campo não pode estar vazio."),
        });
      case "email":
        return yup.object().shape({
          email: yup
            .string()
            .email("Email inválido")
            .required("Campo não pode estar vazio.")
            .trim("Campo não pode estar vazio."),
        });
      case "birthday":
        return yup.object().shape({
          birthday: yup
            .date("Formato inválido")
            .required("Campo não pode estar vazio."),
        });
      case "address":
        console.log("address");
        return yup.object().shape({
          state: yup
            .string("Formato inválido")
            .required("Campo não pode estar vazio."),
          city: yup
            .string("Formato inválido")
            .required("Campo não pode estar vazio."),
        });
      default:
        return yup.object().shape({});
    }
  };

  const formAddress = (
    <>
      <Select
        handleSelectChange={handleSelectChange}
        disabled={index + 1 < messages.length}
        name="state"
        options={states}
        label="Estado"
      />
      <Select
        handleSelectChange={handleSelectChange}
        className="select-city"
        disabled={index + 1 < messages.length}
        name="city"
        options={cities}
        label="Cidade"
      />
      <ErrorMessage component="div" name="city">
        {(message) => <div className="error-msg">{message}</div>}
      </ErrorMessage>
    </>
  );

  const handleStarClick = (starNumber) => {
    setSelectedStar(starNumber);
    handleSubmitMsg({ rating: starNumber });
  };

  return (
    <div className="box ballon2">
      <Formik
        initialValues={
          msg.name === "address" ? { state: "", city: "" } : { [msg.name]: "" }
        }
        onSubmit={handleSubmitMsg}
        validationSchema={validations}
      >
        <Form>
          {msg.name === "address" ? (
            formAddress
          ) : (
            <>
              <InputField
                name={msg.name}
                type={msg.type}
                placeholder={msg.placeholder}
                disabled={index + 1 < messages.length}
                autoFocus={index + 1 === messages.length}
                ratingValue={selectedStar}
              />
              {msg.name === "rating" && (
                <Rating
                  handleStarClick={handleStarClick}
                  selectedStar={selectedStar}
                />
              )}
            </>
          )}
          {index < 9 && (
            <button type="submit" disabled={index + 1 < messages.length}>
              <i className="lni lni-telegram-original"></i>
            </button>
          )}
          <ErrorMessage component="div" name={msg.name}>
            {(message) => <div className="error-msg">{message}</div>}
          </ErrorMessage>
        </Form>
      </Formik>
    </div>
  );
};

export default UserMessageBallon;
