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
  }, []);

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const currentUser = { ...user };
    currentUser[inputName] = e.target.value;
    setUser(currentUser);
  };

  const handleSubmitMsg = (e) => {
    e.preventDefault();
    const myMsgs = [...messages];
    const newMsgsIndex = messages.length / 2;
    myMsgs.push(systenMessages[newMsgsIndex]);
    myMsgs.push(userMessages[newMsgsIndex]);
    setMessages(myMsgs);
  };

  const handleSelectChange = (e, selectType) => {
    const currentUser = { ...user };
    currentUser[selectType] = e.target.value;
    setUser(currentUser);
    if (selectType === "state") {
      console.log("state");
      const userState = e.target.value;
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${userState}/distritos`
        )
        .then((data) => {
          const userMsgs = [...userMessages];
          userMsgs[1].cities = [...data.data];
          console.log(userMsgs);
          setUserMessages(userMsgs);
        });
    }
  };

  const sendUserData = () => {
    console.log(user);
  };

  return (
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
                cities={userMessages[1].cities}
                handleInputChange={handleInputChange}
                handleSubmitMsg={handleSubmitMsg}
                key={"user-msg-" + index}
                handleSelectChange={handleSelectChange}
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
  );
}

export default App;
