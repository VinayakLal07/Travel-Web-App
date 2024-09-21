import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      if (!name.trim()) {
        throw new Error("Name is required");
      }

      if (!password.trim()) {
        throw new Error("Password is required");
      }

      if (!email.includes("@gmail.com")) {
        throw new Error("Email must be in '@gmail.com' format");
      }

      const response = await axios.get(
        `http://localhost:3000/api/check-email?email=${email}`
      );
      if (response.data.exists) {
        throw new Error("Email is already registered");
      }

      setNameError("");
      setPasswordError("");
      setError("");

      await axios.post("http://localhost:3000/api/register", {
        name,
        email,
        password,
      });
      setRedirect(true);
    } catch (e) {
      if (e.message === "Name is required") {
        setNameError(e.message);
      } else if (e.message === "Password is required") {
        setPasswordError(e.message);
      } else if (e.message === "Email must be in '@gmail.com' format") {
        setEmailError(e.message);
      } else {
        setError(e.message || "Registration failed. Please try again later");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            id="uname"
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="example@email.com"
            id="uemail"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            id="upassword"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary" id="registerButton">
            Register
          </button>
          <div className="text-center py-2 text-red-500">
            {nameError && <p>{nameError}</p>}
            {passwordError && <p>{passwordError}</p>}
            {error && <p>{error}</p>}
          </div>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
