import React from "react";

function SystemMessageBallon({ msg, user }) {
  return (
    <div className="box ballon1">
      {" "}
      {msg.content.length > 1
        ? msg.content[0] + user.name + msg.content[1]
        : msg.content[0]}
    </div>
  );
}

export default SystemMessageBallon;
