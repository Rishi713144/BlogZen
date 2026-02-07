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
      alert(`Error while ${type === "signup" ? "signing up" : "signing in"}`)
      console.error(e);
    }
  }

  return <div className="h-screen flex justify-center flex-col bg-white/30 dark:bg-slate-900/40 backdrop-blur-md transition-colors duration-300">
    <div className="flex justify-center">
      <div className="bg-white/80 dark:bg-slate-800/80 p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 backdrop-blur-xl">
        <div className="px-10 text-center">
          <div className="text-3xl font-extrabold dark:text-white mb-2">
            {type === "signin" ? "Welcome back" : "Create an account"}
          </div>
          <div className="text-slate-500 dark:text-slate-400 font-medium">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link className="pl-2 underline text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" to={type === "signin" ? "/signup" : "/signin"}>
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
          <button
            onClick={sendRequest}
            type="button"
            className="mt-8 w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-md px-5 py-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30"
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
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
