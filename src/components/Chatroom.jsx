import { useEffect, useState } from "react";
import axios from "axios";
import useSound from "use-sound";
import notification from "../sounds/notification.mp3";
import typing from "../sounds/typing.mp3";
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
  const [isChatMax, setIsChatMax] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [systenMessages, setSystenMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([
    { name: "name", type: "text", placeholder: "Nome e sobrenome" },
    { name: "address", states: [...states], cities: [] },
    { name: "birthday", type: "date", placeholder: "" },
    { name: "email", type: "email", placeholder: "E-mail" },
    { name: "rating", type: "number", placeholder: "Rating" },
  ]);
  const [user, setUser] = useState({
    name: "",
    city: "",
    state: "",
    birthday: "",
    email: "",
    rating: "",
  });
  const [isTyping, setIstyping] = useState(false);
  const [finishedForm, setFinishedForm] = useState(false);

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

  const [typingSound] = useSound(typing);
  const [notificationSound] = useSound(notification);

  const handleSubmitMsg = (value) => {
    console.log(value);
    const curUser = { ...user };
    Object.keys(value).forEach((userProperty, index) => {
      console.log(userProperty);
      curUser[userProperty] = Object.values(value)[index];
    });
    setUser(curUser);
    if (messages.length < 10) {
      typingSound();
      setIstyping(true);
      setTimeout(() => {
        const myMsgs = [...messages];
        const newMsgsIndex = messages.length / 2;
        myMsgs.push(systenMessages[newMsgsIndex]);
        myMsgs.push(userMessages[newMsgsIndex]);
        setMessages(myMsgs);
        setIstyping(false);
        notificationSound();
      }, 1000);
    } else {
      setIstyping(false);
    }
  };

  const handleSelectChange = (e, selectType) => {
    if (selectType === "state") {
      const userState = e.target.value;
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${userState}/distritos`
        )
        .then((data) => {
          const userMsgs = [...userMessages];
          userMsgs[1].cities = [...data.data];
          setUserMessages(userMsgs);
        });
    }
  };

  const sendUserData = () => {
    console.log(user);
    axios
      .post(`https://6041700df34cf600173c9dba.mockapi.io/users`, user)
      .then((data) => {
        setFinishedForm(true);
      });
  };

  const chatFormBody = (
    <>
      <div className="msgs-wrapper">
        {!!messages.length &&
          messages.map((msg, index) =>
            (index + 1) % 2 === 0 ? (
              <UserMessageBallon
                msg={msg}
                messages={messages}
                index={index}
                states={states}
                cities={userMessages[1].cities}
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
      </div>
      {isTyping && <div className="box ballon1 digitando">...</div>}
      {messages.length >= 10 && (
        <button className="save-btn" onClick={sendUserData}>
          Salvar
        </button>
      )}
    </>
  );

  return !isChatOpen ? (
    <button className="open-btn" onClick={() => setIsChatOpen(!isChatOpen)}>
      Open Chat
    </button>
  ) : (
    <div className="chat-room">
      <div className="chat-header">
        <i
          className={isChatMax ? "lni lni-minus" : "lni lni-arrow-top-right"}
          onClick={() => setIsChatMax(!isChatMax)}
        ></i>
        <i
          className="lni lni-close"
          onClick={() => setIsChatOpen(!isChatOpen)}
        ></i>
      </div>

      <div
        className="chat-body"
        style={{ display: isChatMax ? "block" : "none" }}
      >
        {!finishedForm ? (
          chatFormBody
        ) : (
          <p className="data-sent-message">Formul??rio enviado com sucesso!</p>
        )}
      </div>
    </div>
  );
}

export default App;
