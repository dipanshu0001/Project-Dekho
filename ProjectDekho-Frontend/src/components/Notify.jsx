import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { IoNotifications } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
// import { useSocket } from "../contexts/SocketProvider";
import { getAllMessageRoute, sendMessageRoute } from "../Utils/APIRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Set_Messages, Set_Notifications } from "../Actions/Actions";
import { useSocket } from "../Common_function_context/SocketProvider";

const Notify = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [notify, setnotify] = useState([]);
  const notificationRef = useRef();
  const profileRef = useRef();
  const [blink, setblink] = useState(false);
  

  const [notifications, setnotifications] = useState([]);

  useEffect(() => {
    let handler = (e) => {
      if (!notificationRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const dispatch = useDispatch();

  const socket = useSocket();

  const chatstate = useSelector((state) => state.ChatReducer);

  const { username: chatname } = chatstate;

  useEffect(() => {
    socket.emit("userjoin", username);

    // console.log("Socket : ", socket);
  }, []);

  const userstate = useSelector((state) => state.UserReducer);

  const { Username: username } = userstate;

  useEffect(() => {
    // console.log(notifications);
  }, [notifications]);

  const Timecalc = (time) => {
    // Time the message was sent (in milliseconds)
    const messageTime = time;

    // Current time (in milliseconds)
    const currentTime = Date.now();

    // Calculate the time difference in milliseconds
    const timeDiff = currentTime - messageTime;

    // Convert the time difference to minutes, seconds, and hours
    const secondsAgo = Math.floor(timeDiff / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);

    // Calculate the remaining minutes and seconds after subtracting the hours
    const remainingMinutes = minutesAgo % 60;
    const remainingSeconds = secondsAgo % 60;

    // Display the time difference in a message
    if (remainingMinutes < 1) {
      return "just now";
    } else if (hoursAgo > 0) {
      return `${hoursAgo} hour${
        hoursAgo > 1 ? "s" : ""
      }, ${remainingMinutes} minute${
        remainingMinutes > 1 ? "s" : ""
      }`;
    } else if (minutesAgo > 0) {
      return `${remainingMinutes} minute${
        remainingMinutes > 1 ? "s" : ""
      }`;
    }
  };

  const [arrivalNotification, setarrivalNotification] = useState(null);

  useEffect(() => {
    socket.on("recieve_chat", (data) => {
      // console.log("Msg recieved", data)

      setarrivalNotification({
        type: "Chat",
        sender: data.from,
        msg: `Chat recieved from ${data.from}`,
        time: Date.now(),
      });
    });
    socket.on("recieve_like", (data) => {
      // console.log("Msg recieved", data)

      setarrivalNotification({
        type: "Like",
        sender: data.from,
        msg: `${data.from} like your post`,
        time: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    if (arrivalNotification) {
      // let isPresent = false;
      // for (let i = 0; i < notifications.length; i++) {
      //   if (
      //     notifications[i].type === arrivalNotification.type &&
      //     notifications[i].sender === arrivalNotification.sender
      //   ) {
      //     isPresent = true;
      //     break;
      //   }
      // }
      setblink(true)

      const index = notifications.findIndex(
        (object) => (object.type === arrivalNotification.type && object.sender === arrivalNotification.sender)
      );

      if (index === -1) {
        setnotifications((prev) => [arrivalNotification, ...prev]);
      }

      // if (isPresent) {
      // console.log(isPresent)
      // }
      // else{
      //  setnotifications((prev) => [arrivalNotification, ...prev]);
      // }

      // setnotifications((prev) => [
      //   ...prev,
      //   arrivalNotification,
      // ]);
    }
  }, [arrivalNotification]);

  // const changeNotify =()=>{

  // }

  // const chatemail = "admin";

  // const [menu, setMenu] = useState(false);

  // const [msg, setmsg] = useState("");

  // const profileRef = useRef();

  // const scrollRef = useRef();

  // const [arrivalMessage, setarrivalMessage] = useState(null);

  return (
    <Container>
    <div ref={notificationRef} className="notification-container relative">
      <button
        className="notification-trigger mt-1.5"
        onClick={() => setOpen(!open)}
      >
        <IoNotifications className="text-[1.5rem] text-white" />
        { blink && <div className="blink h-2 w-2 rounded-full bg-[aqua] absolute top-[5%] right-0 z-30"></div> }
      </button>

      <div
        className={`notification-menu w-[70vw] bg-white md:w-[438px] h-[80vh] text-left shadow absolute top-[90%] right-[100%] glass p-6 rounded-[2.3rem] rounded-tr-[0] ${
          open
            ? "block animate__animated animate__fadeIn animate__fast"
            : "hidden"
        }`}
      >
        <h2 className="text-[20px] font-semibold text-[#0F4770]">
          Notifications
        </h2>
        <p className="text-[13px] mt-1">
          Catch up on all Updates from all your Boardes
        </p>
        <div className="text-[16px] font-medium text-[#0F4770] flex gap-9 mt-3">
          <p className="underline decoration-2 underline-offset-8">All</p>
          {/* <p className="opacity-50">Assigned</p> */}
        </div>

        <div className="notification h-[75%] overflow-y-scroll overflow-x-hidden scrollbar-medium ">
          {notifications.map((noti, index) => {
            return (
              <div
                key={index}
                className="glassHover ease-in duration-100 flex items-center gap-5 px-6 py-3 mx-[-1.5rem]"
              >
                <div>
                  <h2 className="text-[15px]">{noti.msg}</h2>
                  <p className="text-[10px] font-semibold text-[#0F4770]">
                    {Timecalc(noti.time)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </Container>
  );
};

const Container = styled.div`
  // .profile-menu {
  //   background: white;
  //   z-index: 100;
  //   box-shadow: 0 0 20px #383838;
  // }

  .notification{
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

  
`;

const Chatcontainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 10% 80% 10%;
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
      // margin-left: 2rem;
      .avatar {
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
    padding: 1rem 0.5rem;
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
        overflow-wrap: break-word;
        color: black;
        padding: 1rem;
        font-size: 1.1rem;
        font-weight: 500;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        p {
          margin-bottom: 0;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
        border-bottom-left-radius: 0.5rem;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: rgb(255 188 0 / 67%);
        border-bottom-right-radius: 0.5rem;
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

  .chatinput {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 9px black;
  }

  .input-container {
    display: flex;
    width: 100%;
    border-radius: 2rem;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff38;

    input {
      width: 90%;
      padding: 0.5rem;
      // background-color: transparent;
      color: black;
      // border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      background-color: #9a86f3;
      border-radius: 2rem;
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

export default Notify;
