"use client";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import axios from "axios";
import Users from "./components/Users";
import Services from "./components/Services";
import Portfolio from '../components/Portfolio'
import Messages from "./components/Messages";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import ManageServices from "./components/ManageServices";
import ManagePortfolio from "./components/ManagePortfolio";
import AlertDialogPart from "@/app/components/AlertDialogPart";

//page component arrow function
const page = () => {
  const [data, setData] = useState();
  const [show, setShow] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    const getdata = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/auth/getdata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status == 200) {
          setData(res.data.data);
          setRole(res.data.data.role);
          let showstate =
            res.data.data.role == "admin"
              ? "users"
              : res.data.data.role == "blogger"
              ? "blogs"
              : res.data.data.role == "projectmanager"
              ? "projects"
              : "user";
          setShow(showstate);
        }
      } catch (error) {
        if (error.response.status == 401) {
          window.location.href = "/team/login";
        }
        return error;
      }
    };
    getdata();
  }, []);
  return (
    <>
      {!data && <Loading />}
      {data && (
        <div className="bg-gray-900 py-5 w-full">
          <div className="bg-gray-800 p-5 rounded-md mx-auto w-full md:w-3/4">
            <h3 className="text-white text-3xl pb-5 merriweather font-semibold">
              Hi {data.name}
            </h3>
            <p className="text-white luto font-normal">Email: {data.email}</p>
            <p className="text-white luto font-normal">Role: {role}</p>
          </div>
          <div className="my-5 mx-3 md:mx-0 overflow-x-scroll md:overflow-hidden">
            <div className="flex justify-center gap-3 items-center ">
              <button
                className={`${
                  show == "users"
                    ? "bg-secondary-500 text-black"
                    : "bg-gray-800 text-white"
                } p-3 rounded-md  luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed`}
                disabled={role !== "admin"}
                onClick={() => setShow("users")}
              >
                Users
              </button>
              <button
                className={`${
                  show == "services"
                    ? "bg-secondary-700 text-white"
                    : "bg-gray-800"
                } p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed`}
                disabled={role !== "admin"}
                onClick={() => setShow("services")}
              >
                Service Requests
              </button>
                   <button
                className={`${
                  show == "portfolio"
                    ? "bg-secondary-700 text-white"
                    : "bg-gray-800"
                } p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed`}
                disabled={role !== "admin"}
                onClick={() => setShow("portfolio")}
              >
                Portfolio
              </button>
              <button
                className={`${
                  show == "projects"
                    ? "bg-secondary-700 text-white"
                    : "bg-gray-800"
                } p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed`}
                disabled={role !== "admin" && role !== "projectmanager"}
                onClick={() => setShow("projects")}
              >
                Projects
              </button>
              <button
                className={`${
                  show == "ourservices"
                    ? "bg-secondary-700 text-white"
                    : "bg-gray-800"
                } p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed`}
                disabled={role !== "admin"}
                onClick={() => setShow("ourservices")}
              >
                Our Services
              </button>
                   <button
                className={`${
                  show == "ourportfolio"
                    ? "bg-secondary-700 text-white"
                    : "bg-gray-800"
                } p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed`}
                disabled={role !== "admin"}
                onClick={() => setShow("ourportfolio")}
              >
                Our Portfolio
              </button>
              <button
                className={`${
                  show == "messages"
                    ? "bg-secondary-700 text-white"
                    : "bg-gray-800"
                } p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed`}
                disabled={role !== "admin"}
                onClick={() => setShow("messages")}
              >
                Messages
              </button>
              <button
                className={`${
                  show == "blogs"
                    ? "bg-secondary-700 text-white"
                    : "bg-gray-800"
                } p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed`}
                disabled={role !== "admin" && role !== "blogger"}
                onClick={() => setShow("blogs")}
              >
                Blogs
              </button>

              <AlertDialogPart/>
            </div>
          </div>
          <div className="h-auto my-2">
            {show == "users" && role == "admin" && <Users />}
            {show == "services" && role == "admin" && <Services />}
            {show == "portfolio" && role == "admin" && <portfolio />}
               
            {show == "projects" &&
              (role == "admin" || role == "projectmanager") && <Projects />}
            {show == "ourservices" && role == "admin" && <ManageServices />}
            {show == "ourportfolio" && role == "admin" && <ManagePortfolio />}
          {show == "messages" && role == "admin" && <Messages />}
            {show == "blogs" && (role == "admin" || role == "blogger") && (
              <Blogs />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
