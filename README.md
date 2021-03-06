import React from "react";
import { Formik } from "formik";

const UserMessageBallon = ({
msg,
messages,
handleInputChange,
handleSubmitMsg,
index,
states,
cities,
handleSelectChange,
}) => {
const formAddress = (
<>
<select
onChange={(e) => handleSelectChange(e, "state")}
disabled={index + 1 < messages.length} >

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
disabled={index + 1 < messages.length} >
{cities.map((city) => (
<option key={city.nome}>{city.nome}</option>
))}
</select>
</>
);
return (
<div className="box ballon2">
<Formik>
<form>
{msg.name === "address" ? (
formAddress
) : (
<input
name={msg.name}
type={msg.type}
placeholder={msg.placeholder}
disabled={index + 1 < messages.length}
onChange={(e) => handleInputChange(e)}
autoFocus={index + 1 === messages.length}
/>
)}
{index < 9 && (
<button
className={msg.name === "address" && "address"}
onClick={handleSubmitMsg}
disabled={index + 1 < messages.length} >
<i className="lni lni-telegram-original"></i>
</button>
)}
</form>
</Formik>
</div>
);
};

export default UserMessageBallon;

---

import React from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import \* as yup from "yup";

const UserMessageBallon = ({
msg,
messages,
// handleInputChange,
handleSubmitMsg,
index,
states,
cities,
handleSelectChange,
}) => {
const validations = () => {
switch (msg.name) {
case "name":
return yup.object().shape({
name: yup.string().required(),
});
case "email":
return yup.object().shape({
email: yup.string().email().required(),
});
case "birthday":
return yup.object().shape({
birthday: yup.date().required(),
});
default:
return yup.object().shape({});
}
};

const formAddress = (
<>
<select
onChange={(e) => handleSelectChange(e, "state")}
disabled={index + 1 < messages.length}
name="state" >
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
name="city" >
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
        initialValues={{}}
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
onBlur={msg.name === "rating" ? handleSubmitMsg : null}
/>
)}
{index < 9 && (
<button type="submit" disabled={index + 1 < messages.length}>
<i className="lni lni-telegram-original"></i>
</button>
)}
<ErrorMessage
            className="error-msg"
            component="span"
            name={msg.name}
          />
</Form>
</Formik>
</div>
);
};

export default UserMessageBallon;
