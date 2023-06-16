import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
// import { useSocket } from "../contexts/SocketProvider";
// import { useChat } from "../contexts/ChatProvider";
import { RiContactsFill } from "react-icons/ri";
import {
  getAllMessageRoute,
  sendMessageRoute,
  allUsersRoute,
} from "../Utils/APIRoutes";
import { Set_Messages, Set_Contacts, Set_Username } from "../Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../Common_function_context/SocketProvider";
import { useNavigate } from "react-router-dom";
import EmptyScreen from "./EmptyScreen";
// import { SetContacts } from "../ActionTypes/ActionTypes";

const AdminChat = () => {
  const dispatch = useDispatch();

  const userstate = useSelector((state) => state.UserReducer);

  const { Username: username, isAdmin } = userstate;

  const chatstate = useSelector((state) => state.ChatReducer);

  const { username: chatname, avatarImage, contacts } = chatstate;

  const [currentSelected, setcurrentSelected] = useState(undefined);

  const [menu, setMenu] = useState(false);

  const [msg, setmsg] = useState("");

  const scrollRef = useRef();

  const socket = useSocket();

  const [arrivalMessage, setarrivalMessage] = useState(null);

  const [messages, setmessages] = useState([
    {
      fromSelf: true,
      message: "Hello",
      time: "Thu May 11 2023 17:36:45 GMT+0530 (India Standard Time)",
    },
    {
      fromSelf: false,
      message: "hi",
      time: "Thu May 11 2023 17:36:45 GMT+0530 (India Standard Time)",
    },
  ]);

  // const username = "admin";

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    
    socket.emit("userjoin", username);

    // console.log("Socket : ",socket)
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("recieve_chat", (data) => {
      // console.log("message recieved");
      setarrivalMessage({
        fromSelf: false,
        from: data.from,
        message: data.message,
        time: data.time,
      });

    });
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage && arrivalMessage.from === chatname) {
      // dispatch(Set_Messages((prev) => [
      //   ...prev,
      //   { fromSelf: arrivalMessage.fromSelf, message: arrivalMessage.message },
      // ]));
      setmessages((prev) => [
        ...prev,
        {
          fromSelf: arrivalMessage.fromSelf,
          message: arrivalMessage.message,
          time: arrivalMessage.time,
        },
      ]);
    }
  }, [arrivalMessage]);

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

  const gettime = (time) => {
    // Get current hour and minute in Indian Standard Time
    const now = new Date(time);
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const istTime = now.toLocaleString("en-US", options);
    const [datePart, timePart] = istTime.split(", ");
    const [hour, minute] = timePart.split(":");

    // Output IST hour and minute
    return `${hour}:${minute}`;
  };

  const gett = () => {
    const now = new Date();
    const options = { timeZone: "Asia/Kolkata" };
    const istTime = now.toLocaleString("en-US", options);
    return istTime;
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setmsg("");
    }
  };

  const changeCurrentChat = (index, contact) => {
    setcurrentSelected(index);
    dispatch(Set_Username(contact));
    // changechatemail(contact.email);
    // console.log(email);
  };

  const handleSendMsg = async (msg) => {
    // dispatch(Set_Messages([
    //   ...messages,
    //   {
    //     fromSelf: true,
    //     message: msg,
    //   },
    // ]));
    setmessages([
      ...messages,
      {
        fromSelf: true,
        message: msg,
        time: gett(),
      },
    ]);

    socket.emit("send_chat", {
      to: chatname,
      from: username,
      message: msg,
      time: gett(),
    });

    // console.log(currentchat.email, useremail, msg);

    if (chatname !== "") {
      await axios.post(sendMessageRoute, {
        from: username,
        to: chatname,
        message: msg,
      });
    }
  };

  useEffect(() => {
    async function useeffectfunca() {
      const data = await axios.post(`${allUsersRoute}/${username}`);
      // console.log(data.data)
      dispatch(Set_Contacts(data.data));
      // console.log("Contacts ", contacts)
    }

    useeffectfunca();
  }, [contacts]);

  // useEffect(() => {
  //   console.log(email);

  //   setcurrentchat({
  //     ...currentchat,
  //     email: email,
  //   });
  // }, [email]);

  return (
    <div className="h-[89vh] flex justify-center items-center">
      <div className="grid grid-cols-[20%_80%] h-[85vh] w-[90vw] rounded-[0.5rem] shadow-blue-gray-900 shadow-lg">
        <Container>
          <div className="contactbox">
            <div className="brand">
              {/* <img src={logo} alt="Logo" /> */}
              <h2>Liffy</h2>
            </div>

            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      changeCurrentChat(index, contact);
                    }}
                  >
                    <div className="avatar">
                      {/* <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />  */}
                      <img src={avatarImage} alt="avatar" />
                    </div>
                    <div className="username">
                      <h3>{contact}</h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserimage}`}
                alt="avatar" 
              />
            </div>
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div> */}
            {/* </div> */}
          </div>
        </Container>

          { chatname ? (
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
                      {/* <div className="chattime">
                      <p>{gettime(message.time)}</p>
                    </div> */}
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
        ) : ( <EmptyScreen/> ) }
      </div>
    </div>
  );
};

const Container = styled.div`
  z-index: 2;

  // .sidebar {
  // display: grid;
  // grid-template-columns: 20% 80%;
  // overflow: hidden;
  // background-color: #080420;
  // height: 100vh;
  // z-index: 3;
  // }

  .optionbox {
    height: 100vh;
    border-right: 1px solid #795548;
    background: #0f1430;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
  }

  .contactbox {
    display: grid;
    grid-template-rows: 10% 85%;
    overflow: hidden;
    background-color: #080420;
    height: 100%;
  }

  .searchbox {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    color: white;

    img {
      height: 3rem;
    }

    h3 {
      text-transform: uppercase;
    }
  }

  .search {
    height: 70%;
    width: 90%;
    font-size: 1.5rem;
    text-align: center;
    background: transparent;
    border: 2px solid white;
    border-radius: 0.5rem;
    color: white;
    font-weight: bold;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    overflow-x: hidden;

    scrollbar-width: thin;
    scrollbar-color: #ffffff39 transparent;

    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff38;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        height: fit-content;
        width: fit-content;
        img {
          height: 3rem;
        }
      }

      .username {
        overflow: hidden;

        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color: #9186f3;
    }
  }

  .optionbox {
    .avatar {
      padding: 0.45rem;
      img {
        height: 3rem;
        border: 2px solid red;
        border-radius: 100%;
        padding: 1px;
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      height: fit-content;
      width: fit-content;
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    position: absolute;
    width: 100%;
  }

  .contact_icon {
    font-size: 2rem;
    color: white;
  }

  .contact_icon:hover {
    transform: scale(1.3);
  }
`;

const Chatcontainer = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid black;
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
        height: fit-content;
        width: fit-content;
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
        overflow: hidden;
        width: fit-content;

        position: relative;
        max-width: 90%;
        overflow-wrap: break-word;
        color: white;
        padding: 1rem;
        font-size: 1.1rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
      .chattime {
        position: absolute;
        bottom: 2%;
        right: 4%;
        font-size: 0.6rem;
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

export default AdminChat;
