import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import loginImg from "../assets/login-bg.jpg";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { TbLoader } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { signInAction } from "../redux/actions/signInActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const previousPath = localStorage.getItem("currentPath");

  // handle on login
  const handleOnLogin = async (e) => {
    e.preventDefault();
    setLoader(true);

    dispatch(signInAction(email, password));

    if (previousPath) {
      navigate(`${previousPath}`);
    }

    navigate("/dashboard/home");

    setEmail("");
    setPassword("");
    setLoader(false);
  };

  return (
    <>
      <Toaster />
      <div
        style={{
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="flex text-center justify-between items-center w-full px-8 py-6  absolute z-20 bg-trasparent">
          <Link to={"/dashboard/home"}>
            <span className="text-xl font-semibold cursor-pointer">
              Blurock Innovations
            </span>
          </Link>
          <ul className="flex gap-6 cursor-pointer">
            <li>
              <Link to={"/signup"}>Sign up</Link>
            </li>
            <li>Need help: +91 9876543210</li>
          </ul>
        </div>
        <div className="flex flex-col ">
          {/* left side div */}
          <div className="flex flex-row justify-center items-center w-full h-[100vh] ">
            <form className="bg-white border w-[350px]  rounded-md px-8  shadow-md">
              <p className=" text-3xl font-bold  flex justify-center xl:text-2xl xl:pt-6 xl:mb-6 xl:mt-0">
                Continue with blurock
              </p>
              <div className="flex flex-col gap-2 my-4">
                <label className="font-semibold text-sm" htmlFor="companyName">
                  Email
                </label>
                <input
                  id="companyName"
                  className="border mt-1 p-2 rounded-md"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="companyName">
                  Password
                </label>
                <input
                  id="companyName"
                  className="border mt-1 p-2 rounded-md"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className=" flex flex-row  xl:flex justify-center xl:mt-6 ">
                <button
                  disabled={loader ? true : false}
                  className=" flex items-center bg-blue-500 hover:bg-blue-700 px-8 py-2  text-lg rounded-md text-white mt-20  xl:w-auto xl:mt-4 xl:mb-6"
                  onClick={(e) => handleOnLogin(e)}
                >
                  {loader && <TbLoader className="mx-2 animate-spin" />}
                  Submit
                </button>
              </div>

              <div className="flex justify-end">
                <span className="cursor-pointer text-[12px]">
                  Forgot your password?
                </span>
              </div>

              <div className="flex flex-row  xl:flex justify-center xl:mt-2 xl:mb-6 p-2  text-sm ">
                <Link to={"/signup"}>
                  New User?
                  <span className="cursor-pointer text-blue-800">
                    Create Account
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LoginForm;
