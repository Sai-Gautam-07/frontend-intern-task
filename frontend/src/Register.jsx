import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const register = async () => {

    if(!name || !email || !password){
      alert("All fields required");
      return;
    }

    try{
      await axios.post("http://localhost:5000/api/auth/register",{name,email,password});
      alert("Registered Successfully");
      navigate("/");
    }catch{
      alert("Registration failed");
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl w-80 shadow-xl">

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Register
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Name"
          onChange={e=>setName(e.target.value)}
        />

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
          onClick={register}
          className="bg-green-600 hover:bg-green-700 text-white w-full p-2 rounded"
        >
          Register
        </button>

        <p
          className="text-center text-sm mt-3 text-blue-600 cursor-pointer"
          onClick={()=>navigate("/")}
        >
          Back to Login
        </p>

      </div>
    </div>
  );
}
