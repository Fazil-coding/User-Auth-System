import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [EmailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      const res = await axios.post("http://localhost:3000/signin", {
        EmailId,
        Password,
      });
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        console.log(decoded);
        setFirstName(decoded.FirstName);
        navigate("/dashboard");

        console.log("Successfully logged in");
      }
      setEmailId("");
      setPassword("");
      console.log("successfully login");
    } catch (error) {
      console.log("Error while login " + error.message);
    }
  }
  return (
    <>
      <div className="shadow-[14px_10px_13px_0px_rgba(234,_179,_8,_0.5)] flex justify-center items-center h-80 flex-col w-72 rounded">
        <div>Log-In</div>
        <div>
          <input
            type="email"
            placeholder="Email-Id"
            value={EmailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="bg-blue-800 hover:bg-blue-600 p-2 rounded"
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
}

export default Signin;
