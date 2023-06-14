import {
  SetMessages,
  SetContacts,
  SetUsername,
  SetNotifications
} from "../ActionTypes/ActionTypes";

let intialState = {
  useremail: "",
  username: "",
  messages: [],
  contacts: [],
  avatarImage:
    "data:image/png;base64,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",
  notifications: [
    {
      type: "chat",
      sender: "Harsh",
      msg: "Chat recieved from harsh",
    },
  ],
};

export const ChatReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SetUsername:
      return {
        ...state,
        username: payload,
      };

    case SetMessages:
      return {
        ...state,
        messages: payload,
      };

    case SetNotifications:
      return {
        ...state,
        notifications: payload,
      };

    case SetContacts:
      return {
        ...state,
        contacts: payload,
      };

    default:
      return state;
  }
};
