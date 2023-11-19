import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [isEmailValid, setIsEmailValid] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full h-90v">
      <div className="flex flex-col justify-center h-full text-center w-1/4  max-md:w-3/4">
        <span className="text-3xl font-bold">
          Confirm your email and change password
        </span>
        <form className="mt-9 text-left">
          {!isEmailValid ? (
            <div className="flex flex-col">
              <label>Email address</label>
              <input type="text" />
            </div>
          ) : (
            <></>
          )}

          {isEmailValid ? (
            <>
              <div className="flex flex-col mt-3">
                <label>New password</label>
                <input type="password" />
              </div>

              <div className="flex flex-col mt-3">
                <label>Confirm password</label>
                <input type="password" />
              </div>
            </>
          ) : (
            <></>
          )}

          {!isEmailValid ? (
            <button className="w-full mt-5">Confirm email</button>
          ) : (
            <></>
          )}
          {isEmailValid ? (
            <button className="w-full mt-5">Reset password</button>
          ) : (
            <></>
          )}
        </form>

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
