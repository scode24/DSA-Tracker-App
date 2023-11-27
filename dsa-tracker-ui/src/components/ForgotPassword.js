import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { messageStore } from "../shared/StateStore";
import bcrypt from "bcryptjs";

function ForgotPassword() {
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [otpTimer, setOtpTimer] = useState(10);
  const { setMessageObj } = messageStore();
  const [isOtpRegenerate, setIsOtpRegenerate] = useState(false);

  const handleInput = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData(formData);
  };

  const hashPassword = (password) => {
    // const salt = bcrypt.genSaltSync(10)
    // example =>  $2a$10$CwTycUXWue0Thq9StjUM0u => to be added always to the password hash
    return bcrypt.hashSync(password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
  };

  const sendOtp = () => {
    axios
      .post(
        baseUrl + "/generateOtp",
        {},
        {
          headers: {
            email: formData["email"],
          },
        }
      )
      .then((response) => {
        setMessageObj(
          "Sent password reset OTP to the mail id " + formData["email"],
          "info"
        );
        let sec = 25;
        let intervalId = setInterval(() => {
          sec = sec - 1;
          setOtpTimer(sec);
          if (sec <= 0) {
            clearInterval(intervalId);
            setIsOtpRegenerate(false);
          }
        }, 1000);
      })
      .catch((error) => {
        const response = error["response"];
        setMessageObj(response["data"], response["status"]);
      });
  };

  const handleOtpForm = (e) => {
    e.preventDefault();
    const html = e.target.outerHTML;
    if (html.indexOf("verifyotp-btn") > -1) {
      axios
        .get(baseUrl + "/verifyOtp", {
          headers: {
            email: formData["email"],
            otp: formData["otp"],
          },
        })
        .then((response) => {
          if (response.data === "verified") {
            setIsOtpValid(true);
          } else {
            setMessageObj("Invalid OTP. Please try again.", "info");
          }
        });
    } else {
      setIsOtpRegenerate(true);
      sendOtp();
    }
  };

  const handlePasswordResetForm = (e) => {
    e.preventDefault();
    if (formData["password"] !== formData["confirmPassword"]) {
      setMessageObj("Please confirm password", "info");
      return;
    }

    axios
      .post(baseUrl + "/resetPassword", {
        email: formData["email"],
        password: hashPassword(formData["password"]),
      })
      .then((response) => {
        setMessageObj(response["data"], response["status"]);
      })
      .catch((error) => {
        const response = error["response"];
        setMessageObj(response["data"], response["status"]);
      });
  };

  const checkValidEmail = (e) => {
    e.preventDefault();
    axios
      .get(baseUrl + "/checkValidEmail", {
        headers: {
          email: formData["email"],
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setMessageObj("Please enter a correct email", "info");
          setIsEmailValid(false);
        } else {
          setIsEmailValid(true);
          setIsOtpRegenerate(true);
          sendOtp();
        }
      })
      .catch((error) => {
        const response = error["response"];
        setMessageObj(response["data"], response["status"]);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-90v">
      <div className="flex flex-col justify-center h-full text-center w-1/4  max-md:w-3/4">
        <span className="text-3xl font-bold">Reset your password</span>
        <div className="mt-9 text-left">
          {!isEmailValid && !isOtpRegenerate ? (
            <form onSubmit={checkValidEmail}>
              <div className="flex flex-col mt-3">
                <label>Email</label>
                <input type="email" name="email" onChange={handleInput} />
              </div>

              <button className="custom-button w-full mt-5" type="submit">
                Confirm email
              </button>
            </form>
          ) : (
            <></>
          )}

          {isEmailValid && !isOtpValid ? (
            <form onSubmit={handleOtpForm}>
              {isOtpRegenerate ? (
                <div className="flex flex-col mt-3">
                  <div className="flex flex-row justify-between">
                    <label>OTP (Sent in email)</label>
                    <Link
                      className="text-indigo-700 font-bold"
                      to="/forgotPassword"
                    >
                      Expiring in {otpTimer} sec
                    </Link>
                  </div>
                  <input
                    type="number"
                    name="otp"
                    maxLength={4}
                    onChange={handleInput}
                  />

                  <button
                    className="custom-button w-full mt-5"
                    name="verifyotp-btn"
                    type="submit"
                  >
                    Verify OTP
                  </button>
                </div>
              ) : (
                <button
                  className="custom-button w-full mt-5"
                  name="regenerate-btn"
                  type="submit"
                >
                  Regenerate OTP
                </button>
              )}
            </form>
          ) : (
            <></>
          )}

          {isEmailValid && isOtpValid ? (
            <form onSubmit={handlePasswordResetForm}>
              <div className="flex flex-col mt-3">
                <label>New password</label>
                <input type="password" name="password" onChange={handleInput} />
              </div>

              <div className="flex flex-col mt-3">
                <label>Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleInput}
                />
              </div>

              <button className="custom-button w-full mt-5" type="submit">
                Confirm password
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>

        <span className="mt-7">
          Go back{" "}
          <Link className="text-indigo-700 font-bold" to="/login">
            Sign in here
          </Link>
        </span>
      </div>
    </div>
  );
}

export default ForgotPassword;
