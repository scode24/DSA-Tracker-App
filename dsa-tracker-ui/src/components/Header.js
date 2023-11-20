import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { messageStore } from "../shared/StateStore";
import { userInfoStore } from "../shared/StateStore";

function Header() {
  const appName = process.env.REACT_APP_NAME;
  const appVersion = process.env.REACT_APP_VERSION;

  const { messageObj, setMessageObj } = messageStore();
  const { userInfoObj, setUserInfoObj } = userInfoStore();

  console.log(userInfoObj);

  const [isUserInfoDialogOpen, setIsUserInfoDialogOpen] = useState(false);

  const navigator = useNavigate();

  const getBackgroundColor = () => {
    setTimeout(() => {
      setMessageObj("", "");
    }, 7000);

    if (messageObj["status"] === "success" || messageObj["status"] === 200) {
      return { backgroundColor: "#019031" };
    } else if (
      messageObj["status"] === "info" ||
      messageObj["status"] === 400
    ) {
      return { backgroundColor: "#2475B0" };
    }
    return { backgroundColor: "#B83227" };
  };

  const toggleUserInfoDialog = () => {
    setIsUserInfoDialogOpen(!isUserInfoDialogOpen);
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setUserInfoObj({ _id: "", name: "", email: "" });
    setIsUserInfoDialogOpen(false);
    navigator("/");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between p-4">
        <div className="flex flex-row">
          <div className="flex flex-col justify-center items-center text-2xl mr-2">
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
          <div
            className="flex flex-col justify-center items-center font-semibold cursor-pointer"
            onClick={() => navigator("/playground")}
          >
            {appName + " " + appVersion}
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <div
            className="mr-5 cursor-pointer"
            onClick={() => navigator("/about")}
          >
            About
          </div>

          {userInfoObj !== undefined && userInfoObj["_id"] === "" ? (
            <div
              className="flex flex-row cursor-pointer"
              onClick={() => navigator("/login")}
            >
              <div className="flex flex-col justify-center items-center font-semibold">
                Sign In
              </div>
              <div className="flex flex-col justify-center items-center font-semibold pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div>
              <div className="cursor-pointer" onClick={toggleUserInfoDialog}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              {isUserInfoDialogOpen ? (
                <div className="card z-10 absolute right-2 top-2">
                  <div className="flex flex-row justify-between p-2">
                    <span>Welcome user</span>
                    <svg
                      onClick={toggleUserInfoDialog}
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
                  <div className="flex flex-row px-3 mt-2">
                    <div className="pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col">
                      <span>
                        <strong>{userInfoObj["name"]}</strong>
                      </span>
                      <span>{userInfoObj["email"]}</span>
                    </div>
                  </div>
                  <div
                    className="flex flex-row justify-end border-t p-2 mt-3"
                    onClick={logoutUser}
                  >
                    <button className="custom-entrycard-button text-black py-1 bg-transparent">
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
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>

                        <span>Sign out</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>

      {messageObj["message"] !== "" ? (
        <div
          className="flex flex-row justify-between text-white w-full p-4"
          style={getBackgroundColor()}
        >
          <div></div>
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>

            <span className="ml-3">{messageObj["message"]}</span>
          </div>
          <div
            className="flex flex-row justify-end text-white cursor-pointer"
            onClick={() => setMessageObj("", "")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Header;
