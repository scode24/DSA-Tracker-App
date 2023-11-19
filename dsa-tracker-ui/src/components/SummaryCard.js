import React from "react";

function SummaryCard(props) {
  const getPercentage = (status) => {
    const total = props["data"]["solvedCount"] + props["data"]["flaggedCount"];
    if (status === "solved") {
      return (props["data"]["solvedCount"] / total) * 100;
    }
    return (props["data"]["flaggedCount"] / total) * 100;
  };

  return (
    <div className="flex flex-col card">
      <div className="flex flex-col p-5">
        <span>Data metric</span>
        <span className="text-2xl font-bold mt-1">Entry statistics</span>
        <div className="flex flex-row mt-2">
          <div
            className="h-10p rounded-md"
            style={{
              backgroundColor: "#019031",
              width: getPercentage("solved") + "%",
            }}
          ></div>
          <div
            className="h-10p rounded-md ml-1"
            style={{
              backgroundColor: "#DFAF2B",
              width: getPercentage("flagged") + "%",
            }}
          ></div>
        </div>

        <div className="flex flex-row mt-3">
          <div
            className="flex flex-col text-center mr-6"
            style={{ color: "#019031" }}
          >
            <span className="">Solved</span>
            <span className="text-2xl mt-1 font-bold">
              {props["data"]["solvedCount"]}
            </span>
          </div>

          <div
            className="flex flex-col text-center mr-5"
            style={{ color: "#DFAF2B" }}
          >
            <span>Flagged</span>
            <span className="text-2xl mt-1 font-bold">
              {props["data"]["flaggedCount"]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end p-3 border-t">
        <button onClick={() => props.toggleLogEntryDialogFn(true)}>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Add entry</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SummaryCard;
