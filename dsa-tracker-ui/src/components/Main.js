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
        Get started
      </button>
    </div>
  );
}

export default Main;
