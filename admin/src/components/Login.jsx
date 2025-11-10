import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import {toast} from "react-toastify"


const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", { email, password });
      console.log(response);


      // TODO: Call backend API here
      if (response.data.success) {
         setToken(response.data.token);// temporary login
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-lg w-[90%] max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="font-medium mb-1">Email Address</p>
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <p className="font-medium mb-1">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
