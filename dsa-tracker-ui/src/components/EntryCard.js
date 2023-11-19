import React from "react";

function EntryCard(props) {
  return (
    <div className="card flex flex-col h-fit-content border mr-3 mb-3 max-md:w-full">
      <div
        className="h-5p rounded-md rounded-t-full"
        style={{
          backgroundColor:
            props["data"]["status"] === "solved" ? "#019031" : "#DFAF2B",
        }}
      ></div>

      <div className="p-3 border-b">
        <div className="flex flex-wrap mb-2">
          <span
            className="text-white px-2 py-1 w-fit text-xs rounded-md mr-1"
            style={{
              backgroundColor:
                props["data"]["status"] === "solved" ? "#019031" : "#DFAF2B",
            }}
          >
            {props["data"]["status"] === "solved" ? "Solved" : "Flagged"}
          </span>
          <span className="w-fit text-xs px-2 py-1  rounded-md border mr-1">
            {props["data"]["topic"]}
          </span>
          <span className="w-fit text-xs px-2 py-1  rounded-md border mr-1">
            {props["data"]["complexity"]}
          </span>
        </div>

        <span className="font-bold">{props["data"]["question"]}</span>
        <p className="mt-3 text-sm h-90p overflow-scroll">
          {props["data"]["note"]}
        </p>
      </div>

      <div className="flex flex-row justify-center">
        <div className="flex flex-wrap m-3 w-fit">
          <button className="w-28 bg-transparent text-black mx-1">
            <div className="flex flex-row justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
              <span
                onClick={() => window.open(props["data"]["link"], "_blank")}
              >
                Link
              </span>
            </div>
          </button>
          <button className="w-28 bg-transparent text-black mx-1">
            <div className="flex flex-row justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span>Update</span>
            </div>
          </button>
          <button
            className="w-28 bg-transparent text-black mx-1"
            onClick={() => props["deleteLog"](props["data"]["_id"])}
          >
            <div className="flex flex-row justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span>Delete</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
