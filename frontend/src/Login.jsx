import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const login = async () => {

    if(!email || !password){
      alert("All fields required");
      return;
    }

    try{
      const res=await axios.post("http://localhost:5000/api/auth/login",{email,password});
      localStorage.setItem("token",res.data.token);
      navigate("/dashboard");
    }catch{
      alert("Invalid credentials");
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl w-80 shadow-xl">

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Login
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4 rounded"
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full p-2 rounded"
        >
          Login
        </button>

        <p
          className="text-center text-sm mt-3 text-indigo-600 cursor-pointer"
          onClick={()=>navigate("/register")}
        >
          Create Account
        </p>

      </div>
    </div>
  );
}
