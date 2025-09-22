import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate("/"); // redirect after register
    } catch (err) {
      setError("Signup failed, please try again");
    }
  };

  return (
    <div>
      <div className="pattern" />

      <div className="wrapper pt-4 flex items-center justify-center flex-col h-screen gap-10">
        <h1 className="text-gradient text-3xl font-bold">Signup</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg p-2 border border-gray-500 outline-none text-white bg-transparent"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg p-2 border border-gray-500 outline-none text-white bg-transparent"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg p-2 border border-gray-500 outline-none text-white bg-transparent"
            required
          />

          <button className="bg-linear-to-r from-[#b29af3] to-[#8a66e5] text-white px-4 py-2 font-medium text-xl rounded-lg">
            Signup
          </button>

          <p className="text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-gradient font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
