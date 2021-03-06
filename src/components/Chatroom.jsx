import { useState } from "react";
import UserMessageBallon from "./UserMessageBallon";
import SystemMessageBallon from "./SystemMessageBallon";

function App() {
  const [messages, setMessages] = useState(["oi", "oi"]);
  return (
    <div className="App">
      <div className="chat-room">
        <div className="chat-header">
          <p>__</p>
          <p>X</p>
        </div>

        <div className="chat-body">
          {!!messages.length &&
            messages.map((msg, index) =>
              (index + 1) % 2 === 0 ? (
                <UserMessageBallon />
              ) : (
                <SystemMessageBallon />
              )
            )}
          {messages.length >= 10 && (
            <button className="save-btn">Salvar</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
