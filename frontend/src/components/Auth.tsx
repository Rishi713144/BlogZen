import type { ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignUpInput } from "@rishikonar/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: ""
  });

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up")
      console.error(e);
      // alert the user here that the request failed
    }
  }

  return <div className="h-screen flex justify-center flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
    <div className="flex justify-center">
      <div>
        <div className="px-10">
          <div className="text-3xl font-extrabold dark:text-white">
            Create an account
          </div>
          <div className="text-slate-500 dark:text-slate-400">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link className="pl-2 underline text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white" to={type === "signin" ? "/signup" : "/signin"}>
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </div>
        <div className="pt-8">
          {type === "signup" ? <LabelledInput label="Name" placeholder="Rishi K..." value={postInputs.name} onChange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value
            })
          }} /> : null}
          <LabelledInput label="Email" placeholder="rishi@gmail.com" value={postInputs.email} onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value
            })
          }} />
          <LabelledInput label="Password" type={"password"} placeholder="123456" value={postInputs.password} onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value
            })
          }} />
          <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-gray-700 dark:border-gray-700 transition-colors">{type === "signup" ? "Sign up" : "Sign in"}</button>
        </div>
      </div>
    </div>
  </div>
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
}

function LabelledInput({ label, placeholder, onChange, type, value }: LabelledInputType) {
  return <div>
    <label className="block mb-2 text-sm text-black dark:text-white font-semibold pt-4">{label}</label>
    <input onChange={onChange} type={type || "text"} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400" placeholder={placeholder} required />
  </div>
}
