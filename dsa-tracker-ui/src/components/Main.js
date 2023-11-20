import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { messageStore, userInfoStore } from "../shared/StateStore";
import axios from "axios";

function Main() {
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
  const { userInfoObj, setUserInfoObj } = userInfoStore();
  const { setMessageObj } = messageStore();

  const navigator = useNavigate();
  const validateAndPopulateData = useCallback(async () => {
    if (
      localStorage.getItem("accessToken") !== null &&
      userInfoObj["_id"] === ""
    ) {
      await axios
        .get(baseUrl + "/validate", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setUserInfoObj(response["data"][0]);
          navigator("/playground");
        })
        .catch((error) => {
          const response = error["response"];
          setMessageObj(response["data"], response["status"]);
        });
    }
  }, [baseUrl, navigator, setMessageObj, setUserInfoObj, userInfoObj]);

  useEffect(() => {
    validateAndPopulateData();
  }, [validateAndPopulateData]);

  return (
    <div className="flex flex-col justify-center items-center h-90v">
      <span className="text-7xl text-center font-extrabold w-2/3 max-md:text-5xl">
        Track your progress, take notes, and climb the ladder of algorithmic
        excellence!
      </span>
      <span className="text-xl text-center w-2/3 mt-10 max-md:text-sm">
        Welcome to the DSA Tracker App! Elevate your Data Structures and
        Algorithms skills with ease. Log your problem-solving journey, add key
        details, and jot down quick notes. Stay organized and conquer those
        coding challenges! <strong>#CodeMastersUnite</strong>
      </span>
      <button className="mt-10" onClick={() => navigator("/login")}>
        <div className="flex flex-row justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
            />
          </svg>
          <span>Get started</span>
        </div>
      </button>
    </div>
  );
}

export default Main;
