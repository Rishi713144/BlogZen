import type { SignUpInput } from "@rishikonar/medium-common";
import axios from "axios";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: ""
  });

  async function sendRequest() {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert(`Error while ${type === "signup" ? "signing up" : "signing in"}`)
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col px-6 md:px-0">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
              <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center rotate-3">
                <span className="text-white dark:text-slate-900 font-black text-sm">B</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">blogzen</span>
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 text-center md:text-left">
              {type === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-center md:text-left">
              {type === "signin" ? "New to Blogzen?" : "Already have an account?"}
              <Link className="ml-2 text-blue-600 dark:text-blue-400 font-bold hover:underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Create one for free" : "Sign in to your account"}
              </Link>
            </p>
          </div>

          <div className="space-y-5">
            {type === "signup" && (
              <LabelledInput
                label="What should we call you?"
                placeholder="John Doe"
                value={postInputs.name}
                onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
              />
            )}
            <LabelledInput
              label="Email address"
              placeholder="john@example.com"
              value={postInputs.email}
              onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={postInputs.password}
              onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
            />

            <button
              onClick={sendRequest}
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-200 dark:shadow-none mt-4 disabled:opacity-70"
            >
              {loading ? "Processing..." : (type === "signup" ? "Get Started" : "Sign In")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
}

function LabelledInput({ label, placeholder, onChange, type, value }: LabelledInputType) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-black text-slate-900 dark:text-white ml-1 uppercase tracking-wider">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        value={value}
        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 font-medium"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

