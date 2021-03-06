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
  const [messages, setMessages] = useState([]);
  const [systenMessages, setSystenMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([
    { name: "name", type: "text", placeholder: "Nome e sobrenome" },
    { name: "address", states: [...states], cities: [] },
    { name: "birthday", type: "date", placeholder: "" },
    { name: "email", type: "email", placeholder: "E-mail" },
    { name: "rating", type: "email", placeholder: "rating" },
  ]);

  const [user, setUser] = useState({
    name: "",
    city: "",
    state: "",
    birthday: "",
    email: "",
    rating: "",
  });

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

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const currentUser = { ...user };
    currentUser[inputName] = e.target.value;
    setUser(currentUser);
    console.log(currentUser);
  };

  const handleSubmitMsg = (e) => {
    e.preventDefault();
    console.log(messages);
    const myMsgs = [...messages];
    const newMsgsIndex = messages.length / 2;
    myMsgs.push(systenMessages[newMsgsIndex]);
    myMsgs.push(userMessages[newMsgsIndex]);
    setMessages(myMsgs);
  };

  const sendUserData = () => {
    console.log(user);
  };

  return (
    <div className="App">
      <div className="chat-room">
        <div className="chat-header">
          <i className="lni lni-minus"></i>
          <i className="lni lni-close"></i>
        </div>

        <div className="chat-body">
          {!!messages.length &&
            messages.map((msg, index) =>
              (index + 1) % 2 === 0 ? (
                <UserMessageBallon
                  msg={msg}
                  messages={messages}
                  index={index}
                  states={states}
                  handleInputChange={handleInputChange}
                  handleSubmitMsg={handleSubmitMsg}
                  key={"user-msg-" + index}
                />
              ) : (
                <SystemMessageBallon
                  msg={msg}
                  user={user}
                  key={"system-msg-" + index}
                />
              )
            )}
          {messages.length >= 10 && (
            <button className="save-btn" onClick={sendUserData}>
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
