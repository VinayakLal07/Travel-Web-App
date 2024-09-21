// import { Link, Navigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import axios from "axios";
// import { UserContext } from "../UserContext.jsx";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [redirect, setRedirect] = useState(false);
//   const { setUser } = useContext(UserContext);
//   async function handleLoginSubmit(ev) {
//     ev.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:3000/api/login", {
//         email,
//         password,
//       });
//       setUser(data);
//       alert("Login successful");
//       setRedirect(true);
//     } catch (e) {
//       alert("Login failed");
//     }
//   }

//   if (redirect) {
//     return <Navigate to={"/"} />;
//   }

//   return (
//     <div className="mt-4 grow flex items-center justify-around">
//       <div className="mb-64">
//         <h1 className="text-4xl text-center mb-4">Login</h1>
//         <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
//           <input
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(ev) => setEmail(ev.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="password"
//             value={password}
//             onChange={(ev) => setPassword(ev.target.value)}
//           />
//           <button className="primary">Login</button>
//           <div className="text-center py-2 text-gray-500">
//             Don't have an account yet?{" "}
//             <Link className="underline text-black" to={"/register"}>
//               Register now
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Email must be in @gmail.com format");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      setUser(data);
      setRedirect(true);
    } catch (e) {
      if (e.response && e.response.status === 422) {
        alert("Email or password is incorrect");
      } else {
        alert("Login failed");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            id="lemail"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          {emailError && <div className="text-red-500">{emailError}</div>}
          <input
            type="password"
            placeholder="password"
            id="ipasswd"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          {passwordError && <div className="text-red-500">{passwordError}</div>}
          <button className="primary" id="lsubmit">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
