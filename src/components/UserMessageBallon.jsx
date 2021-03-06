import React from "react";

const UserMessageBallon = ({
  msg,
  messages,
  handleInputChange,
  handleSubmitMsg,
  index,
  states,
}) => {
  const formAddress = (
    <>
      <select>
        {states.map((state) => (
          <option key={state}>Seu estado</option>
        ))}
      </select>
      <select>
        {states.map((state) => (
          <option key={state}>cidade</option>
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
