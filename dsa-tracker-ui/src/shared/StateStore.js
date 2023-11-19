import { create } from "zustand";

export const messageStore = create((set) => ({
  messageObj: { message: "", status: "" },
  setMessageObj: (message, status) =>
    set((state) => ({ messageObj: { message: message, status: status } })),
}));

export const userInfoStore = create((set) => ({
  userInfoObj: { _id: "", name: "", email: "" },
  setUserInfoObj: (userInfoObj) =>
    set((state) => ({ userInfoObj: userInfoObj })),
}));

export const updateFormDataStore = create((set) => ({
  updateFormDataObj: {
    _id: "",
    question: "",
    link: "",
    topic: "",
    complexity: "",
    note: "",
    state: "",
  },
  setUpdateFormDataObj: (updateFormDataObj) =>
    set((state) => ({ updateFormDataObj: updateFormDataObj })),
}));
