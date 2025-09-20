import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
    const { signup } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password)
        navigate("/")
    }


  return (
    <div>
      <div className="pattern" />

      <div className="wrapper pt-4 flex items-center justify-center flex-col h-screen gap-10">
        <h1 className="text-gradient text-3xl font-bold">Signup</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="rounded-lg p-2 border border-gray-500 outline-none text-white"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className="rounded-lg p-2 border border-gray-500 outline-none text-white"
          />

          <button className="bg-linear-to-r from-[#b29af3] to-[#8a66e5] text-white px-4 py-2 font-medium text-xl rounded-lg">
            Signup
          </button>
          <p className="text-gray-400 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup