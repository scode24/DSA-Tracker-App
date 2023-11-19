import React, { useState } from "react";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";
import { messageStore } from "../shared/StateStore";

function Register() {
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  const { setMessageObj } = messageStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const resetForm = () => {
    document.getElementById("register-form").reset();
  };

  const handleFormInput = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData(formData);
  };

  const hashPassword = (password) => {
    // const salt = bcrypt.genSaltSync(10)
    // example =>  $2a$10$CwTycUXWue0Thq9StjUM0u => to be added always to the password hash
    return bcrypt.hashSync(password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      formData["name"] === "" ||
      formData["email"] === "" ||
      formData["password"] === "" ||
      formData["confirm_password"] === ""
    ) {
      setMessageObj("Please provide below details", "info");
      return;
    }

    if (formData["password"] !== formData["confirm_password"]) {
      setMessageObj("Please confirm your password", "info");
      return;
    }

    axios
      .post(baseUrl + "/register", {
        name: formData["name"],
        email: formData["email"],
        password: hashPassword(formData["password"]),
      })
      .then((response) => {
        setMessageObj(response["data"], response["status"]);
        resetForm();
      })
      .catch((error) => {
        const response = error["response"];
        setMessageObj(response["data"], response["status"]);
      });
  };

  return (
    <div className="flex flex-row justify-center h-90v">
      <div className="flex flex-col justify-center h-full text-center w-1/4  max-md:w-3/4">
        <span className="text-3xl font-bold">New member ? Sign up here</span>
        <form
          id="register-form"
          className="mt-9 text-left"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col">
            <label>Name</label>
            <input type="text" name="name" onChange={handleFormInput} />
          </div>

          <div className="flex flex-col mt-3">
            <label>Email address</label>
            <input type="email" name="email" onChange={handleFormInput} />
          </div>

          <div className="flex flex-col mt-3">
            <label>Password</label>
            <input type="password" name="password" onChange={handleFormInput} />
          </div>

          <div className="flex flex-col mt-3">
            <label>Confirm password</label>
            <input
              type="password"
              name="confirm_password"
              onChange={handleFormInput}
            />
          </div>

          <button className="custom-button w-full mt-5" type="submit">
            Sign up
          </button>
        </form>

        <span className="mt-7">
          Already registered ?{" "}
          <Link className="text-indigo-700 font-bold" to="/login">
            Sign in here
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
