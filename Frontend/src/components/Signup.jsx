import { useState } from "react";
import axios from "axios";

function Signup() {
  const [FirstName, setFirstName] = useState("");
  const [EmailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      await axios.post("http://localhost:3000/signup", {
        FirstName,
        EmailId,
        Password,
      });
      setFirstName("");
      setEmailId("");
      setPassword("");
    } catch (error) {
      console.log("Error while sign in " + error.message);
    }
  }
  return (
    <>
      <div className="shadow-[14px_10px_13px_0px_rgba(234,_179,_8,_0.5)] flex justify-center items-center h-96 flex-col w-72 rounded">
        <div>Sign Up</div>
        <div className="p-4">
          <input
            className="p-3"
            type="text"
            placeholder="FirstName"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="p-4">
          <input
            className="p-3"
            type="email"
            placeholder="Email-Id"
            value={EmailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        <div className="p-4">
          <input
            className="p-3"
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-blue-800 hover:bg-blue-600 rounded p-2"
            onClick={handleSubmit}
          >
            SignIn
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
