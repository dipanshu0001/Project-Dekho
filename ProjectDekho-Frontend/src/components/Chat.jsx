import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { getAllMessageRoute, sendMessageRoute } from "../Utils/APIRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../Common_function_context/SocketProvider";
import { useNavigate} from "react-router-dom";

const Chat = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userstate = useSelector((state) => state.UserReducer);

  const { Username: username } = userstate;

  const cardstate = useSelector((state) => state.CardReducer);

  const { Username: chatname } = cardstate;

  const chatstate = useSelector((state) => state.ChatReducer);

  const { avatarImage, contacts } = chatstate;

  const [messages, setmessages] = useState([
    {
      fromSelf: true,
      message: "Hello",
    },
    {
      fromSelf: false,
      message: "hi",
    },
  ]);



  const [menu, setMenu] = useState(false);

  const [msg, setmsg] = useState("");

  const scrollRef = useRef();

  const socket = useSocket();

  const [arrivalMessage, setarrivalMessage] = useState(null);

  useEffect(() => {
    socket.emit("userjoin", username);
    // console.log(cardstate);
    // console.log("Socket : ", socket);
  }, []);

  useEffect(() => {
    if (username==="" || chatname==="") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const getallmessages = async () => {
      const response = await axios.post(getAllMessageRoute, {
        from: username,
        to: chatname,
      });
      setmessages(response.data);
    };
    if (chatname) {
      getallmessages();
    }
  }, [chatname]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("recieve_chat", (data) => {
      // console.log(data);
      setarrivalMessage({
        fromSelf: false,
        from: data.from,
        message: data.message,
      });
    });
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage && arrivalMessage.from === chatname) {
      setmessages((prev) => [
        ...prev,
        { fromSelf: arrivalMessage.fromSelf, message: arrivalMessage.message },
      ]);
    }
  }, [arrivalMessage]);

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setmsg("");
    }
  };

  const handleSendMsg = async (msg) => {
    setmessages([
      ...messages,
      {
        fromSelf: true,
        message: msg,
      },
    ]);

    socket.emit("send_chat", {
      to: chatname,
      from: username,
      message: msg,
    });

    // console.log(currentchat.email, useremail, msg);

    await axios.post(sendMessageRoute, {
      from: username,
      to: chatname,
      message: msg,
    });
  };

  return (
    <div className=" h-[89vh] flex justify-center items-center ">
    <Chatcontainer>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={avatarImage} alt="avatar" />
          </div>
          <div className="username">
            <h3>{chatname}</h3>
          </div>
        </div>

        {/* <button>Cross </button> */}
        <button type="button" className="bg-blue-800 p-2 rounded-2" onClick={() => navigate(-1)}>
            <IoClose className="text-white"/>
          </button>
        {/* <Logout /> */}
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => {
          return (
            // <div ref={scrollRef} key={uuidv4()}>
            <div ref={scrollRef} key={index}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chatinput">
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
          <input
            type="text"
            name="chat"
            id="chat"
            placeholder="type your message here"
            value={msg}
            onChange={(e) => {
              setmsg(e.target.value);
            }}
            autoComplete="off"
          />
          <button type="submit">
            <IoMdSend className="chat-icon" />
          </button>
        </form>
      </div>
    </Chatcontainer>
    </div>
  );
};

const Chatcontainer = styled.div`
  height: 80vh;
  width: 80%;
  border: 2px solid black;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px black;
  display: grid;
  grid-template-rows: 13% 77% 10%;
  overflow: hidden;
  // padding-top: 1rem;
  .chat-header {
    background-color: #02163b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: 2rem;
      .avatar {
        width: fit-content;
        height: fit-content;
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    // height: 83%;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 90%;
        width: fit-content;
        overflow-wrap: break-word;
        color: white;
        overflow: hidden;
        padding: 1rem;
        font-size: 1.1rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: rgb(79 4 255 / 88%);
        border-bottom-left-radius: 1rem;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: rgb(153 0 255 / 82%);
        border-bottom-right-radius: 1rem;
      }
    }

    scrollbar-width: thin;
    scrollbar-color: #e3e3e3 transparent;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #e3e3e3;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }

  .input-container {
    border: 2px solid;
    padding: 0.3rem;
    display: flex;
    width: 100%;
    border-radius: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    background-color: #ffffff38;

    input {
      width: 90%;
      border: none;
      padding: 0.5rem;
      background-color: transparent;
      color: black;

      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
        outline-offset: none;
      }
    }

    button {
      padding: 0.5rem 1rem;
      background-color: rgb(87 54 237);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      .chat-icon {
        font-size: 1.5rem;
        color: white;
      }
    }
  }

  .support_icon {
    font-size: 1.5rem;
  }
`;

export default Chat;
