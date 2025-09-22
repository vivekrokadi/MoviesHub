import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <div className="pattern" />

      <div className="wrapper pt-4 flex items-center justify-center flex-col h-screen gap-10">
        <h1 className="text-gradient text-3xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-lg p-2 border border-gray-500 outline-none text-white bg-transparent"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-lg p-2 border border-gray-500 outline-none text-white bg-transparent"
            required
          />

          <button className="bg-linear-to-r from-[#b29af3] to-[#8a66e5] text-white px-4 py-2 font-medium text-xl rounded-lg">
            Login
          </button>

          <p className="text-gray-400 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-gradient font-semibold">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
