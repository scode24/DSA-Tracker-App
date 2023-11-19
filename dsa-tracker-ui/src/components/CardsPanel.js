import React from "react";
import EntryCard from "./EntryCard";

function CardsPanel(props) {
  const searchData = (e) => {
    props["searchLogs"](e.target.value);
  };

  return (
    <div className="card w-full">
      <div className="flex flex-row justify-between p-2 px-3 border-b">
        <span className="font-bold">Entry cards panel</span>
      </div>

      <div className="flex flex-col border-b">
        <div className="flex flex-row justify-between p-3">
          <div className="flex flex-col justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
              />
            </svg>
          </div>
          <div className="flex flex-row">
            <input
              className="w-full my-0"
              type="text"
              placeholder="Enter search terms"
              onChange={searchData}
            />
          </div>
        </div>
      </div>

      <div className="p-3 h-90v overflow-scroll">
        <div className="grid grid-cols-3 h-fit-content max-md:grid-cols-1">
          {props["data"].map((data, index) => (
            <EntryCard
              key={index}
              EntryCard
              toggleLogEntryDialogFn={props["toggleLogEntryDialogFn"]}
              fetchLogs={props["fetchLogs"]}
              deleteLog={props["deleteLog"]}
              data={data}
            ></EntryCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsPanel;
