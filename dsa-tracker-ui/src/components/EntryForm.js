import React, { useState } from "react";
import { messageStore } from "../shared/StateStore";
import axios from "axios";

function EntryForm(props) {
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  const updateFormDataObj = props.data;

  const { setMessageObj } = messageStore();
  const [entryFormData, setEntryFormData] = useState({
    question: "",
    link: "",
    topic: "",
    complexity: "",
    note: "",
    status: "",
  });

  const resetForm = () => {
    document.getElementById("entry-form").reset();
  };

  const handleInput = (e) => {
    entryFormData[e.target.name] = e.target.value;
    setEntryFormData(entryFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (entryFormData["question"] === "") {
      setMessageObj("Question should not be empty", "info");
      return;
    }

    axios
      .post(baseUrl + "/save", entryFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setMessageObj(response["data"], response["status"]);
        resetForm();
        setEntryFormData({
          question: "",
          link: "",
          topic: "",
          complexity: "",
          note: "",
          status: "",
        });
        props["fetchLogs"]("");
      })
      .catch((error) => {
        const response = error["response"];
        setMessageObj(response["data"], response["status"]);
      });
  };

  return (
    <div className="card w-auto">
      <div className="flex flex-row justify-between p-2 px-3 border-b">
        <span className="font-bold">Log entry form</span>
        <svg
          onClick={() => props.toggleLogEntryDialogFn(false)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <form
        id="entry-form"
        className="mt-5 text-left"
        onSubmit={handleFormSubmit}
      >
        <div className=" pb-3 px-3">
          <div className="flex flex-col">
            <label>Question</label>
            <input
              type="text"
              name="question"
              defaultValue={updateFormDataObj["question"]}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col">
            <label>Link</label>
            <input
              type="text"
              name="link"
              defaultValue={updateFormDataObj["link"]}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col">
            <label>Topic</label>
            <input
              type="text"
              name="topic"
              defaultValue={updateFormDataObj["topic"]}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col">
            <label>Complexity</label>
            <select name="complexity" onChange={handleInput}>
              <option value={"easy"}>Easy</option>
              <option value={"medium"}>Medium</option>
              <option value={"hard"}>Hard</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>Note</label>
            <textarea
              type="text"
              name="note"
              defaultValue={updateFormDataObj["note"]}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col mt-3">
            <div className="flex flex-row" style={{ color: "#DFAF2B" }}>
              <input
                className="mr-2"
                type="radio"
                id="flagged"
                name="status"
                value="flagged"
                onChange={handleInput}
              />
              <label className="flex flex-col justify-center" htmlFor="flagged">
                Flagged for later revisit
              </label>
            </div>

            <div className="flex flex-row" style={{ color: "#019031" }}>
              <input
                className="mr-2"
                type="radio"
                id="solved"
                name="status"
                value="solved"
                onChange={handleInput}
              />
              <label className="flex flex-col justify-center" htmlFor="solved">
                Solved
              </label>
            </div>
          </div>
        </div>

        <div className="px-3 py-3 border-t">
          <button className="custom-button w-full" type="submit">
            Save information
          </button>
        </div>
      </form>
    </div>
  );
}

export default EntryForm;
