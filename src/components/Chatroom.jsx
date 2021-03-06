import { useEffect, useState } from "react";
import axios from "axios";
import UserMessageBallon from "./UserMessageBallon";
import SystemMessageBallon from "./SystemMessageBallon";

function App() {
  const states = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RO",
    "RS",
    "RR",
    "SC",
    "SE",
    "SP",
    "TO",
  ];
  const [messages, setMessages] = useState(["oi", "oi"]);
  const [systenMessages, setSystenMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([
    { name: "name", type: "text", placeholder: "Nome e sobrenome" },
    { name: "address", states: [...states], cities: [] },
    { name: "birthday", type: "date", placeholder: "" },
    { name: "email", type: "email", placeholder: "E-mail" },
    { name: "rating", type: "email", placeholder: "rating" },
  ]);

  useEffect(() => {
    let mymsgs = [];
    axios
      .get("https://6041700df34cf600173c9dba.mockapi.io/systemMsgs")
      .then((data) => {
        setSystenMessages(data.data);
        mymsgs.push(data.data[0]);
        mymsgs.push(userMessages[0]);
      })
      .then(() => {
        setMessages(mymsgs);
      });
  }, [userMessages]);

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
                <SystemMessageBallon msg={msg} />
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
