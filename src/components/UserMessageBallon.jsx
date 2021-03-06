import React from "react";

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
        disabled={index + 1 < messages.length}
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
      >
        {cities.map((city) => (
          <option key={city.nome}>{city.nome}</option>
        ))}
      </select>
    </>
  );
  return (
    <div className="box ballon2">
      <form action="">
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
            disabled={index + 1 < messages.length}
          >
            <i className="lni lni-telegram-original"></i>
          </button>
        )}
      </form>
    </div>
  );
};

export default UserMessageBallon;
